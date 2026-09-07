"use client";

import { useRef } from "react";
import { ArrowUpRight, Download, Zap } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Background from "./Background";
import { scriptFont } from "./fonts";
import styles from "./gothic.module.css";

interface HeroProps {
  data: any;
}

function safeArray(value: any) {
  return Array.isArray(value) ? value : [];
}

export default function Hero({ data }: HeroProps) {
  const container = useRef<HTMLDivElement>(null);
  const skills = safeArray(data?.skills);
  const stats = safeArray(data?.stats);

  useGSAP(
    () => {
      gsap.from(".gothic-hero-item", {
        opacity: 0,
        y: 20,
        stagger: 0.07,
        duration: 0.75,
        ease: "power3.out",
      });

      gsap.from(".gothic-portrait", {
        opacity: 0,
        scale: 0.94,
        duration: 1,
        delay: 0.12,
        ease: "power3.out",
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} id="home" className={styles.hero}>
      <Background />

      <div className={styles.heroTop}>
        <span className={`${styles.kicker} ${styles.kickerLeft} gothic-hero-item`}>
          <Zap size={11} />
          Digital Portfolio / 2026
        </span>

        <h1 className={`${styles.heroName} ${scriptFont.className} gothic-hero-item`}>
          {data?.name || "Abismo"}
        </h1>

        <p className={`${styles.heroRole} gothic-hero-item`}>
          {data?.role || "Gothic Interface Designer"}
        </p>
      </div>

      <div className={styles.heroContent}>
        <div className={`${styles.frame} ${styles.profileFrame} gothic-hero-item`}>
          <h2 className={styles.profileLabel}>
            <span>Profile</span>
          </h2>

          <p className={styles.profileText}>
            {data?.description ||
              "A creator of dark-themed, data-rich interfaces, blending gothic aesthetics with modern technology."}
          </p>

          {skills.length > 0 && (
            <div className={styles.miniSkills}>
              {skills.slice(0, 4).map((skill: any, index: number) => {
                const level = Math.min(100, Math.max(0, Number(skill?.level) || 0));

                return (
                  <div key={skill?.id || index} className={styles.miniSkill}>
                    <span className={styles.miniSkillName}>{skill?.name || "Skill"}</span>
                    <span className={styles.miniSkillBar}>
                      <span
                        className={styles.miniSkillFill}
                        style={{ display: "block", width: `${level}%` }}
                      />
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          <div className={styles.heroActions}>
            <a href="#projects" className={styles.primaryButton}>
              Explore Work
              <ArrowUpRight size={13} />
            </a>

            {data?.cv && (
              <a href={data.cv} target="_blank" rel="noreferrer" className={styles.secondaryButton}>
                <Download size={13} />
                CV
              </a>
            )}
          </div>

          <div className={styles.heroMeta}>
            <span>Based in</span>
            <strong>{[data?.city, data?.country].filter(Boolean).join(", ") || "—"}</strong>
            <span className={styles.metaLine} />
            <span>Available</span>
            <strong>For selected work</strong>
          </div>
        </div>
      </div>

      <div className={`${styles.heroVisual} gothic-portrait`}>
        <div className={styles.lightningAura} />
        <div className={styles.portraitGlow} />
        <span className={`${styles.lightningBolt} ${styles.boltOne}`}>ϟ</span>
        <span className={`${styles.lightningBolt} ${styles.boltTwo}`}>ϟ</span>
        <span className={`${styles.lightningBolt} ${styles.boltThree}`}>ϟ</span>

        <div className={styles.portraitFrame}>
          {data?.image ? (
            <img
              src={data.image}
              alt={data?.name || "Profile portrait"}
              className={styles.portrait}
            />
          ) : (
            <div className={styles.portraitFallback}>
              <Zap size={42} />
            </div>
          )}
        </div>

        <span className={styles.visualLabel}>Identity / Portrait</span>

        <div className={styles.visualCaption}>
          <span>01</span>
          <span>Visual Systems</span>
        </div>
      </div>

      {stats.length > 0 && (
        <div className={`${styles.stats} gothic-hero-item`}>
          {stats.slice(0, 4).map((item: any, index: number) => (
            <div key={item?.title || index} className={`${styles.frame} ${styles.stat}`}>
              <span className={styles.statNumber}>{item?.number ?? "—"}</span>
              <span className={styles.statTitle}>{item?.title || "Metric"}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
