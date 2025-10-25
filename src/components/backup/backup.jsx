import { useState, useEffect } from "react";
import { IoChevronUp } from "react-icons/io5";
import styles from "./backup.module.scss";

export default function BackupScroll() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      className={`${styles.backupButton} ${isVisible ? styles.visible : ""}`}
      onClick={scrollToTop}
      title="Scroll to top"
    >
      <IoChevronUp className={styles.icon} />
    </button>
  );
}
