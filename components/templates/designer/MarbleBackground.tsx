"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Ambient marble-and-gold-vein backdrop. Moves at a fraction of scroll speed
 * so the whole page reads like a slab of veined stone rather than a flat
 * color fill. Pure CSS gradients + an SVG grain filter — no images required.
 */
export default function MarbleBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ backgroundColor: "#EEE4F7" }}
    >
      <motion.div
        style={{ y: y1 }}
        className="absolute -left-1/4 -top-1/4 h-[80%] w-[80%] rounded-full opacity-60 blur-3xl"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, #C7A8F3 0%, transparent 60%)",
          }}
        />
      </motion.div>
      <motion.div
        style={{ y: y2 }}
        className="absolute -bottom-1/4 -right-1/4 h-[85%] w-[85%] rounded-full opacity-50 blur-3xl"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at 70% 70%, #86C6F4 0%, transparent 55%)",
          }}
        />
      </motion.div>

      {/* gold veins */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.18] mix-blend-multiply"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="veinTurbulence">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.012"
              numOctaves={2}
              seed={7}
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 0.85
                      0 0 0 0 0.7
                      0 0 0 0 0.3
                      0 0 0 0.5 0"
            />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#veinTurbulence)" />
      </svg>

      {/* fine grain, keeps the marble from feeling flat */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.04]">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}
