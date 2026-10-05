import { Container, Heading, Section, Text } from "../ui";
import { useScrollReveal } from "../../animation/useScrollReveal";

interface Certification {
  title: string;
  issuer: string;
  year: string;
}

interface Activity {
  title: string;
  period: string;
  description: string;
}

// Current resume only (Downloads/Vignesh_T_Resume.pdf, Sep 10): three
// LinkedIn Learning certifications dated 2026, plus Hackathon Participant
// (2023 – Present). The older Documents copy dates the certifications
// 2024–2025 and lists a different "Founder Associate" entry — superseded.
// There is no leadership or publications entry in any source, so none is
// shown (the spec's own section list says "Achievements / Leadership /
// Publications", but nothing exists to fill the last two).
const CERTIFICATIONS: Certification[] = [
  {
    title: "Automating Cyber Security with AI",
    issuer: "LinkedIn Learning",
    year: "2026",
  },
  {
    title: "RAG AI Apps and AI Agent for Cybersecurity and Networking",
    issuer: "LinkedIn Learning",
    year: "2026",
  },
  {
    title: "Introduction to Applied Cryptography and Cryptanalysis",
    issuer: "LinkedIn Learning",
    year: "2026",
  },
];

// NEEDS VIGNESH INPUT: how many hackathons, and any result/project built at
// one of them — none of that is in the resume, so none is stated.
const ACTIVITIES: Activity[] = [
  {
    title: "Hackathons",
    period: "2023 – Present",
    description:
      "I take part in hackathons, working with other people in fast-paced settings to prototype and deliver a solution under a tight deadline.",
  },
];

const ITEM_COUNT = 3;

/**
 * Achievements (spec §2 Achievements row; spec §8 Phase 4). Data-driven from
 * the two arrays above and built only from existing primitives/tokens — the
 * same card treatment About and Experience use.
 */
export function Achievements() {
  const { containerRef, getItemRef } = useScrollReveal<HTMLDivElement>(ITEM_COUNT);

  return (
    <Section id="achievements" aria-labelledby="achievements-heading">
      <Container ref={containerRef}>
        <div ref={getItemRef(0)}>
          <Heading
            id="achievements-heading"
            as="h2"
            size="display-lg"
            className="section-heading max-w-2xl"
          >
            Achievements
          </Heading>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-[1.4fr_1fr]">
          <div
            ref={getItemRef(1)}
            className="rounded-card border border-border bg-surface p-8 shadow-card md:p-10"
          >
            <p className="font-mono text-caption uppercase tracking-[0.15em] text-accent">
              Certifications
            </p>
            <ul className="mt-5 space-y-5">
              {CERTIFICATIONS.map((cert) => (
                <li key={cert.title}>
                  <Text as="p" size="body" className="font-medium">
                    {cert.title}
                  </Text>
                  <Text as="p" tone="muted" size="caption" className="mt-1">
                    {cert.issuer} · {cert.year}
                  </Text>
                </li>
              ))}
            </ul>
          </div>

          <div
            ref={getItemRef(2)}
            className="h-fit rounded-card border border-border bg-surface p-8 shadow-card md:p-10"
          >
            <p className="font-mono text-caption uppercase tracking-[0.15em] text-accent">
              Extracurricular
            </p>
            <ul className="mt-5 space-y-5">
              {ACTIVITIES.map((activity) => (
                <li key={activity.title}>
                  <Text as="p" size="body" className="font-medium">
                    {activity.title}
                  </Text>
                  <Text as="p" tone="muted" size="caption" className="mt-1">
                    {activity.period}
                  </Text>
                  <Text as="p" tone="secondary" size="body-sm" className="mt-3">
                    {activity.description}
                  </Text>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
