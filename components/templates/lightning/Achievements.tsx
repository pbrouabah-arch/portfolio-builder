import { Award, ArrowUpRight } from "lucide-react";
import styles from "./gothic.module.css";

interface AchievementsProps { data: any; }

export default function Achievements({ data }: AchievementsProps) {
  const items = Array.isArray(data?.achievements) ? data.achievements : [];
  if (!items.length) return null;
  return (
    <section id="achievements" className={`${styles.page} ${styles.section}`}>
      <div className={styles.sectionHeader}>
        <div><span className={`${styles.kicker} ${styles.kickerLeft}`}>Recognition</span><h2 className={styles.heading}>Achievements</h2></div>
        <span className={styles.headerCode}>HONORS / {String(items.length).padStart(2, "0")}</span>
      </div>
      <div className={styles.achievementGrid}>
        {items.map((item: any, index: number) => (
          <article key={item?.id || index} className={`${styles.frame} ${styles.achievementCard}`}>
            <div className={styles.achievementIcon}><Award size={19} /></div>
            <div>
              <span className={styles.achievementIndex}>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item?.title || item?.name || "Achievement"}</h3>
              {(item?.organization || item?.issuer || item?.date) && <p>{[item?.organization || item?.issuer, item?.date].filter(Boolean).join(" · ")}</p>}
              {item?.description && <div className={styles.achievementDescription}>{item.description}</div>}
              {item?.url && <a href={item.url} target="_blank" rel="noreferrer" className={styles.achievementLink}>View <ArrowUpRight size={12} /></a>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
