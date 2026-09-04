"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { TemplateSectionProps } from "../types";

export default function Hero({ data }: TemplateSectionProps) {
  const [developed, setDeveloped] = useState(false);

  // hand-held tilt on hover
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-50, 50], [4, -4]), { stiffness: 120, damping: 12 });
  const rotY = useSpring(useTransform(mx, [-50, 50], [-4, 4]), { stiffness: 120, damping: 12 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  }
  function handleMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
    >
      {/* golden ambient flare */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, #D9B24C 0%, transparent 70%)" }}
      />

      {/* Polaroid frame */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: -2 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        onAnimationComplete={() => setDeveloped(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: rotX,
          rotateY: rotY,
          transformStyle: "preserve-3d",
          borderColor: "#D9B24C",
        }}
        className="relative z-10 w-[280px] rounded-sm border-[6px] bg-white p-4 pb-16 shadow-[0_25px_60px_-15px_rgba(91,62,145,0.45)] sm:w-[320px]"
      >
        <div className="relative aspect-square w-full overflow-hidden bg-[#C7A8F3]">
          {data.image ? (
            <motion.img
              src={data.image}
              alt={data.name}
              className="h-full w-full object-cover"
              initial={{ filter: "blur(14px) saturate(0.2) brightness(1.3)", opacity: 0.3 }}
              animate={
                developed
                  ? { filter: "blur(0px) saturate(1) brightness(1)", opacity: 1 }
                  : {}
              }
              transition={{ duration: 2.2, ease: "easeOut" }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#C7A8F3] text-[#5B3E91]">
              <span style={{ fontFamily: "var(--font-cormorant)" }} className="text-3xl">
                {data.name?.charAt(0) ?? "?"}
              </span>
            </div>
          )}
          {/* film grain over the photo */}
          <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30 animate-[grainshift_0.4s_steps(2)_infinite] bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]" />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={developed ? { opacity: [0, 1, 1, 0] } : {}}
          transition={{ duration: 2.4, times: [0, 0.3, 0.7, 1], delay: 0.2 }}
          className="absolute bottom-5 left-0 right-0 text-center text-[11px] italic tracking-widest text-[#8F68C9]"
        >
          Developing...
        </motion.p>
      </motion.div>

      {/* Name / role / description */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={developed ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.6, ease: "easeOut" }}
        className="relative z-10 mt-10 max-w-xl"
      >
        <h1
          style={{ fontFamily: "var(--font-cormorant)", color: "#5B3E91" }}
          className="text-4xl font-semibold sm:text-5xl"
        >
          {data.name}
        </h1>
        <p style={{ color: "#8F68C9" }} className="mt-2 text-lg tracking-wide">
          {data.role}
        </p>
        {data.description && (
          <p className="mt-5 text-sm leading-7 text-[#355C9A]/80">{data.description}</p>
        )}
      </motion.div>

      {/* film-strip scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={developed ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 2.1 }}
        className="relative z-10 mt-14 flex flex-col items-center gap-2"
      >
        <div className="flex h-8 w-5 flex-col justify-between rounded-[2px] border border-[#D9B24C] py-1">
          <span className="mx-auto h-1 w-1 rounded-full bg-[#D9B24C]" />
          <span className="mx-auto h-1 w-1 rounded-full bg-[#D9B24C]" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#5B3E91]/60">scroll</span>
      </motion.div>
    </section>
  );
}
