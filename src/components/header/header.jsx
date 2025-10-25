import { useState } from "react";
import styles from "./Header.module.scss";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="/" className={styles.logo} onClick={closeMenu}>
          <img src="/logo.png" alt="Logo" className={styles.logoImage} />
        </a>
        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
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
