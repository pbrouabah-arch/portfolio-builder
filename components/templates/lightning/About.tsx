import styles from "./gothic.module.css";

interface AboutProps {
  data: any;
}

export default function About({ data }: AboutProps) {
  return (
    <section id="about" className={`${styles.page} ${styles.section}`}>
      <div className={styles.aboutGrid}>
        <div>
          <span className={`${styles.kicker} ${styles.kickerLeft}`}>
            Profile
          </span>
          <h2 className={styles.aboutTitle}>
            Interfaces with <em>atmosphere.</em>
          </h2>
        </div>

        <div className={`${styles.frame} ${styles.aboutPanel}`}>
          <p className={styles.aboutText}>
            {data?.description ||
              data?.about ||
              "A creator of dark-themed, data-rich interfaces, blending gothic aesthetics with modern technology."}
          </p>

          <div className={styles.panelFooter}>
            <span>PROFILE.LOG</span>
            <span>READ_ONLY</span>
          </div>
        </div>
      </div>
    </section>
  );
}
