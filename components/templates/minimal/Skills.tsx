"use client";

import { scriptFont, serifFont } from "./fonts";
import Tape from "./decor/Tape";
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
      className="bg-[#EDE2CE] py-32 px-8"
    >
      <div className="mx-auto max-w-7xl">

        <span className={`${scriptFont.className} text-2xl text-[#7C8264]`}>
          tools of the trade
        </span>

        <h2 className={`${serifFont.className} mt-2 text-5xl font-semibold text-[#46392E]`}>
          Skills
        </h2>

        <p className="mt-5 max-w-3xl text-[#8B7B68]">
          Technologies and tools I use to build modern applications.
        </p>

        {skills.length === 0 ? (

          <div className="mt-16 rounded-sm border border-dashed border-[#DCCBA8] bg-[#FFFDF8] p-12 text-center">

            <h3 className="text-2xl font-bold text-[#46392E]">
              No Skills Added Yet
            </h3>

            <p className="mt-4 text-[#8B7B68]">
              Skills will appear here after adding them from the dashboard.
            </p>

          </div>

        ) : (

          <div className="mt-16 grid gap-8 md:grid-cols-2">

            {skills.map((skill: any, index: number) => (

             <div
               key={skill.id}
                className="relative rounded-sm border border-[#DCCBA8] bg-[#FFFDF8] p-8 shadow-[0_10px_25px_rgba(70,57,46,0.06)]"
                style={{ transform: `rotate(${index % 2 === 0 ? -0.6 : 0.6}deg)` }}
              >
                <Tape
                 tone={index % 2 === 0 ? "tape" : "blush"}
                 rotate={index % 2 === 0 ? -5 : 5}
                 className="left-1/2 -top-4 -translate-x-1/2"
                />

                <div className="mb-5 flex items-center justify-between">

                  <h3 className="text-2xl font-bold text-[#46392E]">
                    {skill.name}
                  </h3>

                  <span className={`${scriptFont.className} text-2xl text-[#7C8264]`}>
                    {skill.level}%
                  </span>

                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-[#EDE2CE]">

                  <div
                    className="h-full rounded-full bg-[#7C8264]"
                    style={{
                      width: `${skill.level}%`,
                    }}
                  />

                </div>

                {skill.category && (
                  <p className="mt-4 text-sm uppercase tracking-wide text-[#8B7B68]">
                    {skill.category}
                  </p>
                )}

              </div>

            ))}

          </div>

        )}

      </div>
    </section>
  );
}
