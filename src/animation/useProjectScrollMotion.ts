import { useCallback, useEffect, useRef } from "react";
import { gsap } from "./gsap";
import { gsapEase } from "../lib/designTokens";
import { useAppStore } from "../store/useAppStore";

/** Entrance hierarchy plus a restrained, scroll-linked artwork treatment. */
export function useProjectScrollMotion(projectCount: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const artworkRefs = useRef<(HTMLDivElement | null)[]>([]);
  const copyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useAppStore((state) => state.reducedMotion);

  const getCardRef = useCallback((index: number) => (element: HTMLDivElement | null) => {
    cardRefs.current[index] = element;
  }, []);
  const getArtworkRef = useCallback((index: number) => (element: HTMLDivElement | null) => {
    artworkRefs.current[index] = element;
  }, []);
  const getCopyRef = useCallback((index: number) => (element: HTMLDivElement | null) => {
    copyRefs.current[index] = element;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const heading = headingRef.current;
    const cards = cardRefs.current.slice(0, projectCount).filter(Boolean) as HTMLDivElement[];
    const artworks = artworkRefs.current.slice(0, projectCount).filter(Boolean) as HTMLDivElement[];
    const copies = copyRefs.current.slice(0, projectCount).filter(Boolean) as HTMLDivElement[];
    if (!container || !heading || cards.length === 0) return;

    if (reducedMotion) {
      gsap.set([heading, ...cards, ...artworks, ...copies], { opacity: 1, x: 0, y: 0, scale: 1 });
      return;
    }

    const compact = window.matchMedia("(max-width: 767px)").matches;
    const ctx = gsap.context(() => {
      const entrance = gsap.timeline({
        scrollTrigger: { trigger: container, start: "top 74%", once: true },
      });
      entrance
        .fromTo(heading, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: gsapEase.signal })
        .fromTo(cards, { autoAlpha: 0, y: compact ? 14 : 20 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: gsapEase.signal, stagger: 0.1 }, "-=0.34")
        .fromTo(copies, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: gsapEase.signal, stagger: 0.1 }, "-=0.52");

      artworks.forEach((artwork, index) => {
        const card = cards[index];
        if (!card) return;
        gsap.fromTo(
          artwork,
          { autoAlpha: 0.72, scale: 0.96 },
          {
            autoAlpha: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "center 55%",
              scrub: 0.35,
            },
          },
        );
      });
    }, container);

    return () => ctx.revert();
  }, [projectCount, reducedMotion]);

  return { containerRef, headingRef, getArtworkRef, getCardRef, getCopyRef };
}
