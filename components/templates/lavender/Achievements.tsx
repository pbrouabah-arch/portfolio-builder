import Sparkle from "./decor/Sparkle";
import PaperClip from "./decor/PaperClip";
import { scriptFont, serifFont } from "./fonts";

interface AchievementsProps { data: any; }

export default function Achievements({ data }: AchievementsProps) {
  const items = data.achievements ?? [];
  return (
    <section id="achievements" className="relative overflow-hidden bg-[#F8F2F9] px-6 py-28 text-[#3A2740] lg:px-8">
      <Sparkle className="pointer-events-none absolute right-[10%] top-16 h-5 w-5 opacity-70" />
      <div className="mx-auto max-w-6xl text-center">
        <span className={`${scriptFont.className} text-2xl text-[#9B6FB0]`}>little wins worth keeping</span>
        <h2 className={`${serifFont.className} mt-1 text-4xl font-semibold italic lg:text-5xl`}>Achievements</h2>

        {items.length === 0 ? (
          <div className="mx-auto mt-16 max-w-md rounded-2xl border border-dashed border-[#D9B8E0] bg-white/70 p-12">
            <p className="text-[#8A7191]">No achievements added yet.</p>
          </div>
        ) : (
          <div className="mx-auto mt-16 grid max-w-5xl gap-7 sm:grid-cols-2 lg:grid-cols-3 text-left">
            {items.map((item: any, index: number) => (
              <article key={item.id ?? index} className="relative rounded-2xl bg-white p-7 shadow-[0_14px_30px_rgba(51,65,92,0.08)]" style={{ transform: `rotate(${index % 3 === 0 ? -1.5 : index % 3 === 1 ? 1.5 : 0}deg)` }}>
                <PaperClip className="absolute -top-6 right-6 h-14 w-10 z-10" rotate={index % 2 === 0 ? 8 : -8} />
                <div className={`${scriptFont.className} text-3xl text-[#9B6FB0]`}>{item.achievement_year || "★"}</div>
                <h3 className={`${serifFont.className} mt-3 text-xl font-semibold text-[#3A2740]`}>{item.title}</h3>
                {item.description && <p className="mt-3 text-sm leading-7 text-[#8A7191]">{item.description}</p>}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
