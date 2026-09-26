import { useEffect } from "react";
import Lenis from "lenis";

// Jump to the section named in the URL hash once the page has rendered.
// The browser's own hash jump fires before React has mounted the sections,
// so on a direct link like /#work it finds nothing and lands at the top.
function scrollToHash(lenis) {
  const hash = window.location.hash;
  if (hash.length < 2) return;
  let target = null;
  try {
    target = document.querySelector(hash);
  } catch {
    return;
  }
  if (!target) return;
  if (lenis) lenis.scrollTo(target, { immediate: true });
  else target.scrollIntoView();
}

// Smooth (inertial) scrolling. Lenis drives window scroll itself, so Motion's
// useScroll keeps working unchanged. Skipped for reduced-motion users, who get
// native scrolling and native anchors.
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = setTimeout(() => scrollToHash(null), 50);
      return () => clearTimeout(t);
    }

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let frame;
    const loop = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    const t = setTimeout(() => scrollToHash(lenis), 50);

    // Lenis owns the scroll position, so a native "#section" jump is overwritten
    // on the next frame. Route in-page links through lenis.scrollTo instead.
    const onClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute("href");
      if (hash.length < 2) return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { duration: 1.4 });
      history.pushState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      clearTimeout(t);
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);
}
