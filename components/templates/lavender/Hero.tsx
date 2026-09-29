"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { ArrowDownRight, Download, MapPin } from "lucide-react";

import Nail from "./decor/Nail";
import { scriptFont, serifFont } from "./fonts";

interface HeroProps { data: any; }

export default function Hero({ data }: HeroProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".hero-copy > *", { opacity: 0, y: 30, stagger: 0.12, duration: 0.9, ease: "power3.out" });
    gsap.from(".hero-photo", { opacity: 0, y: 35, rotate: 5, duration: 1.1, delay: 0.2, ease: "power3.out" });
  }, { scope: container });

  return (
    <section ref={container} className="relative flex min-h-screen items-center px-5 pb-16 pt-28 text-[#F9F1E7] sm:px-8">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
        <div className="hero-copy">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#1F1223]/55 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/75 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#D7A6E0] shadow-[0_0_12px_rgba(215,166,224,.8)]" />
            portfolio / selected work
          </div>

          <p className={`${scriptFont.className} text-2xl text-[#D9B0E0] sm:text-3xl`}>Hello, I&apos;m</p>
          <h1 className={`${serifFont.className} mt-2 max-w-3xl text-5xl font-semibold leading-[.98] tracking-tight sm:text-6xl lg:text-7xl`}>
            {data.name}
          </h1>
          <p className="mt-6 max-w-xl text-lg font-medium tracking-wide text-[#EEDBF2] sm:text-xl">
            {data.role}
          </p>
          <div className="mt-7 h-px w-24 bg-[#D9B0E0]" />
          <p className="mt-7 max-w-xl text-sm leading-7 text-[#E4CFE9] sm:text-base">
            {data.description}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <motion.a whileHover={{ y: -2 }} href="#projects" className="inline-flex items-center gap-2 rounded-full bg-[#F7F0E5] px-6 py-3 text-sm font-bold text-[#35233A] shadow-[0_12px_30px_rgba(15,8,20,.28)]">
              Explore work <ArrowDownRight size={17} />
            </motion.a>
            {data.cv && (
              <motion.a whileHover={{ y: -2 }} href={data.cv} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md">
                <Download size={17} /> CV
              </motion.a>
            )}
          </div>

          {(data.country || data.city) && (
            <div className="mt-8 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#D7BEDF]">
              <MapPin size={14} />
              {[data.city, data.country].filter(Boolean).join(", ")}
            </div>
          )}
        </div>

        <div className="hero-photo relative mx-auto w-full max-w-[440px]">
          <span className="absolute -left-5 top-10 h-20 w-px bg-gradient-to-b from-transparent via-[#B8AFA5] to-transparent opacity-70" />
          <Nail className="absolute -left-5 top-5 z-30 h-11 w-10" rotate={-8} />

         
        </div>
      </div>
    </section>
  );
}
