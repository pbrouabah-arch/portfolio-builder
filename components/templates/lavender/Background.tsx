"use client";

import { motion } from "framer-motion";

export default function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* High-contrast wall texture. The image lives in public/assets/rock-bg.jpg. */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/rock-bg.jpg')",
          filter: "saturate(0.92) contrast(1.08) brightness(0.9)",
        }}
      />

      {/* Deep translucent veil keeps the wall visible while protecting text contrast. */}
      <div className="absolute inset-0 bg-[#120A15]/42" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(255,255,255,.18),transparent_34%),linear-gradient(180deg,rgba(28,12,35,.08),rgba(10,5,14,.52))]" />

      <motion.div
        animate={{ opacity: [0.14, 0.24, 0.14], scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
        className="absolute left-1/2 top-[-12%] h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-[#F5DFF7]/20 blur-[130px]"
      />

      {/* Very subtle texture, not enough to soften the image. */}
      <div className="absolute inset-0 opacity-[0.045] mix-blend-soft-light [background-image:radial-gradient(rgba(255,255,255,.9)_1px,transparent_1px)] [background-size:6px_6px]" />
    </div>
  );
}
