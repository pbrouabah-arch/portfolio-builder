import Sparkle from "./decor/Sparkle";
import Tape from "./decor/Tape";
import { scriptFont, serifFont } from "./fonts";

interface EducationProps { data: any; }

export default function Education({ data }: EducationProps) {
  const items = data.education ?? [];
  return (
    <section id="education" className="relative overflow-hidden bg-[#F3F6FC] px-6 py-28 text-[#33415C] lg:px-8">
      <Sparkle className="pointer-events-none absolute right-[12%] top-16 h-5 w-5 opacity-70" />
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className={`${scriptFont.className} text-2xl text-[#7A97D1]`}>where I learned</span>
          <h2 className={`${serifFont.className} mt-1 text-4xl font-semibold italic lg:text-5xl`}>Education</h2>
        </div>

        {items.length === 0 ? (
          <div className="mx-auto mt-16 max-w-md rounded-2xl border border-dashed border-[#B7CBEE] bg-white/70 p-12 text-center">
            <p className="text-[#7C8FAE]">No education added yet.</p>
          </div>
        ) : (
          <div className="relative mx-auto mt-16 max-w-4xl space-y-8">
            <div className="absolute left-4 top-0 hidden h-full w-px bg-[#B7CBEE] sm:block" />
            {items.map((item: any, index: number) => (
              <article key={item.id ?? index} className="relative sm:pl-12">
                <span className="absolute left-0 top-8 hidden h-9 w-9 rounded-full border-4 border-[#F3F6FC] bg-[#7A97D1] shadow sm:block" />
                <div className="relative rounded-2xl bg-white p-7 shadow-[0_14px_30px_rgba(51,65,92,0.08)]">
                  <Tape tone={index % 2 === 0 ? "tape" : "blush"} className="right-8 top-0 -translate-y-1/2" rotate={index % 2 === 0 ? 5 : -5} />
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className={`${serifFont.className} text-2xl font-semibold text-[#33415C]`}>
                        {item.degree || item.title || item.program || "Education"}
                      </h3>
                      <p className="mt-2 text-[#5A6B8C]">{item.institution || item.school || item.university || ""}</p>
                    </div>
                    {(item.start_date || item.end_date || item.year) && (
                      <span className={`${scriptFont.className} text-xl text-[#7A97D1]`}>
                        {item.year || `${item.start_date ?? ""}${item.end_date ? ` — ${item.end_date}` : ""}`}
                      </span>
                    )}
                  </div>
                  {item.description && <p className="mt-5 text-sm leading-7 text-[#7C8FAE]">{item.description}</p>}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
