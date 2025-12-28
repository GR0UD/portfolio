import styles from "./ProjectCard.module.scss";
import type { ProjectCardProps } from "../../types";

const ProjectCard = ({ title, url, image, description, tags }: ProjectCardProps) => {
  return (
    <article className={styles.card}>
      <a
        href={url}
        className={styles.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={image} alt={title} className={styles.image} />
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </a>
    </article>
  );
};

export default ProjectCard;

