"use client";

import { useEffect, useState } from "react";
import { Project } from "@/lib/projects";
import { uploadProjectImage } from "@/lib/storage";

interface Props {
  project: Project | null;
  onSave: (project: Partial<Project>) => Promise<void>;
}

export default function ProjectForm({ project, onSave }: Props) {
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [github, setGithub] = useState("");
  const [live, setLive] = useState("");
  const [video, setVideo] = useState("");
  const [featured, setFeatured] = useState(false);

  const [coverImage, setCoverImage] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!project) return;

    setTitle(project.title || "");
    setDescription(project.description || "");
    setGithub(project.github_url || "");
    setLive(project.live_url || "");
    setVideo(project.video_url || "");
    setFeatured(project.featured);
    setCoverImage(project.cover_image || "");
  }, [project]);

  async function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;

    try {
      setUploading(true);

      const url = await uploadProjectImage(e.target.files[0]);

      setCoverImage(url);
    } catch (error) {
      console.error(error);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      await onSave({
        id: project?.id,
        title,
        description,
        github_url: github,
        live_url: live,
        video_url: video,
        featured,
        cover_image: coverImage,
      });

      alert("Project saved successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to save project.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-2xl border border-[#CFC4B2] bg-white p-4 text-[#1F2937] placeholder:text-[#6B7280] outline-none transition focus:border-[#8E77A8] focus:ring-2 focus:ring-[#8E77A8]/20";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-[#DDD4C5] bg-white p-8 shadow-sm"
    >
      <h2 className="mb-8 text-3xl font-bold text-[#2F3A25]">
        Project
      </h2>

      <div className="grid gap-5">

        <input
          required
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputClass}
        />

        <textarea
          rows={6}
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`${inputClass} resize-none`}
        />

        <input
          placeholder="GitHub URL"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          className={inputClass}
        />

        <input
          placeholder="Live Demo URL"
          value={live}
          onChange={(e) => setLive(e.target.value)}
          className={inputClass}
        />

        <input
          placeholder="Video URL"
          value={video}
          onChange={(e) => setVideo(e.target.value)}
          className={inputClass}
        />

        <div>
          <label className="mb-2 block font-medium text-[#2F3A25]">
            Cover Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className={inputClass}
          />

          {uploading && (
            <p className="mt-2 text-[#8E77A8]">
              Uploading...
            </p>
          )}

          {coverImage && (
            <img
              src={coverImage}
              alt="Cover"
              className="mt-4 h-52 w-full rounded-2xl border border-[#DDD4C5] object-cover"
            />
          )}
        </div>

        <label className="flex items-center gap-3 font-medium text-[#2F3A25]">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="h-5 w-5"
          />
          Featured Project
        </label>

      </div>

      <button
        type="submit"
        disabled={loading || uploading}
        className="mt-8 w-full rounded-2xl bg-[#8E77A8] py-4 text-lg font-semibold text-white transition hover:bg-[#7C6696] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Project"}
      </button>
    </form>
  );
}