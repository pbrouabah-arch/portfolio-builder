import { supabase } from "./supabase";

export interface PortfolioData {
  profile: any;
  skills: any[];
  projects: any[];
  certificates: any[];
  socialLinks: any[];
}

// ==========================================
// PUBLIC PORTFOLIO
// ==========================================

export async function getPortfolioData(username: string) {
  console.log("Searching username:", username);

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*");

  console.log("ALL PROFILES:", profiles);
  console.log("ERROR:", error);

  const profile = profiles?.find(
    (p) =>
      p.username === username &&
      p.is_public === true
  );

  console.log("FOUND PROFILE:", profile);

  if (!profile) {
    return null;
  }

  const { data: skills } = await supabase
    .from("skills")
    .select("*")
    .eq("user_id", profile.user_id)
    .order("display_order");

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", profile.user_id)
    .order("display_order");

  const { data: certificates } = await supabase
    .from("certificates")
    .select("*")
    .eq("user_id", profile.user_id)
    .order("display_order");

  const { data: socialLinks } = await supabase
    .from("social_links")
    .select("*")
    .eq("user_id", profile.user_id)
    .order("display_order");

  return {
    profile,
    skills: skills ?? [],
    projects: projects ?? [],
    certificates: certificates ?? [],
    socialLinks: socialLinks ?? [],
  };
}

// ==========================================
// DASHBOARD PREVIEW
// ==========================================

export async function getMyPortfolioData(): Promise<PortfolioData | null> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    return null;
  }

  // Get current user's profile
  const {
    data: profile,
    error: profileError,
  } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (profileError) {
    if (profileError.code === "PGRST116") {
      return null;
    }

    throw profileError;
  }

  // Get skills
  const {
    data: skills,
    error: skillsError,
  } = await supabase
    .from("skills")
    .select("*")
    .eq("user_id", user.id)
    .order("display_order");

  if (skillsError) {
    throw skillsError;
  }

  // Get projects
  const {
    data: projects,
    error: projectsError,
  } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user.id)
    .order("display_order");

  if (projectsError) {
    throw projectsError;
  }

  // Get certificates
  const {
    data: certificates,
    error: certificatesError,
  } = await supabase
    .from("certificates")
    .select("*")
    .eq("user_id", user.id)
    .order("display_order");

  if (certificatesError) {
    throw certificatesError;
  }

  // Get social links
  const {
    data: socialLinks,
    error: socialLinksError,
  } = await supabase
    .from("social_links")
    .select("*")
    .eq("user_id", user.id)
    .order("display_order");

  if (socialLinksError) {
    throw socialLinksError;
  }

  return {
    profile,
    skills: skills ?? [],
    projects: projects ?? [],
    certificates: certificates ?? [],
    socialLinks: socialLinks ?? [],
  };
}