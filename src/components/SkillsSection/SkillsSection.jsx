import { skillsData } from "../../data/skills.js";
import styles from "./SkillsSection.module.scss";

const SkillLink = ({ icon: Icon, name, url, color }) => (
  <li>
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.skillLink}
      style={{ "--skill-color": color }}
    >
      <Icon className={styles.icon} /> {name}
    </a>
  </li>
);

const SkillColumn = ({ title, skills }) => (
  <div className={styles.column}>
    <h4>{title}</h4>
    <ul>
      {skills.map((skill) => (
        <SkillLink key={skill.name} {...skill} />
      ))}
    </ul>
  </div>
);

const SkillsSection = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.columns}>
        <SkillColumn title="Development" skills={skillsData.development} />
        <SkillColumn title="Front-End / Styling" skills={skillsData.frontend} />
        <SkillColumn title="Backend / Tooling" skills={skillsData.backend} />
        <SkillColumn title="CMS / Dev Tools" skills={skillsData.tools} />
      </div>
    </div>
  );
};

export default SkillsSection;
