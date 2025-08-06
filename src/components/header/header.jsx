import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href='/' className={styles.logo}>
          Mark Galkins
        </a>
        <nav>
          <ul className={styles.navLinks}>
            <li>
              <a href='#hero'>Home</a>
            </li>
            <li>
              <a href='#about'>About</a>
            </li>
            <li>
              <a href='#projects'>Projects</a>
            </li>
            <li>
              <a href='#contact'>Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
