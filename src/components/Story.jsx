import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "motion/react";
import { story } from "../data.js";

// One slide of the pinned section. Each slide owns its own transforms, so the
// number of hooks is fixed per component (no hooks-in-a-loop).
function Slide({ item, i, count, progress }) {
  const centre = (i + 0.5) / count;
  const half = 0.5 / count;

  // Sharp + solid at the centre of its scroll window; blurred + faded either side.
  const blurPx = useTransform(progress, [centre - half, centre, centre + half], [22, 0, 22]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;
  const opacity = useTransform(progress, [centre - half, centre - half * 0.45, centre + half * 0.45, centre + half], [0, 1, 1, 0]);
  const y = useTransform(progress, [centre - half, centre, centre + half], [60, 0, -60]);
  const scale = useTransform(progress, [centre - half, centre, centre + half], [0.92, 1, 1.06]);

  return (
    <motion.div className="story-slide" style={{ filter, opacity, y, scale }} aria-hidden={false}>
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.5 });

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
