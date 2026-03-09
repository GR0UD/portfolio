import styles from "./Footer.module.scss";
import { Icons } from "../../utilities/useIcons";

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
                <Icons.email className={styles.techIcon} />
                <span className={styles.contactText}>
                  <a href="mailto:marksgalkins@gmail.com?subject=Hello%20from%20website&body=Hi%20Mark%2C%0D%0A%0D%0AI%20wanted%20to%20ask%20about...">
                    Email
                  </a>
                </span>
              </li>

              <li className={styles.listItem}>
                <Icons.discord className={styles.techIcon} />
                <span className={styles.contactText}>
                  <a
                    href="https://discord.com/users/1019690788709470328"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Discord
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
      </div>
      <div className={styles.bottom}>
        <p>
          &copy; {currentYear}{" "}
          <a
            href="https://github.com/GR0UD"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.nameLink}
          >
            Mark Galkins
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
