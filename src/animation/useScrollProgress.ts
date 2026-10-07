import { useEffect } from "react";
import { useAppStore } from "../store/useAppStore";

/**
 * The only document-level scroll listener. It publishes a 0–1 CSS variable
 * consumed by the small navigation progress line, avoiding component re-renders
 * while the page scrolls.
 */
export function useScrollProgress() {
  const reducedMotion = useAppStore((state) => state.reducedMotion);

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const update = () => {
      frame = 0;
      const travel = root.scrollHeight - window.innerHeight;
      const progress = travel > 0 ? Math.min(1, Math.max(0, window.scrollY / travel)) : 0;
      root.style.setProperty("--scroll-progress", String(progress));
    };
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    if (reducedMotion) {
      root.style.setProperty("--scroll-progress", "0");
      return;
    }

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) cancelAnimationFrame(frame);
      root.style.removeProperty("--scroll-progress");
    };
  }, [reducedMotion]);
}
