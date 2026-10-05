import { useEffect, useRef, useState } from "react";

/**
 * True once the element has come within `rootMargin` of the viewport, and stays
 * true afterwards (it is a "mount me" latch, not a visibility tracker). Used to
 * keep the ~900 kB Three.js chunk off the first paint: a project canvas is only
 * mounted — and its lazy chunk only requested — as its card approaches.
 * Falls back to true where IntersectionObserver is missing, so nothing is lost.
 */
export function useNearViewport<T extends HTMLElement>(rootMargin = "600px 0px") {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    const el = ref.current;
    if (near || !el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [near, rootMargin]);

  return { ref, near };
}
