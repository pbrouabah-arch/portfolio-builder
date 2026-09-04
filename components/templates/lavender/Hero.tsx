"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Heart } from "lucide-react";

import Background from "./Background";
import Tape from "./decor/Tape";
import Sprig from "./decor/Sprig";
import Butterfly from "./decor/Butterfly";
import PaperClip from "./decor/PaperClip";
import Seal from "./decor/Seal";
import Sparkle from "./decor/Sparkle";
import { scriptFont, serifFont } from "./fonts";

interface HeroProps {
  data: any;
}

export default function Hero({ data }: HeroProps) {
  const container = useRef<HTMLDivElement>(null);

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
      className="relative min-h-screen overflow-hidden text-[#33415C]"
    >
      <Background />

      <Butterfly className="pointer-events-none absolute left-[6%] top-[14%] h-10 w-12 opacity-90 lg:left-[10%]" />
      <Butterfly className="pointer-events-none absolute right-[10%] top-[22%] h-7 w-8 rotate-12 opacity-70" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-16 px-6 pt-32 pb-16 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:pt-0">

        <div className="hero-left flex max-w-xl flex-col items-center text-center lg:items-start lg:text-left">

          <span
            className={`${scriptFont.className} inline-flex items-center gap-2 rounded-full bg-white/60 px-5 py-1.5 text-xl text-[#5A73A8] shadow-sm backdrop-blur-sm`}
          >
            <Heart size={14} className="fill-[#8FAEE0] text-[#8FAEE0]" />
            available for work
          </span>

          <h1
            className={`${scriptFont.className} mt-6 text-5xl leading-[0.9] text-[#7A97D1] lg:text-7xl`}
          >
            {data.name}
          </h1>

          <p className={`${serifFont.className} mt-4 text-2xl italic tracking-wide text-[#4C5C7D]`}>
            {data.role}
          </p>

          <div className="my-6 h-px w-24 bg-gradient-to-r from-transparent via-[#8FAEE0] to-transparent" />

          <p className="max-w-md text-base leading-8 text-[#5A6B8C]">
            {data.description}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="flex items-center gap-3 rounded-full bg-[#7A97D1] px-8 py-3.5 font-semibold text-white shadow-[0_10px_25px_rgba(122,151,209,0.45)]"
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
                className="flex items-center gap-3 rounded-full border border-white bg-white/50 px-8 py-3.5 text-[#33415C] backdrop-blur-sm"
              >
                Download CV
                <Download size={18} />
              </motion.a>
            )}

          </div>

          <div className="relative mt-16 flex flex-wrap justify-center gap-5 lg:justify-start">

            {data.stats.map((item: any, index: number) => (
              <div
                key={item.title}
                className="relative rounded-xl bg-white/70 px-6 py-4 shadow-[0_10px_20px_rgba(51,65,92,0.1)] backdrop-blur-sm"
                style={{ transform: `rotate(${index % 2 === 0 ? -3 : 3}deg)` }}
              >
                <Tape
                  className="left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
                  rotate={index % 2 === 0 ? -8 : 6}
                />

                <h3 className={`${serifFont.className} text-3xl font-bold text-[#5A73A8]`}>
                  {item.number}
                </h3>

                <p className="mt-1 text-xs uppercase tracking-wide text-[#7C8FAE]">
                  {item.title}
                </p>

              </div>
            ))}

          </div>

        </div>

        <motion.div
          whileHover={{ scale: 1.02, rotate: 0 }}
          transition={{ type: "spring", stiffness: 180 }}
          className="hero-image relative flex -rotate-3 items-center justify-center"
        >

          {/* a torn note peeking out from behind the photo */}
          <div
            className={`${scriptFont.className} absolute -left-10 bottom-6 hidden w-40 rotate-[8deg] bg-[#FBFCFF] p-4 text-center text-xl text-[#5A6B8C] shadow-[0_14px_30px_rgba(51,65,92,0.15)] lg:block`}
            style={{ clipPath: "polygon(0 4%, 100% 0, 98% 96%, 2% 100%)" }}
          >
            grow through what you go through
          </div>

          <div className="relative h-[420px] w-[320px] rounded-sm bg-white p-3 pb-12 shadow-[0_30px_60px_rgba(51,65,92,0.28)] sm:h-[460px] sm:w-[360px]">

            <div className="relative h-full w-full overflow-hidden bg-[#DCE6F8]">
              <Image
                src={data.image}
                alt={data.name}
                fill
                priority
                sizes="360px"
                className="object-cover select-none"
              />
            </div>

            <p className={`${scriptFont.className} absolute bottom-2 left-0 w-full text-center text-2xl text-[#7C8FAE]`}>
              a few notes on me
            </p>

          </div>

          <PaperClip
            className="absolute -top-8 left-1/2 h-16 w-14 -translate-x-1/2"
            rotate={-6}
          />

          <Seal className="absolute -bottom-8 -left-8 h-20 w-20 opacity-90" rotate={-10} />

          <Sprig className="pointer-events-none absolute -right-12 top-6 hidden h-28 w-20 opacity-80 lg:block" />
          <Butterfly className="pointer-events-none absolute -right-8 bottom-24 h-10 w-12 opacity-90" />
          <Sparkle className="pointer-events-none absolute right-4 top-4 h-5 w-5 opacity-80" />

        </motion.div>

      </div>
    </section>
  );
}
