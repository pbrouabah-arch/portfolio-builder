"use client";

import { motion } from "framer-motion";
import type { TemplateSectionProps } from "../types";

const STICKER_COLORS = ["#C7A8F3", "#86C6F4", "#8F68C9", "#355C9A"];

export default function Skills({ data }: TemplateSectionProps) {
  if (!data.skills?.length) return null;

  return (
    <section id="skills" className="relative px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2
          style={{ fontFamily: "var(--font-cormorant)", color: "#5B3E91" }}
          className="mb-14 text-3xl font-semibold"
        >
          Little Stickers
        </h2>

        <div className="flex flex-wrap justify-center gap-5">
          {data.skills.map((skill, i) => {
            const color = STICKER_COLORS[i % STICKER_COLORS.length];
            const rotation = ((i * 37) % 14) - 7;
            return (
              <motion.span
                key={skill.id}
                initial={{ opacity: 0, scale: 0.7, rotate: rotation - 8 }}
                whileInView={{ opacity: 1, scale: 1, rotate: rotation }}
                whileHover={{ scale: 1.08, rotate: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: "easeOut" }}
                className="relative select-none rounded-[6px] px-5 py-2 text-sm font-medium text-white shadow-[0_8px_16px_-6px_rgba(91,62,145,0.5)]"
                style={{ backgroundColor: color, fontFamily: "var(--font-inter)" }}
              >
                {skill.name}
                {/* peeled corner */}
                <span
                  aria-hidden
                  className="absolute -bottom-1 -right-1 h-3 w-3 rounded-[2px] bg-white/70"
                  style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
                />
              </motion.span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
