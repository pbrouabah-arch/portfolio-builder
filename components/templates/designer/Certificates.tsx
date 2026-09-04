"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import type { CertificateItem, TemplateSectionProps } from "../types";

export default function Certificates({ data }: TemplateSectionProps) {
  const items = data.certificates ?? [];
  const [active, setActive] = useState<CertificateItem | null>(null);

  if (!items.length) return null;

  return (
    <section id="certificates" className="relative px-6 py-24">
      <div className="mx-auto max-w-xl">
        <h2
          style={{ fontFamily: "var(--font-cormorant)", color: "#5B3E91" }}
          className="mb-12 text-center text-3xl font-semibold"
        >
          Kept In The Envelope
        </h2>

        <motion.div
          drag="y"
          dragConstraints={{ top: -(items.length * 130), bottom: 0 }}
          className="mx-auto max-h-[520px] w-fit cursor-grab overflow-hidden rounded-[4px] bg-[#5B3E91] px-3 py-4 shadow-[0_25px_60px_-25px_rgba(91,62,145,0.6)] active:cursor-grabbing"
        >
          {items.map((cert) => (
            <button
              key={cert.id}
              onClick={() => setActive(cert)}
              className="mb-4 flex w-72 items-center gap-4 rounded-[3px] border-4 border-white bg-white p-2 text-left shadow-md last:mb-0"
            >
              <div className="h-16 w-16 shrink-0 overflow-hidden bg-[#86C6F4]">
                {cert.image_url ? (
                  <img src={cert.image_url} alt={cert.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-white">
                    {cert.title?.charAt(0)}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p
                  style={{ fontFamily: "var(--font-cormorant)", color: "#5B3E91" }}
                  className="truncate text-lg font-medium"
                >
                  {cert.title}
                </p>
                {cert.organization && (
                  <p className="truncate text-xs text-[#355C9A]/70">{cert.organization}</p>
                )}
              </div>
            </button>
          ))}
        </motion.div>
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
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-sm border-8 border-white bg-white p-2 pb-6 shadow-2xl"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-1 text-[#5B3E91]"
                aria-label="Close"
              >
                <X size={16} />
              </button>
              {active.image_url && (
                <img src={active.image_url} alt={active.title} className="aspect-square w-full object-cover" />
              )}
              <div className="px-4 pt-4">
                <h3
                  style={{ fontFamily: "var(--font-cormorant)", color: "#5B3E91" }}
                  className="text-xl font-semibold"
                >
                  {active.title}
                </h3>
                {active.organization && (
                  <p className="mt-1 text-sm text-[#355C9A]/80">{active.organization}</p>
                )}
                {active.credential_url && (
                  <a
                    href={active.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#8F68C9] px-4 py-1.5 text-xs text-white"
                  >
                    <ExternalLink size={14} /> View Credential
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
