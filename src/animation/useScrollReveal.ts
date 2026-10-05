import { useCallback, useEffect, useRef } from "react";
import { gsap } from "./gsap";
import { gsapEase } from "../lib/designTokens";
import { useAppStore } from "../store/useAppStore";

/**
 * Scroll-triggered counterpart to `useHeroEntrance`: Hero animates
 * immediately on mount (it's the first thing visible); a below-the-fold
 * section like About should reveal when scrolled into view instead. Reuses
 * the single `gsap`/`ScrollTrigger` instance from `./gsap` (already
 * registered once there) — no second ticker, no competing ScrollTrigger
 * setup. Same ref-callback-factory shape as `useHeroEntrance` for the same
 * reason (the hook-immutability lint rule requires the mutation to live in
 * the hook, not the caller).
 */
export function useScrollReveal<T extends HTMLElement>(itemCount: number) {
  const containerRef = useRef<T>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const reducedMotion = useAppStore((state) => state.reducedMotion);

  const getItemRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      itemRefs.current[index] = el;
    },
    [],
  );

  useEffect(() => {
    const items = itemRefs.current.slice(0, itemCount).filter(Boolean) as HTMLElement[];
    if (items.length === 0) return;

    if (reducedMotion) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: gsapEase.signal,
          stagger: 0.12,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );
    });

    // gsap.context tracks every tween/ScrollTrigger created inside its
    // callback and tears them all down on revert() — no manual
    // ScrollTrigger.kill() needed alongside it.
    return () => ctx.revert();
  }, [reducedMotion, itemCount]);

  return { containerRef, getItemRef };
}
