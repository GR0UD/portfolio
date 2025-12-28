import styles from "./Intro.module.scss";

const Intro = () => {
  return (
    <section className={styles.intro}>
      <div className={styles.container}>
        <h1>
          <span className={styles.name}>Mark</span>
          <span className={styles.name}>Galkin</span>
          <span className={styles.portfolio}>Portfolio</span>
        </h1>
      </div>
    </section>
  );
};

export default Intro;

