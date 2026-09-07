import { ArrowUpRight, Link2  } from "lucide-react";
import styles from "./gothic.module.css";

interface ProjectsProps {
  data: any;
}

export default function Projects({ data }: ProjectsProps) {
  const projects = Array.isArray(data?.projects) ? data.projects : [];

  return (
    <section id="projects" className={`${styles.page} ${styles.section} ${styles.projectSection}`}>
      <div className={styles.sectionHeader}>
        <div>
          <span className={`${styles.kicker} ${styles.kickerLeft}`}>
            Selected Work
          </span>
          <h2 className={styles.heading}>Projects</h2>
        </div>

        <span className={styles.headerCode}>
          INDEX / {String(projects.length).padStart(2, "0")}
        </span>
      </div>

      {projects.length === 0 ? (
        <div className={`${styles.frame} ${styles.empty}`}>
          No projects have been published yet.
        </div>
      ) : (
        <div className={styles.projectViewport}>
          <div className={styles.projectTrack}>
            {projects.map((project: any, index: number) => (
              <article key={project?.id || index} className={styles.projectCard}>
                <div className={styles.projectImageWrap}>
                  {project?.cover_image ? (
                    <img
                      src={project.cover_image}
                      alt={project?.title || "Project"}
                      className={styles.projectImage}
                    />
                  ) : (
                    <div className={styles.empty}>No image</div>
                  )}

                  <span className={styles.projectIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.projectImageLabel}>PROJECT</span>
                </div>

                <div className={styles.projectBody}>
                  <h3 className={styles.projectTitle}>
                    {project?.title || "Untitled project"}
                  </h3>

                  <p className={styles.projectDescription}>
                    {project?.description || "No description available."}
                  </p>

                  <div className={styles.projectLinks}>
                    {project?.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.projectLink}
                      >
                        <Link2  size={11} />
                        Source
                      </a>
                    )}

                    {project?.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.projectLink}
                      >
                        <ArrowUpRight size={11} />
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
