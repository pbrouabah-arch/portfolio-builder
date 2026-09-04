import { supabase } from "@/lib/supabase";

export interface Achievement {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  achievement_year: number | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface AchievementInput {
  title: string;
  description?: string;
  achievement_year?: number | null;
  display_order?: number;
}

/**
 * Get the currently authenticated user's ID.
 */
async function getCurrentUserId() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  return user.id;
}

/**
 * Get all achievements belonging to the current user.
 */
export async function getAchievements(): Promise<Achievement[]> {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("achievements")
    .select("*")
    .eq("user_id", userId)
    .order("display_order", {
      ascending: true,
    })
    .order("achievement_year", {
      ascending: false,
      nullsFirst: false,
    });

  if (error) {
    throw error;
  }

  return data ?? [];
}

/**
 * Create a new achievement.
 */
export async function createAchievement(
  achievement: AchievementInput
) {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("achievements")
    .insert({
      user_id: userId,
      title: achievement.title.trim(),
      description:
        achievement.description?.trim() || null,
      achievement_year:
        achievement.achievement_year ?? null,
      display_order:
        achievement.display_order ?? 0,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Update an existing achievement.
 */
export async function updateAchievement(
  id: string,
  achievement: AchievementInput
) {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("achievements")
    .update({
      title: achievement.title.trim(),
      description:
        achievement.description?.trim() || null,
      achievement_year:
        achievement.achievement_year ?? null,
      display_order:
        achievement.display_order ?? 0,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Delete an achievement.
 */
export async function deleteAchievement(
  id: string
) {
  const userId = await getCurrentUserId();

  const { error } = await supabase
    .from("achievements")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    throw error;
  }
}