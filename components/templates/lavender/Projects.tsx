import { ExternalLink, Link2 } from "lucide-react";
import Nail from "./decor/Nail";
import { scriptFont, serifFont } from "./fonts";

interface ProjectsProps { data: any; }

export default function Projects({ data }: ProjectsProps) {
  const projects = data.projects ?? [];
  return (
    <section id="projects" className="relative px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center text-white">
          <p className={`${scriptFont.className} text-3xl text-[#D9B0E0]`}>things I made real</p>
          <h2 className={`${serifFont.className} mt-1 text-5xl font-semibold`}>Projects</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/60">A wall of selected work — each piece mounted like something worth keeping.</p>
        </div>

        {projects.length === 0 ? (
          <div className="mx-auto max-w-md border border-white/20 bg-[#F7F0E5]/90 p-10 text-center text-sm text-[#786978]">No projects added yet.</div>
        ) : (
          <div className="grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project: any, index: number) => {
              const rotate = index % 3 === 0 ? -2.4 : index % 3 === 1 ? 1.8 : -1;
              return (
                <article key={project.id} className="group relative pt-6" style={{ transform: `rotate(${rotate}deg)` }}>
                  <span className="absolute left-1/2 top-0 z-20 h-7 w-px -translate-x-1/2 bg-[#8D857B]" />
                  <Nail className="absolute left-1/2 top-0 z-30 h-10 w-9" rotate={index % 2 ? 7 : -7} />
                  <div className="overflow-hidden border border-white/80 bg-[#F7F0E5] p-3 pb-5 text-[#55285F] shadow-[0_28px_55px_rgba(8,3,12,.42)] transition duration-500 group-hover:-translate-y-2 group-hover:rotate-0">
                    {project.cover_image ? (
                      <div className="relative h-56 overflow-hidden bg-[#D9CBD9]"><img src={project.cover_image} alt={project.title} className="h-full w-full object-cover object-center transition duration-700 [image-rendering:auto] group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" /></div>
                    ) : (
                      <div className="flex h-56 items-center justify-center bg-[#E5D8E4] text-[#835B8D]"><span className={`${scriptFont.className} text-5xl`}>work</span></div>
                    )}
                    <div className="px-2 pt-5">
                      <div className="flex items-start justify-between gap-3"><h3 className={`${serifFont.className} text-xl font-semibold`}>{project.title}</h3><span className="text-[9px] font-bold uppercase tracking-[.15em] text-[#80608A]">0{index + 1}</span></div>
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#62466A]">{project.description}</p>
                      {project.github_url && <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 border-b border-[#9B719F] pb-1 text-xs font-bold uppercase tracking-[.14em] text-[#63356D] hover:text-[#4F2458]"><Link2 size={14} /> View on GitHub</a>}
                      {project.demo_url && <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="ml-5 mt-5 inline-flex items-center gap-2 border-b border-[#9B719F] pb-1 text-xs font-bold uppercase tracking-[.14em] text-[#63356D] hover:text-[#4F2458]"><ExternalLink size={14} /> Demo</a>}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
