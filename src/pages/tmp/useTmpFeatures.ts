import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { Feature, FeatureInput, FeatureStatus } from "./types";
import type { TmpTranslationKey } from "./i18n";

const API_URL = "/api/tmp-features";
const STATUS_KEY = "tmp-feature-status";

// Tolerate older/single-language records coming back from the API
type RawFeature = Partial<Feature> & {
  id: string;
  name?: string;
  description?: string;
};

function normalize(f: RawFeature, status: FeatureStatus): Feature {
  return {
    id: f.id,
    nameEn: f.nameEn ?? f.name ?? "",
    nameRu: f.nameRu ?? "",
    descriptionEn: f.descriptionEn ?? f.description ?? "",
    descriptionRu: f.descriptionRu ?? "",
    version: f.version ?? "0.0.0",
    status,
    notes: f.notes ?? "",
    doneAt: f.doneAt,
  };
}

function loadStatusMap(): Record<string, FeatureStatus> {
  try {
    return JSON.parse(localStorage.getItem(STATUS_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveStatus(id: string, status: FeatureStatus) {
  const map = loadStatusMap();
  map[id] = status;
  localStorage.setItem(STATUS_KEY, JSON.stringify(map));
}

export function useTmpFeatures(t: (key: TmpTranslationKey) => string) {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch(API_URL)
      .then((res) => (res.ok ? res.json() : []))
      .then((data: RawFeature[]) => {
        if (cancelled) return;
        const statusMap = loadStatusMap();
        const list = Array.isArray(data) ? data : [];
        setFeatures(
          list.map((f) =>
            normalize(f, statusMap[f.id] ?? f.status ?? "in-progress"),
          ),
        );
      })
      .catch(() => {
        if (!cancelled) setFeatures([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const addFeature = async (input: FeatureInput) => {
    const optimistic: Feature = {
      id: `local-${Date.now()}`,
      nameEn: input.nameEn,
      nameRu: input.nameRu,
      descriptionEn: input.descriptionEn,
      descriptionRu: input.descriptionRu,
      version: `${input.major}.${input.minor}.${input.patch}`,
      status: "in-progress",
      notes: "",
    };

    setFeatures((prev) => [...prev, optimistic]);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!res.ok) throw new Error("save failed");

      const saved: RawFeature = await res.json();
      setFeatures((prev) =>
        prev.map((f) =>
          f.id === optimistic.id ? normalize(saved, "in-progress") : f,
        ),
      );
    } catch {
      toast.warn(t("saveError"), {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const toggleStatus = async (id: string) => {
    let nextStatus: FeatureStatus = "in-progress";
    let nextDoneAt: string | null = null;

    setFeatures((prev) =>
      prev.map((f) => {
        if (f.id !== id) return f;
        nextStatus = f.status === "done" ? "in-progress" : "done";
        nextDoneAt = nextStatus === "done" ? new Date().toISOString() : null;
        saveStatus(id, nextStatus);
        return { ...f, status: nextStatus, doneAt: nextDoneAt ?? undefined };
      }),
    );

    // Persist to GitHub (best-effort, local already updated)
    try {
      await fetch(API_URL, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: nextStatus, doneAt: nextDoneAt }),
      });
    } catch {
      // silent — local state is already updated
    }
  };

  const updateNotes = async (id: string, notes: string) => {
    // Optimistic local update
    setFeatures((prev) => prev.map((f) => (f.id === id ? { ...f, notes } : f)));

    try {
      const res = await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, notes }),
      });

      if (!res.ok) throw new Error("notes save failed");
    } catch {
      toast.warn(t("saveError"), {
        position: "bottom-right",
        autoClose: 5000,
      });
    }
  };

  const deleteFeature = async (id: string) => {
    setFeatures((prev) => prev.filter((f) => f.id !== id));

    try {
      const res = await fetch(API_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("delete failed");
    } catch {
      toast.warn(t("saveError"), {
        position: "bottom-right",
        autoClose: 5000,
      });
    }
  };

  return { features, loading, addFeature, toggleStatus, updateNotes, deleteFeature };
}
