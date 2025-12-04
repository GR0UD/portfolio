import { useState, useEffect } from "react";
import styles from "./Header.module.scss";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

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

    handleScroll(); // Initial check
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Determine if current section has dark background
  const isDarkSection =
    currentSection === "about" || currentSection === "contact";

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <a
          href="/"
          className={`${styles.logo} ${isScrolled ? styles.scrolled : ""} ${
            isDarkSection ? styles.onDark : ""
          }`}
          onClick={closeMenu}
        >
          <img src="/logo.png" alt="Logo" className={styles.logoImage} />
        </a>
        <nav
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ""} ${
            isScrolled ? styles.scrolled : ""
          } ${isDarkSection ? styles.onDark : ""}`}
        >
          <ul
            className={`${styles.navLinks} ${menuOpen ? styles.navOpen : ""}`}
          >
            <li>
              <a href="#hero" onClick={closeMenu}>
                Home
              </a>
            </li>
            <li>
              <a href="#about" onClick={closeMenu}>
                About
              </a>
            </li>
            <li>
              <a href="#projects" onClick={closeMenu}>
                Projects
              </a>
            </li>
            <li>
              <a href="#contact" onClick={closeMenu}>
                Contact
              </a>
            </li>
          </ul>
        </nav>
        <button
          className={`${styles.hamburger} ${
            menuOpen ? styles.hamburgerOpen : ""
          } ${isScrolled && !menuOpen ? styles.scrolled : ""} ${
            isDarkSection && !menuOpen ? styles.onDark : ""
          }`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
