import { useRef, useState } from "react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

const linkClass = "text-body-sm text-ink-secondary transition-colors duration-[var(--duration-fast)] ease-out hover:text-accent";

/** Responsive primary navigation using the portfolio owner's actual identity. */
export function Nav() {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    if (menuRef.current?.open) menuRef.current.open = false;
    setMenuOpen(false);
  }

  return (
    <nav aria-label="Primary" className="fixed inset-x-0 top-4 z-20 flex justify-center px-gutter sm:top-6">
      <div className="relative flex items-center gap-5 overflow-visible rounded-pill border border-border bg-surface/90 py-2 pl-5 pr-2 shadow-nav backdrop-blur-lg">
        <a href="#hero" className="font-body text-body-sm font-medium tracking-[-0.02em] text-ink transition-colors hover:text-accent">
          Vignesh T
        </a>
        <div className="hidden items-center gap-4 lg:flex">
          {NAV_LINKS.map((link) => <a key={link.href} href={link.href} className={linkClass}>{link.label}</a>)}
        </div>
        <details
          ref={menuRef}
          className="group lg:hidden"
          onToggle={(event) => setMenuOpen(event.currentTarget.open)}
        >
          <summary
            aria-expanded={menuOpen}
            className="cursor-pointer list-none rounded-control px-3 py-2 text-body-sm text-ink transition-colors hover:bg-accent-soft hover:text-accent [&::-webkit-details-marker]:hidden"
          >
            Menu<span className="sr-only"> navigation</span>
          </summary>
          <div className="absolute right-0 top-full mt-3 flex w-52 flex-col rounded-card border border-border bg-surface p-2 shadow-elevated">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-control px-3 py-2.5 text-body-sm text-ink-secondary transition-colors hover:bg-accent-soft hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </div>
        </details>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-5 bottom-0 h-px origin-left bg-accent"
          style={{ transform: "scaleX(var(--scroll-progress, 0))" }}
        />
      </div>
    </nav>
  );
}
