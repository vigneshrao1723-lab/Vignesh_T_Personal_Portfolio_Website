import { useEffect, useState } from "react";

const QUERY = "(hover: hover) and (pointer: fine)";

/** Detects a primary input that can safely support cursor-only interactions. */
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
