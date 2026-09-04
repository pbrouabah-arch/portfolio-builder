"use client";

import { motion } from "framer-motion";

import PaperGrain from "./decor/PaperGrain";

export default function Background() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[#F6F0E4]" />

      <PaperGrain />

      <div
        className="absolute inset-0 z-0 opacity-[0.5]"
        style={{
          backgroundImage: `
            radial-gradient(rgba(126, 104, 78, 0.18) 1px, transparent 1px)
          `,
          backgroundSize: "26px 26px",
        }}
      />

      <motion.div
        animate={{ x: [0, 90, 0], y: [0, -60, 0] }}
        transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
        className="absolute -top-40 -left-40 z-0 h-[520px] w-[520px] rounded-full bg-[#E4D3B0]/50 blur-[170px]"
      />

      <motion.div
        animate={{ x: [0, -80, 0], y: [0, 70, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
        className="absolute bottom-[-180px] right-[-120px] z-0 h-[480px] w-[480px] rounded-full bg-[#7C8264]/20 blur-[170px]"
      />
    </div>
  );
}
