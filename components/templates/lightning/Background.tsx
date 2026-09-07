import Image from "next/image";
import styles from "./gothic.module.css";

export default function Background() {
  return (
    <div className={styles.background} aria-hidden="true">
      <Image
        src="/assets/clouds-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.backgroundImage}
      />
      <div className={styles.backgroundOverlay} />
      <div className={styles.backgroundStorm} />
      <div className={styles.backgroundGlow} />
      <span className={`${styles.backgroundLightning} ${styles.bgBoltOne}`}>ϟ</span>
      <span className={`${styles.backgroundLightning} ${styles.bgBoltTwo}`}>ϟ</span>
    </div>
  );
}
