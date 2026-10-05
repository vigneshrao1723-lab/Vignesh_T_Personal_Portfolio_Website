/**
 * Typed access to the design tokens defined in `src/styles/tokens.css`.
 *
 * This is the shared design-token bridge: Tailwind
 * classes can't drive Three.js materials, so anything that needs a design
 * token outside CSS (a material color, a GSAP duration) reads it from here
 * instead of hand-copying a literal value. tokens.css remains the only place
 * literal hex/rem/ms values are written.
 *
 * Deliberately has NO import from `three` — that lives in `designTokensThree.ts`
 * instead. `useHeroEntrance` (eager: Hero.tsx isn't lazy, only the project
 * 3D scenes are) needs `gsapEase` from this file; if `getThreeColor` lived here too, its
 * `three` import would ride along into the eager bundle. Verified in a real
 * build: before the split, `three`'s runtime (WebGLRenderer, BufferGeometry)
 * was present in the main chunk even though nothing outside the lazy 3D
 * scene ever touches Three.js.
 */

export type ColorToken =
  | "canvas"
  | "surface"
  | "surface-elevated"
  | "ink"
  | "ink-secondary"
  | "ink-muted"
  | "border"
  | "border-strong"
  | "accent"
  | "accent-soft"
  | "accent-strong"
  | "focus";

export type DurationToken = "fast" | "base" | "slow";

function readCssVar(name: string): string {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();

  if (!value) {
    throw new Error(
      `Design token "${name}" is not defined on :root — check src/styles/tokens.css`,
    );
  }

  return value;
}

/** Raw CSS value (e.g. "#0e7490") for the given color token. */
export function getColorToken(token: ColorToken): string {
  return readCssVar(`--color-${token}`);
}

/** Duration in seconds (GSAP/R3F convention), read from the "150ms" etc. stored in CSS. */
export function getDurationToken(token: DurationToken): number {
  return parseFloat(readCssVar(`--duration-${token}`)) / 1000;
}

/**
 * GSAP eases are named strings, not CSS cubic-bezier() functions, so they
 * can't be read out of tokens.css directly. These are the GSAP-equivalent
 * curves for the eases defined there — keep both in sync by hand if either
 * one changes.
 */
export const gsapEase = {
  signal: "expo.out", // ~= var(--ease-signal): cubic-bezier(0.16, 1, 0.3, 1)
  standard: "power2.inOut", // ~= Tailwind's --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
} as const;
