import WallMount from "./decor/WallMount";
import { scriptFont, serifFont } from "./fonts";

interface EducationProps { data: any; }

export default function Education({ data }: EducationProps) {
  const items = data.education ?? [];
  return (
    <section id="education" className="relative px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <WallMount rotate={-0.35} nailPosition="center" className="p-7 sm:p-10 lg:p-12">
          <div className="flex items-end justify-between gap-5">
            <div><p className={`${scriptFont.className} text-3xl text-[#835B8D]`}>the places that shaped me</p><h2 className={`${serifFont.className} mt-1 text-4xl font-semibold sm:text-5xl`}>Education</h2></div>
            <span className="hidden text-[9px] font-bold uppercase tracking-[0.2em] text-[#8A7885] sm:block">02 / learning</span>
          </div>
          {items.length === 0 ? (
            <div className="mt-10 border border-dashed border-[#CDB7CA] p-10 text-center text-sm text-[#786978]">No education added yet.</div>
          ) : (
            <div className="mt-10 grid gap-5">
              {items.map((item: any, index: number) => (
                <article key={item.id ?? index} className="grid gap-5 border-t border-[#DCCBD7] pt-6 sm:grid-cols-[150px_1fr]">
                  <div><span className={`${scriptFont.className} text-2xl text-[#835B8D]`}>{item.year || item.end_date || item.start_date || "—"}</span></div>
                  <div>
                    <h3 className={`${serifFont.className} text-2xl font-semibold text-[#332534]`}>{item.degree || item.title || item.program || "Education"}</h3>
                    <p className="mt-1 text-sm font-semibold text-[#5D4B5C]">{item.institution || item.school || item.university || ""}</p>
                    {item.description && <p className="mt-4 max-w-2xl text-sm leading-7 text-[#786978]">{item.description}</p>}
                  </div>
                </article>
              ))}
            </div>
          )}
        </WallMount>
      </div>
    </section>
  );
}
