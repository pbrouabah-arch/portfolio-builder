import { Cinzel, UnifrakturMaguntia } from "next/font/google";

export const scriptFont = UnifrakturMaguntia({
  subsets: ["latin"],
  weight: "400",
});

export const serifFont = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});
