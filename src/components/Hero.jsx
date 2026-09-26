import { useRef, Suspense, lazy } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "motion/react";
import { profile } from "../data.js";

// Three.js is the heaviest dependency by far; splitting it out keeps the
// first paint fast and lets the 3D object stream in a moment later.
const Hero3D = lazy(() => import("./Hero3D.jsx"));

const title = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.15 } },
};
const char = {
  hidden: { y: "110%", rotate: 6 },
  visible: { y: 0, rotate: 0, transition: { type: "spring", bounce: 0.18, duration: 0.9 } },
};

export default function Hero() {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  // 0 at the top of the page → 1 when the hero has scrolled fully away.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.6 });

  // The type recedes and blurs as the object sinks — same depth-of-field idea as the reference.
  const titleY = useTransform(progress, [0, 1], ["0%", "-30%"]);
  const titleScale = useTransform(progress, [0, 1], [1, 0.82]);
  const titleOpacity = useTransform(progress, [0, 0.7], [1, 0]);
  const titleBlur = useTransform(progress, [0, 0.7], ["blur(0px)", "blur(16px)"]);
  const canvasOpacity = useTransform(progress, [0.5, 1], [1, 0]);
  const cueOpacity = useTransform(progress, [0, 0.2], [1, 0]);

  return (
    <section className="hero" ref={ref} aria-label="Intro">
      <motion.div className="hero-canvas" style={{ opacity: canvasOpacity }} aria-hidden="true">
        <Suspense fallback={null}>
          <Hero3D progress={progress} reduced={!!reduced} />
        </Suspense>
      </motion.div>

      <motion.div
        className="hero-inner"
        style={{ y: titleY, scale: titleScale, opacity: titleOpacity, filter: titleBlur }}
      >
        <motion.p
          className="hero-kicker"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          {profile.kicker}
        </motion.p>

        <motion.h1 className="hero-title" variants={title} initial="hidden" animate="visible" aria-label={profile.name}>
          {profile.name.split("").map((c, i) => (
            <motion.span className="char" key={i} variants={char} aria-hidden="true">
              {c}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <strong>Software + AI builder.</strong> {profile.sub.replace("Software + AI builder. ", "")}
        </motion.p>
      </motion.div>

      <motion.div className="scroll-cue" style={{ opacity: cueOpacity }} aria-hidden="true">
        <span>Scroll</span>
        <motion.span
          className="line"
          animate={reduced ? {} : { scaleY: [0.2, 1, 0.2] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
