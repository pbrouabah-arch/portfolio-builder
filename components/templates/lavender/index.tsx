import Navbar from "./Navbar";
import Background from "./Background";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Certificates from "./Certificates";
import Contact from "./Contact";
import Education from "./Education";
import Experience from "./Experience";
import Achievements from "./Achievements";

interface MinimalTemplateProps {
  data: any;
}

export default function MinimalTemplate({ data }: MinimalTemplateProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-transparent">
      <Background />
      <div className="relative z-10">
        <Navbar data={data} />
        <main>
          <Hero data={data} />
          <About data={data} />
          <Skills data={data} />
          <Education data={data} />
          <Experience data={data} />
          <Achievements data={data} />
          <Projects data={data} />
          <Certificates data={data} />
          <Contact data={data} />
        </main>
      </div>
    </div>
  );
}
