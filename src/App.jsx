import { motion, useScroll, useSpring } from "motion/react";
import { useLenis } from "./lib/useLenis.js";
import NeuralBg from "./components/NeuralBg.jsx";
import { CursorGlow } from "./components/Interactive.jsx";
import Hero from "./components/Hero.jsx";
import Story from "./components/Story.jsx";
import Projects from "./components/Projects.jsx";
import { Hackathons, Skills, Contact } from "./components/Sections.jsx";
import { profile } from "./data.js";

export default function App() {
  useLenis();
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  return (
    <>
      <NeuralBg />
      <CursorGlow />
      <motion.div className="progress" style={{ scaleX: bar }} aria-hidden="true" />

      <nav className="nav" aria-label="Primary">
        <a href="#top">{profile.name}</a>
        <div className="links">
          <a href="#work">Work</a>
          <a href="#hackathons">Hackathons</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <main id="top">
        <Hero />
        <Story />
        <Projects />
        <Hackathons />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
