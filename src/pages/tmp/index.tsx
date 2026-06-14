import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import styles from "./TMP.module.scss";
import PinGate from "./components/PinGate";
import FeatureCard from "./components/FeatureCard";
import AddFeatureModal from "./components/AddFeatureModal";
import { useTmpLang } from "./i18n";
import { useTmpFeatures } from "./useTmpFeatures";
import type { FeatureStatus } from "./types";

const UNLOCK_KEY = "tmp-unlocked";

export default function TmpPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { lang, setLang, t } = useTmpLang();
  const { features, addFeature, toggleStatus } = useTmpFeatures(t);
  const [filter, setFilter] = useState<FeatureStatus>("in-progress");
  const [unlocked, setUnlocked] = useState(
    () => localStorage.getItem(UNLOCK_KEY) === "true",
  );
  const [modalOpen, setModalOpen] = useState(false);

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
        <div className={styles.content}>
          <header className={styles.header}>
            <h1 className={styles.title}>{t("pageTitle")}</h1>
            <div className={styles.actions}>
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

          <div className={styles.grid}>
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
                  t={t}
                  onToggle={toggleStatus}
                />
              ))
            )}
          </div>
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
