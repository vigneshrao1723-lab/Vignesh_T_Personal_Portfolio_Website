import { Container, Heading, Section, SectionLabel, Text } from "../ui";
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
    period: "Oct 2025 – Present",
    // NEEDS VIGNESH INPUT — no outcome metrics exist in the spec/resume, so
    // none are stated. Needed per cluster: (1) how many systems/features I
    // built or improved, which integrations/deployments, and their users;
    // (2) which recurring issues I resolved and how many, how many
    // teams/stakeholders I worked with, time or manual work saved (%);
    // (3) how many projects/features shipped over what period.
    // Period reads "Present": Vignesh states in his own briefs that the role
    // is ongoing, while the 2026-09-10 resume said "Sep 2026" (already past).
    // Revert to "Oct 2025 – Sep 2026" if that turns out to be wrong.
    clusters: [
      {
        label: "What I built",
        description:
          "I designed and deployed Earthy’s internal tools and business systems, including the company website, UI/UX workflows, and technical infrastructure.",
      },
      {
        label: "Problems I solved",
        description:
          "I investigated and fixed technical issues across product and operations systems, wrote up the solutions, and worked with non-technical stakeholders along the way.",
      },
      {
        label: "With the founders",
        description:
          "I took full-cycle product, engineering, and operations tasks from idea through deployment, which contributed to better team efficiency and customer engagement. I worked with the founders on the roadmap and on business development.",
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
  const { containerRef, getCardRef } = useExperienceDeck(EXPERIENCE.length);

  return (
    <Section id="experience" aria-labelledby="experience-heading">
      <Container>
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            {/* heading-lg, not display-lg: in this narrow sticky column
                (roughly a third of the row) the large display size wraps
                to 5-6 lines, making the column almost as tall as the card
                beside it and leaving no real room for sticky to do
                anything — confirmed by measuring zero height difference
                between the column and its content before this fix. A
                narrower column calling for a smaller heading size is a
                normal editorial-typography call, not a token change. */}
            <div className="md:sticky md:top-28">
              <SectionLabel index="02">Experience</SectionLabel>
              <Heading id="experience-heading" as="h2" size="heading-lg" className="mt-6">
                My work at Earthy.
              </Heading>
            </div>
          </div>

          <div ref={containerRef} className="space-y-8">
            {EXPERIENCE.map((entry, index) => (
              <article
                key={entry.company}
                ref={getCardRef(index)}
                className="rounded-card border border-border bg-surface p-8 shadow-card md:p-12"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
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

                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                  {entry.clusters.map((cluster) => (
                    <div key={cluster.label}>
                      {/* Text has no "accent" tone option, and layering an
                          override className on top of its default tone risks
                          two same-property classes with ambiguous precedence
                          — a plain element with fully explicit classes avoids
                          that instead of fighting the primitive's API. */}
                      <p className="font-mono text-caption uppercase tracking-[0.15em] text-accent">
                        {cluster.label}
                      </p>
                      <Text as="p" tone="secondary" size="body-sm" className="mt-2">
                        {cluster.description}
                      </Text>
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
