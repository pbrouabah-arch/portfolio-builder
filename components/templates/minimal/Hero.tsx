"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

import Background from "./Background";
import Tape from "./decor/Tape";
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
      className="relative isolate min-h-screen overflow-hidden bg-[#EDE4D0] text-[#362C23]"
    >
      <Background />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-between px-8 pt-24 lg:pt-0">

        <div className="hero-left max-w-2xl">


          <h1
            className={`${scriptFont.className} mt-8 text-6xl leading-none text-[#4B5140] lg:text-7xl`}
          >
            Hi, I'm
          </h1>

          <h2 className="mt-3 text-6xl font-black leading-none text-[#362C23] sm:text-6xl lg:text-6xl">
            {data.name}
          </h2>

          <p className={`${serifFont.className} mt-5 text-2xl italic text-[#6E6152]`}>
            {data.role}
          </p>

          <p className="mt-8 max-w-xl text-lg leading-8 text-[#473C30]">
            {data.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-5">

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="flex items-center gap-3 rounded-full bg-[#656B4F] px-8 py-4 font-semibold text-[#EDE4D0]"
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
                className="flex items-center gap-3 rounded-full border border-[#C9B489] bg-[#E0D3B5]/60 px-8 py-4 text-[#362C23]"
              >
                Download CV
                <Download size={18} />
              </motion.a>
            )}

          </div>

          <div className="mt-20 flex flex-wrap gap-6">

            {data.stats.map((item: any, index: number) => (
              <div
                key={item.title}
                className="relative rounded-2xl border border-[#C9B489] bg-[#E0D3B5]/60 px-7 py-5"
                style={{ transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)` }}
              >
                <Tape
                  className="left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
                  rotate={index % 2 === 0 ? -8 : 6}
                />

                <h3 className="text-4xl font-black text-[#4B5140]">
                  {item.number}
                </h3>

                <p className="mt-1 text-sm text-[#6E6152]">
                  {item.title}
                </p>

              </div>
            ))}

          </div>

        </div>

        <motion.div
          whileHover={{ scale: 1.02, rotate: 0 }}
          transition={{ type: "spring", stiffness: 180 }}
          className="hero-image relative hidden translate-x-12 -rotate-3 lg:flex items-center justify-center"
        >

          <div className="absolute h-[480px] w-[420px] rounded-sm bg-[#F5F0E6] p-4 pb-16 shadow-[0_25px_60px_rgba(54,44,35,0.3)]">

            <div className="relative h-full w-full overflow-hidden bg-[#E0D3B5]">
              <Image
                src={data.image}
                alt={data.name}
                fill
                priority
                sizes="420px"
                className="object-cover select-none"
              />
            </div>

            <p className={`${scriptFont.className} absolute bottom-3 left-0 w-full text-center text-2xl text-[#6E6152]`}>
              a few notes on me
            </p>

          </div>

          <Tape
            className="left-1/2 top-[-10px] -translate-x-1/2"
            rotate={-3}
          />

        </motion.div>

      </div>
    </section>
  );
}