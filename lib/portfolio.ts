import { supabase } from "./supabase";

export interface PortfolioData {
  profile: any;
  skills: any[];
  projects: any[];
  certificates: any[];
  achievements: any[];
  education: any[];
  experience: any[];
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

  // Skills
  const { data: skills } = await supabase
    .from("skills")
    .select("*")
    .eq("user_id", profile.user_id)
    .order("display_order");

  // Projects
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", profile.user_id)
    .order("display_order");

  // Certificates
  const { data: certificates } = await supabase
    .from("certificates")
    .select("*")
    .eq("user_id", profile.user_id)
    .order("display_order");

  // Achievements
  const { data: achievements } = await supabase
    .from("achievements")
    .select("*")
    .eq("user_id", profile.user_id)
    .order("display_order");

  // Education
  const { data: education } = await supabase
    .from("education")
    .select("*")
    .eq("user_id", profile.user_id)
    .order("display_order");

  // Experience
  const { data: experience } = await supabase
    .from("experience")
    .select("*")
    .eq("user_id", profile.user_id)
    .order("display_order");

  // Social links
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
    achievements: achievements ?? [],
    education: education ?? [],
    experience: experience ?? [],
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

  // Profile
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

  // Skills
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

  // Projects
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

  // Certificates
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

  // Achievements
  const {
    data: achievements,
    error: achievementsError,
  } = await supabase
    .from("achievements")
    .select("*")
    .eq("user_id", user.id)
    .order("display_order");

  if (achievementsError) {
    throw achievementsError;
  }

  // Education
  const {
    data: education,
    error: educationError,
  } = await supabase
    .from("education")
    .select("*")
    .eq("user_id", user.id)
    .order("display_order");

  if (educationError) {
    throw educationError;
  }

  // Experience
  const {
    data: experience,
    error: experienceError,
  } = await supabase
    .from("experience")
    .select("*")
    .eq("user_id", user.id)
    .order("display_order");

  if (experienceError) {
    throw experienceError;
  }

  // Social links
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
    achievements: achievements ?? [],
    education: education ?? [],
    experience: experience ?? [],
    socialLinks: socialLinks ?? [],
  };
}