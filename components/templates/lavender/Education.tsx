import Sparkle from "./decor/Sparkle";
import PaperClip from "./decor/PaperClip";
import { scriptFont, serifFont } from "./fonts";

interface EducationProps { data: any; }

export default function Education({ data }: EducationProps) {
  const items = data.education ?? [];
  return (
    <section id="education" className="relative overflow-hidden bg-[#F8F2F9] px-6 py-28 text-[#3A2740] lg:px-8">
      <Sparkle className="pointer-events-none absolute right-[12%] top-16 h-5 w-5 opacity-70" />
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className={`${scriptFont.className} text-2xl text-[#9B6FB0]`}>where I learned</span>
          <h2 className={`${serifFont.className} mt-1 text-4xl font-semibold italic lg:text-5xl`}>Education</h2>
        </div>

        {items.length === 0 ? (
          <div className="mx-auto mt-16 max-w-md rounded-2xl border border-dashed border-[#D9B8E0] bg-white/70 p-12 text-center">
            <p className="text-[#8A7191]">No education added yet.</p>
          </div>
        ) : (
          <div className="relative mx-auto mt-16 max-w-4xl space-y-8">
            <div className="absolute left-4 top-0 hidden h-full w-px bg-[#D9B8E0] sm:block" />
            {items.map((item: any, index: number) => (
              <article key={item.id ?? index} className="relative sm:pl-12">
                <span className="absolute left-0 top-8 hidden h-9 w-9 rounded-full border-4 border-[#F8F2F9] bg-[#9B6FB0] shadow sm:block" />
                <div className="relative rounded-2xl bg-white p-7 shadow-[0_14px_30px_rgba(51,65,92,0.08)]">
                  <PaperClip className="absolute -top-6 right-8 h-14 w-10 z-10" rotate={index % 2 === 0 ? 7 : -7} />
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className={`${serifFont.className} text-2xl font-semibold text-[#3A2740]`}>
                        {item.degree || item.title || item.program || "Education"}
                      </h3>
                      <p className="mt-2 text-[#5C4160]">{item.institution || item.school || item.university || ""}</p>
                    </div>
                    {(item.start_date || item.end_date || item.year) && (
                      <span className={`${scriptFont.className} text-xl text-[#9B6FB0]`}>
                        {item.year || `${item.start_date ?? ""}${item.end_date ? ` — ${item.end_date}` : ""}`}
                      </span>
                    )}
                  </div>
                  {item.description && <p className="mt-5 text-sm leading-7 text-[#8A7191]">{item.description}</p>}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
