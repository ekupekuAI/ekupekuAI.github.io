export const profile = {
  name: "Ekansh",
  kicker: "Computer Science Engineering · B.Tech",
  sub: "I'm a CS student who likes building the whole thing — the UI, the API, the database, and the AI parts in between — and then actually shipping it.",
  github: "https://github.com/ekupekuAI",
  linkedin: "https://www.linkedin.com/in/ekanshg2118/",
  // Optional — paste a full profile URL to show the button; leave "" to hide it.
  instagram: "",
  twitter: "",
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

export const projects = [
  {
    index: "01",
    kind: "Cybersecurity · System design",
    title: "SentinelID",
    body: "This came out of my SIH work and it's the project I think about most. Instead of only flagging when something in an AI or software supply chain looks wrong, it's built around proving things are right — integrity, evidence, traceability, tamper awareness. If you want to talk system design or security with me, start here.",
    tags: ["Threat-aware architecture", "Verification", "Supply-chain security", "AI security"],
    link: "https://github.com/ekupekuAI/Sentinel-ID",
  },
  {
    index: "02",
    kind: "Full-stack",
    title: "Student Command Center",
    body: "One dashboard for the things students end up juggling across five different apps. React on the front, FastAPI behind it, PostgreSQL underneath, with proper auth. This is the project where I really learned how the frontend, backend and database have to fit together.",
    tags: ["React", "FastAPI", "PostgreSQL", "Auth", "REST APIs"],
    link: "https://github.com/ekupekuAI/student-command-center",
  },
  {
    index: "03",
    kind: "Applied AI · Education",
    title: "AI Dropout Prediction & Counseling",
    body: "Spot students who are likely to drop out early, and — the part that actually matters — suggest what to do about it instead of just showing a red flag. Predictions, a dashboard, and recommendations per student.",
    tags: ["Predictive analytics", "Dashboards", "Recommendations"],
    link: "https://github.com/ekupekuAI",
  },
  {
    index: "04",
    kind: "Product · Social",
    title: "UNFILTERD",
    body: "A social platform idea I keep coming back to: what would a feed look like if it cared about how you're feeling instead of how long it can keep you scrolling? Part product design, part behavioural thinking, part AI.",
    tags: ["Product design", "Emotion-aware UX", "AI"],
    link: "https://github.com/ekupekuAI/Unfilterd",
  },
];

// Some finished, some still ideas — listed as such, nothing dressed up.
export const moreProjects = [
  "NyayaPath",
  "Smart Study Dashboard",
  "Student Finance Tracker",
  "AI Resume Detector",
  "KitchenEye",
];

export const hackathons = [
  {
    when: "2026",
    title: "NexVerse Hackathon — Aurora University",
    body: "Built and pitched a working prototype with a small team over the weekend, then defended it in front of the judges. We came third.",
    badge: "3rd Prize",
  },
  {
    when: "24 hrs",
    title: "College Hackathon — 200+ teams",
    body: "Blockchain + cybersecurity track. A team split across UI, research, QA and integration/backend, and one very long night.",
    badge: "Blockchain · Security",
  },
  {
    when: "Ongoing",
    title: "Smart India Hackathon problem statements",
    body: "I spend a lot of time reading SIH problem statements and asking the same three questions: what exists already, where does it fall short, and what would a genuinely different solution look like?",
    badge: "SIH",
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
