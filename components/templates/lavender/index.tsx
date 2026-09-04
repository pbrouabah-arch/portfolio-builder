import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Certificates from "./Certificates";
import Contact from "./Contact";

interface MinimalTemplateProps {
  data: any;
}

export default function MinimalTemplate({
  data,
}: MinimalTemplateProps) {
  return (
    <>
      <Navbar data={data} />

      <Hero data={data} />

      <About data={data} />

      <Skills data={data} />

      <Projects data={data} />

      <Certificates data={data} />

      <Contact data={data} />
    </>
  );
}