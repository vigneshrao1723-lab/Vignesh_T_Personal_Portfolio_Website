import { Container, Heading, Section, SectionLabel, Text } from "../ui";
import { useScrollReveal } from "../../animation/useScrollReveal";

const ITEM_COUNT = 3;

const COURSEWORK = [
  "Data Structures & Algorithms",
  "Computer Networks",
  "Operating Systems",
  "Database Management Systems",
];

/**
 * About (spec §8 Phase 4A). Short first-person text beside the education card.
 * The portrait moved to the Hero on 2026-10-05 (that is where the cursor-
 * following face belongs), so it is not repeated here.
 */
export function About() {
  const { containerRef, getItemRef } = useScrollReveal<HTMLDivElement>(ITEM_COUNT);

  return (
    <Section id="about" aria-labelledby="about-heading">
      <Container ref={containerRef}>
        <div ref={getItemRef(0)}>
          <SectionLabel index="01">About</SectionLabel>
          <Heading id="about-heading" as="h2" size="display-lg" className="mt-6 max-w-2xl">
            I build things from idea to deployment.
          </Heading>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-[1.5fr_1fr] md:items-start">
          <div ref={getItemRef(1)} className="space-y-5">
            {/* About stays short and is not a project list — the projects have
                their own section. No numbers here on purpose. */}
            <Text as="p" tone="secondary" size="body-lg">
              I&rsquo;m Vignesh, a pre-final-year Computer Science Engineering student interested in
              networking, applied cryptography, and AI engineering. I like to understand something
              properly and then build and test it myself. This site is named after lattice-based
              cryptography, the area Kyber comes from and the one I&rsquo;m most into.
            </Text>
            {/* NEEDS VIGNESH INPUT (no metric exists in the resume or any
                repo, so none is stated): number of systems/features built or
                improved at Earthy, teams/stakeholders worked with, recurring
                issues resolved, a concrete example with users reached and
                time/manual work saved (%), projects/features shipped over
                what period. Present tense follows Vignesh's own repeated
                statement that the role is ongoing (the 2026-09-10 resume
                said Sep 2026; Experience now shows "Present"). */}
            <Text as="p" tone="secondary" size="body-lg">
              Alongside college, I&rsquo;m working as a Founder&rsquo;s Associate (Growth Engineer)
              at Earthy in Bengaluru. My role is hands-on: I&rsquo;ve worked on the company&rsquo;s
              website, UI/UX workflows, internal tools, and technical infrastructure, and I work
              directly with the founders and with non-technical stakeholders to sort out issues
              across product and operations.
            </Text>
            <Text as="p" tone="secondary" size="body-lg">
              A big part of it is taking problems that aren&rsquo;t necessarily technical at first
              and turning them into something we can actually build and use. What I like about the
              work is being involved in the whole process: understanding the problem, building the
              solution, deploying it, seeing how people use it, and improving it.
            </Text>
          </div>

          <div
            ref={getItemRef(2)}
            className="space-y-8 rounded-card border border-border bg-surface p-8 shadow-card md:p-10"
          >
            <div>
              <Text as="p" size="body" className="font-medium">
                Acharya Institute of Technology
              </Text>
              <Text as="p" tone="muted" size="body-sm" className="mt-1">
                Visvesvaraya Technological University
              </Text>

              <Text as="p" tone="secondary" size="body" className="mt-4">
                B.E. Computer Science &amp; Engineering
              </Text>
              <Text as="p" tone="muted" size="caption" className="mt-1">
                Aug 2023 – Jun 2027 · <span className="whitespace-nowrap">CGPA 8.3 / 10</span>
              </Text>
            </div>

            <div>
              <Text as="p" tone="muted" size="caption">
                Relevant coursework
              </Text>
              <div className="mt-3 space-y-1.5">
                {COURSEWORK.map((course) => (
                  <Text key={course} as="p" tone="secondary" size="body-sm">
                    {course}
                  </Text>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
