import { useEffect, useRef } from "react";

// Full-page interactive "neural network": drifting nodes, synapse lines between
// neighbours, signal pulses travelling along them. The cursor attracts nearby
// nodes and lights them up; a click fires a burst of signals from that spot.
// Pure canvas 2D — no React state on the hot path.
const LINK = 150; // max distance for a synapse
const MOUSE_R = 230; // cursor influence radius
const ACCENT = "34,197,94";
const SLATE = "148,163,184";

export default function NeuralBg() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let nodes = [];
    let pulses = [];
    let raf = 0;
    let running = true;
    const mouse = { x: -1e4, y: -1e4 };

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density scales with viewport area, capped so phones stay smooth.
      const count = Math.round(Math.min(150, (w * h) / 11000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1.2 + Math.random() * 1.6,
        e: 0, // excitement 0..1 (how "lit" the node is)
      }));
      pulses = [];
      if (reduced) draw(); // static render, no loop
    }

    function spawnPulse(a, b) {
      pulses.push({ a, b, t: 0, speed: 0.012 + Math.random() * 0.014 });
    }

    function nearestNeighbour(a) {
      let best = null;
      let bd = LINK * LINK;
      for (const b of nodes) {
        if (b === a) continue;
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < bd) {
          bd = d2;
          best = b;
        }
      }
      return best;
    }

    function step() {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;

        // cursor attraction + excitement
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < MOUSE_R * MOUSE_R) {
          const d = Math.sqrt(d2) || 1;
          const f = (1 - d / MOUSE_R) * 0.55;
          n.x += (dx / d) * f;
          n.y += (dy / d) * f;
          n.e = Math.min(1, n.e + 0.08);
        } else {
          n.e *= 0.94;
        }

        // wrap around the edges
        if (n.x < -20) n.x = w + 20;
        else if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        else if (n.y > h + 20) n.y = -20;
      }

      // ambient firing: an occasional random neuron signals its nearest neighbour
      if (Math.random() < 0.035) {
        const a = nodes[(Math.random() * nodes.length) | 0];
        const b = a && nearestNeighbour(a);
        if (b) spawnPulse(a, b);
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // synapses
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 >= LINK * LINK) continue;
          const t = 1 - Math.sqrt(d2) / LINK;
          const e = Math.max(a.e, b.e);
          ctx.strokeStyle = `rgba(${e > 0.05 ? ACCENT : SLATE},${(0.05 + t * 0.22) * (0.55 + e * 0.45)})`;
          ctx.lineWidth = 0.6 + e * 0.9;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
          // excited neurons fire along their synapses
          if (!reduced && e > 0.6 && Math.random() < 0.003) spawnPulse(a, b);
        }
      }

      // travelling signals
      pulses = pulses.filter((p) => p.t < 1);
      ctx.shadowColor = "#22c55e";
      for (const p of pulses) {
        p.t += p.speed;
        const x = p.a.x + (p.b.x - p.a.x) * p.t;
        const y = p.a.y + (p.b.y - p.a.y) * p.t;
        ctx.shadowBlur = 14;
        ctx.fillStyle = "rgba(134,239,172,0.95)";
        ctx.beginPath();
        ctx.arc(x, y, 1.9, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // neurons
      for (const n of nodes) {
        ctx.fillStyle = n.e > 0.05 ? `rgba(${ACCENT},${0.55 + n.e * 0.45})` : `rgba(${SLATE},0.5)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + n.e * 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function frame() {
      if (!running) return;
      step();
      draw();
      raf = requestAnimationFrame(frame);
    }

    const point = (e) => (e.touches ? e.touches[0] : e);
    const onMove = (e) => {
      const p = point(e);
      mouse.x = p.clientX;
      mouse.y = p.clientY;
    };
    const onLeave = () => {
      mouse.x = -1e4;
      mouse.y = -1e4;
    };
    const onClick = (e) => {
      if (reduced) return;
      const p = point(e);
      const near = nodes.filter((n) => {
        const dx = n.x - p.clientX;
        const dy = n.y - p.clientY;
        return dx * dx + dy * dy < MOUSE_R * MOUSE_R;
      });
      for (const a of near) {
        a.e = 1;
        for (const b of near) {
          if (a === b) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (dx * dx + dy * dy < LINK * LINK && Math.random() < 0.4) spawnPulse(a, b);
        }
      }
    };
    const onVisibility = () => {
      running = !document.hidden;
      if (running && !reduced) raf = requestAnimationFrame(frame);
      else cancelAnimationFrame(raf);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchstart", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("click", onClick);
    document.addEventListener("visibilitychange", onVisibility);
    if (!reduced) raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchstart", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("click", onClick);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="neural-bg" aria-hidden="true" />;
}
