import { Button } from "../ui";

/**
 * Floating pill nav — the one place spec §3 allows glassmorphism
 * (`backdrop-blur-lg` + translucent surface), everywhere else uses
 * shadow-based elevation only. Fixed/persistent since it's site-wide chrome,
 * not Hero-specific — lives in RootLayout, not Hero, so later sections
 * (About, Experience, ...) get it for free instead of it needing to move.
 *
 * Links stay real, one-to-one with sections that actually exist: brand mark
 * to `#hero`, "About" to `#about` (Phase 4A), "Experience" to `#experience`
 * (Phase 4B), "Skills" to `#skills` (Phase 4C), "Contact" to `#contact`
 * (Phase 4D), and the same verified `mailto:` CTA already used in Hero —
 * "Contact" links to the section for context, "Email me" is the direct
 * action shortcut; they're not redundant. No Projects link yet — that
 * section doesn't exist, and a nav linking to an anchor that doesn't exist
 * would be exactly the fabricated/dead UI the governing docs warn against.
 *
 * Phase 7 responsive fix: the four section links previously rendered
 * unconditionally at every width. At 375px the pill's content (brand +
 * 4 links + CTA button, all `gap-4`, no wrapping) is simply wider than the
 * viewport — confirmed via screenshot that "Lattice" and "Email me" were
 * being clipped at both edges of the screen, not just tight. The links are
 * hidden below `md` (768px, the same breakpoint the rest of the project
 * already uses for "mobile"), leaving brand + Email CTA always reachable;
 * all four links remain fully visible at 820px and above, verified via
 * screenshot to still fit with room to spare.
 */
// One entry per real section, in the order they appear on the page (the page
// follows spec §2: About, Experience, Projects, Skills, Achievements,
// Contact). Every href must match a section id that exists — no dead links.
const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 top-6 z-20 flex justify-center px-gutter"
    >
      <div className="flex items-center gap-4 rounded-pill border border-border bg-surface/80 py-2 pl-5 pr-2 shadow-nav backdrop-blur-lg">
        <a
          href="#hero"
          className="font-mono text-caption uppercase tracking-[0.2em] text-ink transition-colors duration-[var(--duration-fast)] ease-out hover:text-accent"
        >
          Lattice
        </a>
        <div className="hidden items-center gap-4 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-body-sm text-ink-secondary transition-colors duration-[var(--duration-fast)] ease-out hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>
        <Button href="mailto:vigneshrao1723@gmail.com" variant="subtle" className="px-4 py-2">
          Email me
        </Button>
      </div>
    </nav>
  );
}
