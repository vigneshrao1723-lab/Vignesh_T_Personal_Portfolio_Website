import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";
import { useAppStore } from "../store/useAppStore";

/**
 * Drives Lenis from GSAP's ticker and keeps ScrollTrigger in sync, per spec
 * §5: "scroll position and camera position are the same timeline, not two
 * separate systems." Disabled under reduced motion, per spec §5.
 */
export function useSmoothScroll() {
  const reducedMotion = useAppStore((state) => state.reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;

    // `anchors: true` makes in-page links (the nav, the skip link) glide
    // instead of jumping — without it Lenis only smooths wheel/touch input
    // and `#section` clicks are instant native jumps. Under reduced motion
    // Lenis isn't created at all, so those links stay instant (intended).
    const lenis = new Lenis({ autoRaf: false, anchors: true });
    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, [reducedMotion]);
}
