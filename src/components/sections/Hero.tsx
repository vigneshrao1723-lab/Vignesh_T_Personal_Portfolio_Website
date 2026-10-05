import { Button, Container, Heading, Marquee, PortraitSlot, SectionLabel, Text } from "../ui";
import { useHeroEntrance } from "../../animation/useHeroEntrance";

const ITEM_COUNT = 6;

// Resume-sourced (spec §2 Skills row) — every entry traces back to a
// listed skill, nothing added.
const SKILLS = [
  "Python",
  "C",
  "C++",
  "Java",
  "Linux/Unix",
  "TCP/IP",
  "Socket Programming",
  "Network Security",
  "AES-256",
  "RSA",
  "Post-Quantum Cryptography",
  "Kyber",
  "MySQL",
  "SQL",
  "NoSQL",
  "REST APIs",
  "Docker",
  "CI/CD",
  "RAG",
  "LangChain",
  "FAISS",
];

/**
 * Hero (spec §8 Phase 3). Left: name, intro, contact CTAs. Right: the portrait.
 * The large 3D lattice that used to sit behind this text was removed on
 * 2026-10-05 — it overpowered the page and crossed over the nav and the copy.
 * With no head model there is no canvas or WebGL here, so nothing can cover the text.
 *
 * The portrait slot (`PortraitSlot`) shows the flat photo with `CursorPortrait`'s
 * small, eased tilt toward the cursor (an honest 2D tilt, not a fake 3D head).
 * If a model exists at `src/assets/head.glb` it becomes a lazily-loaded 3D head
 * that turns toward the cursor instead (see `content/profile.ts`). The grid
 * column and the fixed aspect box are the same either way: no layout shift.
 */
export function Hero() {
  const getItemRef = useHeroEntrance(ITEM_COUNT);

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-[720px] flex-col justify-center overflow-hidden pb-32 pt-28 md:min-h-dvh md:py-0"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:gap-10 lg:gap-16">
          <div>
            <div ref={getItemRef(0)}>
              <SectionLabel index="00">Lattice</SectionLabel>
            </div>

            <Heading ref={getItemRef(1)} as="h1" size="display-2xl" className="mt-6 max-w-3xl">
              Vignesh T
            </Heading>

            <Text
              ref={getItemRef(2)}
              as="p"
              tone="secondary"
              size="body-lg"
              className="mt-4 max-w-2xl"
            >
              I&rsquo;m a pre-final-year CS engineering student interested in networking, applied
              cryptography, and AI engineering. I work with Python, Linux, and SQL, and I do
              full-stack technical operations work.
            </Text>

            <Text ref={getItemRef(3)} as="p" tone="muted" size="caption" className="mt-4">
              Bengaluru, Karnataka
            </Text>

            <div ref={getItemRef(4)} className="mt-8 flex flex-wrap gap-4">
              <Button href="mailto:vigneshrao1723@gmail.com" variant="primary">
                Email me
              </Button>
              <Button href="tel:+916363165765" variant="secondary">
                Call
              </Button>
            </div>
          </div>

          <div
            ref={getItemRef(5)}
            className="mx-auto w-full max-w-[16rem] md:max-w-[20rem] md:justify-self-end lg:max-w-sm"
          >
            <PortraitSlot />
          </div>
        </div>
      </Container>

      <Marquee items={SKILLS} className="absolute inset-x-0 bottom-8" />
    </section>
  );
}
