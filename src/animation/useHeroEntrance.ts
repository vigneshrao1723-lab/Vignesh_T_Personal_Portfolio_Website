import { useCallback, useEffect, useRef } from "react";
import { gsap } from "./gsap";
import { gsapEase } from "../lib/designTokens";
import { useAppStore } from "../store/useAppStore";

/**
 * DOM half of the Hero entrance (spec §5: typography reveal timed with the
 * ID card settling into place). Returns a ref-callback factory to attach to
 * each element in reveal order (`getItemRef(0)`, `getItemRef(1)`, ...) —
 * the ref array itself stays private to this hook, since
 * eslint-plugin-react-hooks' immutability rule (React Compiler-oriented)
 * disallows mutating a hook-returned ref from the calling component; the
 * mutation has to live in the closure the hook constructs. Skips straight
 * to the final, visible state under reduced motion rather than animating —
 * the loading→loaded transition itself is the only motion spec §5 allows
 * there, and this project treats "appear immediately, fully visible" as
 * satisfying that, not an elaborate reveal.
 */
export function useHeroEntrance(itemCount: number) {
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

    const tween = gsap.fromTo(
      items,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.9, ease: gsapEase.signal, stagger: 0.12 },
    );

    return () => {
      tween.kill();
    };
  }, [reducedMotion, itemCount]);

  return getItemRef;
}
