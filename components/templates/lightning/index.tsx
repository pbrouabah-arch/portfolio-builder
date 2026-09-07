import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Education from "./Education";
import Achievements from "./Achievements";
import Skills from "./Skills";
import Projects from "./Projects";
import Certificates from "./Certificates";
import Contact from "./Contact";
import styles from "./gothic.module.css";

interface GothicTemplateProps {
  data: any;
}

export default function GothicTemplate({ data }: GothicTemplateProps) {
  return (
    <main className={styles.site}>
      <Navbar data={data} />

      <div className={styles.page}>
        <Hero data={data} />
        <About data={data} />
        <Experience data={data} />
        <Education data={data} />
        <Achievements data={data} />
        <Skills data={data} />
        <Projects data={data} />
        <Certificates data={data} />
        <Contact data={data} />
      </div>
    </main>
  );
}
