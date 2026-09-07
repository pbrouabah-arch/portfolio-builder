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
      <div className={styles.backgroundGlow} />
    </div>
  );
}
