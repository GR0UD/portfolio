import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import styles from "./ProjectCard.module.scss";
import type { ProjectCardProps } from "../../types";

const ProjectCard = ({
  title,
  url,
  github,
  image,
  description,
  tags,
}: ProjectCardProps) => {
  return (
    <article className={styles.card}>
      <div className={styles.body}>
        <img src={image} alt={title} className={styles.image} loading="lazy" />
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      {(url || github) && (
        <div className={styles.actions}>
          {url && (
            <a
              href={url}
              className={styles.actionBtn}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${title} website`}
            >
              <FaExternalLinkAlt />
            </a>
          )}
          {github && (
            <a
              href={github}
              className={styles.actionBtn}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${title} on GitHub`}
            >
              <FaGithub />
            </a>
          )}
        </div>
      )}
    </article>
  );
};

export default ProjectCard;
