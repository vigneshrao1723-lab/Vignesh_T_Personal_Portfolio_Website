import { create } from "zustand";

interface AppState {
  /** Synced from `(prefers-reduced-motion: reduce)`; gates camera drift, parallax, and marquee motion. */
  reducedMotion: boolean;
  setReducedMotion: (reducedMotion: boolean) => void;

  /** Id of the section currently in view, driven by scroll/ScrollTrigger. Null before the first section mounts. */
  activeSection: string | null;
  setActiveSection: (activeSection: string | null) => void;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const useAppStore = create<AppState>((set) => ({
  // Read synchronously at store creation (this is a client-only SPA, no SSR)
  // so the first render already reflects the OS preference — avoids Lenis
  // being created and immediately torn down on mount.
  reducedMotion: prefersReducedMotion(),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),

  activeSection: null,
  setActiveSection: (activeSection) => set({ activeSection }),
}));
