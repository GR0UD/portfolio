import { useEffect, useState, type FormEvent } from "react";
import { FaXmark } from "react-icons/fa6";
import { z } from "zod";
import styles from "./AddFeatureModal.module.scss";
import type { FeatureInput } from "../types";
import type { TmpTranslationKey } from "../i18n";

const featureSchema = z.object({
  nameEn: z.string().trim().min(1).max(80),
  nameRu: z.string().trim().max(80),
  descriptionEn: z.string().trim().min(1).max(500),
  descriptionRu: z.string().trim().max(500),
  major: z.number().int().min(0).max(999),
  minor: z.number().int().min(0).max(999),
  patch: z.number().int().min(0).max(999),
});

interface Props {
  t: (key: TmpTranslationKey) => string;
  onClose: () => void;
  onSubmit: (input: FeatureInput) => void;
}

const AddFeatureModal = ({ t, onClose, onSubmit }: Props) => {
  const [formLang, setFormLang] = useState<"en" | "ru">("en");
  const [nameEn, setNameEn] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionRu, setDescriptionRu] = useState("");
  const [major, setMajor] = useState("0");
  const [minor, setMinor] = useState("0");
  const [patch, setPatch] = useState("0");
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const parsed = featureSchema.safeParse({
      nameEn,
      nameRu,
      descriptionEn,
      descriptionRu,
      major: Number(major),
      minor: Number(minor),
      patch: Number(patch),
    });

    if (!parsed.success) {
      const fieldErrors: Record<string, boolean> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string") fieldErrors[field] = true;
      }
      setErrors(fieldErrors);
      return;
    }

    onSubmit(parsed.data);
  };

  const hasVersionError = errors.major || errors.minor || errors.patch;
  const hasEnError = errors.nameEn || errors.descriptionEn;
  const hasRuError = errors.nameRu || errors.descriptionRu;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.title}>{t("modalTitle")}</h2>
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label={t("closeModal")}
          >
            <FaXmark />
          </button>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.langSwitch} role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={formLang === "en"}
              className={[
                styles.langSwitchBtn,
                formLang === "en" ? styles.active : "",
                hasEnError ? styles.hasError : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setFormLang("en")}
            >
              EN
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={formLang === "ru"}
              className={[
                styles.langSwitchBtn,
                formLang === "ru" ? styles.active : "",
                hasRuError ? styles.hasError : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setFormLang("ru")}
            >
              RU
            </button>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>{t("featureNameLabel")}</span>
            {formLang === "en" ? (
              <input
                type="text"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="e.g. Mini Player"
                className={`${styles.input} ${errors.nameEn ? styles.invalid : ""}`}
                maxLength={80}
              />
            ) : (
              <input
                type="text"
                value={nameRu}
                onChange={(e) => setNameRu(e.target.value)}
                placeholder="напр. Мини-плеер"
                className={`${styles.input} ${errors.nameRu ? styles.invalid : ""}`}
                maxLength={80}
              />
            )}
          </div>

          <div className={styles.field}>
            <span className={styles.label}>{t("descriptionLabel")}</span>
            {formLang === "en" ? (
              <textarea
                value={descriptionEn}
                onChange={(e) => setDescriptionEn(e.target.value)}
                placeholder="Describe what this feature does..."
                className={`${styles.textarea} ${errors.descriptionEn ? styles.invalid : ""}`}
                maxLength={500}
                rows={3}
              />
            ) : (
              <textarea
                value={descriptionRu}
                onChange={(e) => setDescriptionRu(e.target.value)}
                placeholder="Опишите, что делает эта функция..."
                className={`${styles.textarea} ${errors.descriptionRu ? styles.invalid : ""}`}
                maxLength={500}
                rows={3}
              />
            )}
          </div>

          <div className={styles.field}>
            <span className={styles.label}>{t("versionLabel")}</span>
            <div
              className={`${styles.version} ${hasVersionError ? styles.invalid : ""}`}
            >
              <input
                type="number"
                min={0}
                max={999}
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                className={styles.versionInput}
                aria-label="major"
              />
              <span className={styles.dot}>.</span>
              <input
                type="number"
                min={0}
                max={999}
                value={minor}
                onChange={(e) => setMinor(e.target.value)}
                className={styles.versionInput}
                aria-label="minor"
              />
              <span className={styles.dot}>.</span>
              <input
                type="number"
                min={0}
                max={999}
                value={patch}
                onChange={(e) => setPatch(e.target.value)}
                className={styles.versionInput}
                aria-label="patch"
              />
            </div>
          </div>

          <button type="submit" className={styles.create}>
            {t("create")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFeatureModal;
