import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "motion/react";
import { story } from "../data.js";

// Fraction of each slide's scroll window spent fully sharp and readable. The
// depth-of-field swap only happens in the remaining margin at either end, so the
// text never sits half-blurred while someone is reading it.
const HOLD = 0.62;

// Builds the keyframe input/output arrays for one slide. The first slide is
// already in place when the section pins (no blank screen on entry) and the last
// one stays in place until the section releases (no blank screen on exit).
function frames(i, count, hidden, shown, leaving) {
  const start = i / count;
  const end = (i + 1) / count;
  const pad = ((end - start) * (1 - HOLD)) / 2;
  const first = i === 0;
  const last = i === count - 1;
  return {
    input: [start, start + pad, end - pad, end],
    output: [first ? shown : hidden, shown, shown, last ? shown : leaving],
  };
}

// One slide of the pinned section. Each slide owns its own transforms, so the
// number of hooks is fixed per component (no hooks-in-a-loop).
function Slide({ item, i, count, progress }) {
  const b = frames(i, count, 18, 0, 18);
  const o = frames(i, count, 0, 1, 0);
  const yf = frames(i, count, 48, 0, -48);
  const sf = frames(i, count, 0.95, 1, 1.04);

  const blurPx = useTransform(progress, b.input, b.output);
  const filter = useMotionTemplate`blur(${blurPx}px)`;
  const opacity = useTransform(progress, o.input, o.output);
  const y = useTransform(progress, yf.input, yf.output);
  const scale = useTransform(progress, sf.input, sf.output);
  // Hidden slides should not intercept text selection or screen-reader focus order.
  const pointerEvents = useTransform(opacity, (v) => (v > 0.5 ? "auto" : "none"));

  return (
    <motion.div className="story-slide" style={{ filter, opacity, y, scale, pointerEvents }}>
      <div>
        <h2>
          {item.title[0]}
          <em>{item.title[1]}</em>
          {item.title[2]}
        </h2>
        <p>{item.body}</p>
      </div>
    </motion.div>
  );
}

export default function Story() {
  const ref = useRef(null);
  // Lenis already smooths the scroll itself; a second spring on top made the
  // slides trail behind the scroll position, so the raw progress is used.
  const { scrollYProgress: progress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Giant outlined word drifting slowly behind everything (parallax layer).
  const bgX = useTransform(progress, [0, 1], ["8%", "-8%"]);
  const bgIndex = useTransform(progress, (p) => Math.min(story.length - 1, Math.floor(p * story.length)));
  const bgWord = useTransform(bgIndex, (i) => story[i].bg);
  const counter = useTransform(bgIndex, (i) => `0${i + 1} / 0${story.length}`);

  return (
    <section className="story" ref={ref} aria-label="How I work">
      <div className="story-sticky">
        <motion.div className="story-bg" style={{ x: bgX }} aria-hidden="true">
          {bgWord}
        </motion.div>

        {story.map((item, i) => (
          <Slide key={item.bg} item={item} i={i} count={story.length} progress={progress} />
        ))}

        <motion.div className="story-index" aria-hidden="true">
          {counter}
        </motion.div>
      </div>
    </section>
  );
}
