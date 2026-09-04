import { supabase } from "./supabase";

export interface Project {
  id: string;
  user_id: string;
  title: string;
  slug: string | null;
  description: string | null;
  cover_image: string | null;
  github_url: string | null;
  live_url: string | null;
  video_url: string | null;
  featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

function createSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function currentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getProjects() {
  const user = await currentUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user.id)
    .order("display_order", { ascending: true });

  if (error) throw error;

  return data as Project[];
}

export async function getPublicProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw error;

  return data as Project[];
}

export async function getProjectBySlug(slug: string) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;

  return data as Project;
}

export async function saveProject(project: Partial<Project>) {
  const user = await currentUser();

  if (!user) throw new Error("User not found");

  const payload = {
    ...project,
    slug: project.slug || createSlug(project.title || ""),
    user_id: user.id,
  };

  const { error } = await supabase
    .from("projects")
    .upsert(payload);

  if (error) throw error;
}

export async function deleteProject(id: string) {
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) throw error;
}