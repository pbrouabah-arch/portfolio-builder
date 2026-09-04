import { supabase } from "./supabase";

export interface Skill {
  id: string;
  user_id: string;
  name: string;
  level: number;
  category: string | null;
  icon: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

async function currentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getSkills() {
  const user = await currentUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .eq("user_id", user.id)
    .order("display_order", { ascending: true });

  if (error) throw error;

  return data as Skill[];
}

export async function getSkill(id: string) {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data as Skill;
}

export async function saveSkill(skill: Partial<Skill>) {
  const user = await currentUser();

  if (!user) throw new Error("User not found");

  const payload = {
    id: skill.id,
    user_id: user.id,
    name: skill.name,
    level: skill.level,
    category: skill.category ?? null,
    icon: skill.icon ?? null,
    display_order: skill.display_order ?? 0,
  };

  const { error } = await supabase
    .from("skills")
    .upsert(payload);

  if (error) throw error;
}

export async function deleteSkill(id: string) {
  const { error } = await supabase
    .from("skills")
    .delete()
    .eq("id", id);

  if (error) throw error;
}