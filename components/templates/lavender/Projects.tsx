import PaperClip from "./decor/PaperClip";
import Sparkle from "./decor/Sparkle";
import { scriptFont, serifFont } from "./fonts";

interface ProjectsProps {
  data: any;
}

export default function Projects({
  data,
}: ProjectsProps) {
  const projects = data.projects;

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#F3F6FC] py-28 px-6 text-[#33415C] lg:px-8"
    >
      <Sparkle className="pointer-events-none absolute right-[8%] top-24 h-5 w-5 opacity-70" />

      <div className="mx-auto max-w-6xl text-center">

        <span className={`${scriptFont.className} text-2xl text-[#7A97D1]`}>
          things I've built
        </span>

        <h2 className={`${serifFont.className} mb-16 mt-1 text-4xl font-semibold italic lg:text-5xl`}>
          Projects
        </h2>

        {projects.length === 0 ? (

          <div className="mx-auto max-w-md rounded-2xl border border-dashed border-[#B7CBEE] bg-white/70 p-12">

            <h3 className="text-2xl font-bold">
              No Projects Yet
            </h3>

            <p className="mt-4 text-[#7C8FAE]">
              Projects will appear here after adding them from the dashboard.
            </p>

          </div>

        ) : (

          <div className="grid gap-16 pt-4 text-left sm:grid-cols-2 lg:grid-cols-3">

            {projects.map((project: any, index: number) => (

              <div
                key={project.id}
                className="group relative bg-white p-3 pb-6 shadow-[0_20px_45px_rgba(51,65,92,0.14)] transition duration-300 hover:-translate-y-2 hover:rotate-0"
                style={{ transform: `rotate(${index % 3 === 0 ? -3 : index % 3 === 1 ? 3 : -1.5}deg)` }}
              >

                <PaperClip
                  className="absolute -top-8 left-1/2 h-16 w-14 -translate-x-1/2"
                  rotate={index % 2 === 0 ? -8 : 8}
                />

                {project.cover_image ? (
                  <img
                    src={project.cover_image}
                    alt={project.title}
                    className="h-52 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-52 w-full items-center justify-center bg-[#E4ECF9] text-4xl">
                    ✂︎
                  </div>
                )}

                <div className="px-3 pt-5">

                  <h3 className={`${serifFont.className} text-xl font-bold italic`}>
                    {project.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#7C8FAE]">
                    {project.description}
                  </p>

                  <div className="mt-5 flex gap-3">

                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-[#DCE6F8] px-4 py-2 text-xs font-medium uppercase tracking-wide hover:border-[#7A97D1]"
                      >
                        GitHub
                      </a>
                    )}


                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </section>
  );
}
