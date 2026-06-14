import type { IncomingMessage, ServerResponse } from "http";
import { randomUUID } from "crypto";
import { z } from "zod";

// Minimal local stand-ins for @vercel/node's request/response types,
// avoiding that package's heavy (and currently vulnerable) build-tooling deps.
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
  name: string;
  version: string;
  description: string;
}

const GITHUB_REPO = "GR0UD/portfolio";
const GITHUB_BRANCH = "main";
const GITHUB_DATA_PATH = "data/tmp-features.json";
const GITHUB_CONTENTS_URL = `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_DATA_PATH}`;

const featureInputSchema = z.object({
  name: z.string().trim().min(1).max(80),
  description: z.string().trim().min(1).max(500),
  major: z.number().int().min(0).max(999),
  minor: z.number().int().min(0).max(999),
  patch: z.number().int().min(0).max(999),
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
    return { sha: null, features: [] };
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
    throw new Error(`GitHub write failed: ${res.status}`);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const token = process.env.GITHUB_TOKEN;

  if (req.method === "GET") {
    if (!token) {
      res.status(200).json([]);
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

    const { name, description, major, minor, patch } = parseResult.data;
    const version = `${major}.${minor}.${patch}`;
    const feature: Feature = { id: randomUUID(), name, version, description };

    try {
      const { sha, features } = await readFeatures(token);
      await writeFeatures(
        token,
        [...features, feature],
        sha,
        `feat(tmp): add "${name}" v${version}`,
      );
      res.status(201).json(feature);
    } catch {
      res.status(502).json({ error: "Failed to save feature" });
    }
    return;
  }

  res.setHeader("Allow", "GET, POST");
  res.status(405).json({ error: "Method not allowed" });
}
