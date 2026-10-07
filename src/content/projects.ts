import quantumSecureCommunication from "../assets/projects/quantum-secure-communication-logo.png";
import ragKnowledgeAssistant from "../assets/projects/rag-logo.png";
import projectStore from "../assets/projects/project-store-icon.png";
import personalPortfolio from "../assets/projects/personal-portfolio-briefcase.png";

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface ProjectAsset {
  src: string;
  alt: string;
  /** Intrinsic pixel size — set both so space is reserved and nothing shifts. */
  width?: number;
  height?: number;
}

export interface ProjectMetrics {
  /**
   * "measured" tiles are results that were actually measured. "planned"
   * tiles are targets for work that isn't finished — they are rendered
   * visibly differently and labelled as planned, and must be replaced with
   * real numbers (and flipped to "measured") only once they are verified.
   */
  kind: "measured" | "planned";
  items: ProjectMetric[];
}

export interface ProjectCaseStudy {
  summary: string;
  overview: string;
  problem: string;
  approach: string;
  technology: string[];
  contributions: string[];
  flow: string[];
  outcome: string;
}

export interface Project {
  number: string;
  name: string;
  /** Small technology tags. */
  tags: string[];
  /** One or two short sentences: what it is, in first person. */
  description: string;
  /** The one-line outcome (or, for unfinished work, what it will do). */
  highlight?: { label: string; text: string };
  /** At most three tiles — the card has to scan in 10–15 seconds. */
  metrics?: ProjectMetrics;
  /** Only real, verified URLs. */
  links?: { label: string; href: string }[];
  /**
   * Everything that backs the card up but doesn't belong in a quick read:
   * the longer explanation, the extra numbers, and every caveat on them.
   * Rendered inside a native <details> so it costs nothing until opened.
   */
  more?: {
    paragraphs?: string[];
    items?: string[];
    metrics?: ProjectMetrics;
  };
  /**
   * Optional local artwork for the project card.
   *  - `logo`: a compact mark shown above the project title.
   *  - `visual`: primary project artwork, shown in the card's shared
   *    aspect-ratio frame without cropping or distortion.
   * Import assets from `src/assets/projects/` and set `{ src, alt }`.
   */
  logo?: ProjectAsset;
  visual?: ProjectAsset;
  caseStudy: ProjectCaseStudy;
}

const NBSP = " ";
const QUANTUM_SOURCE_URL = "https://github.com/vigneshrao1723-lab/Quantum-Resistant-Secure-Communication-System";
const RAG_SOURCE_URL = "https://github.com/vigneshrao1723-lab/advanced-rag-knowledge-assistant";
const PROJECT_STORE_SOURCE_URL = "https://github.com/vigneshrao1723-lab/Project-store";
const PORTFOLIO_SOURCE_URL = "https://github.com/vigneshrao1723-lab/Vignesh_T_Personal_Portfolio_Website";

// Evidence behind every number below is traced in CLAUDE.md. Summary:
//  • Project A: the user's project audit. Independently reproduced on disk:
//    1,840 collected tests (`pytest --collect-only -q`), the key-exchange
//    benchmark (200 iterations, 20 warm-up; RSA-2048 keygen 33.21 ms,
//    ML-KEM-768 keygen 2.43 ms, session-key round trip 0.51 ms vs 8.16 ms —
//    benchmark/results/key_exchange.json), ML-DSA-65 sizes (1,952 / 3,309
//    bytes) and the ML-KEM-768 public key size (1,184 bytes). Taken from the
//    audit without re-deriving: 46 protocol operations, 3 platforms, the
//    40-item matrix (36 PASS / 4 PARTIAL), the 1,088-byte ciphertext.
//  • Project B: the user's audit/benchmark run. NOT independently
//    reproduced. The public repo was confirmed to exist and be active.
//  • Project C: NOT built or measured. Every value is a clearly labelled
//    plan, and must not read as a result. Replace with real numbers once the
//    project is finished and measured.
//
// Kyber parameter set: the code, tests and benchmark all use ML-KEM-768 (the
// standardized name for Kyber-768). A brief and the résumé say "Kyber-1024";
// nothing in the repo's history ever used it, so the site says what was built.
//
// NEEDS VIGNESH INPUT — why each project was built, and what he learned from
// it (no source exists for either, so neither is on the site); Project B's
// status; Project C's real numbers once it exists.
export const PROJECTS: Project[] = [
  {
    number: "01",
    name: "Quantum-Resistant Secure Communication System",
    tags: ["Python", "RSA-2048 + ML-KEM-768", "AES-256-GCM", "PostgreSQL"],
    description:
      "A secure messaging system comparing RSA-2048 and ML-KEM-768 key exchange, with client-side encryption across desktop, web and Android.",
    highlight: {
      label: "What I measured",
      text: `Session-key setup took 0.51${NBSP}ms with RSA and 8.16${NBSP}ms with ML-KEM-768. That gap reflects the implementations, not the algorithms: the RSA path uses native OpenSSL, the ML-KEM code is pure Python.`,
    },
    metrics: {
      kind: "measured",
      items: [
        { value: "3", label: "Client platforms" },
        { value: "46", label: "Protocol operations" },
        { value: "1,840", label: "Collected tests" },
      ],
    },
    links: [
      {
        label: "View Source",
        href: QUANTUM_SOURCE_URL,
      },
    ],
    visual: {
      src: quantumSecureCommunication,
      alt: "Supplied logo for the quantum-resistant secure communication system",
    },
    more: {
      paragraphs: [
        "RSA key exchange would be broken by a large enough quantum computer running Shor’s algorithm. ML-KEM (Kyber), standardized by NIST as FIPS 203, is the post-quantum replacement, so I put both behind the same messaging system to see how they behave side by side.",
        `The benchmark ran 200 iterations after 20 warm-up runs on one development machine. Key generation averaged 2.43${NBSP}ms for ML-KEM-768 and 33.21${NBSP}ms for RSA-2048. Sizes are fixed by the standards: an ML-KEM-768 public key is 1,184${NBSP}bytes and its ciphertext 1,088${NBSP}bytes, and an ML-DSA-65 signature is 3,309${NBSP}bytes. The project’s own benchmark notes say the timing comparison is between implementations, so I don’t read it as one algorithm being faster.`,
      ],
      items: [
        "Five cryptographic primitives: RSA-2048, ML-KEM-768, ML-DSA-65, AES-256-GCM and Argon2id.",
        "Keys and messages are signed with ML-DSA-65, and a peer has to be verified by fingerprint before their keys are trusted.",
        "It runs over TLS with PostgreSQL storage and JWT authentication.",
        "Against a 40-item feature acceptance matrix, 36 items pass and 4 are partial.",
        "1,840 is the number of tests collected by pytest, not a claim that they all pass.",
      ],
    },
    caseStudy: {
      summary: "A comparative secure-messaging build for conventional and post-quantum key exchange.",
      overview:
        "A secure messaging system that puts RSA-2048 and ML-KEM-768 key exchange behind the same client experience across desktop, web, and Android.",
      problem:
        "Messaging systems need to protect session setup while making the trade-offs between established and post-quantum cryptography visible in a working implementation.",
      approach:
        "The project compares the two exchange paths, then protects messages with authenticated encryption. Peer verification, signatures, TLS, authentication, and persistent storage complete the messaging flow.",
      technology: ["Python", "RSA-2048", "ML-KEM-768", "ML-DSA-65", "AES-256-GCM", "Argon2id", "PostgreSQL", "TLS", "JWT"],
      contributions: [
        "Built a shared messaging flow for RSA-2048 and ML-KEM-768 session-key exchange.",
        "Added ML-DSA-65 signing, peer fingerprint verification, and AES-256-GCM message encryption.",
        "Benchmarked key-generation and session-key setup paths with documented implementation caveats.",
        "Tested the protocol surface with a 40-item acceptance matrix and 1,840 collected pytest tests.",
      ],
      flow: ["Desktop, web & Android clients", "TLS + JWT messaging service", "RSA-2048 or ML-KEM-768 session setup", "AES-256-GCM encrypted messages", "PostgreSQL storage"],
      outcome:
        "The build makes post-quantum integration concrete while keeping its measurements appropriately scoped to one development environment and implementation.",
    },
  },
  {
    number: "02",
    name: "Advanced RAG Knowledge Assistant",
    tags: ["FastAPI", "PostgreSQL / pgvector", "Next.js"],
    description:
      "A document assistant that retrieves relevant passages and answers questions with citations linking each response to its source.",
    highlight: {
      label: "What I measured",
      text: `On a 20-document test corpus, all 400 measured answers came back with citations, and retrieval took about 4${NBSP}ms at the median. These are local runs on a small corpus, not production traffic.`,
    },
    metrics: {
      kind: "measured",
      items: [
        { value: "20", label: "Documents" },
        { value: "331", label: "Chunks" },
        { value: `~4${NBSP}ms`, label: "Median retrieval" },
      ],
    },
    links: [
      {
        label: "View Source",
        href: RAG_SOURCE_URL,
      },
    ],
    visual: {
      src: ragKnowledgeAssistant,
      alt: "Supplied logo for the advanced RAG knowledge assistant",
    },
    more: {
      paragraphs: [
        "Documents go through extraction, cleaning and structure-aware chunking, and the 384-dimensional embeddings are stored in PostgreSQL with pgvector. A question runs dense and lexical retrieval, merges the results with reciprocal-rank fusion, reranks them, and generates a grounded answer with citations.",
        `The corpus was 20 Markdown documents (about 290${NBSP}KB), which produced 331 chunks and 331 vectors with 0 ingestion failures. Retrieval was about 4${NBSP}ms median and about 6${NBSP}ms at p95, and a question-to-cited-answer request through the API took roughly 40–70${NBSP}ms median across my measured runs. On a 7-query, 6-document retrieval sanity fixture, Recall@3 and MRR were both 1.0. That fixture is small and deterministic, so it is a sanity check rather than an accuracy claim.`,
      ],
      items: [
        "A FastAPI backend and a Next.js frontend, with authentication, workspaces, observability and a voice mode.",
        "An evaluation harness is part of the project.",
        "In my benchmark run the backend reported 745 tests: 740 passed and 5 need espeak-ng installed. The frontend has 76 tests.",
      ],
    },
    caseStudy: {
      summary: "A citation-first document assistant that grounds answers in retrieved source passages.",
      overview:
        "A document assistant that ingests a small knowledge corpus, retrieves relevant passages, and returns answers with citations connected to their sources.",
      problem:
        "Question-answering over documents needs retrieval quality and traceability so users can inspect the source behind an answer rather than trust ungrounded output.",
      approach:
        "Documents are extracted, cleaned, and structure-aware chunked before 384-dimensional embeddings are stored in pgvector. A question combines dense and lexical retrieval with reciprocal-rank fusion, reranking, and cited answer generation.",
      technology: ["FastAPI", "Next.js", "PostgreSQL", "pgvector", "Dense retrieval", "Lexical retrieval", "Reciprocal-rank fusion", "Reranking"],
      contributions: [
        "Built the extraction, cleaning, chunking, and embedding pipeline for document ingestion.",
        "Stored vectors in PostgreSQL with pgvector and combined dense and lexical retrieval.",
        "Added reranking and citations so answers remain connected to retrieved passages.",
        "Included authentication, workspaces, observability, voice mode, and an evaluation harness.",
      ],
      flow: ["Documents", "Extract, clean & chunk", "Embeddings in PostgreSQL / pgvector", "Dense + lexical retrieval", "Rerank", "Cited answer"],
      outcome:
        "On the measured 20-document corpus, every one of 400 recorded answers included citations; the figures are local small-corpus results, not production traffic claims.",
    },
  },
  {
    number: "03",
    name: "Project Store",
    tags: ["REST APIs", "Transactions", "Docker", "CI/CD"],
    description:
      "A personal project store designed around browsing, a cart, and sandbox checkout.",
    links: [{ label: "View Source", href: PROJECT_STORE_SOURCE_URL }],
    highlight: {
      label: "What it will do",
      text: "Browse projects by category, add them to a cart, and check out through a sandbox payment, with a simple admin view for managing items and orders.",
    },
    visual: {
      src: projectStore,
      alt: "Supplied logo for Project Store",
    },
    more: {
      items: [
        "User authentication, and a catalog of my own projects with category-based browsing and search.",
        "Inventory tracking, a shopping cart, sandbox checkout and order management.",
        "An admin dashboard, REST APIs backed by database transactions, and automated testing.",
        "Docker and CI/CD as part of the engineering stack.",
      ],
      metrics: {
        kind: "planned",
        items: [
          { value: "10–20", label: "Project listings" },
          { value: "3–5", label: "Categories" },
          { value: "5–8", label: "Core API resources" },
          { value: "Sandbox", label: "Checkout" },
        ],
      },
    },
    caseStudy: {
      summary: "A project store designed around a conventional commerce flow.",
      overview:
        "A personal project store designed around browsing a catalog, maintaining a cart, and completing a sandbox checkout.",
      problem:
        "The project explores a coherent project-discovery and order-management flow while keeping the scope explicit about what is planned rather than already delivered.",
      approach:
        "The planned system combines authenticated browsing and search with REST API resources, database transactions, inventory tracking, a cart, checkout, and an admin view.",
      technology: ["REST APIs", "Database transactions", "Docker", "CI/CD", "Automated testing"],
      contributions: [
        "Defined a catalog with category browsing and search for personal projects.",
        "Planned inventory, cart, sandbox checkout, and order-management flows.",
        "Scoped an admin dashboard and REST APIs backed by database transactions.",
        "Included Docker, CI/CD, and automated testing in the engineering plan.",
      ],
      flow: ["Visitor", "Project catalog & search", "Cart", "Sandbox checkout", "Orders & admin management"],
      outcome:
        "The flow and engineering scope are documented without claiming shipped or measured functionality.",
    },
  },
  {
    number: "04",
    name: "Personal Portfolio",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "GSAP"],
    description:
      "A responsive engineering portfolio that combines interactive UI, technical storytelling, and recruiter-focused project presentation.",
    links: [{ label: "View Source", href: PORTFOLIO_SOURCE_URL }],
    visual: {
      src: personalPortfolio,
      alt: "Briefcase icon for the personal portfolio",
    },
    caseStudy: {
      summary: "A responsive portfolio designed to present engineering work with focused interaction and clear technical context.",
      overview:
        "This site is a React and TypeScript portfolio built with reusable sections, responsive navigation, project content, and a compact visual system for presenting experience and work.",
      problem:
        "A portfolio has to make technical work scannable for recruiters while still giving reviewers a way to inspect implementation context without turning project cards into long documents.",
      approach:
        "The interface separates content data, UI primitives, section components, and animation hooks. A hanging digital ID card provides direct manipulation, while scroll-triggered motion and responsive layouts reinforce reading order.",
      technology: ["React", "TypeScript", "Vite", "Tailwind CSS", "GSAP", "Zustand", "Lenis"],
      contributions: [
        "Built reusable section, heading, button, link, and container primitives.",
        "Implemented a keyboard- and touch-accessible hanging ID card with pointer drag and spring-back motion.",
        "Added scroll-triggered reveals, smooth section navigation, and responsive navigation behavior.",
        "Structured project content as data and included CV download and contact workflows.",
      ],
      flow: ["Visitor", "Responsive React portfolio UI", "Section navigation & content", "Interactive ID card + scroll motion", "Projects, CV download & contact"],
      outcome:
        "The result is a focused, responsive portfolio that keeps primary information easy to scan while allowing deeper technical project context on demand.",
    },
  },
];
