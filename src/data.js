export const profile = {
  name: "Ekansh",
  kicker: "Computer Science Engineering · B.Tech",
  sub: "I'm a CS student who likes building the whole thing — the UI, the API, the database, and the AI parts in between — and then actually shipping it.",
  github: "https://github.com/ekupekuAI",
  linkedin: "https://www.linkedin.com/in/gingamekansh/",
  instagram: "https://instagram.com/whyalways.ekansh",
  twitter: "https://twitter.com/Ekanshxd",
  // Drop a PDF in public/ (e.g. public/resume.pdf) and set "./resume.pdf" to show the button.
  resume: "",
  availability: "Open to 2026 internships",
};

// The pinned section that plays as you scroll.
export const story = [
  {
    bg: "BUILD",
    title: ["I build software ", "end-to-end", "."],
    body: "I don't really think of myself as a React person or a Python person. I'd rather understand the problem, pick whatever fits, wire the pieces together, and get it in front of someone.",
  },
  {
    bg: "STACK",
    title: ["UI → API → backend → DB → ", "AI model", " → deploy."],
    body: "Most of my projects look the same underneath: React or plain JS up front, Node or FastAPI behind it, Postgres or Supabase for data, and an LLM somewhere in the loop when it genuinely earns its place.",
  },
  {
    bg: "SOLVE",
    title: ["I do my best work when nobody has ", "defined the problem", " yet."],
    body: "Hackathons, vague briefs, SIH problem statements. I like digging into what already exists, finding where it falls short, and building something that's actually different.",
  },
];

// `repo` is the GitHub repo name: status, "last commit" and languages are pulled live
// from GitHub for it. `live` is a public demo. Nothing here is a claim that can't be
// checked against the repo.
export const projects = [
  {
    index: "01",
    kind: "AI security · SIH",
    title: "TrustVision",
    body: "Built for a Smart India Hackathon problem statement. Defense computer-vision pipelines run air-gapped, so nothing online can tell you whether a dataset, a model, or an output was tampered with. TrustVision inspects all three offline — duplicates, backdoors, out-of-distribution inputs — and issues a signed, evidence-backed trust verdict with a tamper-proof audit log.",
    tags: ["Air-gapped", "Model integrity", "Backdoor / OOD detection", "Signed verdicts", "Audit log"],
    link: "https://github.com/ekupekuAI/AISecurity26228",
    repo: "AISecurity26228",
  },
  {
    index: "02",
    kind: "Legal AI · Live demo",
    title: "NyayaPath",
    body: "Court case updates are written for the system, not for the citizen the case is about. NyayaPath turns each update into a timeline, a plain-language explanation, and the next known step. Independent, runs on synthetic demo data, and explicitly not legal advice.",
    tags: ["Timeline", "Plain-language explanation", "Next step", "Synthetic data"],
    link: "https://github.com/ekupekuAI/NyayaPath",
    live: "https://nyaya-path-coral.vercel.app",
    repo: "NyayaPath",
  },
  {
    index: "03",
    kind: "AI agent · Recruiting",
    title: "HireFlow",
    body: "A glass-box, bias-aware recruiting agent built for the AI Agent Hackathon 2026. Upload a job description and resumes; get an evidence-cited ranked shortlist, auto-generated interview kits, natural-language Q&A over the candidate pool, and a Blind Mode that shows where hiring bias is creeping in.",
    tags: ["LLM agent", "Evidence-cited ranking", "Interview kits", "Blind mode"],
    link: "https://github.com/ekupekuAI/Hireflow",
    repo: "Hireflow",
  },
  {
    index: "04",
    kind: "Cybersecurity · Supply chain",
    title: "SentinelID",
    body: "Instead of only flagging when something in an AI or software supply chain looks wrong, it's built around proving things are right — integrity, evidence, traceability, tamper awareness for every component a project depends on. If you want to talk system design or security with me, start here.",
    tags: ["Threat-aware architecture", "Verification", "Supply-chain security", "AI security"],
    link: "https://github.com/ekupekuAI/Sentinel-ID",
    repo: "Sentinel-ID",
  },
  {
    index: "05",
    kind: "Full-stack",
    title: "Student Command Center",
    body: "One dashboard for the things students end up juggling across five different apps. React on the front, FastAPI behind it, PostgreSQL underneath, JWT auth, per-user data isolation and production-hardened rate limiting, plus a per-user AI study assistant. The project where I really learned how the frontend, backend and database have to fit together.",
    tags: ["React", "FastAPI", "PostgreSQL", "JWT auth", "Rate limiting"],
    link: "https://github.com/ekupekuAI/student-command-center",
    repo: "student-command-center",
  },
  {
    index: "06",
    kind: "Full-stack · Healthcare",
    title: "Health Record System",
    body: "A health-record management prototype with role-based access for patients, doctors and admins: appointment booking, a medical records timeline, and prescription management. React + Flask + MongoDB. My first complete system, and the one that taught me why roles and data boundaries matter.",
    tags: ["React", "Flask", "MongoDB", "Role-based access"],
    link: "https://github.com/ekupekuAI/Health-Record-System",
    repo: "Health-Record-System",
  },
  {
    index: "07",
    kind: "Applied AI · Education",
    title: "AI Dropout Prediction & Counseling",
    body: "Spot students who are likely to drop out early, and — the part that actually matters — suggest what to do about it instead of just showing a red flag. Predictions, a dashboard, and recommendations per student.",
    tags: ["Predictive analytics", "Dashboards", "Recommendations"],
    // No public repo for this one yet; links to the profile until there is.
    link: "https://github.com/ekupekuAI",
    linkLabel: "GitHub profile",
  },
  {
    index: "08",
    kind: "Product · Social",
    title: "UNFILTERD",
    body: "A social platform idea I keep coming back to: what would a feed look like if it cared about how you're feeling instead of how long it can keep you scrolling? Part product design, part behavioural thinking, part AI.",
    tags: ["Product design", "Emotion-aware UX", "AI"],
    link: "https://github.com/ekupekuAI/Unfilterd",
    repo: "Unfilterd",
  },
];

// Some finished, some still ideas — listed as such, nothing dressed up.
export const moreProjects = ["Smart Study Dashboard", "Student Finance Tracker", "AI Resume Detector", "KitchenEye"];

export const hackathons = [
  {
    when: "2026",
    title: "NexVerse Hackathon — Aurora University",
    body: "Built and pitched a working prototype with a small team over the weekend, then defended it in front of the judges. We came third.",
    badge: "3rd Prize",
  },
  {
    when: "2026",
    title: "AI Agent Hackathon — HireFlow",
    body: "A glass-box recruiting agent: evidence-cited shortlists, generated interview kits, and a Blind Mode that surfaces bias instead of hiding it.",
    badge: "AI agents",
  },
  {
    when: "24 hrs",
    title: "College Hackathon — 200+ teams",
    body: "Blockchain + cybersecurity track. A team split across UI, research, QA and integration/backend, and one very long night.",
    badge: "Blockchain · Security",
  },
  {
    when: "SIH",
    title: "Smart India Hackathon — TrustVision",
    body: "Took an SIH problem statement on AI security and built TrustVision: offline integrity assurance for defense computer-vision pipelines, from detection to a signed verdict and audit log.",
    badge: "AI security",
  },
];

// Two marquee rows. Tiered honestly in the legend below them.
export const marqueeA = ["Python", "Java", "JavaScript", "React", "Node.js", "FastAPI", "PostgreSQL", "Supabase", "REST APIs", "SQL", "Git"];
export const marqueeB = ["LLM APIs", "RAG", "LangChain", "AI agents", "Ollama", "OpenRouter", "Prompt engineering", "TypeScript", "Tailwind", "Vercel"];

export const skillTiers = [
  {
    label: "Use every week",
    body: "Python · Java · JavaScript · SQL · React · Node.js · FastAPI · PostgreSQL / Supabase · REST APIs · Git",
  },
  {
    label: "AI I've actually shipped with",
    body: "LLM APIs · RAG · LangChain · agents · local models with Ollama · OpenRouter · prompt engineering",
  },
  {
    label: "Have used, still learning",
    body: "TypeScript · Next.js · Tailwind · Bash / PowerShell · C/C++ basics · security-minded system design · blockchain concepts",
  },
  {
    label: "Working on right now",
    body: "DSA · system design · production backend work · testing · Docker · CI/CD",
  },
];
