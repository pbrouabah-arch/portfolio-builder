import Tape from "./decor/Tape";
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
      className="bg-[#F6F0E4] py-32 px-8 text-[#46392E]"
    >
      <div className="mx-auto max-w-7xl">

        <span className={`${scriptFont.className} text-2xl text-[#7C8264]`}>
          things I've built
        </span>

        <h2 className={`${serifFont.className} mb-5 mt-2 text-5xl font-semibold`}>
          Projects
        </h2>

        <p className="mb-20 max-w-3xl text-[#8B7B68]">
          Some of the projects I have built during my learning journey.
        </p>

        {projects.length === 0 ? (

          <div className="rounded-sm border border-dashed border-[#DCCBA8] bg-[#FFFDF8] p-12 text-center">

            <h3 className="text-2xl font-bold">
              No Projects Yet
            </h3>

            <p className="mt-4 text-[#8B7B68]">
              Projects will appear here after adding them from the dashboard.
            </p>

          </div>

        ) : (

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">

            {projects.map((project: any, index: number) => (

              <div
                key={project.id}
                className="group relative bg-[#FFFDF8] p-4 pb-7 shadow-[0_18px_40px_rgba(70,57,46,0.12)] transition duration-300 hover:-translate-y-2 hover:rotate-0"
                style={{ transform: `rotate(${index % 3 === 0 ? -2 : index % 3 === 1 ? 2 : -1}deg)` }}
              >

                <Tape
                  className="left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
                  rotate={index % 2 === 0 ? -6 : 5}
                />

                {project.cover_image ? (
                  <img
                    src={project.cover_image}
                    alt={project.title}
                    className="h-56 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-56 w-full items-center justify-center bg-[#EDE2CE] text-4xl">
                    ✂︎
                  </div>
                )}

                <div className="pt-6">

                  <h3 className="text-2xl font-bold">
                    {project.title}
                  </h3>

                  <p className="mt-3 leading-7 text-[#8B7B68]">
                    {project.description}
                  </p>

                  <div className="mt-6 flex gap-4">

                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-[#DCCBA8] px-5 py-2 text-sm hover:border-[#7C8264]"
                      >
                        GitHub
                      </a>
                    )}

                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-[#7C8264] px-5 py-2 text-sm text-[#F6F0E4] hover:bg-[#6B7256]"
                      >
                        Live Demo
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
