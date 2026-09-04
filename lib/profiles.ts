import { supabase } from "./supabase";

export interface Profile {
  id: string;
  user_id: string;

  full_name: string;
  username: string;

  job_title: string | null;
  about: string | null;

  country: string | null;
  city: string | null;

  email: string | null;
  phone: string | null;
  website: string | null;

  avatar_url: string | null;
  resume_url: string | null;

  is_public: boolean;

  template_id: string | null;
}

async function currentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getProfile() {
  const user = await currentUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  return data as Profile | null;
}

export async function saveProfile(profile: Partial<Profile>) {
  const user = await currentUser();

  if (!user) throw new Error("User not found");

  const payload = {
    ...profile,
    user_id: user.id,
    email: user.email,
  };

  const { error } = await supabase
    .from("profiles")
    .upsert(payload, {
      onConflict: "user_id",
    });

  if (error) throw error;
}

export async function updateTemplate(templateId: string) {
  const user = await currentUser();

  if (!user) throw new Error("User not found");

  const { error } = await supabase
    .from("profiles")
    .update({
      template_id: templateId,
    })
    .eq("user_id", user.id);

  if (error) throw error;
}