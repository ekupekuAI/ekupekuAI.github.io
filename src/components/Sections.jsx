import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Magnetic } from "./Interactive.jsx";
import { hackathons, marqueeA, marqueeB, skillTiers, profile, projects } from "../data.js";
import { useGithubRepos, useGithubContributions, relativeTime, sendContact } from "../lib/api.js";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const list = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

// A one-line status readout between the hero and the story. Every number is
// fetched from GitHub or counted from the project list; nothing is typed in.
export function LiveStrip() {
  const github = useGithubRepos();
  const calendar = useGithubContributions();
  if (!github && !calendar) return null;

  const latest = github?.repos?.[0]?.pushedAt;
  const liveCount = projects.filter((p) => p.live).length;
  const items = [
    github && { value: github.repos.length, label: "public repos" },
    calendar && { value: calendar.totalContributions, label: "contributions this year" },
    latest && { value: relativeTime(latest), label: "last commit" },
    { value: liveCount, label: liveCount === 1 ? "live demo" : "live demos" },
    { value: hackathons.length, label: "hackathon builds" },
  ].filter(Boolean);

  return (
    <motion.section
      className="live-strip"
      aria-label="Live status"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container live-strip-inner">
        <span className="live-dot">
          <i aria-hidden="true" /> Live from GitHub
        </span>
        {items.map((it) => (
          <span className="live-item" key={it.label}>
            <strong>{it.value}</strong> {it.label}
          </span>
        ))}
      </div>
    </motion.section>
  );
}

export function Hackathons() {
  return (
    <section className="section" id="hackathons" aria-labelledby="hack-title">
      <div className="container">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
          <span className="eyebrow">Under pressure</span>
          <h2 className="h2" id="hack-title">Hackathons and fast builds.</h2>
        </motion.div>

        <motion.div className="timeline" variants={list} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          {hackathons.map((h) => (
            <motion.div className="event" key={h.title} variants={reveal}>
              <span className="when">{h.when}</span>
              <div>
                <h3>{h.title}</h3>
                <p>{h.body}</p>
              </div>
              <span className="badge">{h.badge}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Two rows of type moving in opposite directions, driven by scroll —
// motion values only, never state, so it stays at 60fps.
function Row({ items, direction, progress, dim }) {
  const x = useTransform(progress, [0, 1], direction > 0 ? ["-12%", "6%"] : ["6%", "-12%"]);
  const doubled = [...items, ...items];
  return (
    <motion.div className="marquee" style={{ x }} aria-hidden="true">
      {doubled.map((s, i) => (
        <span key={`${s}-${i}`} className={dim && i % 2 ? "dim" : undefined}>
          {s}
          <span className="dot"> · </span>
        </span>
      ))}
    </motion.div>
  );
}

export function Skills() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section className="skills" id="skills" ref={ref} aria-labelledby="skills-title">
      <div className="container">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
          <span className="eyebrow">Toolkit</span>
          <h2 className="h2" id="skills-title">What I build with, honestly.</h2>
        </motion.div>
      </div>

      <div style={{ marginTop: "var(--space-5)" }}>
        <Row items={marqueeA} direction={1} progress={scrollYProgress} />
        <Row items={marqueeB} direction={-1} progress={scrollYProgress} dim />
      </div>

      <div className="container">
        <motion.div className="skills-legend" variants={list} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          {skillTiers.map((t) => (
            <motion.div key={t.label} variants={reveal}>
              <h3>{t.label}</h3>
              <p>{t.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M16 13H8M16 17H8" />
  </svg>
);

// Posts to the backend that holds the mail credentials; the page itself has no keys.
function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    const formEl = e.currentTarget; // captured before any await — stale after
    const form = new FormData(formEl);
    setStatus("sending");
    setError("");
    try {
      const data = await sendContact({
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        message: String(form.get("message") ?? ""),
        honeypot: String(form.get("company") ?? ""),
      });
      if (data?.ok) {
        setStatus("success");
        formEl.reset();
      } else {
        setStatus("error");
        setError(data?.error ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setError("Network error — please try again, or reach me on LinkedIn.");
    }
  }

  return (
    <motion.form className="form" onSubmit={onSubmit} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
      {/* honeypot: hidden from people, filled by bots */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      <div className="form-row">
        <label>
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" placeholder="Ada Lovelace" required />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
        </label>
      </div>
      <label>
        <span>Message</span>
        <textarea name="message" rows={6} placeholder="What are you building, and where could I help?" required />
      </label>
      <div className="form-actions">
        <Magnetic>
          <button className="btn primary" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
        </Magnetic>
        <p className="form-status" aria-live="polite">
          {status === "success" && <span className="ok">Thanks — your message is on its way.</span>}
          {status === "error" && <span className="err">{error}</span>}
        </p>
      </div>
    </motion.form>
  );
}

export function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
          <span className="eyebrow">Looking for</span>
          <h2 className="h2" id="contact-title">A software, full-stack, backend or AI engineering internship.</h2>
          <p className="lede" style={{ marginInline: "auto" }}>
            {profile.availability}. If you've got a hard problem and want someone who'll build the whole thing rather
            than one layer of it, I'd like to hear about it. Messages go straight to my inbox.
          </p>
        </motion.div>

        <ContactForm />

        <motion.div className="cta-row" variants={list} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Magnetic>
            <motion.a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer" variants={reveal}>
              <LinkedInIcon /> LinkedIn
            </motion.a>
          </Magnetic>
          <Magnetic>
            <motion.a className="btn" href={profile.github} target="_blank" rel="noreferrer" variants={reveal}>
              <GitHubIcon /> GitHub
            </motion.a>
          </Magnetic>
          {profile.instagram && (
            <Magnetic>
              <motion.a className="btn" href={profile.instagram} target="_blank" rel="noreferrer" variants={reveal}>
                <InstagramIcon /> Instagram
              </motion.a>
            </Magnetic>
          )}
          {profile.twitter && (
            <Magnetic>
              <motion.a className="btn" href={profile.twitter} target="_blank" rel="noreferrer" variants={reveal}>
                <XIcon /> X / Twitter
              </motion.a>
            </Magnetic>
          )}
          {profile.resume && (
            <Magnetic>
              <motion.a className="btn" href={profile.resume} download variants={reveal}>
                <FileIcon /> Resume
              </motion.a>
            </Magnetic>
          )}
        </motion.div>

        <div className="footer">
          <span>© {new Date().getFullYear()} EKANSH</span>
          <span>REACT · MOTION · THREE.JS · LIVE GITHUB DATA</span>
        </div>
      </div>
    </section>
  );
}
