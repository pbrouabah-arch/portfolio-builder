import { Briefcase, CalendarDays, MapPin } from "lucide-react";
import styles from "./gothic.module.css";

interface ExperienceProps { data: any; }

export default function Experience({ data }: ExperienceProps) {
  const items = Array.isArray(data?.experience) ? data.experience : [];
  if (!items.length) return null;
  return (
    <section id="experience" className={`${styles.page} ${styles.section}`}>
      <div className={styles.sectionHeader}>
        <div><span className={`${styles.kicker} ${styles.kickerLeft}`}>Career Path</span><h2 className={styles.heading}>Experience</h2></div>
        <span className={styles.headerCode}>FIELD / {String(items.length).padStart(2, "0")}</span>
      </div>
      <div className={styles.timelineList}>
        {items.map((item: any, index: number) => (
          <article key={item?.id || index} className={`${styles.frame} ${styles.timelineCard}`}>
            <div className={styles.timelineMark}><Briefcase size={15} /><span>{String(index + 1).padStart(2, "0")}</span></div>
            <div className={styles.timelineMain}>
              <h3>{item?.title || item?.position || item?.role || "Experience"}</h3>
              <p className={styles.timelineOrg}>{item?.company || item?.organization || ""}</p>
              {item?.description && <p className={styles.timelineDescription}>{item.description}</p>}
            </div>
            <div className={styles.timelineMeta}>
              {(item?.start_date || item?.startDate || item?.end_date || item?.endDate) && <span><CalendarDays size={12} />{[item?.start_date || item?.startDate, item?.end_date || item?.endDate].filter(Boolean).join(" — ")}</span>}
              {(item?.city || item?.location) && <span><MapPin size={12} />{item?.city || item?.location}</span>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
