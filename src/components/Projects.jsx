import { motion } from "motion/react";
import { TiltCard } from "./Interactive.jsx";
import { projects, moreProjects } from "../data.js";

const grid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const card = {
  hidden: { opacity: 0, y: 48, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.15, duration: 0.9 } },
};

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
);

export default function Projects() {
  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow">Selected work</span>
          <h2 className="h2" id="work-title">Things I've actually built.</h2>
          <p className="lede">Projects where the frontend, backend, database and AI genuinely have to talk to each other.</p>
        </motion.div>

        <motion.div className="projects-grid" variants={grid} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
          {projects.map((p) => (
            <TiltCard className="project" key={p.title} variants={card}>
              <div className="project-top">
                <span>{p.index}</span>
                <span>{p.kind}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              <div className="tags">
                {p.tags.map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
              <a className="project-link" href={p.link} target="_blank" rel="noreferrer">
                View on GitHub <ArrowIcon />
              </a>
            </TiltCard>
          ))}
        </motion.div>

        <motion.p
          className="more-projects"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Other things on the bench, some finished and some still ideas:{" "}
          {moreProjects.map((m, i) => (
            <span key={m}>
              {m}
              {i < moreProjects.length - 1 ? " · " : ""}
            </span>
          ))}
        </motion.p>
      </div>
    </section>
  );
}
