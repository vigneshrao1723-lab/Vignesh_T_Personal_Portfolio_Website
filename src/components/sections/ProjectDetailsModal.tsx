import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { Button, Heading, Link, Text } from "../ui";
import { noBreak } from "../../lib/noBreak";
import type { Project } from "../../content/projects";

interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
}

const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** A compact, keyboard-safe case-study dialog shared by every project card. */
export function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const [closing, setClosing] = useState(false);

  const finishClose = useCallback(() => {
    if (closeTimerRef.current !== null) return;
    setClosing(true);
    closeTimerRef.current = window.setTimeout(onClose, 180);
  }, [onClose]);

  useEffect(() => {
    if (!project) return;
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const bodyOverflow = document.body.style.overflow;
    const htmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => {
      dialogRef.current?.querySelector<HTMLElement>("[data-dialog-close]")?.focus();
    });

    return () => {
      window.cancelAnimationFrame(frame);
      if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = htmlOverflow;
      returnFocusRef.current?.focus();
    };
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        finishClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [finishClose, project]);

  if (!project) return null;
  const { caseStudy } = project;

  return createPortal(
    <div
      className={`project-dialog-backdrop ${closing ? "is-closing" : ""}`}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) finishClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        aria-describedby="project-dialog-summary"
        data-lenis-prevent
        tabIndex={0}
        className="project-dialog-panel"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-border bg-surface/95 px-5 py-4 backdrop-blur-sm sm:px-7">
          <p className="font-mono text-caption uppercase tracking-[0.15em] text-accent">Project case study</p>
          <Button data-dialog-close onClick={finishClose} variant="subtle" className="min-h-11 shrink-0 px-3 py-2 text-body-sm text-ink hover:text-accent">
            Close <span aria-hidden="true" className="text-lg leading-none">×</span>
          </Button>
        </div>

        <div className="p-5 sm:p-7 md:p-8">
          <Heading id="project-dialog-title" as="h2" size="heading-lg" className="max-w-3xl">
            {project.name}
          </Heading>
          <Text id="project-dialog-summary" as="p" tone="secondary" size="body" className="mt-3 max-w-3xl">
            {caseStudy.summary}
          </Text>

          {project.visual && (
            <div className="mt-6 aspect-[16/7] overflow-hidden rounded-control border border-border bg-canvas p-4 sm:p-5">
              <img src={project.visual.src} alt={project.visual.alt} className="h-full w-full object-contain" />
            </div>
          )}

          <div className="mt-7 grid gap-x-8 gap-y-6 md:grid-cols-2">
            <DetailSection title="Overview"><Text as="p" tone="secondary" size="body-sm">{noBreak(caseStudy.overview)}</Text></DetailSection>
            <DetailSection title="Problem"><Text as="p" tone="secondary" size="body-sm">{noBreak(caseStudy.problem)}</Text></DetailSection>
            <DetailSection title="Approach" className="md:col-span-2"><Text as="p" tone="secondary" size="body-sm">{noBreak(caseStudy.approach)}</Text></DetailSection>
            <DetailSection title="Technology" className="md:col-span-2">
              <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
                {caseStudy.technology.map((technology) => <li key={technology} className="rounded-pill border border-border bg-canvas px-3 py-1 font-mono text-caption text-ink-secondary">{technology}</li>)}
              </ul>
            </DetailSection>
            <DetailSection title="Key contributions" className="md:col-span-2">
              <ul className="space-y-2 pl-5 text-body-sm text-ink-secondary marker:text-accent">
                {caseStudy.contributions.map((contribution) => <li key={contribution}>{noBreak(contribution)}</li>)}
              </ul>
            </DetailSection>
          </div>

          <DetailSection title="Architecture / flow" className="mt-7">
            <ol className="project-flow-diagram" aria-label={`${project.name} architecture flow`}>
              {caseStudy.flow.map((step, index) => (
                <li key={step} className="project-flow-step">
                  <span className="project-flow-node">{step}</span>
                  {index < caseStudy.flow.length - 1 && <span className="project-flow-arrow" aria-hidden="true">↓</span>}
                </li>
              ))}
            </ol>
          </DetailSection>

          <DetailSection title="Outcome" className="mt-7">
            <Text as="p" tone="secondary" size="body-sm">{noBreak(caseStudy.outcome)}</Text>
          </DetailSection>

          {project.links && project.links.length > 0 && (
            <div className="mt-8 border-t border-border pt-6">
              {project.links.map((link) => (
                <Link key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="text-body-sm">
                  {link.label}<span className="sr-only"> (opens in a new tab)</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function DetailSection({ title, className = "", children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <section className={className}>
      <h3 className="mb-3 font-mono text-caption uppercase tracking-[0.15em] text-accent">{title}</h3>
      {children}
    </section>
  );
}
