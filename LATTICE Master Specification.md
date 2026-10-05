# LATTICE Master Specification

Sep 26, 2026 · @Vignesh T

## 1. Project Vision

LATTICE is Vignesh T's personal 3D portfolio, named after lattice-based post-quantum cryptography — his flagship subject and the field one of his own projects benchmarks (Kyber-1024 vs. classical RSA-2048). The name is not decorative; the hero's 3D object and the site's structural metaphor should both literally be a lattice.

**What the visitor experiences:** a real-time WebGL journey through the profile of a pre-final-year CS engineering student who operates at the intersection of applied cryptography, networking/systems, and AI engineering — and who has already shipped production systems (a company website and internal ops infrastructure) rather than only coursework projects.

**What makes it distinctive:**

- A procedural 3D artifact per project that visualizes what the project actually does, not a generic card thumbnail.
- A continuous scroll-driven camera journey through the lattice structure, rather than section-by-section jump cuts.
- A light-mode, editorial visual language instead of the dark-glass/neon aesthetic most 3D dev portfolios default to.

**What it must communicate:**

- Technical depth in cryptography, security, and networking (not just "full-stack").
- Real delivery ability — Vignesh built and owned production systems at Earthy, not only side projects.
- Precision and restraint — the crypto/security framing implies rigor, so the UI should read as engineered, not decorative.

## 2. Content Architecture

Mapped from the resume only — nothing invented. Gaps are called out inline and repeated under Missing Inputs.

| Section | Resume-sourced content |
| --- | --- |
| Hero | Name: Vignesh T. Location: Bengaluru, Karnataka. Identity line: pre-final-year CS Engineering student — Python, networking, cryptography fundamentals, Linux systems, SQL, full-stack technical operations. |
| About | Acharya Institute of Technology (VTU), B.E. Computer Science and Engineering, CGPA 8.3/10, Aug 2023 – Jun 2027. Coursework: DSA, Computer Networks, Operating Systems, DBMS. Narrative: troubleshooting complex systems, automating workflows, end-to-end technical solutions in fast-paced cross-functional environments. |
| Experience | Earthy, Bengaluru — Founder's Associate (Growth Engineer), Oct 2025 – Sep 2026. Bullets: architected/deployed internal business operating systems incl. company website, UI/UX workflows, technical infrastructure; resolved cross-system technical issues with non-technical stakeholders; owned full-cycle product/engineering/operations tasks; partnered with founders on strategic roadmaps and business development. |
| Projects | Three resume projects: (1) Quantum-Resistant Secure Communication System — Python, sockets, AES-256, RSA, Kyber, PQC; TCP client-server framework benchmarking RSA-2048+AES-256-GCM vs. Kyber-1024+AES-256-GCM; secure session establishment, latency/throughput analysis. (2) Advanced RAG Knowledge Assistant — Python, LangChain, FAISS, Flask, Streamlit; ingestion, semantic chunking, embeddings, FAISS retrieval, Streamlit UI with source attribution and confidence estimation. (3) Production E-Commerce Platform — REST APIs, DB transactions, Docker, CI/CD; auth, catalog/search, cart/checkout, admin dashboard, containerized with CI/CD. |
| Skills | Grouped exactly per resume: OS & Networking (Linux/Unix, TCP/IP, Socket Programming, Network Security), Languages (Python, C, C++, Java), Databases (MySQL, SQL), Tools & Platforms (Git, GitHub, VS Code, Jupyter, Flask), Infrastructure (REST APIs, Docker, CI/CD), AI/ML (RAG, LangChain, FAISS, Prompt Engineering), Security (AES-256, RSA, Post-Quantum Cryptography/Kyber). |
| Achievements | Certifications: Automating Cyber Security with AI (LinkedIn Learning, 2026); RAG AI Apps and AI Agent for Cybersecurity and Networking (LinkedIn Learning, 2026); Introduction to Applied Cryptography and Cryptanalysis (LinkedIn Learning, 2026). Extracurricular: Hackathon Participant, 2023–Present. |
| Contact | Phone 6363165765, email vigneshrao1723@gmail.com, GitHub (URL not present on resume — placeholder only), LinkedIn (URL not present on resume — placeholder only). |
| Footer | Name, focus areas (cryptography / security / AI systems), location Bengaluru. |

**Content gaps to flag now:** GitHub and LinkedIn are labelled but carry no actual URLs on the resume; only three projects exist as source material against the five procedural-3D-artifact projects referenced in earlier project planning; Experience section only lists the original "Founder's Associate" title, with no later title change reflected.

## 3. Design System

Baseline is the uploaded Portfolio Building Guide's Visual Direction Add-on, cross-checked against the light-mode pivot already decided for LATTICE.

- **Personality:** editorial-technical. Quiet confidence, not flashy — the crypto/security framing implies precision, so decoration is earned, not default.
- **Palette:** light neutral base #F4F5F7, white content surfaces, shadow-based elevation (no glow/bloom, matching the light-mode pivot). One strong accent color — not yet chosen; see Decision Gates.
- **Typography:** a signature/display font for headlines and section numerals, a clean sans for body copy, and a monospace accent for the boot-sequence ticker and any code-flavored UI (fits the security/crypto identity). Specific families are a decision gate.
- **Spacing/grid:** generous whitespace, editorial layouts, numbered section labels ("01, 02, 03…") as a structural motif carried from the guide.
- **Card language:** rounded cards, subtle shadow elevation, alternating neutral/accent treatment for Experience cards.
- **Borders/buttons:** restrained glassmorphism on the floating pill navbar only — not applied broadly. Buttons follow the NeonButton pattern already used for the Contact CTAs, reinterpreted for light mode as a soft shadow/accent-ring hover instead of true glow.
- **Navigation:** floating pill-shaped glassmorphism navbar, per the guide's Hero spec.
- **Responsive behavior:** desktop/tablet/mobile all designed intentionally (see Technical Architecture and Motion System); visual hierarchy preserved on small screens rather than shrunk.

## 4. 3D Art Direction

- **Hero concept:** a literal 3D lattice — a crystalline grid of nodes and edges — as the hero object, directly tying the site's name to lattice-based cryptography rather than using an abstract or generic 3D shape.
- **Environment:** minimal, light studio void consistent with the light-mode pivot; no heavy dark environment or dense particle fog.
- **Hero object materials:** refractive glass/crystal for lattice nodes, subtle metallic accent along the connecting edges.
- **Lighting:** soft studio lighting with shadow-based elevation, matching the decision to disable bloom/chromatic aberration site-wide.
- **Camera language:** a continuous scroll-driven journey through and around the lattice, rather than per-section jump cuts — the camera is the connective tissue between sections.
- **Depth/interaction:** mouse-parallax on the hero, drag-to-rotate 360° behavior on the hero lattice object.
- **Holographic ID card (Phase 9B):** tilt-follow on the user-supplied portrait.jpg with a rim-glow edge; explicitly no heavy scan-line effect, per prior direction.
- **Per-project 3D artifacts:** one procedural piece per project, each visualizing what that project does rather than decorating it —
  - Quantum-Resistant Secure Communication System → two intersecting key/lock forms (classical vs. post-quantum) animating a handshake.
  - Advanced RAG Knowledge Assistant → a document-to-vector node graph converging on a query point.
  - Production E-Commerce Platform → a linear flow object (cart → checkout → order) rendered as connected geometric stages.
  - Two further artifacts are needed only if the project count is confirmed at five (see Decision Gates / Missing Inputs).
- **Realistic vs. stylized:** stylized-geometric throughout, not photorealistic — keeps GPU/asset budget controlled and stays consistent with the lattice/crystal motif rather than mixing render styles.

## 5. Motion System

- **Preloader:** #F4F5F7 background, floating light bubbles, an animated boot-sequence ticker (e.g. "// LATTICE INITIALIZING"), monogram, role title, percentage indicator, refined upward-slide exit — fast and performance-conscious, per the guide.
- **Hero animation:** oversized background typography reveal timed with the 3D lattice assembling/materializing on load.
- **Scroll behavior:** GSAP ScrollTrigger drives both section reveals and camera position along the lattice journey — scroll position and camera position are the same timeline, not two separate systems.
- **Camera movement:** continuous, not per-section jump cuts (see 3D Art Direction).
- **Transitions:** smooth cross-section transitions; Experience section uses a pinned/sticky deck interaction for its timeline cards.
- **Micro-interactions:** magnetic hover on nav and CTA buttons, hover-lift on project cards, active-spotlight card behavior in the Skills bento grid.
- **Hover behavior:** Skills grid highlights one active category card at a time with a short ticker/description swap.
- **Reduced-motion behavior:** disable camera drift, parallax, and marquee motion; keep only essential state transitions (loading → loaded, section in-view). No motion should ever be the sole carrier of required information.

## 6. Technical Architecture

| Layer | Choice | Reason |
| --- | --- | --- |
| Build tool | Vite | Fast dev/build, matches the uploaded tech-stack direction. |
| Framework | React 18 + TypeScript | Component architecture for interactive sections; type safety. |
| 3D | React Three Fiber + @react-three/drei | Declarative Three.js in React; drei for loaders, controls, helpers. |
| Postprocessing | `postprocessing` library present but bloom/chromatic aberration disabled | Light-mode pivot uses shadow-based elevation, not glow. |
| Motion (DOM) | GSAP + ScrollTrigger, Framer Motion | GSAP for scroll-driven camera/section motion; Framer Motion for preloader/UI transitions. |
| Styling | Tailwind CSS | Fast, consistent design-token-driven styling. |
| State | Zustand | Lightweight global state for scroll/camera/section state. |
| Smooth scroll | Lenis | Consistent scroll feel across GSAP ScrollTrigger. |
| Icons | lucide-react | Used on Contact CTAs and nav. |

- **Asset pipeline:** compressed GLB/GLTF models loaded via drei's `useGLTF` + Suspense; portrait.jpg for the holographic ID card.
- **Responsive rendering:** reduce lattice node count / geometry complexity on mobile; provide a CSS/image fallback where WebGL is unavailable or reduced-motion is set.
- **Performance:** per-section code splitting, lazy-loaded 3D assets, Draco/Meshopt-compressed GLBs, texture budget kept low by favoring material-driven looks over baked textures.
- **Accessibility:** semantic HTML content running in parallel to every 3D visual (nothing WebGL-only conveys required information), keyboard-operable nav and CTAs, visible focus states through the glass navbar, reduced-motion support at the camera/parallax/marquee level.
- **Deployment:** hosting provider not yet chosen — kept provider-agnostic until a decision gate (static hosting such as Vercel or Netlify is the natural fit for a Vite/React build, but not assumed).

## 7. 3D Production Pipeline

Blender → optimize → GLB/GLTF → React Three Fiber → WebGL.

- **Modeling:** lattice nodes/edges and each per-project artifact modeled at low-to-mid poly; detail carried by material and lighting, not geometry density.
- **UVs:** unwrapped only where a baked texture is actually needed — most surfaces stay PBR material-only (glass/crystal + metal accent), keeping UV work minimal.
- **Materials:** Principled BSDF in Blender; glass/crystal via `KHR_materials_transmission` on glTF export so refraction survives the pipeline into R3F.
- **Textures:** minimal and procedural-first; baked textures only where material alone can't carry the look, to keep per-asset size down.
- **Lighting:** ambient occlusion baked where it meaningfully helps; primary lighting handled live in R3F, not baked into the GLB, so it stays responsive to scroll/camera state.
- **Optimization:** decimate/retopologize before export; target sub-1MB per artifact where the geometry allows it.
- **Compression:** Draco or Meshopt compression applied to every exported GLB.
- **Loading:** `useGLTF` + `Suspense`, with the existing preloader/ticker UI reused as the in-scene loading state for later assets (project artifacts loaded on section approach, not all at once).
- **Fallback behavior:** a static image or simplified CSS representation stands in wherever WebGL is unsupported or reduced-motion is active.

## 8. Implementation Roadmap

**This roadmap assumes Phase 0 as instructed — no existing implementation.** That conflicts with earlier project notes recording a build completed through Phase 8 with a light-mode pivot in progress. Resolve which is true before Phase 2 starts (see Decision Gates).

| Phase | Goal |
| --- | --- |
| 0 — Discovery | This specification; resolve open decision gates and missing inputs. |
| 1 — Design System | Lock color tokens, typography, spacing, card/button language — light mode from the start, no dark-mode-then-pivot detour. |
| 2 — Project Foundation | Vite/React/TS scaffold, Tailwind config, base layout, Zustand store skeleton, Lenis + GSAP ScrollTrigger wiring. |
| 3 — Hero | Preloader, hero lattice 3D object, glass navbar, skills marquee. |
| 4 — Core Sections | About, Experience (pinned deck), Skills (bento grid), Contact (4 CTA buttons), Footer. |
| 5 — Project Showcases | Project cards + per-project 3D artifacts. |
| 6 — 3D Polish | Lighting/camera-journey tuning, holographic ID card (portrait.jpg). |
| 7 — Responsive | Mobile/tablet behavior across every section, including 3D complexity scaling. |
| 8 — Performance | Asset compression, code-splitting, lazy loading, Lighthouse pass. |
| 9 — Accessibility | Keyboard nav, reduced-motion, contrast, screen-reader parity for 3D-only content. |
| 10 — QA | Cross-browser/device pass, content proofread against the resume. |
| 11 — Deployment | Hosting setup, domain, monitoring if desired. |

## 9. Decision Gates

1. **Build status conflict:** is LATTICE genuinely starting from Phase 0 (no code), or does the previously-recorded Phase 8 build + in-progress light-mode pivot already exist and this spec should integrate with it?
2. **Hero concept:** a literal crystal-lattice structure (recommended, ties directly to the name) vs. an alternative 3D motif.
3. **Accent color:** the guide's example is crimson/red; a crypto-signal color (cyan or amber) is an alternative that reads more "security/systems." Needs one pick, used consistently.
4. **Typography:** no specific display/body font pair chosen yet.
5. **3D style:** stylized-geometric (recommended for performance and thematic fit) vs. photorealistic.
6. **Character usage:** the Portfolio Building Guide specifies GenEmoji-style 3D character illustrations throughout About/Experience/Projects/Skills/Achievements/Contact. LATTICE's crypto-lattice identity could instead carry personality through the lattice/artifact motifs alone, with no character. This is a real fork in visual direction, not a detail — needs explicit approval either way.
7. **Project count:** three projects (as the resume currently supports) vs. five (as earlier discussed) — if five, the two additional projects need to be supplied.
8. **Animation intensity:** confirm the no-bloom/no-chromatic-aberration policy holds site-wide, not only in the hero.

## 10. Missing Inputs

- Actual GitHub URL/username (resume shows the word "GitHub" with no link).
- Actual LinkedIn URL confirmation for the Contact section (a LinkedIn URL exists in prior project context but not on the resume itself — confirm it's current).
- portrait.jpg for the holographic ID card, if not already supplied.
- Resolution of the Phase-0-vs-Phase-8 build-status conflict (Decision Gate 1).
- Confirmation on project count — three vs. five (Decision Gate 7), and the two additional projects if five is chosen.
- Accent color, typography, hero-concept, 3D-style, and character-usage picks (Decision Gates 2–6).

## 11. Success Criteria

- A visitor understands within the hero view that this is a security/AI-focused CS engineer's site, not a generic 3D-portfolio template.
- Each project's 3D artifact communicates what that project does, not just decorates its card.
- Smooth performance on a mid-range laptop and a recent mobile device; reduced-motion fully honored.
- Every resume-sourced fact on the site is accurate and traceable to source material — nothing invented.
- Passes a basic accessibility check: keyboard-operable, sufficient contrast, and screen-reader-parallel content for anything conveyed only through 3D.
- Reads as intentional and personal — the lattice/crypto motif carried consistently — rather than a reskinned template.
