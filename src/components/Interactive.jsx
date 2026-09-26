import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";

// Only fine pointers (mouse / trackpad) get cursor-following effects.
function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return fine;
}

// Soft green light that trails the cursor. Motion values only — no re-renders.
export function CursorGlow() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 220, damping: 32, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 32, mass: 0.4 });

  useEffect(() => {
    if (!fine || reduced) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [fine, reduced, x, y]);

  if (!fine || reduced) return null;
  return <motion.div className="cursor-glow" style={{ x: sx, y: sy }} aria-hidden="true" />;
}

// Wraps anything so it is gently pulled toward the cursor while hovered.
export function Magnetic({ children, strength = 0.35, ...rest }) {
  const ref = useRef(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 20, mass: 0.5 });

  const onMove = (e) => {
    if (!fine || reduced) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy, display: "inline-block" }} onMouseMove={onMove} onMouseLeave={onLeave} {...rest}>
      {children}
    </motion.div>
  );
}

// A card that tilts in 3D toward the cursor. Forwards Motion props (variants etc.)
// so it still participates in the parent's stagger.
export function TiltCard({ children, max = 9, style, ...rest }) {
  const ref = useRef(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 200, damping: 24 });
  const sy = useSpring(py, { stiffness: 200, damping: 24 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const lift = useTransform([sx, sy], ([a, b]) => (Math.abs(a - 0.5) + Math.abs(b - 0.5) > 0.02 ? -6 : 0));

  const onMove = (e) => {
    if (!fine || reduced) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.article
      ref={ref}
      style={{ rotateX, rotateY, y: lift, transformStyle: "preserve-3d", ...style }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...rest}
    >
      {children}
    </motion.article>
  );
}
