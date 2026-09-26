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

## Structure
```
src/
  data.js                 all copy: projects, hackathons, skills (edit content here)
  App.jsx                 page composition + nav + progress bar
  styles.css              design tokens + all styling
  lib/useLenis.js         smooth scroll
  components/
    Hero.jsx / Hero3D.jsx kinetic title + Three.js knot driven by scroll
    Story.jsx             pinned section, blur/depth-of-field slide swap
    Projects.jsx          project grid with 3D tilt cards
    Sections.jsx          hackathons, skills marquee, contact
    NeuralBg.jsx          interactive neural-network canvas background
    Interactive.jsx       CursorGlow, Magnetic, TiltCard
```

Accessibility: honours `prefers-reduced-motion` (pinned scroll, 3D drift, marquee
and cursor effects are disabled), keyboard-focusable with visible focus rings,
≥44px tap targets, no horizontal scroll at 375px.
