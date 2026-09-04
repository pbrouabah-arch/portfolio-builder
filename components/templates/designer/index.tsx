import { Cormorant_Garamond, Inter } from "next/font/google";

import MarbleBackground from "./components/MarbleBackground";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import StatsNotes from "./components/StatsNotes";
import CVEnvelope from "./components/CVEnvelope";
import Social from "./components/Social";
import type { PortfolioData } from "./types";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export interface LavenderMemoriesTemplateProps {
  data: PortfolioData;
}

/**
 * "Lavender Memories" / "Analog Dreams" template.
 * A found box of old photographs — every section is a physical, tactile
 * object (a developing polaroid, a film strip, a sealed envelope) rather
 * than a card. Consumes only the mandatory portfolio data contract.
 */
export default function LavenderMemoriesTemplate({ data }: LavenderMemoriesTemplateProps) {
  return (
    <main
      className={`${cormorant.variable} ${inter.variable} relative min-h-screen`}
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <MarbleBackground />
      <Hero data={data} />
      <About data={data} />
      <Skills data={data} />
      <Projects data={data} />
      <Certificates data={data} />
      <StatsNotes data={data} />
      <CVEnvelope data={data} />
      <Social data={data} />
    </main>
  );
}
