import Sparkle from "./decor/Sparkle";
import PaperClip from "./decor/PaperClip";
import { scriptFont, serifFont } from "./fonts";

interface ExperienceProps { data: any; }

export default function Experience({ data }: ExperienceProps) {
  const items = data.experience ?? [];
  return (
    <section id="experience" className="relative overflow-hidden bg-gradient-to-b from-[#F3ECF5] to-[#E9DCEE] px-6 py-28 text-[#3A2740] lg:px-8">
      <Sparkle className="pointer-events-none absolute left-[10%] top-20 h-5 w-5 opacity-70" />
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className={`${scriptFont.className} text-2xl text-[#9B6FB0]`}>places I've grown</span>
          <h2 className={`${serifFont.className} mt-1 text-4xl font-semibold italic lg:text-5xl`}>Experience</h2>
        </div>

        {items.length === 0 ? (
          <div className="mx-auto mt-16 max-w-md rounded-2xl border border-dashed border-[#D9B8E0] bg-white/70 p-12 text-center">
            <p className="text-[#8A7191]">No experience added yet.</p>
          </div>
        ) : (
          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {items.map((item: any, index: number) => (
              <article key={item.id ?? index} className="relative rounded-2xl bg-white p-8 shadow-[0_16px_35px_rgba(51,65,92,0.1)]" style={{ transform: `rotate(${index % 2 === 0 ? -1 : 1}deg)` }}>
                <PaperClip className="absolute -top-6 left-6 h-14 w-10 z-10" rotate={index % 2 === 0 ? -8 : 8} />
                <p className={`${scriptFont.className} text-xl text-[#9B6FB0]`}>
                  {item.start_date || ""}{item.end_date ? ` — ${item.end_date}` : item.is_current ? " — Present" : ""}
                </p>
                <h3 className={`${serifFont.className} mt-2 text-2xl font-semibold text-[#3A2740]`}>
                  {item.position || item.role || "Experience"}
                </h3>
                <p className="mt-2 text-[#5C4160]">{item.company || ""}{item.location ? ` · ${item.location}` : ""}</p>
                {item.employment_type && <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#A98FA6]">{item.employment_type}</p>}
                {item.description && <p className="mt-5 text-sm leading-7 text-[#8A7191]">{item.description}</p>}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
