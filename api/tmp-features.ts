import type { IncomingMessage, ServerResponse } from "http";
import { randomUUID } from "crypto";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { z } from "zod";

interface VercelRequest extends IncomingMessage {
  method?: string;
  body?: unknown;
}

interface VercelResponse extends ServerResponse {
  status(code: number): VercelResponse;
  json(body: unknown): VercelResponse;
}

interface Feature {
  id: string;
  nameEn: string;
  nameRu: string;
  descriptionEn: string;
  descriptionRu: string;
  version: string;
  status: "in-progress" | "done";
  notes?: string;
  doneAt?: string;
  // legacy fields — kept so old records still render
  name?: string;
  description?: string;
}

const GITHUB_REPO = "GR0UD/portfolio";
const GITHUB_BRANCH = "main";
const GITHUB_DATA_PATH = "data/tmp-features.json";
const GITHUB_CONTENTS_URL = `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_DATA_PATH}`;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOCAL_DATA_PATH = path.join(__dirname, "..", "data", "tmp-features.json");

// Local seed/fallback used when GitHub is unreachable, unconfigured, or the
// data file doesn't exist in the repo yet.
function readLocalFeatures(): Feature[] {
  try {
    const raw = readFileSync(LOCAL_DATA_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const featureInputSchema = z.object({
  nameEn: z.string().trim().min(1).max(80),
  nameRu: z.string().trim().max(80).default(""),
  descriptionEn: z.string().trim().min(1).max(500),
  descriptionRu: z.string().trim().max(500).default(""),
  major: z.number().int().min(0).max(999),
  minor: z.number().int().min(0).max(999),
  patch: z.number().int().min(0).max(999),
});

const patchSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["in-progress", "done"]),
  doneAt: z.string().nullable(),
});

const notesSchema = z.object({
  id: z.string().min(1),
  notes: z.string().max(50000),
});

const deleteSchema = z.object({
  id: z.string().min(1),
});

function githubHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-tmp-api",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function readFeatures(
  token: string,
): Promise<{ sha: string | null; features: Feature[] }> {
  const res = await fetch(`${GITHUB_CONTENTS_URL}?ref=${GITHUB_BRANCH}`, {
    headers: githubHeaders(token),
  });

  if (res.status === 404) {
    // Data file doesn't exist in the repo yet — seed it from the local
    // fallback file. The first write will create it on GitHub.
    return { sha: null, features: readLocalFeatures() };
  }
  if (!res.ok) {
    throw new Error(`GitHub read failed: ${res.status}`);
  }

  const data = (await res.json()) as { sha: string; content: string };
  const decoded = Buffer.from(data.content, "base64").toString("utf-8");
  const parsed = JSON.parse(decoded);
  return { sha: data.sha, features: Array.isArray(parsed) ? parsed : [] };
}

async function writeFeatures(
  token: string,
  features: Feature[],
  sha: string | null,
  message: string,
): Promise<void> {
  const content = Buffer.from(
    JSON.stringify(features, null, 2) + "\n",
    "utf-8",
  ).toString("base64");

  const res = await fetch(GITHUB_CONTENTS_URL, {
    method: "PUT",
    headers: {
      ...githubHeaders(token),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      content,
      branch: GITHUB_BRANCH,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub write failed: ${res.status} — ${err}`);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const token = process.env.GITHUB_TOKEN;

  // ── GET — fetch all features ──────────────────────────────────────────────
  if (req.method === "GET") {
    if (!token) {
      res.status(200).json(readLocalFeatures());
      return;
    }
    try {
      const { features } = await readFeatures(token);
      res.status(200).json(features);
    } catch {
      res.status(502).json({ error: "Failed to load features" });
    }
    return;
  }

  // ── POST — add a new feature ──────────────────────────────────────────────
  if (req.method === "POST") {
    if (!token) {
      res.status(503).json({ error: "GitHub persistence is not configured" });
      return;
    }

    const parseResult = featureInputSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({ error: "Invalid feature data" });
      return;
    }

    const {
      nameEn,
      nameRu,
      descriptionEn,
      descriptionRu,
      major,
      minor,
      patch,
    } = parseResult.data;
    const version = `${major}.${minor}.${patch}`;
    const feature: Feature = {
      id: randomUUID(),
      nameEn,
      nameRu,
      descriptionEn,
      descriptionRu,
      version,
      status: "in-progress",
      notes: "",
    };

    try {
      const { sha, features } = await readFeatures(token);
      await writeFeatures(
        token,
        [...features, feature],
        sha,
        `feat(tmp): add "${nameEn}" v${version}`,
      );
      res.status(201).json(feature);
    } catch {
      res.status(502).json({ error: "Failed to save feature" });
    }
    return;
  }

  // ── PATCH — toggle status ─────────────────────────────────────────────────
  if (req.method === "PATCH") {
    if (!token) {
      res.status(503).json({ error: "GitHub persistence is not configured" });
      return;
    }

    const parseResult = patchSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({ error: "Invalid patch data" });
      return;
    }

    const { id, status, doneAt } = parseResult.data;

    try {
      const { sha, features } = await readFeatures(token);
      const updated = features.map((f) => {
        if (f.id !== id) return f;
        const next: Feature = { ...f, status };
        if (doneAt) {
          next.doneAt = doneAt;
        } else {
          delete next.doneAt;
        }
        return next;
      });
      await writeFeatures(
        token,
        updated,
        sha,
        `chore(tmp): set ${id} → ${status}`,
      );
      res.status(200).json({ ok: true });
    } catch {
      res.status(502).json({ error: "Failed to update status" });
    }
    return;
  }

  // ── PUT — save markdown notes ─────────────────────────────────────────────
  if (req.method === "PUT") {
    if (!token) {
      res.status(503).json({ error: "GitHub persistence is not configured" });
      return;
    }

    const parseResult = notesSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({ error: "Invalid notes data" });
      return;
    }

    const { id, notes } = parseResult.data;

    try {
      const { sha, features } = await readFeatures(token);
      const updated = features.map((f) => (f.id === id ? { ...f, notes } : f));
      await writeFeatures(
        token,
        updated,
        sha,
        `docs(tmp): update notes for ${id}`,
      );
      res.status(200).json({ ok: true });
    } catch {
      res.status(502).json({ error: "Failed to save notes" });
    }
    return;
  }

  // ── DELETE — remove a feature ─────────────────────────────────────────────
  if (req.method === "DELETE") {
    if (!token) {
      res.status(503).json({ error: "GitHub persistence is not configured" });
      return;
    }

    const parseResult = deleteSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({ error: "Invalid delete data" });
      return;
    }

    const { id } = parseResult.data;

    try {
      const { sha, features } = await readFeatures(token);
      const updated = features.filter((f) => f.id !== id);
      await writeFeatures(
        token,
        updated,
        sha,
        `chore(tmp): delete feature ${id}`,
      );
      res.status(200).json({ ok: true });
    } catch {
      res.status(502).json({ error: "Failed to delete feature" });
    }
    return;
  }

  res.setHeader("Allow", "GET, POST, PATCH, PUT, DELETE");
  res.status(405).json({ error: "Method not allowed" });
}
