import { Award } from "lucide-react";
import WallMount from "./decor/WallMount";
import { scriptFont, serifFont } from "./fonts";

interface AchievementsProps { data: any; }

export default function Achievements({ data }: AchievementsProps) {
  const items = data.achievements ?? [];
  return (
    <section id="achievements" className="relative px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <WallMount rotate={-0.5} nailPosition="center" className="p-7 sm:p-10 lg:p-12">
          <div className="text-center"><p className={`${scriptFont.className} text-3xl text-[#835B8D]`}>small milestones, kept close</p><h2 className={`${serifFont.className} mt-1 text-4xl font-semibold sm:text-5xl`}>Achievements</h2></div>
          {items.length === 0 ? (
            <div className="mx-auto mt-10 max-w-md border border-dashed border-[#CDB7CA] p-10 text-center text-sm text-[#786978]">No achievements added yet.</div>
          ) : (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item: any, index: number) => (
                <article key={item.id ?? index} className="relative min-h-[190px] border border-[#DCCBD7] bg-[#FBF6EE]/70 p-6 shadow-[0_12px_25px_rgba(35,20,38,.07)]">
                  <div className="flex items-center justify-between"><Award size={20} className="text-[#835B8D]" /><span className={`${scriptFont.className} text-xl text-[#835B8D]`}>{item.achievement_year || "★"}</span></div>
                  <h3 className={`${serifFont.className} mt-8 text-xl font-semibold text-[#332534]`}>{item.title}</h3>
                  {item.description && <p className="mt-3 text-sm leading-6 text-[#786978]">{item.description}</p>}
                </article>
              ))}
            </div>
          )}
        </WallMount>
      </div>
    </section>
  );
}
