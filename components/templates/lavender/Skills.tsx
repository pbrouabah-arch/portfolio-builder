"use client";

import { Code2 } from "lucide-react";
import WallMount from "./decor/WallMount";
import { scriptFont, serifFont } from "./fonts";

interface SkillsProps { data: any; }

export default function Skills({ data }: SkillsProps) {
  const skills = data.skills ?? [];
  return (
    <section id="skills" className="relative px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <WallMount rotate={0.45} nailPosition="corners" className="p-7 sm:p-10 lg:p-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className={`${scriptFont.className} text-3xl text-[#835B8D]`}>tools on the wall</p>
              <h2 className={`${serifFont.className} mt-1 text-4xl font-semibold sm:text-5xl`}>Skills</h2>
            </div>
            <p className="max-w-md text-xs leading-6 text-[#786978]">A snapshot of the technologies, methods and tools used across the portfolio.</p>
          </div>

          {skills.length === 0 ? (
            <div className="mt-10 border border-dashed border-[#CDB7CA] bg-white/45 p-10 text-center text-sm text-[#786978]">No skills added yet.</div>
          ) : (
            <div className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {skills.map((skill: any, index: number) => (
                <article key={skill.id ?? index} className="relative border-b border-[#DCCBD7] pb-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2D2030] text-[#F7F0E5]"><Code2 size={16} /></span>
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-bold text-[#332534]">{skill.name}</h3>
                        {skill.category && <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-[#8A7885]">{skill.category}</p>}
                      </div>
                    </div>
                    <span className={`${scriptFont.className} text-2xl text-[#835B8D]`}>{skill.level}%</span>
                  </div>
                  <div className="mt-4 h-1 overflow-hidden bg-[#E2D5DF]"><div className="h-full bg-[#835B8D]" style={{ width: `${skill.level}%` }} /></div>
                </article>
              ))}
            </div>
          )}
        </WallMount>
      </div>
    </section>
  );
}
