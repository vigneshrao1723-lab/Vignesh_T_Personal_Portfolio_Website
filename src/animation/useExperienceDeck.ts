import { useCallback, useEffect, useRef } from "react";
import { gsap } from "./gsap";
import { gsapEase } from "../lib/designTokens";
import { useAppStore } from "../store/useAppStore";

/**
 * Experience has one reveal hierarchy and a separate, nested depth layer.
 * Keeping the reveal and scroll-linked transforms on different elements
 * avoids competing writes to the same transform property.
 */
export function useExperienceDeck(columnCount: number) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardMotionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const columnMotionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useAppStore((state) => state.reducedMotion);

  const getColumnMotionRef = useCallback((index: number) => (element: HTMLDivElement | null) => {
    columnMotionRefs.current[index] = element;
  }, []);
  const getColumnRef = useCallback((index: number) => (element: HTMLDivElement | null) => {
    columnRefs.current[index] = element;
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cardMotion = cardMotionRef.current;
    const card = cardRef.current;
    const header = headerRef.current;
    const columns = columnRefs.current.slice(0, columnCount).filter(Boolean) as HTMLDivElement[];
    const columnMotion = columnMotionRefs.current.slice(0, columnCount).filter(Boolean) as HTMLDivElement[];
    if (!section || !heading || !cardMotion || !card || !header) return;

    if (reducedMotion) {
      gsap.set([heading, card, header, ...columns, cardMotion, ...columnMotion], {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
      });
      return;
    }

    const compact = window.matchMedia("(max-width: 767px)").matches;
    const ctx = gsap.context(() => {
      const entrance = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 74%", once: true },
      });
      entrance
        .fromTo(heading, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: gsapEase.signal })
        .fromTo(card, { autoAlpha: 0, y: compact ? 14 : 18 }, { autoAlpha: 1, y: 0, duration: 0.72, ease: gsapEase.signal }, "-=0.32")
        .fromTo(header, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: gsapEase.signal }, "-=0.5")
        .fromTo(columns, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.52, ease: gsapEase.signal, stagger: 0.08 }, "-=0.34");

      gsap.to(cardMotion, {
        y: compact ? -2 : -6,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 0.45 },
      });

      columnMotion.forEach((column, index) => {
        const depth = compact ? 0 : (index - 1) * 2;
        if (depth === 0) return;
        gsap.to(column, {
          y: depth,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 0.45 },
        });
      });
    }, section);

    return () => ctx.revert();
  }, [columnCount, reducedMotion]);

  return {
    sectionRef,
    headingRef,
    cardMotionRef,
    cardRef,
    headerRef,
    getColumnMotionRef,
    getColumnRef,
  };
}
