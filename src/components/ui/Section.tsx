import type { ComponentPropsWithRef, ReactNode } from "react";

interface SectionProps extends ComponentPropsWithRef<"section"> {
  children: ReactNode;
}

/**
 * Vertical section rhythm + landmark. Compose `<Container>` inside for
 * horizontal gutters. `scroll-mt-28` clears the fixed floating nav
 * (measured ~88px tall) when a section is reached via an anchor link —
 * found as a real bug while verifying About's new `#about` nav link:
 * without it, the section's own top content (its numbered label) landed
 * partially behind the nav.
 */
export function Section({ className = "", children, ...props }: SectionProps) {
  return (
    <section className={`scroll-mt-28 py-section-y ${className}`} {...props}>
      {children}
    </section>
  );
}
