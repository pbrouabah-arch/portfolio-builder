import { Zap } from "lucide-react";
import styles from "./gothic.module.css";

interface SkillsProps {
  data: any;
}

export default function Skills({ data }: SkillsProps) {
  const skills = Array.isArray(data?.skills) ? data.skills : [];

  return (
    <section id="skills" className={`${styles.page} ${styles.section}`}>
      <div className={styles.sectionHeader}>
        <div>
          <span className={`${styles.kicker} ${styles.kickerLeft}`}>
            Capabilities
          </span>
          <h2 className={styles.heading}>Skills</h2>
        </div>

        <span className={styles.headerCode}>
          SYS_{String(skills.length).padStart(2, "0")}
        </span>
      </div>

      {skills.length === 0 ? (
        <div className={`${styles.frame} ${styles.empty}`}>
          No skills have been published yet.
        </div>
      ) : (
        <div className={styles.skillsGrid}>
          {skills.map((skill: any, index: number) => {
            const level = Math.min(
              100,
              Math.max(0, Number(skill?.level) || 0)
            );

            return (
              <div key={skill?.id || index} className={styles.skill}>
                <div>
                  <span className={styles.skillName}>
                    <Zap size={10} style={{ marginRight: 5, verticalAlign: "middle" }} />
                    {skill?.name || "Skill"}
                  </span>
                  {skill?.category && (
                    <span className={styles.skillCategory}>{skill.category}</span>
                  )}
                </div>

                <div className={styles.meter} aria-label={`${level}%`}>
                  <div
                    className={styles.meterFill}
                    style={{ width: `${level}%` }}
                  />
                </div>

                <span className={styles.skillLevel}>
                  {skill?.level != null ? `${skill.level}%` : "—"}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
