"use client";

import { useEffect, useState } from "react";
import ProjectForm from "@/components/projects/ProjectForm";
import {
  Project,
  getProjects,
  saveProject,
  deleteProject,
} from "@/lib/projects";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    const data = await getProjects();
    setProjects(data);
  }

  async function handleSave(project: Partial<Project>) {
    await saveProject(project);
    await loadProjects();

    setSelectedProject(null);
    setShowForm(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;

    await deleteProject(id);
    await loadProjects();
  }

  return (
    <main className="space-y-10">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-5xl font-bold text-[#2F3A25]">
            Projects
          </h1>

          <p className="mt-2 text-[#4B5563]">
            Manage your portfolio projects.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedProject(null);
            setShowForm(true);
          }}
          className="rounded-xl bg-[#8E77A8] px-6 py-3 font-semibold text-white transition hover:bg-[#7C6696]"
        >
          + Add Project
        </button>

      </div>

      {showForm && (
        <ProjectForm
          project={selectedProject}
          onSave={handleSave}
        />
      )}

      {projects.length === 0 ? (

        <div className="rounded-3xl border border-[#DDD4C5] bg-white p-16 text-center">

          <h2 className="text-3xl font-bold text-[#2F3A25]">
            No Projects Yet
          </h2>

          <p className="mt-4 text-[#4B5563]">
            Create your first portfolio project.
          </p>

        </div>

      ) : (

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {projects.map((project) => (

            <div
              key={project.id}
              className="overflow-hidden rounded-3xl border border-[#DDD4C5] bg-white shadow-sm transition hover:shadow-xl"
            >

              {project.cover_image ? (

                <img
                  src={project.cover_image}
                  alt={project.title}
                  className="h-52 w-full object-cover"
                />

              ) : (

                <div className="flex h-52 items-center justify-center bg-[#F6F1EA]">

                  <span className="text-5xl">
                    📁
                  </span>

                </div>

              )}

              <div className="space-y-4 p-6">

                <div className="flex items-center justify-between">

                  <h2 className="text-2xl font-bold text-[#2F3A25]">
                    {project.title}
                  </h2>

                  {project.featured && (
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-800">
                      Featured
                    </span>
                  )}

                </div>

                <p className="line-clamp-3 text-[#4B5563]">
                  {project.description}
                </p>

                <div className="flex gap-3">

                  <button
                    onClick={() => {
                      setSelectedProject(project);
                      setShowForm(true);
                    }}
                    className="flex-1 rounded-xl bg-[#8E77A8] py-3 font-semibold text-white hover:bg-[#7C6696]"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(project.id)}
                    className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </main>
  );
}