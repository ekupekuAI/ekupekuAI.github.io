import { motion } from "motion/react";
import { TiltCard } from "./Interactive.jsx";
import { projects, moreProjects } from "../data.js";
import { useGithubRepos, useGithubContributions, repoStatus, relativeTime } from "../lib/api.js";

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

// Status is derived from the repo's last push (and whether a demo exists), never typed.
function Status({ status }) {
  if (!status) return null;
  const filled = status === "LIVE" || status === "BUILDING";
  return (
    <span className={`status${filled ? " on" : ""}`}>
      <i aria-hidden="true" />
      {status}
    </span>
  );
}

function levelFor(count) {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

// GitHub's contribution calendar for the last year, drawn from the live API.
function Activity() {
  const calendar = useGithubContributions();
  if (!calendar) return null;
  return (
    <motion.div
      className="activity"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7 }}
    >
      <p className="activity-label">
        <strong>{calendar.totalContributions}</strong> contributions on GitHub in the last year · live
      </p>
      <div
        className="activity-grid"
        role="img"
        aria-label={`${calendar.totalContributions} GitHub contributions in the last year`}
      >
        {calendar.weeks.map((week, wi) => (
          <div className="activity-week" key={wi}>
            {week.contributionDays.map((day) => (
              <span
                key={day.date}
                className={`activity-day l${levelFor(day.contributionCount)}`}
                title={`${day.contributionCount} contributions on ${day.date}`}
              />
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const github = useGithubRepos();
  const repoByName = new Map((github?.repos ?? []).map((r) => [r.name, r]));

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
          <p className="lede">
            Projects where the frontend, backend, database and AI genuinely have to talk to each other.
            {github ? " Status and last commit come straight from GitHub." : ""}
          </p>
        </motion.div>

        <motion.div className="projects-grid" variants={grid} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          {projects.map((p) => {
            const repo = p.repo ? repoByName.get(p.repo) : null;
            const status = repoStatus({ pushedAt: repo?.pushedAt, hasLive: !!p.live });
            const langs = p.repo ? github?.languages?.[p.repo] : null;
            return (
              <TiltCard className="project" key={p.title} variants={card}>
                <div className="project-top">
                  <span>{p.index}</span>
                  <span className="project-kind">
                    {p.kind}
                    <Status status={status} />
                  </span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <div className="tags">
                  {p.tags.map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>
                {(repo || langs?.length) && (
                  <p className="project-meta">
                    {langs?.length ? <span>{langs.join(" · ")}</span> : null}
                    {repo ? <span>last commit {relativeTime(repo.pushedAt)}</span> : null}
                  </p>
                )}
                <div className="project-links">
                  {p.live && (
                    <a className="project-link" href={p.live} target="_blank" rel="noreferrer">
                      Live demo <ArrowIcon />
                    </a>
                  )}
                  <a className="project-link" href={p.link} target="_blank" rel="noreferrer">
                    {p.linkLabel ?? "View on GitHub"} <ArrowIcon />
                  </a>
                </div>
              </TiltCard>
            );
          })}
        </motion.div>

        <Activity />

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
