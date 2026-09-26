# ekansh — portfolio

Personal portfolio: scroll-driven storytelling with a 3D hero, pinned depth-of-field
sections, and an interactive neural-network background.

**Live:** https://ekupekuai.github.io

## Stack
React 19 · Vite · [Motion](https://motion.dev) (`motion/react`) for animation ·
[Lenis](https://lenis.darkroom.engineering) smooth scroll · Three.js via
`@react-three/fiber` + `@react-three/drei` for the hero object · Canvas 2D for the
neural network.

## Run locally
```bash
npm install
npm run dev
```

## Deploy
This repo uses two branches:

| branch   | contents                                   |
|----------|--------------------------------------------|
| `source` | this Vite project — **edit here**          |
| `main`   | built static output served by GitHub Pages |

To publish after a change:
```bash
bash deploy.sh
```

## Live data + contact form (the "API keys")
GitHub Pages is static, so nothing secret lives here. A small Next.js backend
(`ekupekuAI/portfolio`, deployed at `https://portfolio-a5y6.vercel.app`) holds the
Resend mail key and the GitHub token and exposes three CORS-enabled routes:

| route | used for |
|---|---|
| `POST /api/contact` | the contact form (Resend → your inbox) |
| `GET /api/github-repos` | project status badges, "last commit", languages, live strip |
| `GET /api/github-contributions` | the contribution graph |

Its address is `VITE_API_BASE` (see `.env.example`). Project status is derived from
the repo's last push (LIVE / BUILDING / ACTIVE / STABLE), never typed by hand.

To add a project: add an entry to `projects` in `src/data.js` with `repo` set to the
GitHub repo name; status, last commit and languages follow automatically.
To show the resume button: drop `public/resume.pdf` and set `profile.resume: "./resume.pdf"`.

## Structure
```
src/
  data.js                 all copy: profile, projects, hackathons, skills (edit content here)
  App.jsx                 page composition + nav + progress bar
  styles.css              design tokens + all styling
  lib/useLenis.js         smooth scroll
  lib/api.js              backend address, GitHub hooks, status derivation, sendContact
  components/
    Hero.jsx / Hero3D.jsx kinetic title + Three.js knot driven by scroll
    Story.jsx             pinned section, blur/depth-of-field slide swap
    Projects.jsx          project grid with 3D tilt cards, live status, contribution graph
    Sections.jsx          live strip, hackathons, skills marquee, contact form + links
    NeuralBg.jsx          interactive neural-network canvas background
    Interactive.jsx       CursorGlow, Magnetic, TiltCard
```

Accessibility: honours `prefers-reduced-motion` (pinned scroll, 3D drift, marquee
and cursor effects are disabled), keyboard-focusable with visible focus rings,
≥44px tap targets, no horizontal scroll at 375px.
