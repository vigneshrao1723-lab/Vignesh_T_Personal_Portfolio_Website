import { useEffect, useState } from "react";

const QUERY = "(hover: hover) and (pointer: fine)";

/**
 * Phase 7 responsive/touch fix. `useArtifactMotion`'s hover-rotation
 * (`onPointerOver`/`onPointerOut`) assumes a device that reliably pairs the
 * two events. Touch devices don't: a tap fires `pointerover` but many
 * mobile browsers never fire the matching `pointerout` without a second,
 * deliberate tap elsewhere — which would leave a project artifact spinning
 * indefinitely (a continuous `frameloop="demand"` invalidate loop with no
 * natural end), exactly the "continuous animation loop on mobile" this
 * phase's touch-behavior requirement rules out. `(hover: hover) and
 * (pointer: fine)` is the standard media-feature check for "this device has
 * real hover," used to gate the hover handlers off entirely on touch —
 * project cards stay fully readable and functional there, they just don't
 * spin, matching "do not invent unnecessary mobile interactions."
 */
export function useHasHover(): boolean {
  const [hasHover, setHasHover] = useState(
    () => typeof window !== "undefined" && window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY);
    const handleChange = (event: MediaQueryListEvent) => setHasHover(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return hasHover;
}
