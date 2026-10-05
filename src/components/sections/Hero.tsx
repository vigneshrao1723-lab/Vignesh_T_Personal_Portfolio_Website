import { Container, DigitalIdCard, Heading, Marquee, Text } from "../ui";
import { useHeroEntrance } from "../../animation/useHeroEntrance";
import { useHeroScrollTransition } from "../../animation/useHeroScrollTransition";

const ITEM_COUNT = 4;

const SKILLS = [
  "Python", "C", "C++", "Java", "Linux/Unix", "TCP/IP", "Socket Programming",
  "Network Security", "AES-256", "RSA", "Post-Quantum Cryptography", "Kyber",
  "MySQL", "SQL", "NoSQL", "REST APIs", "Docker", "CI/CD", "RAG", "LangChain", "FAISS",
];

/** Hero identity, with the interactive portfolio ID as its primary visual. */
export function Hero() {
  const getItemRef = useHeroEntrance(ITEM_COUNT);
  const { heroRef, contentRef, cardRef } = useHeroScrollTransition();

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-[720px] flex-col justify-center overflow-hidden pb-32 pt-28 md:min-h-dvh md:py-0"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:gap-10 lg:gap-16">
          <div ref={contentRef}>
            <Heading ref={getItemRef(0)} as="h1" size="display-2xl" className="max-w-3xl">Vignesh T</Heading>
            <Text ref={getItemRef(1)} as="p" tone="secondary" size="body-lg" className="mt-5 max-w-2xl">
              Computer Science &amp; Systems Engineering
            </Text>
            <Text ref={getItemRef(2)} as="p" tone="muted" size="body" className="mt-3 max-w-xl">
              Focused on networking, applied cryptography, AI engineering, and full-stack technical systems.
            </Text>
            <Text ref={getItemRef(3)} as="p" tone="muted" size="body-sm" className="mt-5 max-w-xl font-mono">
              Python / Linux / SQL / Systems / Security / AI
            </Text>
          </div>

          <div ref={cardRef} className="mx-auto w-full max-w-[20rem] md:max-w-[22rem] md:justify-self-end lg:max-w-sm">
            <DigitalIdCard />
          </div>
        </div>
      </Container>

      <Marquee items={SKILLS} className="absolute inset-x-0 bottom-8" />
    </section>
  );
}
