import { Container, Heading, Section, Text } from "../ui";
import { useExperienceDeck } from "../../animation/useExperienceDeck";

interface ExperienceCluster {
  label: string;
  description: string;
}

interface ExperienceEntry {
  company: string;
  role: string;
  location: string;
  period: string;
  clusters: ExperienceCluster[];
}

// Resume-sourced only (spec §2 Experience row). One verified entry — do not
// add a second until the resume/spec supports one. `clusters` groups the
// resume-supported responsibilities under the product/engineering/
// operations framing without inventing anything not already listed there.
const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "Earthy",
    role: "Founder’s Associate (Growth Engineer)",
    location: "Bengaluru",
    period: "Oct 2025 – Oct 2026",
    // NEEDS VIGNESH INPUT — no outcome metrics exist in the spec/resume, so
    // none are stated. Needed per cluster: (1) how many systems/features I
    // built or improved, which integrations/deployments, and their users;
    // (2) which recurring issues I resolved and how many, how many
    // teams/stakeholders I worked with, time or manual work saved (%);
    // (3) how many projects/features shipped over what period.
    clusters: [
      {
        label: "Built",
        description:
          "Designed and deployed internal tools, business systems, the company website, UI/UX workflows, and technical infrastructure.",
      },
      {
        label: "Solved",
        description:
          "Investigated and fixed product and operations issues, then documented the solutions.",
      },
      {
        label: "Collaborated",
        description:
          "Worked with founders and non-technical stakeholders on delivery, roadmap, and business development.",
      },
    ],
  },
];

/**
 * Experience (spec §8 Phase 4B). Desktop uses a CSS `position: sticky`
 * label/heading column (`md:sticky md:top-28` — same 112px nav clearance
 * as `Section`'s `scroll-mt-28`) that stays in view while the entry column
 * scrolls beside it — spec §5's "pinned/sticky deck" read through native
 * layout instead of `ScrollTrigger pin:true`, which fought the existing
 * Lenis setup (see `useExperienceDeck`'s doc comment for that
 * investigation). `position: sticky` needs no JS to work, can't scroll-lock
 * the page (it only holds within its own grid row, never beyond it), and
 * degrades to a plain stacked column below `md` for free — the two
 * requirements ScrollTrigger's pin couldn't cleanly satisfy here.
 *
 * The sticky column is a grid item wrapping an inner sticky div rather than
 * `sticky` directly on the grid item itself — a grid item stretches to its
 * row's full height by default, which would make the sticky element as
 * tall as the row and leave it nothing to visually stick within; the inner
 * div keeps its own natural (short) height while the outer item supplies
 * the room. Confirmed in the browser, not just reasoned about — see
 * CLAUDE.md.
 *
 * Card treatment stays neutral (white surface, matching About's education
 * card) per spec §3's alternating neutral/accent language needing a second
 * card to alternate against, which doesn't exist yet.
 */
export function Experience() {
  const {
    sectionRef,
    headingRef,
    cardMotionRef,
    cardRef,
    headerRef,
    getColumnMotionRef,
    getColumnRef,
  } = useExperienceDeck(EXPERIENCE[0].clusters.length);

  return (
    <Section id="experience" aria-labelledby="experience-heading">
      <Container>
        <div ref={sectionRef} className="grid grid-cols-1 items-start gap-x-12 gap-y-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)]">
          <div ref={headingRef} className="max-w-sm">
            <div className="md:sticky md:top-28">
              <Heading id="experience-heading" as="h2" size="display-lg" className="section-heading">
                Experience
              </Heading>
              <Text as="p" tone="secondary" size="body" className="mt-4">
                Hands-on work across internal systems, product workflows, and technical operations at Earthy.
              </Text>
            </div>
          </div>

          <div ref={cardMotionRef}>
            {EXPERIENCE.map((entry) => (
              <article key={entry.company} ref={cardRef} className="rounded-card border border-border bg-surface p-6 shadow-card sm:p-8">
                <div ref={headerRef} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <div>
                    <Heading as="h3" size="heading-md">
                      {entry.company}
                    </Heading>
                    <Text as="p" tone="secondary" size="body" className="mt-1">
                      {entry.role}
                    </Text>
                  </div>
                  <div className="text-left md:text-right">
                    <Text as="p" tone="muted" size="caption">
                      {entry.location}
                    </Text>
                    <Text as="p" tone="muted" size="caption" className="mt-1">
                      {entry.period}
                    </Text>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-5 border-t border-border pt-5 sm:grid-cols-3 sm:gap-4">
                  {entry.clusters.map((cluster, index) => (
                    <div key={cluster.label} ref={getColumnMotionRef(index)}>
                      <div ref={getColumnRef(index)}>
                        <p className="font-mono text-caption uppercase tracking-[0.15em] text-accent">
                          {cluster.label}
                        </p>
                        <Text as="p" tone="secondary" size="body-sm" className="mt-2 leading-relaxed">
                          {cluster.description}
                        </Text>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
