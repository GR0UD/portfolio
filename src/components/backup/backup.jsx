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

      // Get button's position (bottom right corner where it's fixed)
      const buttonBottom = window.innerHeight - 16 - 37.5; // innerHeight - bottom offset - half button height

      // Check which section the button is overlapping
      const sections = ["hero", "about", "projects", "contact", "footer"];

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if button center is within this section
          if (buttonBottom >= rect.top && buttonBottom <= rect.bottom) {
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
