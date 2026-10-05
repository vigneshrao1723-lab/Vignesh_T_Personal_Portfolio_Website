import { useCallback, useEffect, useRef } from "react";
import { gsap } from "./gsap";
import { gsapEase } from "../lib/designTokens";
import { useAppStore } from "../store/useAppStore";

/**
 * Experience's card reveal (spec §5: "pinned/sticky deck interaction for
 * its timeline cards").
 *
 * A `ScrollTrigger pin:true + scrub` version was built and tested first.
 * Under automated repeated wheel/keyboard-scroll testing, `page.screenshot()`
 * started hanging once the page neared its scroll end. Chased this down
 * before concluding anything: `scrollY` "sticking" turned out to be the
 * page legitimately reaching `document.documentElement.scrollHeight -
 * clientHeight` (confirmed by reading `scrollHeight` directly), not a
 * frozen/broken scroll — the earlier "stuck scroll" read on that data was
 * wrong. The screenshot hang itself, though, showed up specifically under
 * rapid synthetic scroll events with the pin active, and did not reproduce
 * with the same gentle, proven verification method (`scrollIntoViewIfNeeded`
 * + a settle wait) used successfully everywhere else in this project. That
 * left real ambiguity about whether the pin was actually implicated or the
 * stress-test method itself was the problem — not enough confidence either
 * way to ship a pinned interaction. Given the explicit instruction to fall
 * back to a simpler presentation when pinning gets "awkward," this uses the
 * same non-pinned stagger-on-scroll pattern `useScrollReveal` uses for
 * About instead (kept as its own hook, not merged into it, since a card
 * animation isn't quite the same shape as a list of arbitrary DOM items) —
 * reuses the single `gsap`/`ScrollTrigger` instance from `./gsap`, no
 * second ticker.
 */
export function useExperienceDeck(cardCount: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const reducedMotion = useAppStore((state) => state.reducedMotion);

  const getCardRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      cardRefs.current[index] = el;
    },
    [],
  );

  useEffect(() => {
    const cards = cardRefs.current.slice(0, cardCount).filter(Boolean) as HTMLElement[];
    if (cards.length === 0) return;

    if (reducedMotion) {
      gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: gsapEase.signal,
          stagger: 0.12,
          scrollTrigger: { trigger: containerRef.current, start: "top 80%", once: true },
        },
      );
    });

    return () => ctx.revert();
  }, [reducedMotion, cardCount]);

  return { containerRef, getCardRef };
}
