import { Dancing_Script, Playfair_Display } from "next/font/google";

// Sweeping calligraphic script used for the hero name, section labels,
// and handwritten-style notes — scoped to this template only (see rule 21).
export const scriptFont = Dancing_Script({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

// Refined display serif used for section titles and headings.
export const serifFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});
