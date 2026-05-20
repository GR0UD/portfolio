import { useState, useEffect, useRef } from "react";
import { PiTranslateThin } from "react-icons/pi";
import styles from "./Header.module.scss";

type SectionId = "hero" | "about" | "projects" | "contact" | "footer";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "da", label: "Dansk" },
  { code: "de", label: "Deutsch" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState<SectionId>("hero");
  const [langOpen, setLangOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("en");
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections: SectionId[] = [
        "hero",
        "about",
        "projects",
        "contact",
        "footer",
      ];
      const headerHeight = 107;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (!section) continue;
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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLangSelect = (code: string) => {
    setActiveLang(code);
    setLangOpen(false);
    const w = window as any;
    if (code === "en") {
      w.resetTranslation?.("en");
    } else {
      w.translate?.(code);
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const isDarkSection =
    currentSection === "about" || currentSection === "contact";

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div
        className={`${styles.container} ${isScrolled ? styles.scrolled : ""}`}
      >
        <a
          href="/"
          className={`${styles.logo} ${isScrolled ? styles.scrolled : ""} ${
            isDarkSection ? styles.onDark : ""
          }`}
          onClick={closeMenu}
        >
          <img src="/logo.avif" alt="Logo" className={styles.logoImage} />
        </a>
        <div className={styles.navGroup}>
          {/* Language picker */}
          <div
            ref={langRef}
            className={`${styles.langWrapper} ${isScrolled ? styles.scrolled : ""} ${isDarkSection ? styles.onDark : ""} ${langOpen ? styles.dropdownActive : ""}`}
          >
            <button
              className={styles.langBtn}
              onClick={() => setLangOpen((o) => !o)}
              aria-label="Select language"
              aria-expanded={langOpen}
            >
              <PiTranslateThin className={styles.langIcon} />
            </button>
            {langOpen && (
              <ul className={styles.langDropdown}>
                {LANGUAGES.map(({ code, label }) => (
                  <li key={code}>
                    <button
                      className={`${styles.langOption} ${activeLang === code ? styles.langActive : ""}`}
                      onClick={() => handleLangSelect(code)}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

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
          <div className={`${styles.navLangTags} ${menuOpen ? styles.navOpen : ""}`}>
            {LANGUAGES.slice(0, 3).map(({ code, label }) => (
              <button
                key={code}
                className={`${styles.navLangTag} ${activeLang === code ? styles.langActive : ""}`}
                onClick={() => handleLangSelect(code)}
              >
                {label}
              </button>
            ))}
          </div>
        </nav>
        </div>

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
