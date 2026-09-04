"use client";

import { motion } from "framer-motion";
import type { TemplateSectionProps } from "../types";

export default function StatsNotes({ data }: TemplateSectionProps) {
  const stats = data.stats ?? [];
  if (!stats.length) return null;

  return (
    <section id="stats" className="relative px-6 py-24">
      <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 md:grid-cols-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20, rotate: (i % 2 === 0 ? -1 : 1) * 3 }}
            whileInView={{ opacity: 1, y: 0, rotate: (i % 2 === 0 ? -1 : 1) * 2 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: "easeOut" }}
            className="rounded-[2px] border border-[#D9B24C]/40 bg-white px-6 py-8 text-center shadow-[0_15px_35px_-18px_rgba(91,62,145,0.4)]"
          >
            <p
              style={{ fontFamily: "var(--font-cormorant)", color: "#D9B24C" }}
              className="text-3xl italic font-semibold"
            >
              {stat.value}
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#5B3E91]/70">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
