"use client";

import { motion } from "framer-motion";
import type { TemplateSectionProps } from "../types";

export default function About({ data }: TemplateSectionProps) {
  if (!data.description) return null;

  return (
    <section id="about" className="relative px-6 py-28">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-[2px] border border-[#D9B24C]/40 bg-[#FFFFFF] px-10 py-14 shadow-[0_20px_50px_-20px_rgba(91,62,145,0.35)]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, rgba(217,178,76,0.15) 0%, transparent 6%), radial-gradient(circle at 85% 75%, rgba(217,178,76,0.12) 0%, transparent 8%), radial-gradient(circle at 60% 10%, rgba(143,104,201,0.08) 0%, transparent 10%)",
          }}
        >
          <span
            aria-hidden
            className="absolute -top-4 left-8 rotate-[-4deg] text-xs uppercase tracking-[0.35em] text-[#D9B24C]"
          >
            a note, found inside
          </span>
          <p
            style={{ fontFamily: "var(--font-cormorant)", color: "#355C9A" }}
            className="text-xl italic leading-9"
          >
            {data.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
