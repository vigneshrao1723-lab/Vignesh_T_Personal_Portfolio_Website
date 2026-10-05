import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      {/* Phase 9 (Accessibility): the floating nav has 5 links + a CTA
          before any real content — a keyboard user landing on the page
          had no way to skip past it. Visually hidden until focused
          (`sr-only`/`focus:not-sr-only`, standard pattern), styled with
          the same pill/shadow/surface tokens the Nav itself already uses
          so it looks like it belongs to the existing design rather than
          introducing a new visual style. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-30 focus:rounded-pill focus:bg-surface focus:px-4 focus:py-2 focus:text-body-sm focus:text-ink focus:shadow-nav"
      >
        Skip to main content
      </a>
      <Nav />
      {/* tabIndex={-1}: makes the skip link's target actually focusable.
          Without it, activating "#main" scrolls the page but browsers
          don't reliably move keyboard/AT focus there — standard WCAG
          skip-link practice, not decorative. */}
      <main id="main" tabIndex={-1} className="min-h-dvh bg-canvas outline-none">
        {children}
      </main>
      <Footer />
    </>
  );
}
