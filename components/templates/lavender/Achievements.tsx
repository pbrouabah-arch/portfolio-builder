import Sparkle from "./decor/Sparkle";
import Tape from "./decor/Tape";
import { scriptFont, serifFont } from "./fonts";

interface AchievementsProps { data: any; }

export default function Achievements({ data }: AchievementsProps) {
  const items = data.achievements ?? [];
  return (
    <section id="achievements" className="relative overflow-hidden bg-[#F3F6FC] px-6 py-28 text-[#33415C] lg:px-8">
      <Sparkle className="pointer-events-none absolute right-[10%] top-16 h-5 w-5 opacity-70" />
      <div className="mx-auto max-w-6xl text-center">
        <span className={`${scriptFont.className} text-2xl text-[#7A97D1]`}>little wins worth keeping</span>
        <h2 className={`${serifFont.className} mt-1 text-4xl font-semibold italic lg:text-5xl`}>Achievements</h2>

        {items.length === 0 ? (
          <div className="mx-auto mt-16 max-w-md rounded-2xl border border-dashed border-[#B7CBEE] bg-white/70 p-12">
            <p className="text-[#7C8FAE]">No achievements added yet.</p>
          </div>
        ) : (
          <div className="mx-auto mt-16 grid max-w-5xl gap-7 sm:grid-cols-2 lg:grid-cols-3 text-left">
            {items.map((item: any, index: number) => (
              <article key={item.id ?? index} className="relative rounded-2xl bg-white p-7 shadow-[0_14px_30px_rgba(51,65,92,0.08)]" style={{ transform: `rotate(${index % 3 === 0 ? -1.5 : index % 3 === 1 ? 1.5 : 0}deg)` }}>
                <Tape tone={index % 2 === 0 ? "tape" : "blush"} className="right-7 top-0 -translate-y-1/2" rotate={index % 2 === 0 ? 6 : -6} />
                <div className={`${scriptFont.className} text-3xl text-[#7A97D1]`}>{item.achievement_year || "★"}</div>
                <h3 className={`${serifFont.className} mt-3 text-xl font-semibold text-[#33415C]`}>{item.title}</h3>
                {item.description && <p className="mt-3 text-sm leading-7 text-[#7C8FAE]">{item.description}</p>}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
