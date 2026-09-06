export interface Template {
  id: string;
  name: string;
  slug: string;
  description: string;
  preview: string;
  premium: boolean;
  available: boolean;
}

export const templates: Template[] = [
  {
    id: "minimal",
    name: "Minimal",
    slug: "minimal",
    description:
      "A clean and elegant portfolio focused on simplicity and readability.",
    preview: "/templates/minimal.png",
    premium: false,
    available: true,
  },

  {
    id: "lavender",
    name: "Lavender",
    slug: "lavender",
    description:
      "A nostalgic editorial portfolio inspired by film photography, handwritten notes, and lavender tones.",
    preview: "/templates/lavender.png",
    premium: false,
    available: true,
  },
  {
    id: "lightning",
    name: "Lightning",
    slug: "lightning",
    description:
      "A dynamic portfolio template that captures the energy and excitement of modern design.",
    preview: "/templates/lightning.png",
    premium: false,
    available: true,
  },

];