import type { ProjectVariant } from "../scene/ProjectShowcase";

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
  /** Only stated when a source supports it. */
  status?: string;
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
   * Drop-in slots for the final 3D project assets — leave undefined until
   * they exist (nothing is fabricated).
   *  - `logo`: a small mark shown above the project label (e.g. a rendered
   *    3D logo with a transparent background).
   *  - `visual`: replaces the procedural WebGL artifact in the left panel
   *    with a static image/render. Without it the existing procedural 3D
   *    artifact (`variant`) is shown.
   * To use one: put the file in `src/assets/projects/`, import it at the top
   * of this file, and set `{ src: importedUrl, alt: "…" }` on the project.
   */
  logo?: ProjectAsset;
  visual?: ProjectAsset;
  variant: ProjectVariant;
}

const NBSP = " ";

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
    tags: ["Python", "RSA-2048", "ML-KEM-768 (Kyber)", "AES-256-GCM", "PostgreSQL"],
    description:
      "A secure messaging system for comparing RSA-2048 + AES-256-GCM with Kyber (ML-KEM-768) + AES-256-GCM, since RSA key exchange would not survive a large quantum computer. It runs on desktop, web and Android, and messages are encrypted on the client.",
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
    status: "In development, not production-ready",
    links: [
      {
        label: "View source on GitHub",
        href: "https://github.com/vigneshrao1723-lab/Quantum-Resistant-Secure-Communication-System",
      },
    ],
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
    variant: "crypto",
  },
  {
    number: "02",
    name: "Advanced RAG Knowledge Assistant",
    tags: ["Python", "FastAPI", "PostgreSQL", "pgvector", "Next.js"],
    description:
      "A RAG assistant that ingests documents, retrieves the passages that matter for a question, and answers with citations, so every answer can be traced back to its source.",
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
        label: "View source on GitHub",
        href: "https://github.com/vigneshrao1723-lab/advanced-rag-knowledge-assistant",
      },
    ],
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
    variant: "rag",
  },
  {
    number: "03",
    name: "Project Store",
    tags: ["REST APIs", "Database transactions", "Docker", "CI/CD"],
    description:
      "A small store I’m building for my own projects and work, to practice the whole flow from browsing to checkout. It isn’t finished, and it isn’t meant to be an enterprise platform.",
    highlight: {
      label: "What it will do",
      text: "Browse projects by category, add them to a cart, and check out through a sandbox payment, with a simple admin view for managing items and orders.",
    },
    status: "In progress, not finished",
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
    variant: "commerce",
  },
];
