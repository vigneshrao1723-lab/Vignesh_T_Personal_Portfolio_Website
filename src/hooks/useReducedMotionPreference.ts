import { useEffect } from "react";
import { useAppStore } from "../store/useAppStore";

const QUERY = "(prefers-reduced-motion: reduce)";

/** Keeps `useAppStore().reducedMotion` in sync with the OS-level preference. */
export function useReducedMotionPreference() {
  const setReducedMotion = useAppStore((state) => state.setReducedMotion);

  useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY);
    setReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [setReducedMotion]);
}
