import type { ReactNode } from "react";

interface MarqueeProps {
  items: ReactNode[];
  className?: string;
}

/**
 * Continuous horizontal strip — decorative/supplementary technical texture,
 * not the authoritative source for whatever it lists (a real, semantic
 * section covers that later). `aria-hidden`: the content is duplicated for
 * a seamless loop, so exposing it to screen readers would read every item
 * twice. Pure CSS `@keyframes` (see index.css), not GSAP — a linear infinite
 * loop doesn't need a timeline, and it already respects this project's
 * global `prefers-reduced-motion` rule for free (same one that gates every
 * other animation-duration in the app), rather than needing its own
 * reduced-motion branch.
 */
export function Marquee({ items, className = "" }: MarqueeProps) {
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div className="flex w-max animate-marquee gap-10">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap font-mono text-caption uppercase tracking-[0.15em] text-ink-muted"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
