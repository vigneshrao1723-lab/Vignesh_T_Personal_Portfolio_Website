import { create } from "zustand";

export type Theme = "light" | "dark";
export const THEME_STORAGE_KEY = "vignesh-portfolio-theme";

interface AppState {
  /** Synced from `(prefers-reduced-motion: reduce)`; gates camera drift, parallax, and marquee motion. */
  reducedMotion: boolean;
  setReducedMotion: (reducedMotion: boolean) => void;

  theme: Theme;
  setTheme: (theme: Theme, persist?: boolean) => boolean;

  /** Id of the section currently in view, driven by scroll/ScrollTrigger. Null before the first section mounts. */
  activeSection: string | null;
  setActiveSection: (activeSection: string | null) => void;
}

export function getStoredThemePreference(): Theme | null {
  if (typeof window === "undefined") return null;
  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return storedTheme === "light" || storedTheme === "dark" ? storedTheme : null;
  } catch {
    return null;
  }
}

function getSystemTheme(): Theme {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme;
  document
    .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "dark" ? "#141a1d" : "#f4f5f7");
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const initialTheme = getStoredThemePreference() ?? getSystemTheme();
applyTheme(initialTheme);

export const useAppStore = create<AppState>((set) => ({
  // Read synchronously at store creation (this is a client-only SPA, no SSR)
  // so the first render already reflects the OS preference — avoids Lenis
  // being created and immediately torn down on mount.
  reducedMotion: prefersReducedMotion(),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),

  theme: initialTheme,
  setTheme: (theme, persist = true) => {
    let saved = true;
    if (persist) {
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, theme);
      } catch {
        saved = false;
      }
    }
    applyTheme(theme);
    set({ theme });
    return saved;
  },

  activeSection: null,
  setActiveSection: (activeSection) => set({ activeSection }),
}));
