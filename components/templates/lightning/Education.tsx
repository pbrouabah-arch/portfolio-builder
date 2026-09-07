import { BookOpen, CalendarDays, MapPin } from "lucide-react";
import styles from "./gothic.module.css";

interface EducationProps { data: any; }

export default function Education({ data }: EducationProps) {
  const items = Array.isArray(data?.education) ? data.education : [];
  if (!items.length) return null;
  return (
    <section id="education" className={`${styles.page} ${styles.section}`}>
      <div className={styles.sectionHeader}>
        <div><span className={`${styles.kicker} ${styles.kickerLeft}`}>Academic Record</span><h2 className={styles.heading}>Education</h2></div>
        <span className={styles.headerCode}>STUDY / {String(items.length).padStart(2, "0")}</span>
      </div>
      <div className={styles.timelineList}>
        {items.map((item: any, index: number) => (
          <article key={item?.id || index} className={`${styles.frame} ${styles.timelineCard}`}>
            <div className={styles.timelineMark}><BookOpen size={15} /><span>{String(index + 1).padStart(2, "0")}</span></div>
            <div className={styles.timelineMain}>
              <h3>{item?.degree || item?.title || item?.field || "Education"}</h3>
              <p className={styles.timelineOrg}>{item?.school || item?.institution || item?.university || ""}</p>
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
