import { useState } from "react";
import { Button, Container, Heading, Link, Section, Text } from "../ui";
import { useProjectScrollMotion } from "../../animation/useProjectScrollMotion";
import { noBreak } from "../../lib/noBreak";
import { PROJECTS } from "../../content/projects";
import type { Project } from "../../content/projects";
import { ProjectDetailsModal } from "./ProjectDetailsModal";

/**
 * The card presentation deliberately stays compact. Longer, source-backed
 * project material is available from the shared dialog rather than changing
 * the approved card system or pushing the page when opened.
 */
export function Projects() {
  const { containerRef, headingRef, getArtworkRef, getCardRef, getCopyRef } = useProjectScrollMotion(PROJECTS.length);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <Section id="projects" aria-labelledby="projects-heading">
      <Container ref={containerRef}>
        <div ref={headingRef}>
          <Heading id="projects-heading" as="h2" size="display-lg" className="section-heading max-w-2xl">
            Projects
          </Heading>
          <Text as="p" tone="secondary" size="body-lg" className="mt-4 max-w-2xl">
            Work from exploring security, AI, and software engineering.
          </Text>
        </div>

        <div className="mt-12 grid auto-rows-fr grid-cols-1 items-stretch gap-6 md:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <div key={project.number} ref={getCardRef(index)} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface shadow-card transition-[transform,border-color,box-shadow] duration-[var(--duration-base)] ease-out hover:-translate-y-1 hover:border-accent hover:shadow-elevated">
                {project.visual && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border bg-canvas p-4 sm:p-5">
                    <div ref={getArtworkRef(index)} className="h-full w-full">
                      <div className="h-full w-full transition-transform duration-[var(--duration-base)] ease-out group-hover:-translate-y-0.5">
                        <img
                          src={project.visual.src}
                          alt={project.visual.alt}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-contain object-center"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={getCopyRef(index)} className="flex flex-1 flex-col p-6">
                  <Heading as="h3" size="heading-md" className="transition-transform duration-[var(--duration-fast)] ease-out group-hover:translate-x-0.5">
                    {project.name}
                  </Heading>

                  <Text as="p" tone="secondary" size="body-sm" className="mt-3">
                    {noBreak(project.description)}
                  </Text>

                  <ul aria-label="Technologies" className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li key={tag} className="whitespace-nowrap rounded-pill border border-border px-3 py-1 font-mono text-caption text-ink-secondary">
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-1 pt-5">
                    {project.links?.map((link) => (
                      <Link key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-body-sm">
                        {link.label}<span className="sr-only"> (opens in a new tab)</span>
                      </Link>
                    ))}
                    <Button
                      variant="subtle"
                      className="min-h-11 px-0 py-0 text-body-sm font-normal underline decoration-border underline-offset-4 hover:decoration-accent"
                      onClick={() => setSelectedProject(project)}
                    >
                      View details
                    </Button>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </Container>
      <ProjectDetailsModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </Section>
  );
}
