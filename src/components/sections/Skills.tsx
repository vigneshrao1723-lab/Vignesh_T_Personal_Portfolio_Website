import { Container, Heading, Section, SectionLabel, Text } from "../ui";
import { useScrollReveal } from "../../animation/useScrollReveal";

interface SkillGroup {
  label: string;
  items: string[];
}

// Resume-sourced only (spec §2 Skills row), grouped exactly as the resume
// itself groups them — not remapped into a different taxonomy. Order
// matches the resume's own sequence (OS & Networking, Languages,
// Databases, Tools & Platforms, Infrastructure, AI/ML, Security), not just
// the same categories in an arbitrary order. No proficiency levels,
// ratings, or scores: the resume doesn't establish any, so none are
// implied here.
const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "OS & Networking",
    items: ["Linux/Unix", "TCP/IP fundamentals", "Socket Programming", "Network Security"],
  },
  {
    label: "Languages",
    items: ["Python", "C", "C++", "Java"],
  },
  {
    label: "Databases",
    items: ["MySQL", "SQL", "NoSQL"],
  },
  {
    label: "Tools & Platforms",
    items: ["Git", "GitHub", "VS Code", "Jupyter Notebook", "Flask"],
  },
  {
    label: "Infrastructure",
    items: ["REST APIs", "Docker", "CI/CD"],
  },
  {
    label: "AI/ML",
    items: ["RAG", "LangChain", "FAISS", "Prompt Engineering"],
  },
  {
    label: "Security",
    items: ["AES-256", "RSA", "Post-Quantum Cryptography", "Kyber"],
  },
];

const ITEM_COUNT = 1 + SKILL_GROUPS.length;

/**
 * Skills (spec §8 Phase 4C). Deliberately typographic, not a tag/chip
 * "technology wall" — each group is a mono/accent label followed by a
 * plain comma-separated list (`Text`, the same primitive About and
 * Experience use for body copy), matching the editorial register rather
 * than a developer-dashboard badge grid. Reuses `useScrollReveal`
 * unmodified (the same hook About uses) — Skills' reveal need (stagger a
 * set of items into view) is exactly what it already does, no new hook
 * required the way Experience's sticky layout was.
 */
export function Skills() {
  const { containerRef, getItemRef } = useScrollReveal<HTMLDivElement>(ITEM_COUNT);

  return (
    <Section id="skills" aria-labelledby="skills-heading">
      <Container ref={containerRef}>
        <div ref={getItemRef(0)}>
          <SectionLabel index="04">Skills</SectionLabel>
          <Heading id="skills-heading" as="h2" size="display-lg" className="mt-6 max-w-2xl">
            What I work with.
          </Heading>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group, index) => (
            <div key={group.label} ref={getItemRef(index + 1)}>
              {/* Same reasoning as Experience's cluster labels: Text has no
                  "accent" tone, so a plain element with fully explicit
                  classes avoids layering an override on its default tone. */}
              <p className="font-mono text-caption uppercase tracking-[0.15em] text-accent">
                {group.label}
              </p>
              <Text as="p" tone="secondary" size="body-sm" className="mt-3">
                {group.items.join(", ")}
              </Text>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
