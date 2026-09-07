"use client";

import { useRef } from "react";
import { Link2, Mail, MessageCircle, Send, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import styles from "./gothic.module.css";

interface ContactProps {
  data: any;
}

const labels: Record<string, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  twitter: "X / Twitter",
  telegram: "Telegram",
  whatsapp: "WhatsApp",
  email: "Email",
};

function platformLabel(platform: string) {
  const key = (platform || "").toLowerCase().trim();
  if (labels[key]) return labels[key];

  return platform
    ? platform
        .split(" ")
        .filter(Boolean)
        .map((word) => word[0]?.toUpperCase() + word.slice(1))
        .join(" ")
    : "Link";
}

function platformIcon(platform: string) {
  const key = (platform || "").toLowerCase();

  if (key.includes("telegram")) return Send;
  if (key.includes("whatsapp")) return MessageCircle;
  if (key.includes("mail") || key.includes("email")) return Mail;

  return Link2;
}

export default function Contact({ data }: ContactProps) {
  const container = useRef<HTMLDivElement>(null);
  const links = Array.isArray(data?.social) ? data.social : [];

  useGSAP(
    () => {
      gsap.from(".gothic-contact-item", {
        opacity: 0,
        y: 18,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
      });
    },
    { scope: container }
  );

  return (
    <section
      id="contact"
      ref={container}
      className={`${styles.page} ${styles.contact}`}
    >
      <span className={styles.kicker}>Contact</span>

      <h2 className={styles.contactTitle}>
        Open a <em>channel.</em>
      </h2>

      <p className={styles.contactText}>
        For collaborations, selected projects, or simply to connect.
      </p>

      {data?.email && (
        <a
          href={`mailto:${data.email}`}
          className={`${styles.email} gothic-contact-item`}
        >
          <Mail size={14} />
          {data.email}
          <ArrowUpRight size={13} />
        </a>
      )}

      <div className={styles.socials}>
        {links.map((link: any, index: number) => {
          const Icon = platformIcon(link?.platform);

          return (
            <a
              key={link?.id || link?.url || index}
              href={link?.url}
              target="_blank"
              rel="noreferrer"
              className={`${styles.social} gothic-contact-item`}
            >
              <Icon size={13} />
              {platformLabel(link?.platform)}
              <ArrowUpRight size={10} />
            </a>
          );
        })}
      </div>

      {!data?.email && !links.length && (
        <p className={styles.empty}>No contact links available.</p>
      )}

      <footer className={styles.footer}>
        <span>{(data?.name || "Portfolio").toUpperCase()}</span>
        <span>GOTHIC DIGITAL SYSTEM / 2026</span>
        <a href="#home">Back to top ↑</a>
      </footer>
    </section>
  );
}
