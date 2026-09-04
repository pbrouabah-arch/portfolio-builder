"use client";

import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Globe,
  Dribbble,
  type LucideIcon,
} from "lucide-react";
import type { TemplateSectionProps } from "../types";

const ICONS: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  x: Twitter,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  dribbble: Dribbble,
};

function iconFor(platform: string) {
  return ICONS[platform.toLowerCase()] ?? Globe;
}

export default function Social({ data }: TemplateSectionProps) {
  const links = data.social ?? [];
  if (!links.length) return null;

  return (
    <section id="social" className="relative px-6 pb-28 pt-6">
      <div className="mx-auto flex max-w-md flex-wrap justify-center gap-5">
        {links.map((link) => {
          const Icon = iconFor(link.platform);
          return (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="relative flex h-12 w-12 items-center justify-center rounded-full border-2"
              style={{
                borderColor: "#D9B24C",
                color: "#D9B24C",
                background:
                  "radial-gradient(circle at 30% 30%, rgba(217,178,76,0.15), transparent 70%)",
              }}
            >
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full"
                initial={{ boxShadow: "0 0 0px rgba(217,178,76,0)" }}
                whileHover={{ boxShadow: "0 0 18px rgba(217,178,76,0.7)" }}
                transition={{ duration: 0.3 }}
              />
              <Icon size={18} />
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
