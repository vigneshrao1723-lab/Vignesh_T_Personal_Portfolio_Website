import { useEffect, useRef } from "react";
import { gsap } from "./gsap";
import { useAppStore } from "../store/useAppStore";

/**
 * A separate transform layer for Hero scrolling. The ID card owns its inner
 * pendulum transform, so this hook moves only an outer wrapper and cannot
 * override dragging or release physics.
 */
export function useHeroScrollTransition() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useAppStore((state) => state.reducedMotion);

  useEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current;
    const card = cardRef.current;
    if (!hero || !content || !card) return;

    if (reducedMotion) {
      gsap.set([content, card], { clearProps: "transform,opacity" });
      return;
    }

    const compact = window.matchMedia("(max-width: 767px)").matches;
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.35,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(content, { y: compact ? -16 : -32, opacity: 0.72, ease: "none" }, 0)
        .to(card, { y: compact ? -10 : -26, rotation: compact ? 1.25 : 2.75, ease: "none" }, 0);
    }, hero);

    return () => ctx.revert();
  }, [reducedMotion]);

  return { heroRef, contentRef, cardRef };
}
