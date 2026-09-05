import Sparkle from "./decor/Sparkle";
import Tape from "./decor/Tape";
import { scriptFont, serifFont } from "./fonts";

interface ExperienceProps { data: any; }

export default function Experience({ data }: ExperienceProps) {
  const items = data.experience ?? [];
  return (
    <section id="experience" className="relative overflow-hidden bg-gradient-to-b from-[#E4ECF9] to-[#D6E1F4] px-6 py-28 text-[#33415C] lg:px-8">
      <Sparkle className="pointer-events-none absolute left-[10%] top-20 h-5 w-5 opacity-70" />
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className={`${scriptFont.className} text-2xl text-[#7A97D1]`}>places I've grown</span>
          <h2 className={`${serifFont.className} mt-1 text-4xl font-semibold italic lg:text-5xl`}>Experience</h2>
        </div>

        {items.length === 0 ? (
          <div className="mx-auto mt-16 max-w-md rounded-2xl border border-dashed border-[#B7CBEE] bg-white/70 p-12 text-center">
            <p className="text-[#7C8FAE]">No experience added yet.</p>
          </div>
        ) : (
          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {items.map((item: any, index: number) => (
              <article key={item.id ?? index} className="relative rounded-2xl bg-white p-8 shadow-[0_16px_35px_rgba(51,65,92,0.1)]" style={{ transform: `rotate(${index % 2 === 0 ? -1 : 1}deg)` }}>
                <Tape tone={index % 2 === 0 ? "tape" : "blush"} className="left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" rotate={index % 2 === 0 ? -5 : 5} />
                <p className={`${scriptFont.className} text-xl text-[#7A97D1]`}>
                  {item.start_date || ""}{item.end_date ? ` — ${item.end_date}` : item.is_current ? " — Present" : ""}
                </p>
                <h3 className={`${serifFont.className} mt-2 text-2xl font-semibold text-[#33415C]`}>
                  {item.position || item.role || "Experience"}
                </h3>
                <p className="mt-2 text-[#5A6B8C]">{item.company || ""}{item.location ? ` · ${item.location}` : ""}</p>
                {item.employment_type && <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#9AAAC8]">{item.employment_type}</p>}
                {item.description && <p className="mt-5 text-sm leading-7 text-[#7C8FAE]">{item.description}</p>}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
