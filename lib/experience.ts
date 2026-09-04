import { supabase } from "./supabase";

export interface Experience {
  id: string;
  user_id: string;
  company: string;
  position: string;
  location: string | null;
  employment_type: string | null;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean;
  description: string | null;
  display_order: number | null;
  created_at: string;
  updated_at: string;
}

export interface ExperienceInput {
  company: string;
  position: string;
  location?: string;
  employment_type?: string;
  start_date?: string;
  end_date?: string | null;
  is_current?: boolean;
  description?: string;
  display_order?: number;
}

/**
 * Get all experiences for the currently authenticated user.
 */
export async function getExperiences(): Promise<Experience[]> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  const { data, error } = await supabase
    .from("experience")
    .select("*")
    .eq("user_id", user.id)
    .order("display_order", {
      ascending: true,
    })
    .order("start_date", {
      ascending: false,
    });

  if (error) {
    console.error("Failed to fetch experiences:", error);
    throw error;
  }

  return data ?? [];
}

/**
 * Create a new experience.
 */
export async function createExperience(
  experience: ExperienceInput
): Promise<Experience> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  const { data, error } = await supabase
    .from("experience")
    .insert({
      user_id: user.id,
      company: experience.company,
      position: experience.position,
      location: experience.location || null,
      employment_type:
        experience.employment_type || null,
      start_date: experience.start_date || null,
      end_date:
        experience.is_current
          ? null
          : experience.end_date || null,
      is_current: experience.is_current ?? false,
      description:
        experience.description || null,
      display_order:
        experience.display_order ?? 0,
    })
    .select()
    .single();

  if (error) {
    console.error("Failed to create experience:", error);
    throw error;
  }

  return data;
}

/**
 * Update an existing experience.
 */
export async function updateExperience(
  id: string,
  experience: ExperienceInput
): Promise<Experience> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  const { data, error } = await supabase
    .from("experience")
    .update({
      company: experience.company,
      position: experience.position,
      location: experience.location || null,
      employment_type:
        experience.employment_type || null,
      start_date: experience.start_date || null,
      end_date:
        experience.is_current
          ? null
          : experience.end_date || null,
      is_current: experience.is_current ?? false,
      description:
        experience.description || null,
      display_order:
        experience.display_order ?? 0,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    console.error("Failed to update experience:", error);
    throw error;
  }

  return data;
}

/**
 * Delete an experience.
 */
export async function deleteExperience(
  id: string
): Promise<void> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  const { error } = await supabase
    .from("experience")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Failed to delete experience:", error);
    throw error;
  }
}