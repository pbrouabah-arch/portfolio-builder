"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, Heart } from "lucide-react";

import Background from "./Background";
import PaperClip from "./decor/PaperClip";
import Sparkle from "./decor/Sparkle";
import { scriptFont, serifFont } from "./fonts";

interface HeroProps {
  data: any;
}

export default function Hero({ data }: HeroProps) {
  const container = useRef<HTMLDivElement>(null);
  const [showNote, setShowNote] = useState(false);

  useGSAP(
    () => {
      gsap.from(".hero-left > *", {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 1,
        ease: "power4.out",
      });

      gsap.from(".hero-image", {
        opacity: 0,
        scale: 0.85,
        rotate: -6,
        duration: 1.2,
        delay: 0.3,
        ease: "power3.out",
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative min-h-screen overflow-hidden text-[#3A2740]"
    >
      <Background />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-16 px-6 pt-32 pb-16 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:pt-0">

        <div className="hero-left flex max-w-xl flex-col items-center text-center lg:items-start lg:text-left">

          <span
            className={`${scriptFont.className} inline-flex items-center gap-2 rounded-full bg-white/60 px-5 py-1.5 text-xl text-[#6E3F7C] shadow-sm backdrop-blur-sm`}
          >
            <Heart size={14} className="fill-[#B98FC7] text-[#B98FC7]" />
            available for work
          </span>

          <h1
            className={`${scriptFont.className} mt-6 text-4xl leading-[0.95] text-[#9B6FB0] sm:text-5xl lg:text-6xl`}
          >
            {data.name}
          </h1>

          <p className={`${serifFont.className} mt-4 text-2xl italic tracking-wide text-[#4F3856]`}>
            {data.role}
          </p>

          <div className="my-6 h-px w-24 bg-gradient-to-r from-transparent via-[#B98FC7] to-transparent" />

          <p className="max-w-md text-base leading-8 text-[#5C4160]">
            {data.description}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="flex items-center gap-3 rounded-full bg-[#9B6FB0] px-8 py-3.5 font-semibold text-white shadow-[0_10px_25px_rgba(122,151,209,0.45)]"
            >
              Contact Me
              <ArrowRight size={18} />
            </motion.a>

            {data.cv && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={data.cv}
                target="_blank"
                className="flex items-center gap-3 rounded-full border border-white bg-white/50 px-8 py-3.5 text-[#3A2740] backdrop-blur-sm"
              >
                Download CV
                <Download size={18} />
              </motion.a>
            )}

          </div>

        </div>

        <motion.div
          whileHover={{ scale: 1.02, rotate: 0 }}
          transition={{ type: "spring", stiffness: 180 }}
          className="hero-image relative flex -rotate-3 items-center justify-center"
        >

          {/* a note tucked behind the photo — tap/click the photo to reveal it */}
          <AnimatePresence>
            {showNote && (
              <motion.div
                initial={{ opacity: 0, x: 24, rotate: 0 }}
                animate={{ opacity: 1, x: 0, rotate: 8 }}
                exit={{ opacity: 0, x: 24, rotate: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={`${scriptFont.className} pointer-events-none absolute -left-6 bottom-6 w-36 bg-[#FBFCFF] p-4 text-center text-xl text-[#5C4160] shadow-[0_14px_30px_rgba(51,65,92,0.15)] sm:-left-10 sm:w-40`}
                style={{ clipPath: "polygon(0 4%, 100% 0, 98% 96%, 2% 100%)" }}
              >
                grow through what you go through
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setShowNote((prev) => !prev)}
            aria-pressed={showNote}
            aria-label={
              showNote
                ? "Hide the note tucked behind the photo"
                : "Show the note tucked behind the photo"
            }
            className="relative block h-[420px] w-[320px] cursor-pointer appearance-none rounded-sm border-0 bg-white p-3 pb-12 text-left shadow-[0_30px_60px_rgba(51,65,92,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B6FB0] focus-visible:ring-offset-2 sm:h-[460px] sm:w-[360px]"
          >

            <div className="relative h-full w-full overflow-hidden bg-[#EADFF0]">
              <Image
                src={data.image}
                alt={data.name}
                fill
                priority
                sizes="360px"
                className="object-cover select-none"
              />
            </div>

            <p className={`${scriptFont.className} absolute bottom-2 left-0 w-full text-center text-2xl text-[#8A7191]`}>
              a few notes on me
            </p>

          </button>

          <PaperClip
            className="absolute -top-10 left-1/2 h-24 w-[4.5rem] -translate-x-1/2"
            rotate={-6}
          />

          <Sparkle className="pointer-events-none absolute right-4 top-4 h-5 w-5 opacity-80" />

        </motion.div>

      </div>
    </section>
  );
}
