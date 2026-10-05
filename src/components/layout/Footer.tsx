import { Container, Divider, Link, Text } from "../ui";

/**
 * Footer — closing chrome, not another numbered content section (no
 * `SectionLabel` index, unlike Hero/About/Experience/Skills/Contact): it
 * restates identity and offers the same two confirmed contact channels in
 * a quieter register, it doesn't introduce a new step in the page's
 * content journey. Lives in `RootLayout` as a sibling of `<main>`, not
 * inside it, matching the standard HTML landmark structure (footer is a
 * page-level landmark, not part of "main content").
 *
 * GitHub/LinkedIn: the same two verified URLs Contact uses (read from the
 * hyperlinks embedded in the current resume PDF; GitHub also confirmed by
 * the git remotes of the project repos) — not guessed. No footer nav
 * link added to `Nav.tsx`: there's nothing to navigate *to* here (it's the
 * end of the page, reached by scrolling, not an anchor target), so adding
 * one would be exactly the "unnecessary navigation item to look fuller"
 * this milestone was told to avoid.
 *
 * Phase 9 (Accessibility) fix: "Vignesh T" here used to be a real `<h2>`
 * (via the shared `Heading` component). That's a genuine duplicate in the
 * page's heading outline — the h1 in Hero already says "Vignesh T", and a
 * screen-reader user navigating by heading list would hit "Vignesh T"
 * again at the very end, after every real section h2, for text that
 * restates already-known identity rather than introducing new content —
 * exactly the "heading used purely for styling" this phase's checklist
 * flags. Changed to a plain `<p>` carrying the identical `heading-lg`
 * classes by hand (not the `Heading` component), so the visual result is
 * unchanged pixel-for-pixel; only the semantic tag changed.
 */
export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="py-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-caption uppercase tracking-[0.2em] text-ink-muted">
              Lattice
            </p>
            <p className="font-display font-medium text-ink text-heading-lg mt-4">
              Vignesh T
            </p>
            <Text as="p" tone="secondary" size="body" className="mt-3 max-w-md">
              I work across networking, applied cryptography, and AI engineering.
            </Text>
          </div>

          <div className="flex flex-col gap-2 md:items-end md:text-right">
            <Link href="mailto:vigneshrao1723@gmail.com">vigneshrao1723@gmail.com</Link>
            <Link href="tel:+916363165765">+91 63631 65765</Link>
            <div className="flex gap-5">
              <Link
                href="https://github.com/vigneshrao1723-lab"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub<span className="sr-only"> (opens in a new tab)</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/vignesh-t-33651b397/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn<span className="sr-only"> (opens in a new tab)</span>
              </Link>
            </div>
            <Text as="p" tone="muted" size="caption" className="mt-2">
              Bengaluru, Karnataka
            </Text>
          </div>
        </div>

        <Divider className="mt-12" />

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Text as="p" tone="muted" size="caption">
            © 2026 Vignesh T.
          </Text>
          <Text as="p" tone="muted" size="caption">
            Systems / Security / AI
          </Text>
        </div>
      </Container>
    </footer>
  );
}
