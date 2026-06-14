import styles from "./FeatureCard.module.scss";
import type { Feature } from "../types";
import type { TmpLang } from "../i18n";

interface Props {
  feature: Feature;
  lang: TmpLang;
  layout: "cards" | "list";
  onOpenNotes: (feature: Feature) => void;
}

const FeatureCard = ({ feature, lang, layout, onOpenNotes }: Props) => {
  const isDone = feature.status === "done";
  const name =
    lang === "ru" ? feature.nameRu || feature.nameEn : feature.nameEn;
  const description =
    lang === "ru"
      ? feature.descriptionRu || feature.descriptionEn
      : feature.descriptionEn;
  const doneDate =
    isDone && feature.doneAt
      ? new Date(feature.doneAt).toLocaleDateString(
          lang === "ru" ? "ru-RU" : "en-US",
          { year: "numeric", month: "short", day: "numeric" },
        )
      : null;

  return (
    <div
      className={[
        styles.card,
        isDone ? styles.done : "",
        layout === "list" ? styles.listItem : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <button
        type="button"
        className={styles.cardMain}
        onClick={() => onOpenNotes(feature)}
      >
        <header className={styles.header}>
          <h3 className={styles.title}>{name}</h3>
          <span className={styles.version}>v{feature.version}</span>
        </header>
        {description && <p className={styles.description}>{description}</p>}
        {doneDate && <span className={styles.doneDate}>{doneDate}</span>}
      </button>
    </div>
  );
};

export default FeatureCard;
