import { useEffect, useState } from "react";

const QUERY = "(max-width: 767px)"; // below Tailwind's `md`

/**
 * Drives 3D complexity tiering for the project canvases (spec §11: mobile is
 * a distinct tier, not a scaled-down desktop). Not in the Zustand store:
 * nothing else needs it — promote it there if a later section does.
 */
export function useIsMobileViewport(): boolean {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    // Initial value already comes from the lazy useState initializer above
    // (no async gap for it to go stale before this effect commits) — this
    // only needs to subscribe to subsequent changes, not set state directly.
    const mediaQuery = window.matchMedia(QUERY);
    const handleChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
}
