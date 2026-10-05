import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useAppStore } from "../../store/useAppStore";

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
  const closeTimerRef = useRef<number | null>(null);
  const scrollUnlockRef = useRef<(() => void) | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [themeNotice, setThemeNotice] = useState("");
  const activeSection = useAppStore((state) => state.activeSection);
  const setActiveSection = useAppStore((state) => state.setActiveSection);
  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);

  const unlockScroll = useCallback(() => {
    scrollUnlockRef.current?.();
    scrollUnlockRef.current = null;
  }, []);

  const closeMenu = useCallback((restoreFocus = false) => {
    if (closeTimerRef.current !== null) return;
    unlockScroll();
    setMenuClosing(true);
    if (restoreFocus) summaryRef.current?.focus();

    const finishClose = () => {
      closeTimerRef.current = null;
      if (menuRef.current?.open) menuRef.current.open = false;
      setMenuOpen(false);
      setMenuClosing(false);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finishClose();
    } else {
      closeTimerRef.current = window.setTimeout(finishClose, 180);
    }
  }, [unlockScroll]);

  useEffect(() => {
    let frame = 0;
    const updateActiveSection = () => {
      frame = 0;
      const marker = Math.min(120, window.innerHeight * 0.25);
      const current = NAV_LINKS
        .map((link) => document.getElementById(link.href.slice(1)))
        .filter((section): section is HTMLElement => section !== null)
        .filter((section) => {
          const bounds = section.getBoundingClientRect();
          return bounds.top <= marker && bounds.bottom > marker;
        })
        .at(-1);

      setActiveSection(current?.id ?? null);
    };
    const scheduleUpdate = () => {
      if (frame === 0) frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, [setActiveSection]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    scrollUnlockRef.current = () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
    };

    return () => unlockScroll();
  }, [menuOpen, unlockScroll]);

  useEffect(() => {
    if (!menuOpen || menuClosing) return;

    const focusable = () =>
      Array.from(panelRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]') ?? []);
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
  }, [closeMenu, menuClosing, menuOpen]);

  useEffect(() => () => {
    if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
    unlockScroll();
  }, [unlockScroll]);

  const chooseTheme = (nextTheme: "light" | "dark") => {
    const saved = setTheme(nextTheme);
    setThemeNotice(
      saved
        ? `${nextTheme === "dark" ? "Dark" : "Light"} appearance selected.`
        : `Appearance changed for this visit; browser storage is unavailable.`,
    );
  };

  return (
    <nav aria-label="Primary" className="fixed inset-x-0 top-4 z-20 flex justify-center px-gutter sm:top-6">
      <div className="relative flex items-center gap-5 overflow-visible rounded-pill border border-border bg-surface/90 py-2 pl-5 pr-2 shadow-nav backdrop-blur-lg">
        <a href="#hero" className="font-body text-body-sm font-medium tracking-[-0.02em] text-ink transition-colors hover:text-accent">
          Vignesh T
        </a>
        <div className="hidden items-center gap-4 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "location" : undefined}
                className={`${linkClass}${isActive ? " text-accent" : ""}`}
              >
                {link.label}
              </a>
            );
          })}
          <span aria-hidden="true" className="h-5 w-px bg-border" />
          <button
            type="button"
            aria-label="Toggle dark theme"
            aria-pressed={theme === "dark"}
            onClick={() => chooseTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-control border border-border px-3 py-2 text-body-sm text-ink-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {theme === "dark" ? "Dark" : "Light"}
          </button>
        </div>
        <details
          ref={menuRef}
          className="group lg:hidden"
          onToggle={(event) => {
            setMenuOpen(event.currentTarget.open);
            if (event.currentTarget.open) setMenuClosing(false);
          }}
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
            className={`mobile-nav-backdrop lg:hidden${menuClosing ? " is-closing" : ""}`}
            onClick={(event) => {
              if (event.target === event.currentTarget) closeMenu(true);
            }}
          >
            <div
              ref={panelRef}
              className="mobile-nav-panel"
              data-lenis-prevent
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
              <div className="px-5 pb-5 pt-5 sm:px-7 sm:pb-7">
                <h2 id="mobile-navigation-title" className="font-display text-heading-lg font-medium text-ink">
                  Explore
                </h2>
                <div className="mt-3">
                  {NAV_LINKS.map((link, index) => {
                    const isActive = activeSection === link.href.slice(1);
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        aria-current={isActive ? "location" : undefined}
                        onClick={() => closeMenu()}
                        className="mobile-nav-link flex min-h-12 items-center gap-4 rounded-control border-b border-border px-3 text-body-sm text-ink-secondary transition-colors duration-[var(--duration-fast)] ease-out hover:bg-accent-soft hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent active:bg-accent-soft"
                        style={{ animationDelay: `${index * 16}ms` }}
                      >
                        <span aria-hidden="true" className="w-5 font-mono text-caption text-ink-muted">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1">{link.label}</span>
                        <span aria-hidden="true" className="text-accent">→</span>
                      </a>
                    );
                  })}
                </div>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                  <p className="font-mono text-caption uppercase tracking-[0.12em] text-ink-muted">
                    Appearance
                  </p>
                  <div role="group" aria-label="Color theme" className="inline-flex rounded-pill border border-border bg-canvas p-1">
                    {(["light", "dark"] as const).map((option) => (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={theme === option}
                        onClick={() => chooseTheme(option)}
                        className={`min-h-10 rounded-pill px-4 text-body-sm capitalize transition-colors duration-[var(--duration-fast)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                          theme === option
                            ? "bg-surface text-ink shadow-card"
                            : "text-ink-secondary hover:text-accent"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
      <span role="status" className="sr-only">{themeNotice}</span>
    </nav>
  );
}
