import { FaCheck } from "react-icons/fa";
import styles from "./FeatureCard.module.scss";
import type { Feature } from "../types";
import type { TmpLang, TmpTranslationKey } from "../i18n";

interface Props {
  feature: Feature;
  lang: TmpLang;
  t: (key: TmpTranslationKey) => string;
  onToggle: (id: string) => void;
}

const FeatureCard = ({ feature, lang, t, onToggle }: Props) => {
  const isDone = feature.status === "done";
  const name =
    lang === "ru" ? feature.nameRu || feature.nameEn : feature.nameEn;
  const description =
    lang === "ru"
      ? feature.descriptionRu || feature.descriptionEn
      : feature.descriptionEn;

  return (
    <button
      type="button"
      className={`${styles.card} ${isDone ? styles.done : ""}`}
      onClick={() => onToggle(feature.id)}
      aria-pressed={isDone}
      aria-label={isDone ? t("markInProgress") : t("markDone")}
    >
      <header className={styles.header}>
        <span className={styles.check} aria-hidden="true">
          <FaCheck />
        </span>
        <h3 className={styles.title}>{name}</h3>
        <span className={styles.version}>v{feature.version}</span>
      </header>
      <p className={styles.description}>{description}</p>
    </button>
  );
};

export default FeatureCard;
