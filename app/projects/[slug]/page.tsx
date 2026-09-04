import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/projects";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F7F4EE] py-20">
      <div className="mx-auto max-w-6xl px-6">

        <Link
          href="/projects"
          className="mb-10 inline-flex items-center gap-2 rounded-xl border border-[#DDD4C5] bg-white px-5 py-3 text-[#2F3A25] transition hover:bg-[#F3EFE8]"
        >
          ← Back to Projects
        </Link>

        <div className="overflow-hidden rounded-[32px] border border-[#DDD4C5] bg-white shadow-lg">

          {project.cover_image ? (
            <img
              src={project.cover_image}
              alt={project.title}
              className="h-[500px] w-full object-cover"
            />
          ) : (
            <div className="flex h-[500px] items-center justify-center bg-[#EEE7DB]">
              <span className="text-9xl">📁</span>
            </div>
          )}

          <div className="p-10">

            <div className="flex flex-wrap items-center justify-between gap-6">

              <div>

                <h1 className="text-5xl font-bold text-[#2F3A25]">
                  {project.title}
                </h1>

                {project.featured && (
                  <div className="mt-4 inline-flex rounded-full bg-[#F5E8A3] px-4 py-2 text-sm font-semibold text-[#705D00]">
                    ⭐ Featured Project
                  </div>
                )}

              </div>

              <div className="flex flex-wrap gap-4">

                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-[#2F3A25] px-6 py-3 font-semibold text-white transition hover:opacity-90"
                  >
                    GitHub
                  </a>
                )}

                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-[#8E77A8] px-6 py-3 font-semibold text-white transition hover:opacity-90"
                  >
                    Live Demo
                  </a>
                )}

                {project.video_url && (
                  <a
                    href={project.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                  >
                    Watch Video
                  </a>
                )}

              </div>

            </div>

            <div className="my-10 h-px bg-[#E7DFD1]" />

            <article className="prose prose-lg max-w-none whitespace-pre-wrap text-[#4B5563] leading-8">
              {project.description}
            </article>

          </div>

        </div>

      </div>
    </main>
  );
}