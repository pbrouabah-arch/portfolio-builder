"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { Github, ExternalLink, X } from "lucide-react";
import type { ProjectItem, TemplateSectionProps } from "../types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Sprockets() {
  return (
    <div className="flex justify-between px-3">
      {Array.from({ length: 20 }).map((_, i) => (
        <span key={i} className="h-2 w-2 rounded-[1px] bg-[#5B3E91]/70" />
      ))}
    </div>
  );
}

export default function Projects({ data }: TemplateSectionProps) {
  const strip = data.projects ?? [];
  const stripRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<ProjectItem | null>(null);

  useEffect(() => {
    if (!stripRef.current) return;
    gsap.fromTo(
      stripRef.current,
      { x: 200, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: stripRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  if (!strip.length) return null;

  return (
    <section id="projects" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2
          style={{ fontFamily: "var(--font-cormorant)", color: "#5B3E91" }}
          className="mb-3 text-center text-3xl font-semibold"
        >
          Frames From The Reel
        </h2>
        <p className="mb-12 text-center text-sm text-[#355C9A]/70">
          Drag the strip to look through the negatives.
        </p>

        <div
          ref={stripRef}
          className="rounded-[4px] bg-[#5B3E91] py-3 shadow-[0_25px_60px_-25px_rgba(91,62,145,0.6)]"
        >
          <Sprockets />
          <motion.div
            drag="x"
            dragConstraints={{ left: -(strip.length * 260), right: 0 }}
            className="flex cursor-grab gap-4 px-4 py-4 active:cursor-grabbing"
          >
            {strip.map((project) => (
              <motion.button
                key={project.id}
                onClick={() => setActive(project)}
                whileHover={{ y: -6 }}
                className="relative w-56 shrink-0 rounded-[3px] border-4 border-white bg-white text-left shadow-md"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#C7A8F3]">
                  {project.cover_image ? (
                    <img
                      src={project.cover_image}
                      alt={project.title}
                      className="h-full w-full object-cover sepia-[0.15]"
                    />
                  ) : (
                    <div
                      style={{ fontFamily: "var(--font-cormorant)" }}
                      className="flex h-full w-full items-center justify-center text-[#5B3E91]"
                    >
                      {project.title}
                    </div>
                  )}
                </div>
                <p
                  style={{ fontFamily: "var(--font-cormorant)", color: "#5B3E91" }}
                  className="px-3 py-2 text-base font-medium"
                >
                  {project.title}
                </p>
              </motion.button>
            ))}
          </motion.div>
          <Sprockets />
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#5B3E91]/70 px-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.85, rotate: -2, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-sm border-8 border-white bg-white p-2 pb-6 shadow-2xl"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-1 text-[#5B3E91]"
                aria-label="Close"
              >
                <X size={16} />
              </button>
              {active.cover_image && (
                <img
                  src={active.cover_image}
                  alt={active.title}
                  className="aspect-[4/3] w-full object-cover"
                />
              )}
              <div className="px-4 pt-4">
                <h3
                  style={{ fontFamily: "var(--font-cormorant)", color: "#5B3E91" }}
                  className="text-2xl font-semibold"
                >
                  {active.title}
                </h3>
                {active.description && (
                  <p className="mt-2 text-sm leading-6 text-[#355C9A]/80">
                    {active.description}
                  </p>
                )}
                <div className="mt-4 flex gap-3">
                  {active.github_url && (
                    <a
                      href={active.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-full border border-[#D9B24C] px-4 py-1.5 text-xs text-[#5B3E91]"
                    >
                      <Github size={14} /> GitHub
                    </a>
                  )}
                  {active.live_url && (
                    <a
                      href={active.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-full bg-[#8F68C9] px-4 py-1.5 text-xs text-white"
                    >
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
