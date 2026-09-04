import { Caveat, Cormorant_Garamond } from "next/font/google";

// Handwritten accent used for the name, tags, and small notes —
// scoped to this template only (see rule 21).
export const scriptFont = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

// Warm editorial serif used for section titles.
export const serifFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
