import WallMount from "./decor/WallMount";
import { scriptFont, serifFont } from "./fonts";

interface ExperienceProps { data: any; }

export default function Experience({ data }: ExperienceProps) {
  const items = data.experience ?? [];
  return (
    <section id="experience" className="relative px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <WallMount rotate={0.65} nailPosition="corners" className="p-7 sm:p-10 lg:p-12">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className={`${scriptFont.className} text-3xl text-[#835B8D]`}>where I learned by doing</p><h2 className={`${serifFont.className} mt-1 text-4xl font-semibold sm:text-5xl`}>Experience</h2></div>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8A7885]">03 / practice</span>
          </div>
          {items.length === 0 ? (
            <div className="mt-10 border border-dashed border-[#CDB7CA] p-10 text-center text-sm text-[#786978]">No experience added yet.</div>
          ) : (
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {items.map((item: any, index: number) => (
                <article key={item.id ?? index} className="border border-[#DCCBD7] bg-white/35 p-6 shadow-[0_12px_25px_rgba(35,20,38,.08)]">
                  <div className="flex items-start justify-between gap-4"><span className={`${scriptFont.className} text-xl text-[#835B8D]`}>{item.start_date || ""}{item.end_date ? ` — ${item.end_date}` : item.is_current ? " — Present" : ""}</span><span className="text-[9px] font-bold uppercase tracking-[.15em] text-[#8A7885]">{item.employment_type || "experience"}</span></div>
                  <h3 className={`${serifFont.className} mt-3 text-2xl font-semibold text-[#332534]`}>{item.position || item.role || "Experience"}</h3>
                  <p className="mt-1 text-sm font-semibold text-[#5D4B5C]">{item.company || ""}{item.location ? ` · ${item.location}` : ""}</p>
                  {item.description && <p className="mt-5 text-sm leading-7 text-[#786978]">{item.description}</p>}
                </article>
              ))}
            </div>
          )}
        </WallMount>
      </div>
    </section>
  );
}
