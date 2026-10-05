import { lazy, Suspense } from "react";
import { Container, Heading, Link, Section, SectionLabel, Text } from "../ui";
import { useScrollReveal } from "../../animation/useScrollReveal";
import { useNearViewport } from "../../hooks/useNearViewport";
import { noBreak } from "../../lib/noBreak";
import { PROJECTS } from "../../content/projects";
import type { Project, ProjectMetrics } from "../../content/projects";

const ProjectShowcase = lazy(() => import("../../scene/ProjectShowcase"));

const ITEM_COUNT = 1 + PROJECTS.length;

const labelClass = "font-mono text-caption uppercase tracking-[0.15em] text-accent";

/**
 * Metric tiles: a big number, a small label — nothing else, so a few strong
 * numbers read at a glance instead of a wall of statistics. Measured tiles
 * are solid; planned tiles (work that isn't finished) are dashed and sit
 * under an explicit "Planned" heading so a target can never be mistaken for
 * a result. Semantically a description list: the label is the term, the
 * number its value (visually reversed with `order-*`, so a screen reader
 * hears "Collected tests, 1,840").
 */
function ProjectMetricTiles({
  metrics,
  heading,
  className = "mt-6",
}: {
  metrics: ProjectMetrics;
  heading?: string;
  className?: string;
}) {
  const planned = metrics.kind === "planned";
  const columns = metrics.items.length === 4 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3";

  return (
    <div className={className}>
      {heading && <p className={labelClass}>{heading}</p>}
      <dl className={`${heading ? "mt-3" : ""} grid gap-3 ${columns}`}>
        {metrics.items.map((metric) => (
          <div
            key={metric.label}
            className={`flex flex-col rounded-control border p-3 ${
              planned ? "border-dashed border-border-strong bg-transparent" : "border-border bg-canvas"
            }`}
          >
            <dd className="order-1 font-display text-heading-md font-medium leading-none text-ink">
              {metric.value}
            </dd>
            <dt className="order-2 mt-2 font-mono text-caption uppercase tracking-[0.1em] text-ink-muted">
              {metric.label}
            </dt>
          </div>
        ))}
      </dl>
    </div>
  );
}

/**
 * Visual hierarchy so the three cards don't read as one template: the 3D
 * panel alternates sides down the page, and a project that isn't finished
 * (planned metrics) gets a dashed, flat card instead of the elevated one the
 * finished work has.
 */
/** A project whose numbers are all targets (it isn't built yet). */
function isPlanned(project: Project): boolean {
  return project.more?.metrics?.kind === "planned";
}

function liftClasses(project: Project): string {
  return isPlanned(project)
    ? ""
    : "group transition-[translate] duration-[var(--duration-base)] ease-out hover:-translate-y-1";
}

// NOTE: `overflow-clip`, not `overflow-hidden`. `hidden` makes this card the
// scroll container for the sticky 3D panel inside it, so the panel could never
// stick (it just scrolled away with the card — measured: panel top -99/-299/-499
// as the page scrolled). `clip` still clips the rounded corners but creates no
// scroll container, so `position: sticky` actually works.
function cardClasses(project: Project, index: number): string {
  const planned = isPlanned(project);
  const base = "grid grid-cols-1 overflow-clip rounded-card border bg-surface md:grid-cols-2";
  // Hover feedback for finished work (spec §5 "hover-lift on project cards")
  // is split in two: the shadow deepens here (`group-hover`, driven by the
  // wrapper in the render below) and the lift itself lives on that wrapper —
  // NOT on this element, because GSAP's scroll-reveal (`useScrollReveal`)
  // writes an inline `translate: none`/`transform` onto the article, which
  // silently overrides any CSS lift class here (found by testing: the shadow
  // changed on hover but the card never moved). The planned card stays flat on
  // purpose — it is not finished. `hover:` only applies on hover-capable
  // devices, and the global reduced-motion rule collapses the transitions.
  const surface = planned
    ? "border-dashed border-border-strong shadow-none"
    : "border-border shadow-card transition-shadow duration-[var(--duration-base)] ease-out group-hover:shadow-elevated";
  const side = index % 2 === 1 ? "md:[&>*:first-child]:order-2" : "";
  return `${base} ${surface} ${side}`;
}

/**
 * The left panel of a card. The procedural 3D artifact is mounted only once the
 * card is near the viewport (see useNearViewport), so the Three.js chunk is not
 * downloaded on first paint. The panel has a fixed height either way, so
 * nothing shifts when the canvas appears.
 */
function ProjectPanel({ project }: { project: Project }) {
  const { ref, near } = useNearViewport<HTMLDivElement>();

  return (
    <div ref={ref} className="h-[260px] md:sticky md:top-28 md:h-[320px]">
      {project.visual ? (
        <img
          src={project.visual.src}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain p-6"
        />
      ) : (
        near && (
          <Suspense fallback={null}>
            <ProjectShowcase variant={project.variant} />
          </Suspense>
        )
      )}
    </div>
  );
}

/**
 * Projects (spec §8 Phase 5). Content lives in `src/content/projects.ts`
 * (data-driven); this component only renders it. Numbered "03" — the page
 * follows spec §2's order, so Contact is last. Each card mounts its own
 * `ProjectShowcase` (own WebGL canvas, `frameloop="demand"`) via one shared
 * lazy boundary, unless a project supplies a static `visual` asset.
 *
 * A link, status, metric tile, logo, or visual is rendered only when the
 * data has it — and the data only has what a real source supports.
 */
export function Projects() {
  const { containerRef, getItemRef } = useScrollReveal<HTMLDivElement>(ITEM_COUNT);

  return (
    <Section id="projects" aria-labelledby="projects-heading">
      <Container ref={containerRef}>
        <div ref={getItemRef(0)}>
          <SectionLabel index="03">Projects</SectionLabel>
          <Heading id="projects-heading" as="h2" size="display-lg" className="mt-6 max-w-2xl">
            Three projects I&rsquo;ve worked on.
          </Heading>
        </div>

        <div className="mt-12 space-y-10">
          {PROJECTS.map((project, index) => (
            <div key={project.number} className={liftClasses(project)}>
              <article
                ref={getItemRef(index + 1)}
                className={cardClasses(project, index)}
              >
                {/* The grid item stretches to the card's full (text-driven)
                    height, so the canvas itself can't be sized to it: a tall
                    narrow canvas narrows the camera's horizontal view and
                    crops the artifact. The canvas lives in an inner
                    fixed-height panel instead, sticky so it stays framed
                    beside the text — the same "sticky goes on an inner
                    wrapper, not the stretched grid item" structure
                    Experience uses. */}
                <div className="bg-canvas" aria-hidden="true">
                  <ProjectPanel project={project} />
                </div>

                <div className="p-8 md:p-10">
                  {project.logo && (
                    <img
                      src={project.logo.src}
                      alt={project.logo.alt}
                      width={project.logo.width}
                      height={project.logo.height}
                      loading="lazy"
                      decoding="async"
                      className="mb-4 h-10 w-auto"
                    />
                  )}
                  <p className={labelClass}>Project {project.number}</p>
                  <Heading as="h3" size="heading-md" className="mt-2">
                    {project.name}
                  </Heading>

                  <ul aria-label="Technologies" className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="whitespace-nowrap rounded-pill border border-border px-3 py-1 font-mono text-caption text-ink-secondary"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <Text as="p" tone="secondary" size="body-sm" className="mt-4">
                    {noBreak(project.description)}
                  </Text>

                  {project.highlight && (
                    <div className="mt-5">
                      <p className={labelClass}>{project.highlight.label}</p>
                      <Text as="p" tone="secondary" size="body-sm" className="mt-2">
                        {noBreak(project.highlight.text)}
                      </Text>
                    </div>
                  )}

                  {project.metrics && <ProjectMetricTiles metrics={project.metrics} className="mt-5" />}

                  {(project.status || project.links) && (
                    <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                      {project.status && (
                        <Text as="p" tone="muted" size="caption">
                          {project.status}
                        </Text>
                      )}
                      {project.links?.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-body-sm"
                        >
                          {link.label}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </Link>
                      ))}
                    </div>
                  )}

                  {project.more && (
                    <details className="group/more mt-5 border-t border-border pt-1">
                      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-mono text-caption uppercase tracking-[0.15em] text-accent [&::-webkit-details-marker]:hidden">
                        <span>More detail</span>
                        <span
                          aria-hidden="true"
                          className="text-body leading-none transition-transform duration-[var(--duration-fast)] group-open/more:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <div className="pb-2 pt-2">
                        {project.more.paragraphs?.map((paragraph) => (
                          <Text key={paragraph} as="p" tone="secondary" size="body-sm" className="mb-3">
                            {noBreak(paragraph)}
                          </Text>
                        ))}
                        {project.more.items && (
                          <ul className="list-disc space-y-1.5 pl-5 text-body-sm text-ink-secondary marker:text-accent">
                            {project.more.items.map((item) => (
                              <li key={item}>{noBreak(item)}</li>
                            ))}
                          </ul>
                        )}
                        {project.more.metrics && (
                          <ProjectMetricTiles
                            metrics={project.more.metrics}
                            heading={
                              project.more.metrics.kind === "planned"
                                ? "Planned, not built or measured yet"
                                : "More numbers"
                            }
                          />
                        )}
                      </div>
                    </details>
                  )}
                </div>
              </article>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
