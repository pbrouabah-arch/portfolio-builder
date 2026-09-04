import { supabase } from "./supabase";

export interface Education {
  id: string;
  user_id: string;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string | null;
  end_date: string | null;
  grade: string | null;
}

export async function getEducation(): Promise<Education[]> {
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
    .from("education")
    .select(
      "id, user_id, institution, degree, field_of_study, start_date, end_date, grade"
    )
    .eq("user_id", user.id)
    .order("start_date", {
      ascending: false,
      nullsFirst: false,
    });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function createEducation(
  education: Omit<Education, "id" | "user_id">
) {
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
    .from("education")
    .insert({
      user_id: user.id,
      institution: education.institution,
      degree: education.degree,
      field_of_study: education.field_of_study,
      start_date: education.start_date || null,
      end_date: education.end_date || null,
      grade: education.grade || null,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateEducation(
  id: string,
  education: Omit<Education, "id" | "user_id">
) {
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
    .from("education")
    .update({
      institution: education.institution,
      degree: education.degree,
      field_of_study: education.field_of_study,
      start_date: education.start_date || null,
      end_date: education.end_date || null,
      grade: education.grade || null,
    })
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteEducation(id: string) {
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
    .from("education")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw error;
  }
}