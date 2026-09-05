"use client";

import { Heart } from "lucide-react";

import Tape from "./decor/Tape";
import Sparkle from "./decor/Sparkle";
import { scriptFont, serifFont } from "./fonts";

interface SkillsProps {
  data: any;
}

export default function Skills({
  data,
}: SkillsProps) {
  const skills = data.skills;

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-gradient-to-b from-[#E4ECF9] to-[#D6E1F4] py-28 px-6 lg:px-8"
    >
      <Sparkle className="pointer-events-none absolute left-[10%] top-20 h-5 w-5 opacity-70" />

      <div className="mx-auto max-w-6xl text-center">

        <span className={`${scriptFont.className} text-2xl text-[#7A97D1]`}>
          protect your peace
        </span>

        <h2 className={`${serifFont.className} mt-1 text-4xl font-semibold italic text-[#33415C] lg:text-5xl`}>
          Skills
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-sm uppercase tracking-[0.2em] text-[#7C8FAE]">
          Technologies &amp; tools I use to build modern applications
        </p>

        {skills.length === 0 ? (

          <div className="mx-auto mt-16 max-w-md rounded-2xl border border-dashed border-[#B7CBEE] bg-white/70 p-12">

            <h3 className="text-2xl font-bold text-[#33415C]">
              No Skills Added Yet
            </h3>

            <p className="mt-4 text-[#7C8FAE]">
              Skills will appear here after adding them from the dashboard.
            </p>

          </div>

        ) : (

          <div className="mt-16 grid gap-6 text-left sm:grid-cols-2">

            {skills.map((skill: any, index: number) => (

              <div
                key={skill.id}
                className="relative flex items-center gap-5 rounded-2xl bg-white p-5 shadow-[0_12px_28px_rgba(51,65,92,0.08)]"
                style={{ transform: `rotate(${index % 2 === 0 ? -1 : 1}deg)` }}
              >

                <Tape
                  tone={index % 2 === 0 ? "tape" : "blush"}
                  className="left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
                  rotate={index % 2 === 0 ? -6 : 6}
                />

                <Heart size={22} className="shrink-0 fill-[#7A97D1] text-[#7A97D1]" />

                <div className="min-w-0 flex-1">

                  <div className="flex items-baseline justify-between gap-3">

                    <h3 className="truncate text-lg font-semibold text-[#33415C]">
                      {skill.name}
                    </h3>

                    <span className={`${scriptFont.className} shrink-0 text-xl text-[#7A97D1]`}>
                      {skill.level}%
                    </span>

                  </div>

                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E4ECF9]">
                    <div
                      className="h-full rounded-full bg-[#7A97D1]"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                  {skill.category && (
                    <p className="mt-2 text-[11px] uppercase tracking-wider text-[#9AAAC8]">
                      {skill.category}
                    </p>
                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </section>
  );
}
