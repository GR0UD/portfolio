import { useEffect, useRef, useState } from "react";
import { FaPlus, FaTableCells, FaBars } from "react-icons/fa6";
import styles from "./TMP.module.scss";
import PinGate from "./components/PinGate";
import FeatureCard from "./components/FeatureCard";
import AddFeatureModal from "./components/AddFeatureModal";
import MarkdownPanel from "./components/MarkdownPanel";
import { useTmpLang } from "./i18n";
import { useTmpFeatures } from "./useTmpFeatures";
import type { Feature, FeatureStatus, LayoutMode } from "./types";

const UNLOCK_KEY = "tmp-unlocked";
const LAYOUT_KEY = "tmp-layout";

export default function TmpPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { lang, setLang, t } = useTmpLang();
  const { features, addFeature, toggleStatus, updateNotes, deleteFeature } =
    useTmpFeatures(t);
  const [filter, setFilter] = useState<FeatureStatus>("in-progress");
  const [layout, setLayout] = useState<LayoutMode>(
    () => (localStorage.getItem(LAYOUT_KEY) as LayoutMode | null) ?? "cards",
  );
  const [unlocked, setUnlocked] = useState(
    () => localStorage.getItem(UNLOCK_KEY) === "true",
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [activeNote, setActiveNote] = useState<Feature | null>(null);

  const switchLayout = (mode: LayoutMode) => {
    setLayout(mode);
    localStorage.setItem(LAYOUT_KEY, mode);
  };

  const openNotes = (feature: Feature) => {
    setActiveNote(feature);
  };

  const closeNotes = () => {
    setActiveNote(null);
  };

  const handleSaveNotes = async (id: string, notes: string) => {
    await updateNotes(id, notes);
    // Keep panel open but refresh the activeNote so the preview updates
    setActiveNote((prev) => (prev?.id === id ? { ...prev, notes } : prev));
  };

  const handleDeleteFeature = async (id: string) => {
    setActiveNote((prev) => (prev?.id === id ? null : prev));
    await deleteFeature(id);
  };

  // Force video play on mount (iOS fix)
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        const playOnInteraction = () => {
          video.play();
          document.removeEventListener("touchstart", playOnInteraction);
          document.removeEventListener("click", playOnInteraction);
        };
        document.addEventListener("touchstart", playOnInteraction, {
          once: true,
        });
        document.addEventListener("click", playOnInteraction, {
          once: true,
        });
      });
    }
  }, []);

  const inProgressCount = features.filter(
    (f) => f.status === "in-progress",
  ).length;
  const doneCount = features.filter((f) => f.status === "done").length;
  const visible = features.filter((f) => f.status === filter);

  // Keep active note in sync with feature updates
  const syncedActiveNote = activeNote
    ? (features.find((f) => f.id === activeNote.id) ?? activeNote)
    : null;

  return (
    <div className={styles.page}>
      <video
        ref={videoRef}
        className={styles.video}
        src="/video/hero.webm"
        poster="/video/hero.avif"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        controls={false}
      />
      <div className={styles.canvas} />

      {!unlocked && <PinGate t={t} onUnlock={() => setUnlocked(true)} />}

      {unlocked && (
        <div className={styles.shell}>
          <div className={styles.content}>
            <header className={styles.header}>
              <div className={styles.tabs} role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={filter === "in-progress"}
                  className={`${styles.tab} ${filter === "in-progress" ? styles.active : ""}`}
                  onClick={() => setFilter("in-progress")}
                >
                  {t("inProgress")}
                  <span className={styles.tabCount}>{inProgressCount}</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={filter === "done"}
                  className={`${styles.tab} ${filter === "done" ? styles.active : ""}`}
                  onClick={() => setFilter("done")}
                >
                  {t("done")}
                  <span className={styles.tabCount}>{doneCount}</span>
                </button>
              </div>

              <div className={styles.actions}>
                <div
                  className={styles.layoutToggle}
                  role="group"
                  aria-label="Layout"
                >
                  <button
                    type="button"
                    className={`${styles.layoutBtn} ${layout === "cards" ? styles.active : ""}`}
                    onClick={() => switchLayout("cards")}
                    aria-label="Card layout"
                    title="Cards"
                  >
                    <FaTableCells />
                  </button>
                  <button
                    type="button"
                    className={`${styles.layoutBtn} ${layout === "list" ? styles.active : ""}`}
                    onClick={() => switchLayout("list")}
                    aria-label="List layout"
                    title="List"
                  >
                    <FaBars />
                  </button>
                </div>
                <button
                  type="button"
                  className={styles.iconButton}
                  onClick={() => setLang(lang === "en" ? "ru" : "en")}
                >
                  {lang === "en" ? "RU" : "EN"}
                </button>
                <button
                  type="button"
                  className={styles.addButton}
                  onClick={() => setModalOpen(true)}
                  aria-label={t("addFeature")}
                >
                  <FaPlus />
                </button>
              </div>
            </header>

            <div className={layout === "cards" ? styles.grid : styles.list}>
              {visible.length === 0 ? (
                <p className={styles.empty}>
                  {filter === "done" ? t("emptyDone") : t("emptyState")}
                </p>
              ) : (
                visible.map((feature) => (
                  <FeatureCard
                    key={feature.id}
                    feature={feature}
                    lang={lang}
                    layout={layout}
                    onOpenNotes={openNotes}
                  />
                ))
              )}
            </div>
          </div>

          {syncedActiveNote && (
            <div className={styles.markdownPanel}>
              <MarkdownPanel
                feature={syncedActiveNote}
                lang={lang}
                onClose={closeNotes}
                onSave={handleSaveNotes}
                onDelete={handleDeleteFeature}
                onToggle={toggleStatus}
              />
            </div>
          )}
        </div>
      )}

      {modalOpen && (
        <AddFeatureModal
          t={t}
          onClose={() => setModalOpen(false)}
          onSubmit={(input) => {
            addFeature(input);
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
