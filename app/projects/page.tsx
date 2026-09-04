import Link from "next/link";
import { getPublicProjects } from "@/lib/projects";

export default async function ProjectsPage() {
  const projects = await getPublicProjects();

  return (
    <main className="min-h-screen bg-[#F7F4EE] py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold text-[#2F3A25]">
            My Projects
          </h1>

          <p className="mt-5 text-lg text-[#6B7280]">
            A selection of projects that showcase my skills and experience.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#DDD4C5] bg-white p-20 text-center">
            <h2 className="text-2xl font-semibold text-[#2F3A25]">
              No projects yet
            </h2>

            <p className="mt-3 text-[#6B7280]">
              Projects you add from the dashboard will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group overflow-hidden rounded-3xl border border-[#DDD4C5] bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {project.cover_image ? (
                  <img
                    src={project.cover_image}
                    alt={project.title}
                    className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-60 items-center justify-center bg-[#EEE7DB]">
                    <span className="text-7xl">📁</span>
                  </div>
                )}

                <div className="space-y-4 p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-[#2F3A25]">
                      {project.title}
                    </h2>

                    {project.featured && (
                      <span className="rounded-full bg-[#F5E8A3] px-3 py-1 text-xs font-semibold text-[#705D00]">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="line-clamp-3 text-[#6B7280]">
                    {project.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}