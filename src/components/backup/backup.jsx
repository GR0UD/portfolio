import { useState, useEffect } from "react";
import { IoChevronUp } from "react-icons/io5";
import styles from "./backup.module.scss";

export default function BackupScroll() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState("hero");

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

      const sections = ["hero", "about", "projects", "contact"];
      const headerHeight = 107;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= headerHeight) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDarkSection =
    currentSection === "about" || currentSection === "contact";

  return (
    <button
      className={`${styles.backupButton} ${isVisible ? styles.visible : ""} ${
        isDarkSection ? styles.onDark : ""
      }`}
      onClick={scrollToTop}
      title="Scroll to top"
    >
      <IoChevronUp className={styles.icon} />
    </button>
  );
}
