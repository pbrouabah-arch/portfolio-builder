import { PortfolioData } from "./portfolio";

export interface Portfolio {
  name: string;
  role: string;
  description: string;
  image: string;
  cv: string | null;

  skills: any[];
  projects: any[];
  certificates: any[];
  social: any[];

  stats: {
    title: string;
    number: string;
  }[];
}

export function mapPortfolio(data: PortfolioData): Portfolio {
  return {
    name: data.profile.full_name,

    role: data.profile.job_title ?? "",

    description: data.profile.about ?? "",

    image: data.profile.avatar_url || "/avatar-placeholder.png",

    cv: data.profile.resume_url,

    skills: data.skills ?? [],

    projects: data.projects ?? [],

    certificates: data.certificates ?? [],

    social: data.socialLinks ?? [],

    stats: [
      {
        title: "Projects",
        number: (data.projects ?? []).length.toString(),
      },
      {
        title: "Skills",
        number: (data.skills ?? []).length.toString(),
      },
      {
        title: "Certificates",
        number: (data.certificates ?? []).length.toString(),
      },
    ],
  };
}