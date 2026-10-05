import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

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
  const summaryRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback((restoreFocus = false) => {
    if (menuRef.current?.open) menuRef.current.open = false;
    setMenuOpen(false);
    if (restoreFocus) summaryRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const focusable = () =>
      Array.from(panelRef.current?.querySelectorAll<HTMLElement>('button, a[href]') ?? []);
    const firstFrame = window.requestAnimationFrame(() => focusable()[0]?.focus());
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(firstFrame);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMenu, menuOpen]);

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
            ref={summaryRef}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="cursor-pointer list-none rounded-control px-3 py-2 text-body-sm text-ink transition-colors hover:bg-accent-soft hover:text-accent [&::-webkit-details-marker]:hidden"
          >
            Menu<span className="sr-only"> navigation</span>
          </summary>
        </details>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-5 bottom-0 h-px origin-left bg-accent"
          style={{ transform: "scaleX(var(--scroll-progress, 0))" }}
        />
      </div>
      {menuOpen &&
        createPortal(
          <div
            className="mobile-nav-backdrop lg:hidden"
            onClick={(event) => {
              if (event.target === event.currentTarget) closeMenu(true);
            }}
          >
            <div
              ref={panelRef}
              className="mobile-nav-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-navigation-title"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-7">
                <p className="font-mono text-caption uppercase tracking-[0.15em] text-accent">
                  Navigation
                </p>
                <button
                  type="button"
                  onClick={() => closeMenu(true)}
                  className="inline-flex min-h-11 items-center gap-2 rounded-control px-3 py-2 text-body-sm text-ink transition-colors hover:bg-accent-soft hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Close <span aria-hidden="true" className="text-lg leading-none">×</span>
                </button>
              </div>
              <div className="px-5 pb-5 pt-6 sm:px-7 sm:pb-7">
                <h2 id="mobile-navigation-title" className="font-display text-heading-lg font-medium text-ink">
                  Explore
                </h2>
                <div className="mt-4">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => closeMenu()}
                      className="flex min-h-12 items-center rounded-control border-b border-border px-4 text-body-sm text-ink-secondary transition-colors duration-[var(--duration-fast)] ease-out hover:bg-accent-soft hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent active:bg-accent-soft"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </nav>
  );
}
