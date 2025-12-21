import { useState, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";
import styles from "./ScrollDownButton.module.scss";

const ScrollDownButton = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero");
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrollThreshold = heroHeight / 2;
        setIsVisible(window.scrollY < scrollThreshold);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollClick = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      const offset = window.innerWidth > 768 ? 100 : 0;
      const targetPosition =
        aboutSection.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <button
      className={`${styles.button} ${
        isVisible ? styles.visible : styles.hidden
      }`}
      onClick={handleScrollClick}
      aria-label="Scroll to about section"
      title="Scroll to about"
    >
      <IoChevronDown className={styles.icon} />
    </button>
  );
};

export default ScrollDownButton;
