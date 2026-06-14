import {
  useRef,
  useState,
  type ChangeEvent,
  type ClipboardEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { z } from "zod";
import styles from "./PinGate.module.scss";
import type { TmpTranslationKey } from "../i18n";

const TMP_PIN = import.meta.env.VITE_TMP_PIN || "140626";
const STORAGE_KEY = "tmp-unlocked";
const PIN_LENGTH = 6;

const pinSchema = z.string().regex(/^\d{6}$/);

interface Props {
  t: (key: TmpTranslationKey) => string;
  onUnlock: () => void;
}

const PinGate = ({ t, onUnlock }: Props) => {
  const [digits, setDigits] = useState<string[]>(() =>
    Array(PIN_LENGTH).fill(""),
  );
  const [error, setError] = useState<string | null>(null);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const focusInput = (index: number) => {
    inputsRef.current[index]?.focus();
  };

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const digit = e.target.value.replace(/\D/g, "").slice(-1);
    setError(null);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
    if (digit && index < PIN_LENGTH - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      focusInput(index - 1);
    } else if (e.key === "ArrowLeft" && index > 0) {
      focusInput(index - 1);
    } else if (e.key === "ArrowRight" && index < PIN_LENGTH - 1) {
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, PIN_LENGTH);
    if (!pasted) return;

    const next = Array(PIN_LENGTH).fill("");
    for (let i = 0; i < pasted.length; i++) {
      next[i] = pasted[i];
    }
    setDigits(next);
    setError(null);
    focusInput(Math.min(pasted.length, PIN_LENGTH - 1));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const value = digits.join("");
    const parsed = pinSchema.safeParse(value);
    if (!parsed.success) {
      setError(t("pinErrorFormat"));
      return;
    }

    if (parsed.data !== TMP_PIN) {
      setError(t("pinErrorWrong"));
      setDigits(Array(PIN_LENGTH).fill(""));
      focusInput(0);
      return;
    }

    localStorage.setItem(STORAGE_KEY, "true");
    onUnlock();
  };

  return (
    <div className={styles.gate}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2>{t("pinTitle")}</h2>
        <p>{t("pinDescription")}</p>
        <div className={styles.digits} onPaste={handlePaste}>
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              autoComplete="off"
              autoFocus={index === 0}
              value={digit}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onFocus={(e) => e.target.select()}
              className={styles.digit}
              aria-label={`PIN digit ${index + 1}`}
            />
          ))}
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.submit}>
          {t("pinSubmit")}
        </button>
      </form>
    </div>
  );
};

export default PinGate;
