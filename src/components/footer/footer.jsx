import styles from "./Footer.module.scss";
import { Icons } from "../../utilities/icons.js";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className={styles.footer}>
      <img
        className={styles.dividerTop}
        src="/images/divider-top.png"
        alt="section divider"
      />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h4>Contact</h4>
            <ul className={styles.contactList}>
              <li className={styles.listItem}>
                <Icons.location className={styles.techIcon} />
                <span className={styles.contactText}>
                  <a
                    href="https://maps.app.goo.gl/16F1sxvxtQNWUTKv7"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Kolding, Denmark
                  </a>
                </span>
              </li>
              <li className={styles.listItem}>
                <Icons.email className={styles.techIcon} />
                <span className={styles.contactText}>
                  <a href="mailto:marksgalkins@gmail.com">
                    marksgalkins@gmail.com
                  </a>
                </span>
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4>Navigation</h4>
            <ul className={styles.links}>
              <li>
                <a href="#hero">Home</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#projects">Projects</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4>Connect</h4>
            <ul className={styles.socialLinks}>
              <li className="github">
                <a
                  href="https://github.com/GR0UD"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Icons.github />
                </a>
              </li>
              <li className="linkedin">
                <a
                  href="https://www.linkedin.com/in/markgalkin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Icons.linkedin />
                </a>
              </li>
              <li className="codepen">
                <a
                  href="https://codepen.io/GROUD-the-solid"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="CodePen"
                >
                  <Icons.codepen />
                </a>
              </li>
              <li className="devto">
                <a
                  href="https://dev.to/gr0ud"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Dev.to"
                >
                  <Icons.devto />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.bottom}>
          <p>&copy; {currentYear} Mark Galkins. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
