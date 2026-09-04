"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import type { TemplateSectionProps } from "../types";

export default function CVEnvelope({ data }: TemplateSectionProps) {
  if (!data.cv) return null;

  return (
    <section id="cv" className="relative px-6 py-24">
      <div className="mx-auto flex max-w-sm flex-col items-center text-center">
        <h2
          style={{ fontFamily: "var(--font-cormorant)", color: "#5B3E91" }}
          className="mb-10 text-3xl font-semibold"
        >
          A Letter, Sealed
        </h2>

        <motion.div
          initial="closed"
          whileHover="open"
          className="group relative h-40 w-56 cursor-pointer"
        >
          {/* envelope body */}
          <div className="absolute inset-0 rounded-[3px] border border-[#D9B24C] bg-[#EEE4F7] shadow-[0_20px_45px_-20px_rgba(91,62,145,0.5)]" />

          {/* flap */}
          <motion.div
            variants={{ closed: { rotateX: 0 }, open: { rotateX: 180 } }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              transformOrigin: "top",
              clipPath: "polygon(0 0, 100% 0, 50% 65%)",
              background: "linear-gradient(160deg, #C7A8F3, #8F68C9)",
            }}
            className="absolute inset-x-0 top-0 z-20 h-full"
          />

          {/* letter sliding out */}
          <motion.a
            href={data.cv}
            target="_blank"
            rel="noopener noreferrer"
            variants={{ closed: { y: 0, opacity: 0 }, open: { y: -26, opacity: 1 } }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="absolute inset-x-4 top-6 z-10 flex items-center justify-center gap-2 rounded-[2px] bg-white py-3 text-xs font-medium text-[#5B3E91] shadow-md"
          >
            <Download size={14} /> Download CV
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
