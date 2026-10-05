# LATTICE — PROJECT MASTER INSTRUCTION

## ROLE

You are the Lead Frontend Architect, Creative Technologist, and 3D Web Engineer responsible for developing LATTICE, a premium personal 3D WebGL portfolio.

The project uses React, TypeScript, React Three Fiber/Three.js, GSAP, and modern responsive web technologies.

Your responsibility is to evolve the existing LATTICE codebase without destroying established work.

You are not starting a generic portfolio from scratch.

You are continuing an existing product.

---

# PROJECT VISION

LATTICE is a high-end personal portfolio that combines:

- personal identity
- engineering credibility
- immersive 3D
- cinematic interaction
- editorial typography
- realistic materials and lighting
- responsive UX
- strong project storytelling

The portfolio should feel authored, intentional, technically sophisticated, and human-designed.

Avoid generic AI-generated portfolio aesthetics.

The 3D must serve the story and content rather than exist purely as decoration.

---

# CURRENT STATE

Current project:
LATTICE

Current development phase:
Finalisation pass (2026-10-05, second): the portrait now lives in the Hero
(flat-photo tilt, not a 3D head), project 3D is lazy-mounted on scroll (nothing
3D on first paint), About is trimmed to text + education card. See "Finalisation
pass" below; it supersedes the cleanup pass where they differ.
Cleanup pass (2026-10-05): the hero 3D lattice was REMOVED, project cards were
made concise, About was trimmed, NoSQL was added, and Contact became an
inquiry form. See "Cleanup pass — decisions made (2026-10-05)" below; it
supersedes every earlier note that describes a Hero lattice/canvas, the long
project cards, the "Project Store (E-Commerce Platform)" name, the About
paragraph about Project Store, and the email/call-only Contact section.
Project metrics + content architecture (2026-10-02): project cards now render
from `src/content/projects.ts` with verified-metric tiles; Project C is shown
as PLANNED only. See "Project metrics — decisions made (2026-10-02)" below —
it supersedes the RAG stack (FAISS/Streamlit), the Project 03 description, and
the "Production E-Commerce Platform" name recorded in the entries beneath it.
Content completion (evidence-based copy, Achievements section, portrait with
cursor tilt, section reorder) — complete as of 2026-10-01. See "Content
completion — decisions made" below; it supersedes the Phase 5/6 note that
Projects sits after Contact and the earlier "no GitHub/LinkedIn" decisions.
Content rectification (first-person voice pass, copy only — not a roadmap
phase) — complete as of 2026-10-01. Metrics still awaiting input from
Vignesh; see "Content rectification — decisions made" below.
Final QA (spec §8, Phase 10) — complete as of 2026-09-29.
Accessibility (spec §8, Phase 9) — complete as of 2026-09-29.
Performance (spec §8, Phase 8) — complete as of 2026-09-29.
Responsive (spec §8, Phase 7) — complete as of 2026-09-29.
3D Polish (spec §8, Phase 6) — complete as of 2026-09-29.
Projects (spec §8, Phase 5 — Project Showcases) — complete as of 2026-09-29.
Footer (spec §8, Phase 4 — Core Sections) — complete as of 2026-09-29.
Contact (spec §8, Phase 4D) — complete as of 2026-09-29.
Skills (spec §8, Phase 4C) — complete as of 2026-09-29.
Experience (spec §8, Phase 4B) — complete as of 2026-09-29.
About (spec §8, Phase 4A) — complete as of 2026-09-28.
Hero (spec §8, Phase 3) — complete as of 2026-09-26.
Design System (spec §8, Phase 1) — complete as of 2026-09-26.
Project Foundation (spec §8, Phase 2) — complete as of 2026-09-26.

Spec §8's full "Phase 4 — Core Sections" (About, Experience, Skills,
Contact, Footer — Achievements was dropped from that list earlier in the
project), Phase 5 (Project Showcases), Phase 6 (3D Polish), Phase 7
(Responsive), Phase 8 (Performance), Phase 9 (Accessibility), and Phase 10
(Final QA) are now built. Only Phase 11 (Deployment) remains — not started;
no hosting provider, domain, or CI/CD deployment pipeline has been set up.

This project was started fresh from an empty repository on 2026-09-26. Earlier
references in this file and in prior project notes to "Phase 9D" or a
completed Phase 8 build described a different, unrecovered build and do not
reflect the state of this repository. The LATTICE Master Specification's
Decision Gate 1 flags this exact conflict; it is resolved: there is no
legacy implementation to continue. Treat any phase numbering below Foundation
as not yet built, regardless of what other documents imply.

Before changing anything, inspect the repository and determine what the
current phase actually contains.

Never assume that an earlier phase was implemented exactly as documented —
including this file.

Inspect the actual code.

## Copy pass — Projects intro (2026-10-05, fourth pass)

The brief repeated the earlier ones; everything it listed as work was already
done and committed (verified by inspection: three cards, NoSQL, mailto form,
no hero 3D box, lazy project 3D). The only real gap was the Projects intro. The
heading "Three projects I've worked on." (which a brief called artificial) is now
**"Things I've built, and am still building."** with a quiet line beneath it,
"Work from exploring security, AI, and software engineering." ("still building"
keeps Project Store honest as unfinished). A longer one-line version was tried and
rejected — it wrapped to 4 lines at 1440 and swamped the section. Checked on the
dev server at 1440 (2 lines) and 375 (3 lines): no overflow, 0 console errors;
typecheck/lint/build clean. Experience copy re-read: first person, résumé-sourced,
no invented metrics — unchanged. 3D face status unchanged (no asset; hero keeps
the flat-photo tilt; spec of the needed `.glb` is in the Finalisation section).
The ~918 kB chunk is already lazy (mounted on scroll), see Finalisation pass.

## Completion pass — git checkpoint + independent fact check (2026-10-05, third pass)

The brief repeated the previous ones; nothing was rebuilt. New this pass:
- **Git:** first commit `7b7ab79` ("Portfolio checkpoint…") on `master`, working
  tree clean afterwards. No git identity is configured on this machine, so it was
  committed with a one-off `-c user.name="Vignesh T" -c user.email=<résumé email>`
  (nothing written to git config) and WITHOUT any AI trailer (Vignesh does not want
  AI attribution in public material; git history is public once pushed). `CLAUDE.md`
  and the spec are tracked — remove or ignore them before making the repo public
  if the internal notes should stay private. The branch is `master` (default
  elsewhere is `main`).
- **Kyber parameter set re-verified in the code** (not from the audit):
  `crypto/kyber.py` imports only `ML_KEM_768` (public key 1,184 B constant); no
  Kyber-1024 / ML_KEM_1024 anywhere in the `.py` files. Benchmark JSON re-read:
  200 iterations / 20 warm-up, RSA keygen 33.21 ms, ML-KEM keygen 2.43 ms.
  → site says ML-KEM-768 (the résumé's "Kyber-1024" is the thing to fix).
- **Project B stack re-verified from the public repo's own manifests** (GitHub raw
  files, `main`): `backend/pyproject.toml` has FastAPI, pgvector, psycopg,
  SQLAlchemy, Alembic; `frontend/package.json` has Next; `infra/compose/docker-
  compose.yml` runs PostgreSQL with pgvector. **No** FAISS, LangChain, Flask,
  Streamlit or sentence-transformers in any manifest. → project cards keep
  FastAPI/PostgreSQL/pgvector/Next.js; FAISS/LangChain stay ONLY in Skills and the
  hero marquee as résumé skills (Vignesh listed them as skills to keep).
- Live dev server (5173) smoke test at 375/820/1440/1920: no overflow, 0 console
  errors, 0 canvases at load, 7 sections in order, three project names, 1 h1, form
  present, "Contact me." heading, 0 broken above-the-fold images; hero checked
  visually at 1920. typecheck/lint clean before the commit.

## Finalisation pass — hero portrait, lazy 3D, copy — decisions made (2026-10-05, second pass)

Supersedes the cleanup pass where they differ ("hero right side is empty",
"3D chunk downloads at page load", portrait in About). Everything else in the
brief (hero lattice gone, three projects, NoSQL, contact form, first-person copy)
already existed and was only re-verified. Git state unchanged: zero commits.

**Hero now holds the portrait.** The empty right column is filled by
`CursorPortrait` (the flat photo with the small eased tilt toward the cursor).
It is NOT a 3D head and the site does not claim it is; no real 3D asset exists
(only `src/assets/portrait.jpg`, 1044×1507 flat photo, white background).
Measured on the production build: cursor top-left → yaw −5.99°/pitch +2.6°
(clamped at 6°/4°), bottom-right → +3.1°/−4.0°, window-leave eases back to 0;
reduced motion and touch (iPhone 13 emulation) → no transform at all. The
portrait loads `eager` + `fetchPriority="high"` in the Hero (above the fold);
it sits in a fixed aspect box (no layout shift). Layout: 2 columns from `md`,
stacked below it (portrait under the buttons, `max-w-[16rem]`). Hero section now
has `pb-32 pt-28` on mobile so the absolutely-positioned marquee can't overlap
the taller content (verified: portrait bottom ≤ marquee top at 375/768/820/1440;
no overlap with nav, h1 or buttons). **This slot is the future cursor-following
3D face**: replace `CursorPortrait` in `Hero.tsx` only (plan in section 6b above).
`CursorPortrait` gained an optional `eager` prop.
**About** lost the portrait (moved, not duplicated): short first-person text on
the left, the education card on the right (one card now, stacked school /
coursework), still no project details.

**Performance: the ~918 kB Three.js chunk is no longer on first paint.** New
`src/hooks/useNearViewport.ts` (IntersectionObserver latch, `rootMargin 600px`);
`Projects.tsx` has a small `ProjectPanel` that mounts `ProjectShowcase` only once
its card is near the viewport. Measured (production, 4 widths): 0 requests for
`ProjectShowcase-*.js` and 0 canvases at load; after scrolling to Projects the
chunk is requested once and canvases mount (all 3 after scrolling through);
panel height is fixed so nothing shifts; the sticky 3D panel still sticks (top
= 112 px while its card is in view, then scrolls away with it); reduced motion
still leaves the canvas byte-identical. Main JS 390.7 kB (130.5 kB gzip);
`ProjectShowcase` 917.9 kB (243.6 kB gzip) — unchanged size, just deferred.

**Copy.** Project A's card now states the problem in one clause ("…since RSA key
exchange would not survive a large quantum computer"); B's says answers can be
traced back to their source. Swept `src/` + `index.html` for third-person phrasing
("Vignesh is", "His", "He") and buzzwords (passionate, results-driven, cutting-edge,
leverage, …): none. Metrics untouched.

**Brief-vs-evidence conflicts (unchanged decisions).** The brief again lists
"Kyber-1024" and "LangChain · FAISS · Flask/Streamlit" for Project B. Kept
ML-KEM-768 (code/tests/benchmark) and FastAPI/PostgreSQL/pgvector/Next.js (the
real repo). The brief's "Project Store … covering browsing, product selection,
cart, and checkout" is shown as what it WILL do, labelled unfinished.

**Verification (production build on 4174, stopped afterwards; dev server on
5173 never restarted):** `npm run typecheck`, `npm run lint`, `npm run build` all
clean. At 375/768/820/1440: no horizontal overflow, 0 console/page errors, 0
failed requests, no forbidden strings (Claude/Anthropic/NEEDS VIGNESH/Kyber-1024/
Streamlit/"16x"/"faster than"), hero image loaded, About has no portrait and its
card is inside the viewport. Regression suite (1440): empty/bad-email submit
blocked, valid submit composes the mailto (with/without phone), "More detail"
toggles by keyboard, Projects/Skills/Contact anchors land at 112 px under an 88 px
nav, tab order is document order with ≥ 2 px outlines, reduced motion stable.
Screenshots of hero (1440, 375) and About (1440) inspected. GitHub profile and both
project repos returned HTTP 200 (LinkedIn blocks bots — trusted from the résumé).
Not tested: a real mail client, real phones, Firefox/Safari. Test-script note: a
check that waited for a project canvas at load failed because canvases now mount
lazily — script fixed, not an app bug.

**Needs Vignesh (genuine blockers):**
1. **For the true cursor-following 3D face:** a single compressed `.glb`
   (glTF 2.0 binary; ideally < 2 MB after Draco/meshopt) of a head or bust, one
   mesh hierarchy with the head as its own node (so it can rotate around the neck
   without moving the shoulders), pivot at the neck/base, facing +Z, PBR textures
   ≤ 2048 px (baseColor + optionally normal/roughness), real-world scale in
   metres. A scan/avatar made from his photo (e.g. via a head-scan or avatar tool)
   is fine — it must resemble him, nothing can be invented. Alternative: a
   transparent PNG cut-out + a depth map for a genuine parallax. Until one of
   these exists, the flat-photo tilt stays.
2. Résumé fix (Kyber-768, Project C status); confirm Earthy is ongoing ("Present");
   why/learned per project; Project B status; Project C real numbers; decide on a
   form backend (the form opens the visitor's mail app and never claims "sent").
3. Optional: resize the 119 kB portrait to ~900 px wide (no image tool installed).

**Memory files:** only `CLAUDE.md` exists in the repo (no PROJECT_STATE/HANDOFF/
CHANGELOG/SOLVING) — none were created.

## Cleanup pass — decisions made (2026-10-05)

A 3-hour cleanup brief. Not a feature phase. Git state is unchanged: the repo
still has ZERO commits and every file is untracked; nothing was committed.

**1. Hero lattice removed completely (not shrunk).** The large 3D cage/grid
overpowered the page and crossed the nav and copy. Deleted `src/scene/HeroScene.tsx`,
`Lattice.tsx`, `LatticeNodes.tsx`, `LatticeEdges.tsx`, `latticeGeometry.ts`. The Hero
is now text only (section label, h1, intro, location, Email me / Call, skills
marquee): no canvas, no lazy import, no z-index layering. Verified: 0 canvases in
`#hero`, no overlap between h1/buttons and the nav at 375/768/820/1440. The right
half of the desktop hero is empty — intentional, it is waiting for the next
phase (a new cursor-following 3D face, explicitly NOT built yet). Kept because
project cards use them: `StudioEnvironment.tsx`, `ProjectScene.tsx`,
`ProjectShowcase.tsx`, `projectArtifacts.tsx`, `useArtifactMotion.ts`,
`edgeTransform.ts`, `useIsMobileViewport.ts`, `useHasHover.ts`, and
`useHeroEntrance.ts` (still animates the hero text). The 3D chunk is now only
`ProjectShowcase-*.js` (917.9 kB raw) — nothing 3D remains in the hero path.
The nav brand and the "00 Lattice" section label still say "Lattice" (the site
name); only the visual went.

**2. Projects: exactly three, concise.** `src/content/projects.ts` was rewritten:
`Project` now has `tags[]`, a short `description`, one `highlight` line, at most 3
metric tiles, `status`, real `links`, and `more` (longer explanation, bullet list,
extra/planned tiles). The old `stack`, `problem`, `why`, `learned`, `details`,
`result` fields are gone (`why`/`learned` were empty anyway — still NEEDS VIGNESH INPUT).
`Projects.tsx` shows tags as small pills, then description, highlight, tiles,
status/link, and a native `<details>` "More detail" (closed by default, keyboard
operable; every caveat and the planned-numbers tiles live inside it). Visible
text per card is about 430–570 characters (was ~1,500–1,800). Names: Quantum-
Resistant Secure Communication System, Advanced RAG Knowledge Assistant,
**Project Store** (renamed from "Project Store (E-Commerce Platform)").
- A: compares RSA-2048 + AES-256-GCM with **Kyber (ML-KEM-768)** + AES-256-GCM.
  Tiles: 3 client platforms, 46 protocol operations, 1,840 collected tests. The
  0.51 ms vs 8.16 ms session-key timings sit in the highlight WITH the
  implementation caveat (native OpenSSL vs pure Python), never "faster/slower".
- B: ingests documents, retrieves, answers with citations. Tiles: 20 documents,
  331 chunks, ~4 ms median retrieval. Highlight: 400/400 cited answers, "local runs
  on a small corpus, not production traffic". Recall@3/MRR only inside "More
  detail", as a sanity fixture. Stack stays FastAPI/PostgreSQL/pgvector/Next.js.
- C: honest and small — "isn't meant to be an enterprise platform", status "In
  progress, not finished", no link, no visible tiles; the dashed planned tiles
  (10–20 listings, 3–5 categories, 5–8 API resources, sandbox checkout) are only
  inside "More detail", under "Planned, not built or measured yet". Highlight
  label is "What it will do" (not a result). The card stays flat/dashed.
- Kept: sticky 3D panel (`overflow-clip`), hover-lift wrapper, `logo`/`visual` slots.
- **Conflict still open:** the brief and the résumé say Kyber-**1024**; the code,
  tests and benchmark use ML-KEM-**768** (Kyber-1024 never appears in the repo
  history). The site says ML-KEM-768. Vignesh must correct the résumé or say the
  code is wrong.

**3. About trimmed.** Removed the "Right now I'm also building Project Store…"
paragraph and the "So far that's meant a secure messaging system… RAG system…"
sentence — About is no longer a project list. Three short first-person paragraphs
remain (intro + why the site is called Lattice; Earthy role; how I like to work),
still no numbers. Portrait (2D cursor tilt) kept.

**4. Skills.** Databases is now MySQL, SQL, NoSQL (NoSQL also added to the hero
marquee). Each appears once. FAISS/LangChain remain as résumé *skills* (Skills +
marquee) — not project claims. Flag for Vignesh if they should go.

**5. Contact is now an inquiry area.** Heading "Contact me." Left: a short
invitation (project, collaboration, technical work, opportunity), Email me / Call,
location, GitHub, LinkedIn. Right: a form — Name, Email, Phone (optional),
Message or project inquiry — with a primary "Contact me" submit button, real
`<label>`s, native validation (required, type=email). **There is no backend and no
email service**, so the form cannot send anything and does not pretend to:
submit composes a `mailto:` URL (subject "Portfolio inquiry from <name>", body =
message + name/email/phone) and clicks a throwaway anchor to hand it to the
visitor's email app. It then shows only "If your email app didn't open, write to me
directly at …"; the static note under the button says nothing is sent until they
press send. There is no "message sent" state anywhere. If a real endpoint is added
later, replace `handleSubmit` AND that note together (a form service needs a
decision from Vignesh: Formspree/Web3Forms/own API).

**6. Verification (production build on 4174, then stopped; dev 5173 left alone).**
typecheck / lint / build clean. At 375/768/820/1440: no horizontal overflow, 0
hero canvases, exactly 3 canvases (all in Projects), 3 project cards with the
right names/tags/links, `<details>` closed by default, About has no Project Store
text, NoSQL once, form has 4 labelled fields (3 required), submit in viewport,
0 console/page errors, 0 failed requests, no "Claude"/"Anthropic"/"NEEDS VIGNESH"/
Kyber-1024/"16x"/"faster than" in the page. Interaction (1440): empty submit and
a bad email are blocked by native validation and compose nothing; a valid submit
composes the expected mailto (checked with and without phone) and the page does
not navigate; "More detail" opens and closes with Enter; nav anchors Projects,
Skills and Contact each land at top = 112 px (nav bottom 88); keyboard focus order
is document order with a ≥ 2 px outline on every stop; reduced motion leaves the
project canvas byte-identical and the hero has no canvas. Screenshots of hero,
projects, contact were inspected at 1440 and 375.
- Not tested: a real mail client actually opening (headless browser, click
  intercepted); real devices; Firefox/Safari. The final one-line copy trim in
  Contact ("I read everything." removed) was rebuilt but not re-run through the
  browser suite.

**6b. Planned next feature — cursor-following 3D face (NOT built; plan only,
recorded 2026-10-05).** Visitor moves the cursor → my 3D/avatar face turns subtly
toward it. Constraints: natural, premium, subtle; limited angles (start from the
portrait's yaw ≤ 6° / pitch ≤ 4° and widen only for a real 3D head); lerp/ease
(frame-rate independent, as in `CursorPortrait`); aimed at eye level; off on touch
(`useHasHover`) and `prefers-reduced-motion`; render loop only while on screen
(IntersectionObserver) and `frameloop="demand"`; lazy-loaded so it never blocks
first paint; dispose geometry/textures on unmount. Reusable now: the pointer math
and easing in `src/components/ui/CursorPortrait.tsx`, `StudioEnvironment.tsx`
(lighting), `ProjectScene.tsx` (Canvas wrapper pattern), `useHasHover`. Where it
goes: the empty right side of the Hero (desktop) and above the text on mobile
(reserve a fixed-height box so there is no layout shift). **Blocked on an asset
or an explicit design:** a real GLB/head model (compressed, small) or an agreed
procedural look — a flat photo can only tilt, never "look". No placeholder code
was added, so the current site stays stable.

**7. Remaining / next.** (1) Hero right side is empty — the cursor-following 3D
face is the next piece, and needs a supplied asset or an explicit design (use the
`CursorPortrait` pointer math as the reference). (2) Project 3D canvases mount at
page load; consider mounting them only when a card nears the viewport
(IntersectionObserver) — the 918 kB chunk downloads eagerly. (3) Vignesh to
supply: real 3D portrait/logos, why/learned per project, Project B status,
Project C numbers when real, Earthy metrics; confirm Earthy is still ongoing
("Present"); decide on a real form backend; correct the résumé (Kyber-768 and
Project C status). (4) No favicon exists.

## Sprint pass: `problem` slot, card hover-lift, sticky-panel BUG FIX — decisions made (2026-10-05)

A fourth, generic "5-hour sprint" brief (again quoting Kyber-1024 and the old
FAISS/Streamlit stack for Project B). Everything it asked for that already
existed was NOT redone; the two verified-metrics decisions stand (ML-KEM-768;
Project B = FastAPI/PostgreSQL/pgvector/Next.js; Project C = PLANNED only).
Status at start: **the dev server was not running** (session restart) — started
with `npm run dev -- --port 5173 --strictPort`. Nothing was changed on disk by
anyone else (the "changed on disk" notice on `CursorPortrait.tsx` was my own
2026-10-02 edit). No new assets, no new résumé, no public Project C repo
(public repos: advanced-rag-knowledge-assistant, email-signature,
Quantum-Resistant-Secure-Communication-System).

**Re-verified after the Quantum repo's 2026-10-04 push** (+4 commits, "phase19.24
checkpoint final acceptance work", 55 total): benchmark file unchanged (200
iterations / 20 warm-up; RSA keygen 33.21, ML-KEM keygen 2.43, RSA round trip
0.51, ML-KEM round trip 8.16 ms) and `pytest --collect-only -q` still → 1840.
So every Project A number on the site is still accurate.

**⚠ BUG FOUND AND FIXED — the project cards' sticky 3D panel never stuck.**
Earlier entries (Content completion / Project metrics / Voice pass 3) say the
3D canvas lives in a sticky panel that "stays framed beside the text" and that
"project panels sticky ≥ 768". **That was wrong**: those checks read only the
computed value `position: sticky`, never the behavior. Measured behavior
(panel `getBoundingClientRect().top` while scrolling through card A): −99, −299,
−499 — it scrolled away with the card. Cause: `overflow-hidden` on the `<article>`
makes the card the sticky element's scroll container, so it can never stick.
Fix: `overflow-clip` (still clips the rounded corners, creates no scroll
container). Re-measured on dev AND production: panel top = 112 at all three
scroll positions while the card moves (−188 → −388 → −588). **Lesson: verify
sticky by measuring position across scrolls, not by reading `position`.**
(Experience's sticky was always behavior-tested, in Phase 4B, and was never
affected.)

**`problem` slot** on the `Project` type ("The problem" label), filled only for
Project A, as a checkable fact about the field rather than a claim about
Vignesh's motives: "RSA key exchange would be broken by a large enough quantum
computer running Shor's algorithm. ML-KEM (Kyber), standardized by NIST as FIPS
203, is the post-quantum replacement, so I put both behind the same messaging
system to see how they behave side by side." B and C have none (any statement
would be invented framing) — NEEDS VIGNESH INPUT, along with `why`/`learned`
for all three. Renders only on card A (verified).

**Card hover-lift** (spec §5 "hover-lift on project cards"): finished cards
rise 4 px and deepen their shadow; Project C (planned) stays flat. Implementation
lesson: the lift CANNOT go on the `<article>` — GSAP's scroll-reveal
(`useScrollReveal`) writes an inline `translate: none`/`transform` onto it, which
silently overrides a Tailwind `translate` class (the shadow changed on hover but
the card never moved — found by measuring). It lives on a plain wrapper `<div>`
(`liftClasses()`, `group`), and the article uses `group-hover:shadow-elevated`.
Verified: desktop A/B → `translate: 0px -4px` + shadow change, back to `none` on
leave; C unchanged; iPhone-emulated tap → nothing; reduced-motion → transition
duration ≈ 0 (state change, no animated motion).

**Verification (production build on 4174, then stopped; dev server on 5173 left
running for live viewing):** typecheck/lint/build clean; shared 3D chunk unchanged
at 913.30 kB / 242.19 kB gzip (main JS 387.6 kB). At 375/768/820/1440: no
overflow, nav in viewport, 7 sections, 1 h1 + 6 h2, landmarks named, no dup ids,
anchors resolve, external links safe, 0 broken images, 3 canvases, Hero WebGL
valid, 0 console/page errors, 0 failed requests. Content check: every metric
for A/B/C present, none of the prohibited claims, no third-person leftovers, no
Claude/Anthropic/internal notes in the page source. Real sticky behavior
measured (see bug above). Reduced-motion project canvas stable; desktop hover
animates and stops; touch tap doesn't spin; CLS 0; keyboard 21 stops in order
(skip link first, all visible, outlines ≥ 2px); nav anchors glide (mid-glide first
samples e.g. 2647 → 2820) and are instant under reduced motion, every section at
top = 112 px; hover-lift verified for A and B (repeatedly, with real mouse
movement over a settled card), absent for C and on touch. Two test-script
artifacts found along the way (mouse aimed at the fixed nav; hover sampled
before a real move) — script bugs, not site bugs.

**Not done (blocked on assets, nothing fabricated):** the real 3D portrait and
the project logos/visuals — slots ready (`PORTRAIT`, `project.logo`,
`project.visual`). The flat photo has no layers or depth data, so a "layered
depth" or pointer-linked lighting effect would be fake; it needs the supplied
asset. Project C's 3D object stays the procedural flow.

## Voice pass 3, portrait neutral-return, Earthy "Present" — decisions made (2026-10-02, third pass)

A third brief repeated most earlier requirements. Verified from the actual
files first: everything below the "already existed" line was NOT redone.

**Blocked on assets (nothing fabricated).** The brief says the final 3D
portrait and project 3D logos/visuals will be supplied. Searched
`Desktop/Documents/Downloads/Pictures/OneDrive` for `.glb/.gltf/.usdz/.fbx/.obj/.blend/.webp/.png/.jpg/.svg/.mp4`
modified in the last 10 days: the only portrait-like file is the same
`Documents/Vignesh T Photo.jpeg` already used (rest were unrelated screenshots,
not opened). So the real 3D portrait and the A/B/C project visuals are NOT
integrated yet. Architecture is ready: `PORTRAIT` (`src/content/profile.ts`),
`project.logo` / `project.visual` (`src/content/projects.ts`; `ProjectAsset` now
carries optional `width`/`height` so a supplied logo reserves its space — no
layout shift). The Project C 3D object stays the procedural catalog→order flow;
a storefront/package model needs a supplied asset.
When assets arrive: portrait → swap `PORTRAIT` (a transparent PNG/WebP works as-is;
a true 3D model replaces `CursorPortrait`, its only consumer, and can reuse the
same pointer math); project visuals → set `visual` (static render; for a pointer
tilt on those, reuse the `CursorPortrait` approach — not built yet because there
is no asset to build it against).

**Portrait interaction — what exists and what was verified.** (2D photo, so a
tilt/parallax, not a 3D head.) Yaw ≤ 6°, pitch ≤ 4°, ≤ 6 px shift, eased at
8 %/frame (frame-rate independent), aimed at eye level, tied to pointer position
(not random). NEW this pass: return-to-neutral now also fires on `mouseout`
with no `relatedTarget` (the reliable "cursor left the window" signal) in
addition to `pointerleave`. Verified (dev, headless): tilted to −5.99° (clamped),
an in-page `mouseout` (non-null `relatedTarget`) did NOT reset it, a
window-leave `mouseout` eased back −1.38 → −0.19 → −0.04 → −0.01 (smooth decay,
no snap). Static on touch and under `prefers-reduced-motion` (verified earlier:
no transform). **Deliberately NOT added: a "lighting response"** — on a flat
photo a pointer-linked highlight would just be a fake glossy overlay (and the
brief bans gratuitous gradients); it only makes sense with a real 3D model/normal
data. **No depth layers** for the same reason (one flat plane).

**Copy/voice.** About now answers who / technical areas / what I've built /
Earthy / what problems I enjoy / what I'm building now: paragraph 2 uses the
present tense ("I'm working as a Founder's Associate… My role is hands-on: I've
worked on the company's website, UI/UX workflows, internal tools, and technical
infrastructure, and I work directly with the founders and with non-technical
stakeholders…"), paragraph 4 is new ("Right now I'm also building Project Store…
the whole flow, from browsing to checkout, something I can build and control
myself" — Vignesh's own wording, and C stays labelled unfinished). Experience
cluster 1 says "internal tools and business systems". No metric was added to
About or Experience — none is supported by any source (still NEEDS VIGNESH
INPUT: systems/features built, stakeholders, issues resolved, a concrete example
with users/time saved).
- **Experience period is now "Oct 2025 – Present"** (was "Oct 2025 – Sep 2026").
  Reason: Vignesh wrote "I'm working as a Founder's Associate at Earthy" / "My role
  involves…" in three consecutive briefs, and the résumé's Sep 2026 end date has
  already passed. This overrides a résumé-sourced date on the strength of his own
  newer statements — **revert it (and About's tense) if the role actually ended.**

**Already existed and was only re-verified, not redone:** Projects A/B/C with the
verified metrics, Project C planned-only labelling, smooth anchors, nav/skip
link/keyboard order, reduced-motion, hover/touch gating, the asset slots.

**Verification (production build on 4174, then stopped):** typecheck/lint/build
clean; shared 3D chunk unchanged at 913.30 kB / 242.19 kB gzip (main JS 386.8
kB). Content check — every metric in the brief present and exact for A (3, 46,
1,840, 0.51/8.16 ms, 2.43/33.21 ms, 1,184/1,088/3,309 bytes, 36 pass/4
partial, ML-KEM-768, the native-OpenSSL-vs-pure-Python caveat, "In development,
not production-ready"), B (20 docs, 331, 384, ~4 ms, ~6 ms p95, 400/400, 0
ingestion failures, 40–70 ms, 740 passed/5 need espeak-ng, 76 frontend, the 7-query/
6-document fixture and its "sanity check rather than an accuracy claim"
caveat, FastAPI/PostgreSQL/pgvector/Next.js) and C (Project Store (E-Commerce
Platform), "In progress, not finished", "Planned, not built or measured yet", 10–20 /
3–5 / 5–8 / Sandbox). None of: Kyber-1024, "16x", "slower/faster than", Production
E-Commerce, FAISS/Streamlit/Flask/LangChain (in projects/about/experience),
uptime, customers, revenue, conversion, completed orders, third-person
leftovers; page source has no Claude/Anthropic/internal notes. Layout at
375/768/820/1440: no overflow, nav in viewport, 7 sections, 1 h1 + 6 h2,
landmarks named, no dup ids, anchors resolve, external links safe, 0 broken
images, 3 canvases, Hero WebGL valid, 0 console/page errors, 0 failed requests.
Also on production: reduced-motion project canvas stable; desktop hover animates
and stops; touch tap doesn't spin; CLS 0.0001; lazy portrait loads with a stable
box; keyboard 21 stops in order (skip link first, all visible, focus outline ≥ 2px);
nav anchors glide with normal motion (mid-glide first sample, e.g. 2202 → 2820)
and are instant under reduced motion, every section landing at top = 112 px.

## Brief reconciliation, smooth anchors, card hierarchy — decisions made (2026-10-02, second pass)

A new, general brief arrived that partly contradicts the previous (more
specific, verified-metrics) one. Nothing already built was redone; the actual
gaps were closed and the conflicts were resolved in favour of evidence.
This repo has no handoff/changelog/state files — `CLAUDE.md` is the only
memory file, so it is the only one updated.

**Conflicts between the two briefs — resolution (flag for Vignesh):**
- *Project B stack.* New brief: "LangChain, FAISS, Flask, Streamlit". Previous
  brief (with measured numbers): FastAPI + PostgreSQL/pgvector + Next.js, and
  "do NOT claim FAISS if the current implementation doesn't use it". The
  public repo is active (pushed 2026-10-01). **Kept the current architecture**;
  FAISS/Streamlit/LangChain appear only in Skills and the Hero marquee (résumé
  *skills*, not project claims).
- *Kyber-1024 (brief + résumé) vs ML-KEM-768 (code, benchmark, previous
  brief).* **Kept ML-KEM-768.** The résumé needs correcting.
- *Benchmark numbers.* New brief says "search for actual values"; they had
  already been found and verified (see "Project metrics" below). Nothing new
  was invented; no `[VERIFIED_…]` token is shown anywhere publicly.
- *Tense of the Earthy role.* Both briefs write "I'm working…", but the
  résumé (and the Experience card) says Oct 2025 – Sep 2026, which has passed.
  Copy stays tense-neutral ("I've worked as… The role is hands-on…") so it
  doesn't contradict the displayed dates. **If the role is ongoing, change the
  period to "Present" and the About wording together.**
- *Project C* is unfinished in both briefs → remains PLANNED-only.

**What was actually missing and is now done:**
1. **Smooth anchor scrolling.** Lenis ran but `anchors` was off, so nav/skip
   links jumped. `useSmoothScroll.ts` now uses `new Lenis({ autoRaf: false,
   anchors: true })`. Verified on the production build at 1440: with normal motion the
   scroll is mid-glide at the first 250 ms sample (e.g. 2613 → 2714,
   7551 → 7613); under `prefers-reduced-motion` the first sample is already
   final (Lenis is not created → instant native jump). Every section lands at
   `top = 112px` (nav bottom = 88px): Lenis respects the existing
   `scroll-mt-28`. (A Playwright click on a nav link initially timed out in the
   "waiting for scheduled navigations" step — a test-browser artifact, the page was
   responsive; fixed with `noWaitAfter` in the test, not in the app.)
2. **Card hierarchy.** `cardClasses()` in `Projects.tsx`: the 3D panel
   alternates sides (`md:[&>*:first-child]:order-2` on odd cards); a project
   with planned metrics (C) gets a dashed, flat card, finished work keeps the
   elevated card. Checked: panel on the right only for Project B; dashed border
   only for C.
3. **`why` / `learned` slots** on the `Project` type (optional, rendered as "Why
   I built it" / "What I learned"). Verified by temporarily filling Project C
   (both labels rendered), then removed; no test text remains (grep). They are
   empty for all three projects because **no source exists** — a motivation or a
   lesson can't be derived from a résumé, repo or benchmark.
4. **About copy** now uses Vignesh's own sentences about his role: "…I've
   worked on the company's website, UI/UX workflows, internal tools, and
   technical infrastructure…", "A big part of it is taking problems that aren't
   necessarily technical at first and turning them into something we can
   actually build and use… understanding the problem, building the solution,
   deploying it, seeing how people use it, and improving it."

**Already satisfied by earlier work (not redone):** first-person Hero/About/
Experience/Contact/Footer; Projects section with A/B/C; verified A/B metrics;
provisional C; per-project 3D artifacts (key/handshake, retrieval graph,
catalog→order flow) plus `logo`/`visual` drop-in slots; pointer-driven portrait
(`CursorPortrait`: mathematically tied to cursor position, clamped, eased, static
on touch/reduced motion); navigation to real sections only (About, Experience,
Projects, Skills, Achievements, Contact — page order follows the spec).

**Not done / needs input:** the real 3D portrait and project logos/visuals (assets
don't exist; slots ready — `PORTRAIT`, `project.logo`, `project.visual`); the
E-commerce 3D object remains the catalog→cart→checkout→order flow, not a
storefront/package model (would be a new 3D asset, not a tweak); Project B
`status`; every project's `why` and `learned`; Project C real metrics.

**Verification (production build on 4174, then stopped):** typecheck/lint/build
clean, shared 3D chunk still 913.30 kB / 242.19 kB gzip (main JS 386.4 kB). At
375/768/820/1440: no overflow, nav in viewport, 7 sections in order, 1 h1 + 6 h2,
landmarks named, no duplicate ids, anchors resolve, external links safe, 3
canvases, Hero WebGL valid, 0 console/page errors, 0 failed requests, no
forbidden strings, content-accuracy check passes (all required figures present,
none of "16x"/"faster than"/FAISS/uptime/users/revenue). Keyboard 21 stops in
order, skip link first, focus outlines ≥ 2px. Reduced-motion canvas stable, hover
animates/stops, touch tap doesn't spin, CLS 0.0001. One flaky check: at 375 the
lazy portrait can read "not loaded" before it scrolls into view — verified it
loads on scroll with a stable box (no layout shift).

## Project metrics — decisions made (2026-10-02)

Vignesh supplied audited metrics for Projects A and B and a brief for C. The
three projects live in separate repos and were NOT modified; this repo only
reads/presents them.

**Architecture change.** Project content moved out of `Projects.tsx` into
`src/content/projects.ts` (typed `Project[]`); `Projects.tsx` only renders it.
Same for the portrait: `src/content/profile.ts` (`PORTRAIT`). **Drop-in asset
slots** (no asset is fabricated; both are `undefined` today):
- `project.logo` — a small image above the project label (e.g. a rendered 3D
  logo with a transparent background).
- `project.visual` — replaces the procedural WebGL artifact in the left panel
  with a static image/render (no Three.js mounted for that card).
- How: put the file in `src/assets/projects/`, import it in
  `projects.ts`, set `{ src, alt }`. Both slots were exercised with a temporary
  placeholder (visual replaced the canvas → 0 canvases; logo rendered at its
  size), then removed; confirmed no test data remains in `src/`.
- Portrait: swap `PORTRAIT.src/width/height` (transparent PNG/WebP works as-is;
  a real 3D model would replace `CursorPortrait`, the only consumer).
- **Metric tiles** (`ProjectMetrics`): big number + small label only, a `<dl>`
  (label = term, number = value, reversed visually with `order-*`). `kind:
  "measured"` = solid tiles under "By the numbers"; `kind: "planned"` = dashed
  tiles under "Planned, not built or measured yet". Flip Project C to
  `"measured"` only when each number is real.

**Project A — Quantum-Resistant Secure Communication System.** Card text,
stack line (Python · PostgreSQL · RSA-2048 · ML-KEM-768 · ML-DSA-65 ·
AES-256-GCM · Argon2id), status "In development, not production-ready" (repo
README), link to the public repo.
- Tiles: 3 client platforms (Desktop/Web/Android), 46 protocol operations,
  1,840 collected tests, 0.51 ms RSA session-key path, 8.16 ms ML-KEM session-key
  path.
- "What I measured": 200 iterations / 20 warm-up; session-key round trip 0.51 vs
  8.16 ms; keygen 33.21 ms (RSA-2048) vs 2.43 ms (ML-KEM-768); sizes (ML-KEM-768
  public key 1,184 B, ciphertext 1,088 B; ML-DSA-65 signature 3,309 B).
- **Accuracy rule (kept in the copy): the timing difference is
  implementation-specific** — RSA is native OpenSSL bindings, the ML-KEM code is
  pure Python (the repo's benchmark says so). The site never says "Kyber is 16×
  slower" or "RSA is faster than Kyber"; verified by search (no "16x", "slower
  than", "faster than" in the Projects text).
- Independently reproduced by me from the repo/disk: 1,840 collected tests
  (`pytest --collect-only -q`), 296 Python files, 16 Alembic migrations, benchmark
  config (200 iterations, 20 warm-up) and results (33.21 / 2.43 / 0.51 / 8.16 ms,
  ML-DSA 0.14 / 0.62 / 0.14 ms), ML-DSA-65 sizes (1,952 / 3,309 B), ML-KEM-768
  public key 1,184 B. **Taken from Vignesh's audit, not re-derived:** 46
  protocol operations, 3 platforms, the 40-item matrix (36 PASS / 4 PARTIAL),
  117,588 / 49,651 / 67,937 LOC, 11 tables, the 1,088-byte ciphertext. Not on the
  site: the LOC/table/migration counts (strongest metrics only, per the brief).
  (`test_*.py` files counted 156 here vs 157 in the audit — the site uses test
  *cases*, not files.)
- **Kyber parameter conflict is resolved in favour of the code**: ML-KEM-768 is
  what was built and measured. The résumé still says "Kyber-1024" — it should be
  corrected.

**Project B — Advanced RAG Knowledge Assistant.** The OLD description
(LangChain / FAISS / Flask / Streamlit) is gone from the card and from About.
Current architecture only: Python · FastAPI · PostgreSQL · pgvector · Next.js;
extraction → cleaning → structure-aware chunking → 384-dim embeddings → pgvector
→ dense + lexical retrieval → reciprocal-rank fusion → rerank → grounded cited
generation; auth/workspaces, observability, voice mode, evaluation harness.
- Tiles: 20 documents, 331 chunks, 384 embedding dimensions, ~4 ms median
  retrieval, 400/400 responses with citations.
- "What I measured": 20 Markdown docs (~290 KB), 331 chunks/vectors, 0 ingestion
  failures; ~4 ms median / ~6 ms p95 retrieval; ~40–70 ms median question-to-
  cited-answer API latency across runs; 400/400 cited; backend 745 tests (740
  passed, 5 need espeak-ng), frontend 76. **Recall@3 = MRR = 1.0 is presented only as
  a 7-query / 6-document sanity fixture, explicitly "not an accuracy claim"**, and
  the copy says these are local small-corpus runs, not production traffic. No
  production users/uptime/traffic/FAISS/paid-LLM claims anywhere (verified by
  search).
- **All Project B numbers are from Vignesh's benchmark/audit and are NOT
  independently reproduced.** I only confirmed the public repo exists, is public,
  ~2.8 MB, last pushed 2026-10-01 05:38 UTC (GitHub API), so the card links to it. My
  local clone `~/advanced-rag-knowledge-assistant` is STALE (2 commits, empty
  files) — the real code is on the remote `main`. No status line is shown (none
  was supplied).

**Project C — now "Project Store (E-Commerce Platform)" and PROVISIONAL.** Not
finished; nothing is presented as built or measured. The old "Production
E-Commerce Platform" name was dropped (it implied production). First-person
copy is "I'm building…". Dashed PLANNED tiles: 10–20 project listings, 3–5
categories, 5–8 core API resources, sandbox checkout. "What I'm planning":
auth + catalog with category browsing/search; inventory, cart, sandbox
checkout, order management; admin dashboard, REST APIs on database
transactions, automated testing; Docker + CI/CD. Status "In progress, not
finished". No link. **Replace these with real numbers only when verified from the
actual project, and flip `kind` to `"measured"`.** (The résumé still describes
Project C as built — also worth aligning.)

**Other copy changes:** Projects heading is "Three projects I've been working
on." (C isn't built, so "built" would be wrong). About's opening now uses
Vignesh's own phrasing ("Most of the projects I work on start as something I
want to understand properly and then turn into something I can actually build
and test"), describes A and B accurately, and contains no numbers. Skills and
the Hero marquee still list LangChain/FAISS/Flask — those are résumé *skills*,
not project claims; left as-is, **flag for Vignesh** if they should change.

**Verification (production build on a separate port, then stopped):**
typecheck/lint/build clean; shared 3D chunk unchanged at 913.30 kB / 242.19 kB
gzip; main JS 385.7 kB (content). At 375/768/820/1440: no horizontal overflow,
nav inside viewport, order `hero>about>experience>projects>skills>achievements>
contact`, 1 h1 + 6 h2, landmarks named, no duplicate ids, nav anchors resolve,
6 external links all `_blank` + `noopener`, 0 broken images, 3 canvases, Hero
WebGL valid, 0 console/page errors, 0 failed requests, project panels sticky ≥
768. Content check: all required figures present; none of the prohibited claims
present. Keyboard: 21 stops in order (skip link first; both project GitHub
links reachable), all visible with ≥ 2 px focus outline. Reduced-motion canvas
stable; desktop hover animates and stops; touch tap doesn't spin; CLS 0.0001.
One test-script bug found and fixed (scrolled the now-taller section instead of
the canvas) — not an app bug. Visual check: tiles/cards/planned styling inspected
at 1440, 820, 375.

**Next milestone:** (1) Vignesh supplies/confirms: Project B status, correct the
résumé (Kyber-768, Project C status), decide on the Skills/marquee
LangChain/FAISS entries; (2) when Project C ships, replace its planned tiles
with measured ones; (3) drop in the real 3D character and project logos/visuals
via the slots above; (4) optional: resize the 119 KB portrait (~900 px wide).

## Content completion — decisions made (2026-10-01)

Done after the first-person rewrite, from a fresh look at the actual evidence
on this machine (not from earlier reports). Order of work: evidence audit →
content → missing sections → portrait → QA → docs.

### Sources of truth (priority order) and what was found
1. **Current resume = `C:\Users\Vignesh T\Downloads\Vignesh_T_Resume.pdf`
   (Sep 10).** `Documents\Vignesh_T_Resume.pdf` (Sep 2) is STALE and
   conflicts (title "Founder Associate (Intern)… Present", only two projects,
   certifications dated 2024–2025, extra RAG details such as FLAN-T5/MMR).
   Do not copy from it. Both PDFs differ byte-wise; ask before deleting
   either.
2. **The resume's hyperlinks** (visible text is only "GitHub | LinkedIn"; the
   targets are PDF link annotations, extracted by inflating the PDF
   streams): GitHub `https://github.com/vigneshrao1723-lab`, LinkedIn
   `https://www.linkedin.com/in/vignesh-t-33651b397/`. GitHub is independently
   confirmed by the project repos' git remotes and returns HTTP 200; LinkedIn
   blocks automated checks, so it is trusted from the resume. The spec's old
   "no URLs" note was wrong — they existed, just not as text.
3. **Real repos:**
   - Quantum: `C:\Project\Quantum-Resistant-Secure-Communication-System-main-V.1.1\
     Quantum-Resistant-Secure-Communication-System-main-V.1.1` — 51 commits
     (2026-08-05 → 2026-08-31), public at
     `github.com/vigneshrao1723-lab/Quantum-Resistant-Secure-Communication-System`
     (HTTP 200). Much larger than the resume says (296 .py files, TLS server,
     PostgreSQL, JWT, ML-DSA-65, an Android client built with Buildozer).
   - RAG: `~/advanced-rag-knowledge-assistant` — an EMPTY SCAFFOLD: two
     commits, every doc file 0 bytes, no source. Public remote exists
     (`…/advanced-rag-knowledge-assistant`, HTTP 200) but linking it would
     show an empty repo, so it is NOT linked. No metric can be verified.
   - E-commerce: no repo anywhere on this machine (searched `C:\Users\Vignesh
     T`, `C:\Project`, `C:\tmp`). Only the resume describes it.
4. `Documents\Vignesh T Photo.jpeg` (1044×1507 portrait on a white
   background) → `src/assets/portrait.jpg`. The quantum repo's
   `gui/resources/logo.png` is a 0-byte file: **no project logo exists.**

### ⚠ Factual conflict that needs Vignesh (top priority)
The resume (and the old spec/site) say **Kyber-1024**. The code uses
**ML-KEM-768** (`from kyber_py.ml_kem import ML_KEM_768`, since the very first
commit; `git log -S` for `Kyber1024`/`ML_KEM_1024`/`kyber1024` finds nothing in
the whole history; `tests/test_kyber.py` says ML-KEM-1024 must be rejected).
The benchmark measured ML-KEM-768. The site now says **ML-KEM-768** everywhere
(About, Project 01) because that is what was built and measured, and it
matches the public repo. **The resume should be corrected, or the code is
wrong — only Vignesh can say which.**

### Verified metrics now on the site, and exactly how each was obtained
| Claim on site | Source / calculation |
|---|---|
| RSA-2048 vs ML-KEM-768, 200 iterations/op, 25 for keygen, Python 3.12, Windows 11 | `benchmark/results/key_exchange.json` → `configuration` (iterations 200, keygen_iterations 25) and `environment` |
| Key generation ≈ 2.4 ms (ML-KEM-768) vs ≈ 33.2 ms (RSA-2048) | same file: `primitive.KYBER.key_generation.mean_ms` = 2.425; `primitive.RSA.key_generation.mean_ms` = 33.213 |
| Session-key exchange ≈ 8.2 ms (ML-KEM-768) vs ≈ 0.5 ms (RSA-2048) | same file: `application.*.session_key_total_round_trip.mean_ms` = 8.158 / 0.5055 (establish + recover, excludes keygen) |
| Caveat "Kyber is pure Python, RSA is native OpenSSL; compares implementations" | the benchmark script's own docstring ("READ THIS BEFORE COMPARING TIMES"). Must stay attached to the numbers. |
| "More than 1,800 automated tests" | `pytest --collect-only -q` run on 2026-10-01 in the repo's own venv → **1840 tests collected**. Published as a floor because the count moves. Collected, NOT re-run (the suite needs a local PostgreSQL), so "all pass" is never claimed. (README documents an older snapshot of 1,541.) |
| TLS, PostgreSQL, JWT; client-side AES-256-GCM, server never holds session keys; ML-DSA-65 signatures; peers verified by fingerprint | repo `README.md` (Overview, Security Model, Project Status) |
| Status "In development, not production-ready" | README "Project Status": explicitly does not claim production readiness; lists known gaps |
| Certifications ×3 (LinkedIn Learning, 2026), hackathons 2023–Present | current resume |
Counts of things NOT claimed: 51 commits, 296 Python files, ML-DSA benchmark
(sign 0.62 ms / verify 0.14 ms), Android APKs — all real but go beyond what
the resume says; left out pending Vignesh's call.

### Metrics NOT verifiable → deliberately absent (NEEDS VIGNESH INPUT)
- **Project 02 (RAG):** documents indexed; retrieval accuracy/latency; status;
  where Flask fits; any repo link (local repo has no code). Whether the older
  resume's Sentence Transformers / FLAN-T5 / MMR / conversational memory are
  real (they are NOT on the site).
- **Project 03 (E-commerce):** everything beyond the resume — repo/link, test
  count/coverage, deployment target, scale, status.
- **Earthy:** number of systems/features, integrations/deployments,
  stakeholders/teams, recurring issues resolved, a concrete example with users
  and % time saved, features shipped over what period. The current resume only
  says "contributing to improvements in team efficiency and customer
  engagement" (qualitative — published as such). Also: is the role still
  ongoing? (Resume end date Sep 2026 has passed; copy is tense-neutral.)
- **Hackathons:** how many, any result/project.
- **All three projects:** why built, what I learned, and confirmation each was
  solo ("I built" is assumed).
- Leadership / Publications: none exist in any source, so no such content.

### Content inventory (what changed, from → to, safe to publish?)
| Section | Now says | Source | Metric? | Safe |
|---|---|---|---|---|
| Hero | first-person intro (CS student; networking/crypto/AI; Python, Linux, SQL; full-stack technical operations) | resume summary, voice per Vignesh | none | yes |
| About | first-person; benchmarks Kyber (ML-KEM-768) vs RSA-2048 over 200 iterations; RAG with LangChain/FAISS; Earthy role; why the site is called Lattice; education card (CGPA 8.3, Aug 2023–Jun 2027, coursework) | resume + repo | 200 iterations, 8.3, dates — all verified | yes (Kyber parameter: see conflict above) |
| Experience | 3 clusters, first person; adds "wrote up the solutions" and "better team efficiency and customer engagement" (qualitative) | resume bullets | none verifiable | yes |
| Projects 01 | description + 4 verified details + measured result + status + GitHub link | resume + repo + benchmark | verified (table above) | yes |
| Projects 02 / 03 | first-person descriptions from the resume only (03 now includes sandboxed payments, inventory tracking, order management, automated testing, CI/CD build-test-deploy) | resume | none | yes; no status/link until confirmed |
| Skills | 7 groups, resume wording ("TCP/IP fundamentals", "Jupyter Notebook") | resume | none | yes |
| Achievements (new) | 3 certs + hackathons | resume | none | yes |
| Contact | email, phone, location, **GitHub, LinkedIn** | resume + link annotations | n/a | yes |
| Footer | + GitHub, LinkedIn | same | n/a | yes |

### Structure changes
- **Section order now follows spec §2** (Contact last, next to the footer):
  00 Hero, 01 About, 02 Experience, **03 Projects, 04 Skills, 05 Achievements,
  06 Contact**. The earlier "Projects after Contact" and "do not renumber"
  decisions are superseded (Vignesh asked for the spec-complete site).
- **Nav** is data-driven (`NAV_LINKS`, page order); every link resolves to a
  real section id (verified). Pill is 653 px wide, fits at 768/820/1440; below
  `md` still shows only brand + Email (Phase 7 behavior).
- **About layout:** text | portrait row, then a full-width education card.
- **Project cards:** the 3D canvas now lives in a fixed-height (320 px)
  *sticky* inner panel. Reason: the card grew with the new copy, and the
  grid item stretches to card height; a tall narrow canvas narrows the
  camera's horizontal view and cropped the artifact (confirmed in
  screenshots). Same "sticky on an inner wrapper" rule as Experience.
- `noBreak()` (`src/lib/noBreak.tsx`) keeps `ML-KEM-768`, `RSA-2048`,
  `AES-256-GCM`, `ML-DSA-65`, `AES-256` from wrapping mid-token.
- External links: `target="_blank" rel="noopener noreferrer"` plus an
  sr-only "(opens in a new tab)".

### Portrait / cursor interaction (`CursorPortrait`)
The supplied photo is a flat 2D image, so this is a **tilt/parallax, not a 3D
head**: CSS perspective `rotateY` ≤ 6°, `rotateX` ≤ 4°, ≤ 6 px shift, eased
(8 %/frame, frame-rate independent), aimed at eye level. One passive
`pointermove` listener; the rAF loop runs only while on screen and still
easing, writes `transform` directly (no React re-render). Off entirely on
touch (`useHasHover`) and `prefers-reduced-motion`. Image has intrinsic
`width`/`height` + aspect wrapper + `loading="lazy"` → measured CLS 0 at 375.
Verified: direction correct (cursor top-left → yaw −, pitch +; bottom-right →
yaw +, pitch −), clamped, eased not snapped, loop stops after settling (in the
~6 fps software-WebGL test browser it takes ~4 s; on real hardware ~0.7 s),
static under reduced motion and touch. If a real 3D character asset arrives,
`CursorPortrait` is the single component to replace. The photo has a white
background (not transparent); it is shown as a framed card rather than a
cut-out. A true transparent cut-out would need a background-removed PNG.

### Not done, and why
- **3D project logos:** no logo assets exist (quantum `logo.png` is 0 bytes;
  RAG/e-commerce have none). Inventing logos would be fabrication. The three
  procedural 3D artifacts already act as the projects' consistent marks
  (shared lighting, camera, materials, hover). Needed from Vignesh: real logo
  files (SVG preferred) if he wants logos extruded.
- **Character/3D head:** needs a real 3D (or at least transparent-PNG, layered)
  asset.
- Photo is 119 KB for a ~400 px display; no image tool is installed to
  resize it (no new dependency added). Safe optimisation later: a ~900 px-wide
  copy.

### Verification (production build on a separate port, then stopped)
typecheck/lint/build clean; shared 3D chunk unchanged at 913.30 kB / 242.19 kB
gzip; main JS 374 → 382.6 kB (new content); portrait ships as its own 119 kB
asset. At 375/768/820/1440: no horizontal overflow, nav inside viewport, order
`hero>about>experience>projects>skills>achievements>contact`, 1 h1 + 6 h2, all
6 landmarks named, no duplicate ids, all `#` anchors resolve, all 5 external
links `_blank` + `noopener`, 3 project canvases, Hero WebGL valid, 0 console/page
errors, 0 failed requests, 0 forbidden strings, Experience + project panels
sticky ≥ 768 / static at 375. Keyboard: 20 stops in document order, skip link
first, all visible with ≥ 2 px focus outline. Reduced-motion project canvas
stable; desktop hover animates and stops; touch tap does not spin. `dist/`
grep: no `NEEDS VIGNESH`, "Claude", "Anthropic". Not independently verifiable:
LinkedIn URL reachability (LinkedIn blocks bots).

## Content rectification — decisions made (2026-10-01)

Copy-only pass, requested after Phase 10. No layout, 3D, motion, token,
dependency, or component-structure change. Supersedes the *wording* (not the
structure or facts) recorded in the Hero/About/Experience/Skills/Contact/
Footer/Projects entries below — those entries describe the old third-person
copy and are kept as history.

**Why the direction changed.** The previous copy was accurate but read like
a third-person recruiter profile ("Vignesh is…", "he architected…",
slogan headings like "Engineering systems end-to-end"). The portfolio should
read as Vignesh explaining his own work, in first person, plainly.

**Voice rules to keep in all future copy:**
- First person ("I built…", "I worked on…"), natural and direct; no
  "leveraged/orchestrated/spearheaded/cutting-edge/passionate/end-to-end"
  style phrasing. "Architected"-type verbs only if the work warrants them.
- Section headings are plain first-person statements: About "I build things
  from idea to deployment."; Experience "My work at Earthy."; Skills "What I
  work with."; Contact "I'm happy to talk about systems, security, and AI.";
  Projects "Three projects I've built." Hero h1 stays the name.
- Nav/section labels, button labels ("Email me", "Call"), mono tags
  ("Systems / Security / AI"), the skip link, and the numbered section labels
  are UI labels and were intentionally left alone.
- Experience cluster labels are now "What I built" / "Problems I solved" /
  "With the founders".
- About now also says the site is named after lattice-based cryptography
  (the area Kyber comes from) — supported by spec §1 ("his flagship
  subject"); this gives the name a reason in Vignesh's own voice.

**NEVER-INVENT-A-NUMBER rule (absolute).** The only quantified facts in any
source (spec, CLAUDE.md, repo) are: RSA-2048, Kyber-1024, AES-256-GCM, CGPA
8.3/10, Aug 2023 – Jun 2027, Oct 2025 – Sep 2026, three projects, seven skill
groups. Those are the only numbers used. Everything else the voice sample
asked for was *not* in any source and is therefore NOT stated on the site;
the claims stay qualitative. Missing metrics are recorded as
`NEEDS VIGNESH INPUT` comments in the source (JSX/TS comments — verified
absent from `dist/`, never rendered), next to the sentence each would
strengthen.

**Metrics still requiring Vignesh's input** (none are on the site yet):
- Project 01: why built; # algorithms/configurations compared; # test cases
  or runs; actual latency/throughput results (which was faster, by how much);
  what I learned.
- Project 02: why built; # documents indexed; retrieval accuracy/latency;
  where Flask fits; what I learned.
- Project 03: why built; scale (users/products/orders) if any; where it is
  deployed; test coverage/pipeline details; what I learned.
- Earthy: # systems/features built or improved; # integrations/deployments;
  # teams/stakeholders; # recurring issues resolved; a concrete example
  system with users reached and time/manual work saved (%); # projects or
  features shipped over what period.
- Confirm solo authorship of all three projects ("I built" assumes it).
- Confirm whether the Earthy role is still ongoing. The resume says Oct 2025
  – Sep 2026 and that end date has now passed, while the style sample used
  present tense ("I'm working…"). Copy is deliberately tense-neutral ("I've
  worked as…", "The role has been hands-on", past tense for what was
  built) so it is true either way; revisit once confirmed.

**Files modified:** `src/components/sections/Hero.tsx` (intro paragraph),
`About.tsx` (heading, three paragraphs), `Experience.tsx` (heading, three
cluster labels + descriptions), `Skills.tsx` (heading), `Contact.tsx`
(heading + body line), `Projects.tsx` (heading + three descriptions),
`src/components/layout/Footer.tsx` (tagline), `index.html` (meta
description, now first person). Not modified: Nav, Marquee, tokens, 3D
scenes, hooks, animation, config.

**Verification:** see the final report for this pass — typecheck, lint and
build clean; shared 3D chunk unchanged at 913.30 kB; rendered copy checked in
a real browser at 375/820/1440; `dist/` grepped for internal notes and
attribution (none).

## Final QA — decisions made (2026-09-29)

Spec §8 Phase 10. A repository-wide + full-browser QA pass, not another
feature phase — the goal was to find real defects or deployment-readiness
gaps, not to redesign or re-litigate any decision already made in Phases
0–9. Checked every item on this phase's checklist; one real, low-risk
fix was made, everything else audited came back clean.

**Repository state audit.** `git status --short`/`git log` confirmed
(again) zero commits, all files untracked — nothing was ever committed
at any point across this entire project. Walked the full `src/` tree:
clean, no stray debug files, no screenshots or scratch scripts
accidentally left in source (all QA/verification tooling across every
phase was written to the session's external scratchpad directory, never
into the repo — confirmed by a fresh recursive search for `*.png`/
`qa_*`/`verify_*`/`audit_*`/`*.mjs` under the project root: zero
matches). Grepped for `TODO`/`FIXME`/`XXX`/`console.log`/`debugger`
across `src/`: zero matches.

**Real fix: three confirmed-unused dependencies removed from
`package.json`.** `framer-motion`, `lucide-react`, and `postprocessing`
were installed (per the original spec's Technical Architecture table,
§6) but never actually imported anywhere — this was already established
fact from Phase 8's investigation (zero real imports, confirmed again
here via a fresh grep; the one "match" for `lucide-react` was a code
comment, not an import). Phase 8 deliberately left them alone because
removing them doesn't change any *bundle* number (unused code is already
tree-shaken to zero bytes) — that was the right call for a
performance-scoped phase. Phase 10 is scoped to deployment-readiness/repo
hygiene instead, where "three dependencies in `package.json` that the
project doesn't actually use" is a legitimate, real finding on its own
terms (larger `npm install`, misleading signal about the real stack for
any future maintainer or CI). Removed from `package.json`, ran
`npm install` to update the lockfile (6 packages removed, 0
vulnerabilities), and updated the one stale code comment in `Button.tsx`
that referenced `lucide-react` by name. Re-verified: typecheck/lint/build
all clean, and the shared 3D chunk stayed at exactly 913.30 kB / 242.19
kB gzip — byte-for-byte the same as Phase 8's and Phase 9's builds,
confirming zero bundle impact, exactly as predicted, and confirming
Phase 8's optimization was not disturbed.

**Content/specification audit.** Compared every resume-sourced fact
currently rendered (Hero identity line, About narrative + education card,
Experience company/role/dates/bullets, all three project names/tech
stacks/descriptions, all seven Skills groups, Contact email/phone/
location, Footer content) against Master Specification §2's resume-
sourced content table — every fact matches. The spec's non-content
items that were never built (preloader, bento-grid Skills, drag-to-
rotate 360° lattice, holographic ID card, five projects instead of
three, ScrollTrigker-driven camera journey, dark-glass aesthetic) are
all pre-existing, deliberate, individually-documented deviations from
earlier phases (see each phase's own "decisions made" entry above) —
re-litigating any of them would violate this phase's own "do not redo
Phases 0–9" / "do not redesign" instructions, so none were touched.

**Full browser QA — all against the production preview build, not just
the dev server**, per this phase's explicit requirement. Isolated,
fresh-browser-per-check scripts throughout (the established mitigation
for the Playwright/sustained-WebGL hang documented in every prior
phase's entry) — one combined run genuinely hung again during this
phase; killed via `TaskStop` and re-run as smaller isolated scripts,
which all completed normally and are what's reported below.

- **Responsive/regression, four widths** (375×812, 820×1180, 1440×900,
  plus an intermediate 1024×800 desktop/tablet width): no horizontal
  overflow at any width, nav brand/Email CTA fully within viewport,
  all six sections + footer present, exactly 3 project canvases, Hero
  WebGL context valid, zero forbidden strings (no fabricated GitHub
  links, no AI/Claude/Anthropic attribution), Experience sticky at
  820/1440/1024 and static at 375 (unchanged, expected), zero
  console errors, zero page errors, zero failed network requests at
  any width.
- **Accessibility regression** (re-checked on the production build, not
  assumed carried over from Phase 9's dev-server checks): exactly one
  H1 at every width, all five section landmarks resolve to a real
  accessible name, zero duplicate IDs.
- **Motion/touch regression:** reduced-motion produces a byte-identical
  project canvas across a 700ms window; desktop mouse hover animates a
  project artifact and stops cleanly on unhover; a touch-emulated tap
  (`iPhone 13` device) does not leave an artifact spinning.
- **Keyboard regression:** 13 tab stops, skip link correctly first,
  all stops visible, same document-order sequence verified in Phase 9
  (Nav → Hero → Contact → Footer), re-confirmed on the production build.
- **Visual regression:** screenshotted all six sections + footer on the
  production build and compared against the established look — crystal
  materials, metallic edges, lighting, camera framing, card borders/
  shadows, typography, and spacing all match; no layout shift, no
  missing background, no broken button/link styling, no clipped text.

**SEO/metadata audit.** `index.html`: `lang="en"`, real title ("Vignesh
T"), accurate meta description, correct viewport meta — all unchanged
and correct. No favicon is configured (none was ever supplied or
required by the spec; not fabricated here).

**Public-attribution scan.** Repository-wide case-insensitive grep for
`claude`/`anthropic`/`AI-assisted`/`AI assisted`/`generated by AI`/
`built with AI` across `src/`: the only matches are source-code comments
referencing the internal project file literally named `CLAUDE.md` by
its filename (a decision log, analogous to referencing `README.md`) —
never the assistant as an entity, never rendered to a visitor, stripped
from the build entirely (comments don't survive minification). Directly
grepped the actual built `dist/` output for the same terms: zero matches.
Checked `index.html`, `package.json`, and every config file directly:
zero matches. No README exists. Confirmed: no public-facing AI/Claude/
Anthropic attribution exists anywhere in this project.

**Cleanup.** Nothing required removal from the repository itself — all
QA tooling for every phase, including this one, was written to the
session's external scratchpad directory and never touched `src/` or the
project root. `.claude/`, `CLAUDE.md`, and the Master Specification were
left untouched, per this phase's explicit instruction not to remove
required configuration or documentation.

**Files changed:** `package.json` (three dependencies removed),
`package-lock.json` (regenerated by `npm install`),
`src/components/ui/Button.tsx` (one stale comment updated to match).
Nothing else — no visual, layout, 3D, motion, or accessibility code was
touched.

**Verification actually performed:** `npm run typecheck` — zero errors.
`npm run lint` — zero errors/warnings. `npm run build` — succeeded;
shared chunk confirmed at 913.30 kB / 242.19 kB gzip, identical to Phase
8/9. Dev server on 5173 checked before and after (HTTP 200 both times),
never restarted. A separate preview server on 4174 was used for every
browser check in this phase, then stopped; 5173 reconfirmed alive
immediately after. All checks listed above were run against that
production preview, not only the dev server.

**Known limitations.** No automated axe-core/Lighthouse/WCAG-conformance
tool was run — none exists in this repo, and this phase's own
instructions (echoing Phase 9's) caution against installing a large
dependency for a one-time check; this was a manual, checklist-driven
Playwright DOM/browser audit, not a certified WCAG audit, and should not
be described as one. Cross-browser testing was performed in Chromium
only (via Playwright) — Firefox/Safari-specific rendering was not
independently verified in this phase. No real mobile device testing was
performed — mobile behavior was verified via Chromium's device
emulation (`iPhone 13` profile) and viewport sizing, not a physical
device. Deployment readiness (Phase 11) has not started: no hosting
provider, domain, or CI/CD pipeline exists yet.

## Accessibility — decisions made (2026-09-29)

Spec §8 Phase 9. Audited actual DOM/keyboard/contrast state via Playwright
against the live dev server before changing anything, rather than trusting
source inspection alone. Found four real, narrow gaps; everything else
audited was already correct and was left untouched.

**Baseline keyboard audit (before any change).** Tabbed through the whole
page: exactly 12 stops, all visible, in perfect document order (Nav brand
→ 4 Nav links → Nav Email CTA → Hero Email/Call → Contact Email/Call →
Footer email/phone) — no focus trap, no out-of-order stop, no hidden
focusable element. This was already fully correct; not touched.

**1. Real gap: five `<section>` landmarks had no accessible name.**
Inspected every section's root element: only Hero had `aria-label`
("Introduction"); About/Experience/Skills/Contact/Projects had an `id`
but no `aria-label`/`aria-labelledby` — a `<section>` without an
accessible name isn't exposed as a named "region" landmark to assistive
tech at all (screen-reader users navigating by landmark would see one
named region — Hero — and several unnamed generic containers). Fixed by
adding `id` to each section's own `<h2>` (`about-heading`,
`experience-heading`, `skills-heading`, `contact-heading`,
`projects-heading`) and `aria-labelledby` on the corresponding
`<Section>`, pointing at it — reuses the section's own real heading text
as its name rather than duplicating a hardcoded string that could drift
out of sync. Hero's existing `aria-label` approach was left as-is (it
already works; not swapped to match the new pattern purely for
consistency — "if something is already correct, leave it alone").
Verified via Playwright: all six sections now resolve to their real
heading text as their accessible name; zero duplicate IDs anywhere on
the page.

**2. Real gap: Footer's "Vignesh T" was a duplicate, purely-stylistic
`<h2>`.** The page's heading outline was H1 ("Vignesh T", Hero) → five H2
section headings → H3 sub-headings (Experience's company name, each
project title) → then a SECOND "Vignesh T" H2 at the very end, in the
footer, restating identity rather than introducing new content —
exactly the "heading used purely for styling" this phase's checklist
flags, and a real point of confusion for a screen-reader user navigating
by heading list. Fixed by changing it from the shared `Heading`
component (`as="h2"`) to a plain `<p>` carrying the identical
`font-display font-medium text-ink text-heading-lg` classes by hand —
pixel-identical visual result, only the semantic tag changed. Verified:
the page's heading outline is now exactly one H1, a clean run of five H2s
in document order, with correctly-nested H3s under Experience and
Projects.

**3. Real gap: no skip-to-main-content link.** The floating nav puts 5
links + a CTA before any real content on every page load; a keyboard
user had no way to bypass it. Added one as the very first element in
`RootLayout.tsx`, visually hidden until focused (`sr-only`/
`focus:not-sr-only`, the standard pattern), styled with the same
pill/surface/shadow tokens the Nav itself already uses (`rounded-pill`,
`bg-surface`, `shadow-nav`) so it reads as part of the existing design
system rather than a new visual element. Also added `tabIndex={-1}` to
`<main id="main">` (plus `outline-none` scoped to that one element only)
— without it, activating the skip link scrolls the page but doesn't
reliably move keyboard/AT focus there across browsers; this is standard
WCAG skip-link practice, not decorative. Verified via Playwright: hidden
at 1×1px before focus, becomes a real visible focusable element on the
first Tab press, and activating it (Enter) actually moves
`document.activeElement` to `<main>` — confirmed programmatically, not
assumed. Screenshot-confirmed the focused state visually matches the
established pill/focus-ring design language.

**Investigated, found NOT a real issue: Nav text contrast over the
Hero lattice.** `getComputedStyle`-based contrast math on the Nav's
`bg-surface/80` pill returned a low, alarming ratio — but that
calculation can't account for `backdrop-blur-lg`, which is also applied
and visually dominates. Screenshotted the nav pill positioned directly
over the lattice (worst case, not a quiet moment) and inspected the
actual rendered pixels: the blur fully washes the busy 3D background
toward near-white within the pill's bounds; nav text stays clearly dark
and legible. No token or design change made — confirmed correct by
looking at what a user actually sees, not by trusting an automated
formula that doesn't model blur.

**Investigated, found NOT a real issue: hover-only project interaction.**
The project artifacts' hover-rotation is `aria-hidden="true"` (confirmed
unchanged from Phase 5/6) and was already gated behind `useHasHover`
(Phase 7) so it never engages on touch. Every piece of real project
information (name, stack, description) already lives in plain semantic
text beside the canvas, never inside it — the hover animation was never
the only way to access anything. No change needed; already correct by
design from earlier phases.

**Everything else audited and found already correct, untouched:**
document `lang="en"`, page title ("Vignesh T", no AI/Claude/Anthropic
attribution), meta description, viewport meta; global `:focus-visible`
outline (fixed in Phase 3, still present, confirmed via the skip-link
screenshot showing a clear accent ring); Enter-key activation on all
controls (everything is a real `<a>`, native browser behavior, no custom
keydown handling needed); no icon-only controls exist anywhere (confirmed
by Design System's own decision not to build one); no forms exist
anywhere (Contact was deliberately built without one, per Phase 4D); no
duplicate hrefs/fabricated links; color tokens (unchanged since Phase 1,
already WCAG-documented with real ratios in `tokens.css`; spot-checked
one live-rendered combination — SectionLabel/Footer caption text at
4.86:1 against `#F4F5F7` — as a sanity check, not a full re-derivation).

**Files changed:** `src/components/layout/RootLayout.tsx` (skip link +
`tabIndex`/`outline-none` on `<main>`), `src/components/layout/
Footer.tsx` (heading → paragraph), `src/components/sections/About.tsx`,
`Experience.tsx`, `Skills.tsx`, `Contact.tsx`, `Projects.tsx` (one `id` +
one `aria-labelledby` each). Nothing else touched — no 3D file, no
material, no motion logic, no Phase 7/8 architecture.

**Verification actually performed:** `npm run typecheck` — zero errors.
`npm run lint` — zero errors/warnings. `npm run build` — succeeded;
shared chunk stayed at 913.30 kB, byte-for-byte the same size as Phase
8's result (confirmed — Phase 8's optimization was not redone or
disturbed). Dev server on 5173 checked before and after (HTTP 200 both
times), never restarted; a separate preview server on 4174 was used for
all Playwright verification, then stopped. One combined verification run
hung under sustained WebGL load — the same documented Playwright
artifact seen in every prior phase's verification (see Experience's and
Footer's entries above) — killed via `TaskStop` and re-run as smaller,
isolated per-concern scripts (a fresh browser per viewport, a fresh
browser per motion check), all of which completed normally. Confirmed at
375/820/1440: no horizontal overflow, nav brand/Email fully in viewport,
all six sections + footer present, 3 project canvases, Hero WebGL valid,
zero forbidden strings, zero console errors, Experience sticky at 820/
1440 and static at 375 (unchanged), zero focusable elements in project
cards (unchanged). Reduced motion stable; desktop hover animates and
stops on unhover; touch tap does not spin — all three unchanged from
Phase 7/8. Full keyboard tab order re-verified on the production build:
13 stops now (skip link + the same 12 as before, in the same order),
skip link is correctly stop #1.

**Known limitations.** No automated axe-core/Lighthouse run was
performed — none was already present in the repo, and installing one
as a large new dependency for a single one-time check was avoided per
this phase's own instruction ("do NOT install a large dependency just
for a one-time check unless necessary"); the audit was instead a
focused, manual Playwright DOM/keyboard/contrast audit against the
actual checklist this phase specified. Full color-contrast re-derivation
from first principles was not repeated — Phase 1 already computed and
documented real ratios for every token in `tokens.css`, no token has
changed since, and one live combination was spot-checked as a sanity
confirmation rather than redone from scratch.

## Performance — decisions made (2026-09-29)

Spec §8 Phase 8. Did not optimize based on the bundle-size warning message
alone — investigated what was actually inside the ~965 kB shared chunk
before changing anything, per this phase's explicit instruction.

**Investigation.** `grep`'d the repo: only one file imports from
`@react-three/drei` at all — `StudioEnvironment.tsx`, importing exactly
`{ Environment, Lightformer }`. Ran `npx vite-bundle-visualizer` (one-off,
via `npx`, not added as a dependency — same precedent as Playwright in
earlier phases) and then directly grepped the actual built chunk
(`dist/assets/useIsMobileViewport-*.js`) for library signatures. Found
hard evidence, not a guess: `RGBELoader`, `EXRLoader`, `HDRJPGLoader`,
`gainmap` (from a separate `@monogrid/gainmap-js` package — not even in
our own `package.json`, purely transitive via drei), and `GroundProjectedEnv`
were all present in the built chunk. None of them ever execute for us —
`StudioEnvironment` only ever uses the `<Environment>` `children`+
`Lightformer` code path (procedural, baked once), never `files`/`preset`
(the HDRI-file-loading path those loaders exist for).

**Root cause.** `@react-three/drei`'s `Environment.js` statically imports
`useEnvironment.js`, which unconditionally imports those loaders — needed
so `<Environment preset="...">`/`<Environment files="...">` can work.
`Environment`'s own internal branching
(`files || preset ? <EnvironmentCube/> : ... : <EnvironmentPortal/>`)
depends on runtime props, not a value the bundler can prove statically, so
standard tree-shaking/dead-code-elimination cannot remove the unused
branch — importing `Environment` at all, even only for its Lightformer
path, pulls in the full loader chain regardless.

**Fix.** Rewrote `StudioEnvironment.tsx` to stop importing drei's
`Environment` entirely. Reimplemented just the piece actually used — bake
a cubemap once from an offscreen `Lightformer` rig via a `CubeCamera` —
by hand, using the exact same mechanism drei's own internal
`EnvironmentPortal` uses (`createPortal` into a virtual `THREE.Scene`,
one `camera.update(gl, virtualScene)` call in a `useLayoutEffect`, `Scene`
cleanup, `WebGLCubeRenderTarget` with `HalfFloatType`). Still imports
drei's `Lightformer` component directly — confirmed via reading its
source that it only imports `three`/`@react-three/fiber`, nothing heavy —
so the actual light-rig markup (three rectangles: key/fill/accent-rim,
same positions/intensities/colors as Phase 6) is byte-for-byte unchanged.
Hit the same `eslint-plugin-react-hooks` immutability rule Phase 7's Hero
camera-z fix hit (mutating a value selected via `useThree()` directly is
disallowed); used the same escape hatch — `useStore().getState()` for
imperative, non-reactive access to `gl`/`scene` inside the effect.

**Measured result (build evidence, not assumption).** Before:
`useIsMobileViewport-*.js` = 965.19 kB raw / 260.36 kB gzip. After:
913.30 kB raw / 242.20 kB gzip — a real ~52 kB raw / ~18 kB gzip
reduction. Re-grepped the rebuilt chunk for the same loader signatures
afterward: zero matches (all confirmed removed). Also grepped for other
commonly-unused three-ecosystem signatures (`GLTFLoader`, `DRACOLoader`,
`KTX2Loader`, `FontLoader`, `SVGLoader`, `OrbitControls`,
`TransformControls`, `MeshTransmissionMaterial`) — zero matches, so this
was the one identifiable dead-code source, not one of several; no further
easy wins were found. The >500 kB warning itself still fires (three.js
core + `@react-three/fiber` + the app's own lattice/artifact code
genuinely need to be in that chunk for Hero, which is above-the-fold and
can't defer its 3D load) — that remaining size is real, load-bearing
code, not waste, and removing it further would mean removing the WebGL
lattice itself, explicitly out of scope.

**Why this doesn't change Hero/Projects' load-order behavior.** Hero is
the first section, visible immediately on page load, so its 3D chunk was
always going to download right away regardless of chunking strategy — no
amount of code-splitting defers a 3D scene that's above the fold. This
phase's win is specifically that the SAME immediately-needed chunk now
contains ~52 kB less genuinely-dead code, shrinking what every visitor
downloads on first paint, not changing when anything loads.
`ProjectShowcase-*.js` (the Projects-section-specific artifact code) was
already its own small, separately-lazy-loaded chunk before this phase
(confirmed unchanged: still one small chunk, not duplicated) — that part
of the architecture needed no change.

**Files changed:** `src/scene/StudioEnvironment.tsx` only. Nothing else
touched — no other scene file, no section component, no config file.

**Verification actually performed:** `npm run typecheck` — zero errors.
`npm run lint` — zero errors/warnings (including catching and fixing the
`useThree`-mutation immutability error, same class of issue as Phase 7's
Hero fix, before it shipped). `npm run build` — succeeded; before/after
chunk sizes above are from actually reading the build output and
re-grepping the rebuilt file, not inferred. Dev server on 5173 checked
before and after (HTTP 200 both times), never restarted; a separate
preview server on 4174 was used for all Playwright/browser verification,
then stopped. Confirmed via Playwright at 375/820/1440: no horizontal
overflow, nav brand/Email link fully within viewport (Phase 7 fix intact),
all six sections present, footer present, 3 project canvases, Hero WebGL
context valid, zero forbidden strings, zero console errors, zero
focusable elements in project cards, Experience sticky at 820/1440 and
static at 375 (unchanged). Reduced motion: a project canvas is
byte-identical across a 700ms window. Desktop hover: animates while
hovered, stops on unhover. Touch-emulated context (`iPhone 13`): tap does
not leave a card spinning (Phase 7 fix intact). Keyboard: Tab reaches a
real focusable element from page load. Screenshot-compared Hero and
Projects against the pre-Phase-8 baseline — visually identical crystal
faceting, metallic edge highlighting, and RAG material hierarchy; the
rewrite is not just "no errors," it produces the same picture.

**Known limitations.** The >500 kB chunk-size warning still fires (now at
913.30 kB instead of 965.19 kB) — this is expected and was never the
actual target; the target was removing genuinely dead code, which was
achieved and measured. Further reduction would require either removing
real, used functionality (the lattice, the artifacts, the environment
lighting — all explicitly out of scope) or a deeper Three.js-specific
optimization (e.g., auditing whether `three`'s own tree-shaking can be
improved further) that wasn't identified as a concrete, measured
opportunity in this pass. `postprocessing` remains an unused
`package.json` dependency (confirmed zero imports, in both this phase and
earlier) — it contributes nothing to the bundle either way since nothing
imports it, so removing it wouldn't change any measured number; left
alone rather than touched for a zero-byte-impact cleanup outside this
phase's measured scope.

## Responsive — decisions made (2026-09-29)

Spec §8 Phase 7. Audited all six sections plus Nav/Footer at 375×812,
820×1180, and 1440×900 via real Playwright screenshots (not source
inspection alone) before changing anything. Found three genuine issues;
everything else — About, Skills, Contact, Footer, the sticky Experience
architecture, the Phase 6 crystal/environment/packet-motion/RAG-hierarchy/
commerce-progression work — was already correct at all three widths and
was left untouched.

**1. Real bug: Nav clipped off-screen at 375px.** `Nav.tsx` rendered brand
+ 4 links + CTA in one unwrapped flex row with no responsive collapse.
Confirmed via screenshot: at 375px the pill's content is simply wider than
the viewport, and "Lattice" / "Email me" were being cut off at both screen
edges (not just tight spacing — genuinely clipped, unreadable). Fixed by
wrapping the four section links in `hidden md:flex` — brand and the Email
CTA stay reachable at every width, the four links reappear at 820px and
above. Confirmed via screenshot at 375 (no clipping) and via a Playwright
bounding-box check at all three widths that both the brand link and the
Email link stay fully within the viewport.

**2. Real bug: Hero lattice ballooned and overlapped text/nav on taller
viewports.** The lattice's camera used a fixed z-distance (9) and `fov`
is Three.js's *vertical* FOV — so the visible vertical world-extent at
that distance is independent of the canvas's actual pixel height. Since
Hero's canvas is `md:absolute md:inset-0` sized to the full section
(`min-h-dvh`), a taller section maps that same fixed world-extent onto
more pixels, and the whole lattice renders proportionally bigger.
Confirmed via screenshot: at 820×1180 (taller than the 900px height the
composition was tuned against) the lattice visibly ballooned, overlapping
the heading, paragraph, CTAs, and the nav pill — not present at 1440×900.
An initial fix attempt scaled the lattice's x-offset by canvas *aspect
ratio*; screenshot-verified that this made things worse (aspect alone
doesn't capture the height-driven inflation, and shifting offset while
the object was still oversized just moved the overlap around). Replaced
with the actual correct fix: `HeroScene.tsx`'s `SceneContent` now has its
own `useFrame` that keeps `camera.position.z` at
`max(9, 9 * canvasHeight / 900)`, clamped to a 16 upper bound — a taller
canvas pulls the camera back exactly enough to counteract the inflation,
keeping the lattice's on-screen size roughly constant regardless of
section height. At the reference 900px height this resolves to exactly
9, so 1440×900 renders pixel-for-pixel as before (screenshot-compared,
identical). Mobile's stacked 280px-tall canvas is unaffected — 280 < 900,
so the `max(9, ...)` clamp keeps it at the original value, unchanged.
Mutates `state.camera` from inside `useFrame`'s own callback parameter,
not a value selected via `useThree()` directly — the latter trips
`eslint-plugin-react-hooks`'s immutability rule (confirmed via the actual
lint error before switching approach); the `useFrame` callback's `state`
argument is the idiomatic R3F way to get imperative, mutation-safe access
to the same underlying store.

**3. Real bug: touch tap could leave a project artifact spinning
indefinitely.** `useArtifactMotion`'s hover-rotation used
`onPointerOver`/`onPointerOut` unconditionally. On a touchscreen, a tap
fires `pointerover` but many mobile browsers never fire a matching
`pointerout` without a second, deliberate tap elsewhere — which would
leave the `frameloop="demand"` invalidate loop running forever, exactly
the "continuous animation loop on mobile" this phase rules out. Added
`src/hooks/useHasHover.ts` (`(hover: hover) and (pointer: fine)`, same
`matchMedia` pattern as the existing `useIsMobileViewport`) and gated the
hover handlers on it in `useArtifactMotion.ts`. Verified via Playwright
with `devices["iPhone 13"]` (a real touch-emulated context): the media
query correctly reads `false` there, and tapping a project canvas
produces two identical consecutive screenshots (no spin), while a normal
mouse context still reads `true` and still animates on hover and stops
cleanly on unhover — all four confirmed empirically, not assumed.

**Minor fix: Experience's location/date block mis-aligned when wrapped
on mobile.** The company/role block and the location/date block sit in
one `flex flex-wrap justify-between` row; at 375px the date block wraps
to its own line but kept `text-right`, which — since the block's own box
width is only as wide as its longest line — right-aligned "Bengaluru"
against the wider date line below it instead of matching the left-aligned
block above. Changed to `text-left md:text-right`: left-aligned when
wrapped alone on mobile, right-aligned again once it shares a row with
the heading at `md`+ (unchanged there). Confirmed via screenshot.

**Investigated, found NOT a real issue:** the Experience card's three
cluster labels ("Systems & Infrastructure" / "Cross-Functional
Operations" / "Roadmap & Strategy") looked visually tight at 820px in a
screenshot. Measured actual bounding boxes via Playwright instead of
trusting the screenshot by eye: a genuine 24px gap between columns (the
grid's own `gap-6`), no overlap — the tracked mono-uppercase font just
*reads* closer than it measures. Left unchanged, per "if something is
already correct, leave it alone."

**Files changed:** `src/components/layout/Nav.tsx` (responsive link
collapse), `src/scene/HeroScene.tsx` (camera z-distance compensation),
`src/hooks/useHasHover.ts` (new), `src/scene/useArtifactMotion.ts`
(hover gated on real hover capability), `src/components/sections/
Experience.tsx` (one responsive alignment class). Nothing else was
touched — About, Skills, Contact, Projects' artifact geometry/materials,
Footer, and the Phase 6 3D architecture are unmodified.

**Verification actually performed:** `npm run typecheck` — zero errors.
`npm run lint` — zero errors/warnings (including catching and fixing the
`useThree`-mutation immutability error before it shipped). `npm run
build` — succeeded; shared >500 kB chunk stayed at 965.19 kB, identical
to the end of Phase 6 (`useHasHover.ts` and the camera-z logic are small
enough to have landed in the already-small per-feature chunks, confirmed
by their sizes ticking up only slightly — 3.48→3.61 kB and 4.76→5.06 kB
— not the shared chunk). Dev server on 5173 checked before and after
(HTTP 200 both times), never restarted; a separate preview server on
4174 was used for all Playwright checks, then stopped. Confirmed via
Playwright at 375/820/1440: no horizontal overflow, nav brand and Email
link both fully within the viewport at every width, all six sections
present, footer present, 3 project canvases, Hero WebGL context valid,
zero forbidden strings, zero console errors, zero focusable elements in
project cards (unchanged). Experience sticky element computes `position:
sticky` at 820/1440 and `static` at 375 (expected, pre-existing `md:`
gating, not a regression). Reduced motion: a project canvas is
byte-identical across a 700ms window. Desktop mouse hover: animates
while hovered, stops cleanly on unhover. Touch-emulated context: hover
media query correctly false, tap does not spin. Full-page scroll-through
at 1440 produced zero console errors.

**Known limitations:** the pre-existing shared >500 kB Three.js/R3F
chunk warning remains, unchanged — Phase 8 (Performance) is explicitly
where that's addressed, not this phase. The Crypto/RAG/Commerce artifact
canvases use the same fixed 260px mobile height and same geometry at
every breakpoint (per Phase 6 decision, each artifact is already ≤15
low-poly meshes — lightweight enough that no further mobile-specific
geometry simplification was needed; re-confirmed true in this phase, not
just carried over as an assumption).

## 3D Polish — decisions made (2026-09-29)

Spec §8 Phase 6. Polished the existing Hero lattice and the three project
artifacts from [[Projects — decisions made]] without changing what either
represents — no new visual language, no redesign, same lattice concept,
same three artifact narratives.

**Real defect found and fixed: crystal nodes were never actually tinted
teal.** Both `LatticeNodes.tsx` and every project artifact's `NodeMaterial`
used `getThreeColor("accent-soft")` as the crystal color. `accent-soft`
(`#e7f1f4`) is defined in `tokens.css` as "pale accent wash — hover/active
fill backgrounds, not text" — a DOM-only value that happened to also be a
syntactically legal CSS color, not a considered 3D choice. At 0.85
transmission, a near-white input color reads as flat silver-gray, which is
exactly what every "before" screenshot showed — not a deliberate restrained
look, an actual bug. Fixed by switching the default crystal tint to
`accent` (`#0e7490`, the real saturated brand teal) everywhere it was used
as the base/only tint. Confirmed via screenshot comparison, not assumed:
before vs. after, the Hero lattice nodes go from washed-out gray to clearly
faceted teal crystal.

**Added `StudioEnvironment.tsx` — a real environment map, without fetching
anything.** `meshStandardMaterial` at high metalness (the lattice/artifact
edges, 0.85) has nothing to reflect without an environment map and reads as
almost pure black except for direct-light highlights — confirmed this was
the actual cause of the very dark edges in the "before" screenshots, not a
stylistic choice; two plain directional lights can't fix it, only an
environment can. Rather than drei's `Environment` `preset`s (which fetch an
HDRI from a remote CDN at an unverified size — ruled out per the explicit
"no large external assets" constraint), used drei's `Environment` +
`Lightformer` children with no `preset`/`files`: this bakes a cubemap
procedurally, once, from an offscreen rig of three emissive rectangles (key,
fill, and one accent-tinted rim), entirely at runtime, with zero network
requests and zero new dependencies (`@react-three/drei` was already
installed). `resolution={256}` and the library's own default `frames={1}`
keep the bake cheap and one-shot — confirmed via reading
`node_modules/@react-three/drei/core/Environment.js` directly that
`frames={1}` bakes via a `useLayoutEffect` call independent of the
component's own `frameloop`, and its subsequent per-frame `useFrame` hook
is a no-op once baked — so this is safe under `frameloop="demand"` and does
not force continuous rendering. One shared file, imported by both
`HeroScene.tsx` and `ProjectScene.tsx` — satisfies requirement C (one
shared visual language / lighting philosophy, not a second material
system). Directional/ambient light intensities were trimmed slightly in
both scenes (the environment now contributes its own light) to avoid
blown-out highlights — confirmed via screenshot, not assumed.

**Verified in the actual `dist/` output that this didn't duplicate the new
drei code across chunks:** before this phase, the one shared >500 kB chunk
was 910.39 kB; after, it's 965.19 kB (+~55 kB, consistent with drei's
`Environment`/`Lightformer`/PMREM code being added once), while
`HeroScene-*.js` (3.48 kB) and `ProjectShowcase-*.js` (4.76 kB) — the two
chunks that both import `StudioEnvironment.tsx` — stayed just as small as
before. Had the bundler failed to dedupe it, at least one of those two
would have grown substantially; neither did.

**Per-artifact polish, reusing only the two existing material recipes
(crystal transmission / metal) and existing tokens — no third material
system:**
- **Crypto:** packets were previously the same dark metal recipe as the
  edge itself, on the same straight line — effectively invisible, confirmed
  in the "before" screenshot. Now `accent-strong` crystal spheres, and they
  travel along the client↔server connection while the card is hovered
  (frozen otherwise, and under reduced motion) — `useArtifactMotion` was
  extended to also return `hovered`/`reducedMotion`/`invalidate` (previously
  only `groupRef`/`hoverHandlers`) so `CryptoArtifact` could add its own
  `useFrame` for packet travel without duplicating hover-state tracking; it
  still relies on the hook's own hover-driven `invalidate()` loop to keep
  running, and calls `invalidate()` itself too for robustness. Verified via
  two consecutive screenshot diffs while hovered (not just one) that the
  animation is genuinely continuous, not a single jump.
- **RAG:** every node previously shared one identical crystal material, so
  "retrieved" only read from the presence of edges, not from the nodes
  themselves — confirmed in the "before" screenshot, all 9 nodes looked the
  same. Now the query node is a distinct `accent-strong` crystal, the 3
  retrieved chunks are `accent` crystal, and the other 5 corpus nodes reuse
  the metal edge recipe — "inert" vs. "activated" reuses the crystal/metal
  duality the whole project already has, rather than inventing a third
  material. Confirmed via screenshot: the corpus/retrieved/query hierarchy
  is now immediately visible.
- **Commerce:** stages now read as a legible left-to-right progression via
  material saturation alone — catalog stays metal (inert/browsing), cart is
  pale `accent-soft` crystal, checkout is `accent` crystal, order is
  `accent-strong` crystal. Confirmed via screenshot.
- **All three artifacts** get a small fixed compositional tilt
  (`rotation.x = -0.18`, `rotation.y = 0.32`, set once in
  `useArtifactMotion`'s entrance effect, never animated) so a perfectly
  camera-perpendicular pose doesn't read as flat/2D — a static pose, not
  camera movement, so it doesn't conflict with "avoid constant camera
  movement." Applied uniformly, not just to Crypto, since it's a
  shared-visual-language concern (requirement C), not project-specific.

**Not changed:** the lattice concept, its grid dimensions/spacing/node
count, Hero's camera position/fov, Hero's composition/offset, any of the
three artifacts' underlying geometry or narrative meaning, the Experience
sticky implementation, and every non-3D section (About, Skills, Contact,
Footer, Nav) — none were touched.

**Files changed:** added `src/scene/StudioEnvironment.tsx`. Modified
`src/scene/HeroScene.tsx` (import + use `StudioEnvironment`, trimmed light
intensities, corrected a stale doc comment about environment maps),
`src/scene/LatticeNodes.tsx` (color token fix + doc comment),
`src/scene/ProjectScene.tsx` (import + use `StudioEnvironment`, trimmed
light intensities), `src/scene/useArtifactMotion.ts` (static tilt, expanded
return value), `src/scene/projectArtifacts.tsx` (material hierarchy per
artifact, Crypto packet-travel animation). Nothing outside `src/scene/` was
touched.

**Verification actually performed:** `npm run typecheck` — zero errors.
`npm run lint` — zero errors/warnings. `npm run build` — succeeded;
inspected `dist/assets/` directly for the chunk-size comparison above. Dev
server on port 5173 checked before and after (HTTP 200 both times), never
restarted. A separate isolated preview server on port 4174 was used for all
Playwright verification, then stopped. Confirmed via Playwright: layout,
all six sections present, footer present, 3 project canvases, no horizontal
overflow, zero forbidden strings (no github/Claude/Anthropic), zero console
errors — at 375/820/1440. Experience's sticky element computes `position:
sticky` at 820/1440 and `static` at 375 (expected — the `md:sticky` class
only applies at `md` and above; this is pre-existing, unchanged behavior,
not a regression). Reduced-motion: a project artifact's canvas frame is
byte-identical across a 700ms window (screenshot-compared, not assumed).
Normal motion: hovering the Crypto card produces two consecutive changed
frames (not just one), confirming continuous hover-rotation + packet-travel
animation, not a single static jump. Hero's canvas still has a valid WebGL
context after the lighting/material changes. Zero focusable elements exist
in project cards (unchanged from Phase 5 — no links were added or
removed). No claim of "byte-identical bundle" or "no regression" is made
beyond these specific, listed checks.

**Known limitations:** the pre-existing shared >500 kB Three.js/R3F chunk
warning remains (now 965.19 kB, up from 910.39 kB — the environment code's
real, shared, one-time cost, not a duplication) — a broad performance
refactor was explicitly out of scope for this phase. The edges (Hero and
all three artifacts) still read as fairly dark even with the new
environment — judged acceptable/intentional ("subtle metallic edges,"
"quiet confidence," avoid a shinier/gaudier chrome look) rather than pushed
further, to stay restrained per the visual direction; a future phase could
revisit this specific call if it's judged too dark rather than restrained.
Packet markers on the Crypto artifact, while now visibly distinct from the
edge (a real improvement over Phase 5), are still a subtle, not high-
contrast, accent-strong tone by design (no glow/bloom per the explicit
constraint) — legible on close inspection, not a bright beacon.

## Projects — decisions made (2026-09-29)

Spec §8 Phase 5 — Project Showcases. Exactly three projects, content
sourced only from established resume material — no fabricated links,
metrics, screenshots, or testimonials:

1. Quantum-Resistant Secure Communication System — Python, sockets,
   AES-256, RSA, Kyber (PQC). TCP client-server benchmarking RSA-2048 +
   AES-256-GCM vs Kyber-1024 + AES-256-GCM; secure session establishment;
   latency/throughput measurement.
2. Advanced RAG Knowledge Assistant — Python, LangChain, FAISS, Flask,
   Streamlit. Document ingestion, semantic chunking, embeddings,
   retrieval, source attribution, confidence.
3. Production E-Commerce Platform — REST APIs, database transactions,
   Docker, CI/CD. Auth, catalog/search, cart, checkout, admin dashboard,
   containerized CI/CD.

**Numbering / DOM position.** Grepped actual `SectionLabel index=` values
(not assumed from an old prompt) before choosing a number: Hero=00,
About=01, Experience=02, Skills=03, Contact=04 were already complete and
frozen. Projects is `index="05"`, rendered in `App.tsx` after `<Contact />`
(before `<Footer />`, which lives in `RootLayout.tsx` and is unaffected).
Conventional portfolio ordering would put Projects before Contact, but
that would have meant renumbering/moving a frozen section — chose to keep
Contact untouched over "ideal" ordering.

**3D artifact architecture — reused, not duplicated.** Three new files in
`src/scene/`:
- `ProjectScene.tsx` — a `Canvas` wrapper mirroring `HeroScene.tsx`'s
  props/lighting recipe, but `frameloop="demand"` unconditionally (not
  gated on reduced motion like Hero) since up to three of these can be
  mounted at once alongside Hero's always-on canvas — idle cards must
  cost nothing.
- `edgeTransform.ts` — factored out of `LatticeEdges.tsx`'s
  quaternion-between-two-points technique (unit cylinder aligned between
  two `Vector3`s), reused as-is since all three artifacts need individual
  connector meshes at a scale (≤15 elements) too small to justify
  `InstancedMesh`.
- `projectArtifacts.tsx` — `CryptoArtifact`, `RagArtifact`,
  `CommerceArtifact`, each built to the spec'd narrative rather than a
  generic icon:
  - Crypto: two crystal nodes (client/server) joined by one metallic edge
    with three small spheres along it representing packets on an
    established secure channel.
  - RAG: one small query node at the center, eight nodes distributed
    around it (golden-angle Fibonacci sphere), with edges drawn only to
    three of them — visually distinguishing "retrieved" chunks from the
    rest of an unconnected corpus.
  - Commerce: four distinct stage geometries (box=catalog,
    icosahedron=cart, octahedron=checkout, torus=order) in a straight
    line connected sequentially — a literal flow, not a cart icon.
  - Node/edge materials reuse Hero's exact `meshPhysicalMaterial`
    (crystal) and `meshStandardMaterial` (metal) recipes for visual
    consistency with the Lattice.
- `useArtifactMotion.ts` — shared entrance (GSAP scale tween 0.6→1) +
  hover-rotation hook used by all three artifacts. Under reduced motion,
  scale is set to 1 immediately with no tween, and hover never starts
  rotation.
- `ProjectShowcase.tsx` — added after the fact, during self-review: the
  first draft had `Projects.tsx` calling `React.lazy()` four times (once
  for `ProjectScene`, once each for the three artifacts), all from files
  that import `three`/`@react-three/fiber`. That relies on the bundler
  correctly deduping the shared dependency across four separate dynamic
  `import()` call sites — a real risk given the prompt's explicit warning
  against duplicating heavy Three.js scene code. `ProjectShowcase.tsx`
  imports `ProjectScene` and all three artifacts normally (not lazily)
  and exposes one `variant: "crypto"|"rag"|"commerce"` prop, so
  `Projects.tsx` needs exactly ONE `React.lazy()` boundary for the whole
  feature. **Verified in the actual `dist/` output**, not assumed: the
  build produced a single `ProjectShowcase-*.js` chunk (4.34 kB, gzip
  1.53 kB) and a single small `HeroScene-*.js` chunk (3.46 kB) — all the
  actual Three.js/R3F code (910 kB) sits once in one shared chunk that
  both lazily pull from, confirmed by there being only one chunk over
  500 kB in the output, not several. The pre-existing >500 kB bundle
  warning is unchanged in kind (one shared heavy chunk, as before); it
  was explicitly out of scope to fix and was not touched.

**`frameloop="demand"` performance strategy.** Each project canvas plays
one entrance tween (calling `invalidate()` from the tween's `onUpdate`,
since GSAP mutating Three.js object properties does not itself trigger a
demand-mode repaint) and then goes idle — zero per-frame cost — until the
card is hovered, at which point `onPointerOver` calls `invalidate()`
once to kick the render loop, and the `useFrame` callback itself keeps
calling `invalidate()` once per frame only while still hovered, stopping
the instant the pointer leaves. This hover-rotation mechanism was new
(not reused verbatim from any earlier phase) and was empirically verified
in a real browser — a Playwright screenshot diff of the canvas region
confirmed two frames differ while hovered — not just reasoned about.

**No links, no nav entry.** No "View GitHub" or similar buttons — none of
the three projects has a confirmed external URL, and inventing one was
explicitly ruled out; the section is presented as a showcase. Confirmed
via Playwright that zero elements inside `#projects article` are
focusable (no `a`/`button`/`[tabindex]`), consistent with that decision
rather than an oversight. `Nav.tsx` was **not** modified — this prompt,
unlike prior section milestones, did not ask for a `#projects` nav link,
and adding one wasn't otherwise justified, so it was left alone per the
scope-control instruction not to touch frozen files without a concrete
reason.

**Responsive.** Verified at 375/820/1440 via
`document.documentElement.clientWidth` (Playwright): no horizontal
overflow at any width, all three project names/stacks render, three
canvases and three `article`s present, zero console errors. Mobile uses
the same artifact geometry as desktop (each artifact is ≤15 low-poly
meshes, already lightweight) inside a fixed `260px`-tall canvas container
rather than a simplified geometry variant — no complexity reduction was
needed to stay performant at this element count.

**Files added:** `src/scene/ProjectScene.tsx`,
`src/scene/useArtifactMotion.ts`, `src/scene/edgeTransform.ts`,
`src/scene/projectArtifacts.tsx`, `src/scene/ProjectShowcase.tsx`,
`src/components/sections/Projects.tsx`.
**Files modified:** `src/App.tsx` (added `<Projects />` after
`<Contact />`). No other file was touched — Hero, About, Experience,
Skills, Contact, Footer, and Nav are unmodified.

**Verification actually performed (stated precisely, per the
verification-honesty rule):** `npm run typecheck` — zero errors.
`npm run lint` — zero errors/warnings. `npm run build` — succeeded;
inspected `dist/assets/` directly (not inferred) for chunk count/size as
above. Dev server on port 5173 was checked (HTTP 200) before and after
all edits and was never restarted. A separate `vite preview` instance was
started on port 4174 for isolated Playwright verification, then stopped
afterward. Confirmed via Playwright: layout/content/no-overflow/
no-console-errors at 375/820/1440; reduced-motion emulation produces a
stable (non-animating) canvas frame; normal-motion hover produces a
changed canvas frame; zero focusable elements in project cards; the
Experience section's sticky element still computes `position: sticky`;
Hero's canvas still has a valid WebGL context and non-zero backing size;
footer text contains no AI/Claude/Anthropic attribution. No claim of
"byte-identical" or "no regression" is made beyond what these specific
checks establish — sections not explicitly re-checked here (e.g. Skills'
internal ordering, About's copy) were not modified and were not
re-verified pixel-for-pixel in this pass.

**Known limitations:** the pre-existing >500 kB shared Three.js chunk
warning remains (now shared by both Hero and Projects, not duplicated) —
still out of scope per this milestone's explicit instruction not to
attempt a broad performance refactor. No accessible text alternative is
provided for the project artifacts beyond `aria-hidden="true"` on their
container plus the adjacent text content already describing each
project — the 3D is decorative/supplementary, not load-bearing, by
design (matches the "no essential info depends on animation" reduced-
motion requirement extended to a11y generally).

## Footer — decisions made (2026-09-29)

Spec §8's Phase 4 — Core Sections is now fully built (About, Experience,
Skills, Contact, Footer). Foundation, Design System, Hero, Nav, Marquee,
About, Experience (sticky layout), Skills, and Contact were verified
working before this pass and were not modified — this pass added only
`Footer.tsx` and a two-line change to `RootLayout.tsx`.

- **Placement:** rendered from `RootLayout` as a sibling of `<main>`, not
  passed into `App.tsx`'s section list — a `<footer>` is a page-level
  landmark, not another step in the numbered content journey, so it
  belongs at the layout level next to `<Nav>`, structurally mirroring how
  Nav already works.
- **No numbered `SectionLabel`.** Every content section (Hero 00 through
  Contact 04) carries one; Footer deliberately doesn't, since it isn't
  introducing a new chapter — it restates identity and contact info in a
  quieter register. A small `LATTICE` mono wordmark echo stands in for it
  instead, echoing Nav's own brand mark rather than Contact's numbering.
- **No footer nav link.** Nothing points *to* the footer — it's reached by
  scrolling to the end of the page, not via an anchor — so adding one
  would have been exactly the "unnecessary navigation item to look
  fuller" this milestone was told to avoid. `Nav.tsx` was not touched.
- **Content:** name, the same identity line already established in Hero
  ("applied cryptography, networking and systems, and AI engineering"),
  the same two confirmed contact channels Contact already uses (email via
  the `Link` primitive — its first real use anywhere in the project —
  and `tel:+916363165765`), the same "Bengaluru, Karnataka" location
  treatment, a standard `© 2026 Vignesh T.` notice (current year, real
  name — not a claim beyond the standard attribution convention), and a
  closing `Systems / Security / AI` line echoing Skills' own heading
  language. No GitHub/LinkedIn — same reasoning as Contact, no confirmed
  URL exists for either.
- **No motion at all**, deliberately — no `useScrollReveal`, no animation
  dependency of any kind. The footer is always immediately visible; this
  is the simplest way to satisfy "must remain fully usable when reduced
  motion is enabled," since there's no motion to disable in the first
  place.

No real bugs found this pass. Typecheck, lint, and build were clean on the
first implementation. Verified (not assumed): zero fake GitHub/LinkedIn
hrefs in the footer (DOM-queried, count 0); correct `mailto:`/`tel:` hrefs
at all three widths; keyboard Tab reaches both footer links (11th and 12th
stop from page load) with the correct accent focus ring; `HeroScene`
chunk size unchanged; Hero's WebGL canvas, Experience's sticky mechanism
(byte-identical measurements to prior passes), and Contact all re-confirmed
working with no regressions. The same screenshot/element-stability tooling
artifact documented in Experience's, Skills', and Contact's entries above
recurred under sustained multi-check testing; resolved the same way — a
fresh, isolated browser instance for the affected check, DOM measurements
as the primary evidence throughout.

## Contact — decisions made (2026-09-29)

Phase 4D only — Contact, not Footer or Projects. Foundation, Design
System, Hero, Nav, Marquee, About, Experience (sticky layout), and Skills
were verified working before this pass and were not modified beyond one
small, explicitly-scoped data correction (below) — this pass added
`Contact.tsx` and one nav link, nothing else.

- **Skills ordering correction:** `SKILL_GROUPS` in `Skills.tsx` reordered
  to match the resume's own sequence exactly — OS & Networking, Languages,
  Databases, Tools & Platforms, Infrastructure, AI/ML, Security. Same
  categories, same content, same component, same styling — only array
  order changed. Verified via DOM query, not assumed: extracted the
  rendered label order and confirmed it matches the resume sequence
  exactly.
- **Section number: "04", not "05".** Inspected the actual rendered
  sequence before picking a number rather than guessing: Hero is "00"
  (`Lattice`), About "01", Experience "02", Skills "03" — so Contact is
  "04". The spec's own suggested "05" example would have been wrong for
  this repository's actual state.
- **Contact data:** email (`vigneshrao1723@gmail.com`) and phone
  (`+916363165765`, the same resume-sourced number Hero's "Call" button
  already uses) are the only two contact channels rendered, plus the
  already-established "Bengaluru, Karnataka" location. No GitHub/LinkedIn
  links — the resume lists both by name with no actual URL (spec §10
  Missing Inputs), and guessing a username or URL would be fabrication.
  Represented as a typed `SOCIAL_LINKS: {label, href}[]` array, currently
  empty, with the social-link row's render gated on
  `SOCIAL_LINKS.length > 0` — so it's ready to show a confirmed link the
  moment one exists, without any dead/fake link ever being rendered in the
  meantime. Confirmed via DOM query that zero github/linkedin hrefs exist
  anywhere in the section.
- **No contact form.** No form backend/service exists anywhere in this
  project, and a form that visually submits but does nothing would be
  dishonest UI — explicitly avoided per instruction. Used the same
  `mailto:`/`tel:` `Button` pattern Hero already established instead
  (literally reusing the component, not a new pattern) — confirmed via DOM
  query that no `<form>` element exists in the section.
- **Copy:** "Open to conversations on systems, security, and AI." —
  deliberately echoes Skills' own "Depth across systems, security, and AI"
  phrasing rather than a generic "Let's build something" opener, to stay
  consistent with the declarative, third-person-leaning voice established
  by every other section's heading (Hero's name, About's "Engineering
  systems end-to-end," Experience's "Where product, engineering, and
  operations meet"). No claims beyond what's already established
  elsewhere on the site.
- **Navigation:** added a real `Contact → #contact` link, reusing
  `Section`'s existing `scroll-mt-28` — verified via actual
  `nav a[href="#contact"]` clicks at 375px and 1440px, measuring
  `getBoundingClientRect()` before/after both times; no overlap at either.
  "Contact" (scrolls to the section) and the pre-existing "Email me"
  button (direct mailto: action) intentionally coexist — different
  purposes, not redundant.

No real bugs found this pass. Typecheck, lint, and build were clean on the
first implementation. The recurring screenshot/element-stability tooling
artifact (documented in Experience's and Skills' entries above) showed up
again under sustained multi-viewport testing in one browser session;
resolved the same way — a fresh, isolated browser instance for the
affected viewport, with DOM measurements (not screenshots alone) as the
primary evidence throughout.

## Skills — decisions made (2026-09-29)

Phase 4C only — Skills, not Projects/Achievements/Contact/Footer. Foundation,
Design System, Hero, Nav, Marquee, About, and Experience (including its
sticky layout) were verified working before this pass and were not
modified — this pass touched zero existing infrastructure, only added
`Skills.tsx` and one nav link.

**Ordering corrected 2026-09-29, during the Contact pass:** the group order
below originally didn't match the resume's own sequence (categories and
content were always correct, only the order wasn't). Fixed as a pure
array-reorder in `Skills.tsx` — no design, styling, or content change. See
"Contact — decisions made" above for the verification. The order now is:
OS & Networking, Languages, Databases, Tools & Platforms, Infrastructure,
AI/ML, Security.

- **Grouping:** the resume's own 7 categories, used as-is (OS & Networking,
  Languages, Security, Databases, Infrastructure, AI/ML, Tools & Platforms)
  — not remapped into a different taxonomy, since the resume's own
  breakdown already *is* the verified grouping. No proficiency levels,
  ratings, or scores — the resume doesn't establish any, so none are
  implied.
- **Visual treatment — deliberately typographic, not a chip/tag "technology
  wall":** each group is a mono/accent label (matching Experience's cluster
  label style exactly) followed by a plain comma-separated list using the
  same `Text` primitive About and Experience use for body copy. No boxed
  tags, no icons, no logos — reads as an editorial list, not a developer-
  dashboard badge grid, per the explicit instruction to avoid that
  aesthetic.
- **Layout:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, giving 7 groups
  as 3+3+1 at desktop — the uneven last row is intentional restraint, not
  an oversight; forcing an 8th group or a different column count to avoid
  it would mean inventing content or an arbitrary layout contortion for a
  cosmetic concern.
- **Motion:** reuses `useScrollReveal` completely unmodified — the same
  hook About uses. Skills' reveal need (stagger a set of items into view)
  is exactly what that hook already does; unlike Experience, nothing about
  Skills needed new animation infrastructure.
- **Navigation:** added a real `Skills → #skills` link, reusing `Section`'s
  existing `scroll-mt-28` — verified again specifically for Skills (not
  assumed carried over), via actual `nav a[href="#skills"]` clicks at
  375px and 1440px, measuring `getBoundingClientRect()` before/after both
  times. No overlap at either.

No real bugs found this pass — typecheck, lint, and build were clean on
the first implementation, and browser verification confirmed the layout
matched intent without needing a fix cycle (unlike About's scroll-margin
bug or Experience's two sticky-CSS bugs). The one recurring item was the
same screenshot/stability-detection tooling artifact under sustained
WebGL load documented in Experience's entry — mobile and tablet
screenshots succeeded directly; desktop needed a fresh, isolated browser
instance (same workaround as before), and DOM measurements (position,
opacity, `scrollY`) were the primary evidence throughout, not screenshots
alone.

## Experience — decisions made (2026-09-29)

Phase 4B only — Experience, not Projects/Skills/Achievements/Contact/Footer.
Foundation, Design System, Hero, About, Nav, and Marquee were verified
working before this pass and were not rewritten; the only change to
existing infrastructure was the same kind of real-bug-driven fix as
About's (see below).

- **Content:** one verified entry (Earthy, Founder's Associate (Growth
  Engineer), Bengaluru, Oct 2025 – Sep 2026), data-driven via a typed
  `ExperienceEntry[]` array in `Experience.tsx` so a second verified entry
  is a data addition, not a rewrite — but no second entry was invented to
  fill it out. Responsibilities are grouped into three resume-traceable
  clusters (Systems & Infrastructure / Cross-Functional Operations /
  Roadmap & Strategy) instead of a flat bullet list, to communicate
  product+engineering+operations breadth without inventing metrics.
- **Card treatment:** neutral (white surface), matching About's education
  card — spec §3's alternating neutral/accent card treatment needs a
  second card to alternate against, which doesn't exist yet.
- **Navigation:** added a real `Experience → #experience` link. Reused the
  `scroll-mt-28` fix already on `Section` from the About pass — verified
  again for Experience specifically (not assumed): confirmed via actual
  `nav a[href="#experience"]` clicks, measuring `getBoundingClientRect()`
  before/after, at both 375px and 1440px. No overlap at either.

### The pinned/scrubbed deck was tried, investigated, and dropped — full account

Spec §5 asks for a "pinned/sticky deck interaction." A `ScrollTrigger
pin:true` + `scrub` version was built first. Automated verification (real
`page.mouse.wheel()`/keyboard-scroll input, not a raw `window.scrollTo`
that bypasses Lenis) showed `scrollY` stop advancing partway through the
pinned scroll range, and `page.screenshot()` hung waiting for the page to
settle — treated as a serious finding, not dismissed.

Investigated before concluding anything, and the first read was wrong: the
"stuck" `scrollY` turned out to be the page legitimately reaching
`document.documentElement.scrollHeight - clientHeight` — confirmed by
reading `scrollHeight` directly — not a frozen scroll. But the
`page.screenshot()` hang was real and specific: it reproduced under rapid
synthetic wheel/keyboard events with the pin active, and did **not**
reproduce with the same gentle, already-proven verification method
(`scrollIntoViewIfNeeded` + a settle wait) used successfully for every
other section this project. That left genuine ambiguity — pin actually at
fault, vs. an artifact of firing synthetic scroll events faster than a
Lenis-smoothed page can settle — without enough confidence to ship a
pinned interaction either way.

Given the explicit instruction to fall back to a simpler, non-pinned
stacked presentation when pinning gets "awkward," and that this was more
than awkward (an unresolved automated-testing hang), the deck reveals with
a plain scroll-triggered stagger instead — the same pattern `useScrollReveal`
uses for About, in its own hook (`useExperienceDeck`) since a single card's
animation isn't quite the same shape as About's list of arbitrary items.

### Correction (2026-09-29): CSS `position: sticky` instead — confirmed working

Spec §5's "pinned/sticky deck" was re-attempted with `position: sticky`
(native CSS layout) instead of `ScrollTrigger pin:true`, on the reasoning
that a browser-native layout feature can't fight Lenis the way JS-computed
pinning can — it needs no scroll-position math at all, works with any
scroll mechanism, degrades to normal flow with zero JS, and structurally
cannot scroll-lock the page (it only holds within its own row, never past
it).

Layout: a two-column grid, `md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]` —
label+heading sticky in the narrower left column
(`md:sticky md:top-28`, the same 112px clearance as `Section`'s
`scroll-mt-28`), the card column scrolling normally beside it. Below `md`,
the grid collapses to one column and stacks normally — no sticky code path
runs at all on mobile.

**One real implementation bug found and fixed in the process:** the first
version put `sticky` directly on the grid item. A CSS grid item stretches
to its row's full height by default (`align-items: stretch`), so the
sticky element's own box was already as tall as the whole row — leaving it
nothing to visually stick within. Fixed by wrapping: the grid item is a
plain div (lets it stretch, which is fine), and the `sticky` class goes on
an *inner* div holding the actual label/heading content, whose height
stays at its own natural (short) size while its stretched parent supplies
the room. Confirmed via `getBoundingClientRect()`, not assumed: before the
fix, the sticky div's own height equalled its parent's (0px of room);
after, the parent stretched to 386.97px against the sticky div's natural
171.75px, a genuine 215px of room.

**A second, non-structural issue found in the same pass:** even after
fixing the wrapper bug, the sticky column's `display-lg` heading wrapped
to 5–6 lines in the narrower column, making it nearly as tall as the card
again — correct CSS, but no visible sticky effect given the content. Fixed
by sizing that heading down to `heading-lg` for this column specifically
(an editorial-typography call — a narrower column reasonably takes a
smaller heading size — not a token change).

**Verified the sticky effect itself is real, not just structurally
plausible:** measured the label's viewport `top` before and after a
genuine 150px scroll delta (confirmed via `window.scrollY` changing) —
`0px` of movement in the label's screen position despite the real scroll,
which is exactly what `position: sticky` is supposed to do.

**On the screenshot-hang tooling issue from the original pin attempt:** it
recurred here too, under repeated automated scrolling within one long
browser session, and now with clearer evidence of its actual shape —
`document.documentElement.scrollHeight` math always explained every
"stuck" `scrollY` reading exactly (never a real freeze), and individual
screenshots taken early in a session, or in a fresh browser instance,
consistently succeeded; only later screenshots in a long-running session
with Hero's continuously-rendering WebGL canvas active occasionally hung.
This is a Playwright/software-WebGL stability-detection artifact under
sustained load in this specific verification environment, not a defect in
the sticky implementation — verification here relied on direct
`getBoundingClientRect()`/`scrollY` measurement (which never fails
ambiguously the way a screenshot timeout does) as the primary evidence,
with screenshots as supporting, not sole, confirmation.

Desktop, mobile (375px), and the `#experience` nav-link click at both
375px and 1440px were all re-verified after this correction, not assumed
carried-over from the earlier pass.

## About — decisions made (2026-09-28)

Phase 4A only — About, not Experience/Projects/Skills/Achievements/Contact/
Footer. Foundation, Design System, Hero, Nav, and Marquee were verified
working before this pass and were not touched except for one real bug fix
(below); none were redesigned.

- **Content:** narrative + education block, both resume-sourced only
  (spec §2). Narrative covers CS engineering education, the
  cryptography/networking/AI technical range, and the Earthy role
  (architected/deployed internal systems, cross-functional stakeholder
  work, full-cycle ownership) — no invented metrics, titles, or outcomes.
  Employment dates deliberately not stated in prose (the resume's Sep 2026
  end date has already passed as of this writing) — phrased so it doesn't
  claim current or past employment either way; the Education block's own
  dates carry the only explicit date range.
- **No portrait/character:** Decision Gate 6 stays open. Visual balance
  comes from a two-column narrative/education-card layout (`grid-cols-[1.6fr_1fr]`
  desktop, stacked mobile), not a placeholder image.
- **No second 3D scene:** the Hero lattice remains the site's one WebGL
  surface; About's only visual texture is the existing Marquee style,
  reused, not duplicated.
- **Motion:** new `useScrollReveal` hook (`src/animation/useScrollReveal.ts`) —
  Hero's `useHeroEntrance` animates on mount since it's the first viewport;
  About needs a scroll-triggered version instead. Reuses the single
  `gsap`/`ScrollTrigger` instance already registered in `animation/gsap.ts`
  (no second ticker, no competing ScrollTrigger setup) and `gsap.context()`
  for cleanup. Reduced motion skips the reveal and shows final state
  immediately, confirmed via `prefers-reduced-motion` emulation showing
  `opacity:1` on the heading *before* any scroll happens.
- **Nav:** added a real `About → #about` link now that the section exists —
  no Experience/Projects/Skills/Contact links, since those still don't
  exist.

**Real bug found and fixed:** clicking the new `#about` nav link scrolled
the section's numbered label partially behind the fixed nav at mobile width
(confirmed by measuring `getBoundingClientRect()` before and after — 24px
of overlap, not just a screenshot artifact of a fixed-position element).
Root cause: `Section` had no `scroll-margin-top`, so anchor-scroll landed
sections flush against the viewport top, under the fixed nav. Fixed by
adding `scroll-mt-28` to the shared `Section` primitive — this benefits
every future section that reuses it, not just About. This is the one
change to existing infrastructure in this pass, made because inspection
proved a real defect, per the standing instruction to otherwise leave
completed work alone.

## Hero — decisions made (2026-09-26)

Resolves the Hero-blocking parts of Decision Gates 2 (hero concept) and 5
(3D style); Gate 6 (character) deliberately left open and un-blocking (no
portrait asset exists — the lattice carries the Hero's identity alone for
now); Gate 7 (project count) untouched at three, per the resume.

**Added in a follow-up pass the same day:** a floating pill nav
(`src/components/layout/Nav.tsx`, rendered from `RootLayout`, not `Hero` —
it's site-wide chrome that later sections get for free) and a skills
marquee (`src/components/ui/Marquee.tsx` + real resume keywords in
`Hero.tsx`). Both were explicit, out-of-scope-of-the-first-pass asks, not
things inspection found missing.
- Nav has exactly two real links: a `#hero` self-anchor (brand mark) and the
  same verified `mailto:` CTA already in Hero. No About/Work/Contact links —
  those sections don't exist yet, and linking to them would be dead UI.
  Glassmorphism (`backdrop-blur-lg` + translucent `bg-surface/80`) is used
  here specifically because spec §3 restricts it to the floating nav only.
- Marquee is a duplicated-content CSS `@keyframes` loop (not GSAP — a linear
  infinite scroll doesn't need a timeline) with `aria-hidden="true"` (it's
  decorative/supplementary, not the authoritative skills listing a later
  real Skills section will provide; duplicating content for a seamless loop
  would otherwise mean a screen reader hears every item twice). Confirmed
  its `animation-duration` collapses to ~0 under `prefers-reduced-motion`
  via the project's existing global rule — no separate reduced-motion branch
  needed. All 20 listed keywords trace directly to the resume's Skills row;
  none invented.

- **Hero concept:** a literal computational lattice — a 4×4×3 grid of nodes
  (instanced icosahedrons) connected to their axis-aligned nearest neighbors
  (instanced cylinders), built procedurally in `src/scene/latticeGeometry.ts`
  + `Lattice.tsx`. No GLB, per spec §7's preference for procedural geometry
  where it's tractable.
- **3D style:** crystalline nodes via `meshPhysicalMaterial` transmission
  (`accent-soft` tinted, not drei's `MeshTransmissionMaterial` — see the bug
  log below for why), metallic edges via `meshStandardMaterial`
  (`ink-secondary` tinted, metalness 0.85). No environment map/HDRI —
  deliberately deferred (see `HeroScene.tsx`'s doc comment) since drei's
  preset HDRIs are an unverified-size remote fetch this milestone's
  performance requirements couldn't justify sight-unseen; three plain
  Three.js lights stand in for now.
- **Composition:** camera at `(0,0,9)`, fov 30; lattice offset to
  `position={[1.5,0,0]}` so it sits in the Hero's right-hand empty space, not
  centered under the left-aligned text column. Both values were tuned
  against an actual rendered screenshot, not guessed — the first attempt
  (camera at `(0,0,6.5)`, fov 35, centered) filled almost the entire
  viewport and badly overlapped the headline and one CTA.
- **CTAs:** "Email me" (`mailto:`) and "Call" (`tel:`) — the resume's only
  two verified, immediately-functional contact channels. GitHub/LinkedIn are
  explicitly unconfirmed in the spec's Missing Inputs, so neither is linked;
  swap "Call" for a real profile link once a URL is confirmed.
- **Motion:** one-time scale-only entrance (`0.35→1`, `--ease-signal`) for
  "materializing," continuous slow autonomous rotation, and mouse parallax —
  both gated off under reduced motion, parallax additionally gated off on
  mobile (no hover device). Rotation is computed as an absolute value each
  frame from elapsed time + smoothed pointer offset, not accumulated via
  `+=`, specifically so the two motion sources can't fight over the same
  axis.
- **Performance:** `HeroScene` is `React.lazy`-loaded (confirmed by build
  output: `three`/`@react-three/fiber` add zero bytes to the main chunk,
  live only in a separate `HeroScene-*.js` chunk); `frameloop` is `"demand"`
  under reduced motion (no continuous render loop when nothing animates);
  `dpr` clamped to `[1,2]` desktop / `[1,1.5]` mobile; Canvas's `fallback`
  prop handles WebGL-unavailable degradation.
- **Responsive:** `useIsMobileViewport` (768px breakpoint, matching
  Tailwind's `md`) drives both the CSS layout switch (canvas layered
  absolute vs. stacked in normal flow) and JS behavior (parallax on/off) —
  the same breakpoint for both, so they can't disagree. Mobile stacks the
  canvas as a fixed 280px block *above* the text (DOM order: canvas first,
  text second; static/relative elements stack in DOM order) — verified
  in-browser, not assumed, at a 375px viewport.

### Real bugs found and fixed during verification (not just gaps)

Browser verification for this milestone wasn't a formality — it caught three
genuine bugs that typecheck/lint/build all passed cleanly:

1. **The lattice didn't render at all.** Root cause: Hero's `<section>` had
   `position: relative` but no explicit `z-index`, so it never established
   its own CSS stacking context. The canvas wrapper's `-z-10` (needed to sit
   it behind the text) escaped all the way to the document's root stacking
   context instead of staying local to Hero, and `<main>`'s own opaque
   `bg-canvas` background — painting later in the root context's normal
   in-flow order — covered it completely. Confirmed via direct WebGL
   draw-call counts and `readPixels` (real triangles were being drawn; nothing
   reached the screen) before finding the DOM/CSS cause. Fix: `relative z-0`
   instead of just `relative` on `<section id="hero">`.
2. **Crystal nodes rendered solid black, then as visual noise.** First cause:
   the transparent canvas's internal clear color is black, and
   `MeshTransmissionMaterial`'s transmission sampling picked that up. Fixed
   by making the canvas opaque with `scene.background` set to the `canvas`
   token instead of relying on DOM transparency. That surfaced a second,
   separate issue — drei's `MeshTransmissionMaterial` rendered as static-like
   visual noise under this environment's software (SwiftShader) WebGL.
   Switched to Three.js core's `meshPhysicalMaterial` transmission, which
   rendered cleanly. Real-GPU behavior of the drei material was never
   confirmed either way — this was a "couldn't verify it's safe, so don't
   ship it" call, not a proven hardware bug.
3. **Keyboard focus ring showed the wrong color** (white on the primary
   button, ink on the secondary — each button's own text color, i.e.
   `currentColor`) even though `:focus-visible { outline: 2px solid
   var(--color-focus) }` looked correct in the compiled CSS. Cause: the
   Design System milestone's `@theme inline` bridge (see below) mistakenly
   included `--color-focus: var(--color-focus)` — a self-reference,
   independent of the one correct declaration
   (`--color-focus: var(--color-accent)`) in the plain `:root` block. A
   circular custom property is invalid at computed-value time, so
   `outline-color` silently fell back to its initial value. Fixed by
   removing focus from the `@theme inline` block — it has no Tailwind-class
   consumer (`bg-focus`, etc.) and never needed to be there.

## Design System — decisions made (2026-09-26)

Resolves spec Decision Gates 3 and 4. Full rationale and WCAG contrast
verification lives as comments in `src/styles/tokens.css`; summarized here so
future sessions don't have to re-derive it.

- **Accent (Gate 3): `#0E7490`**, a deep cyan-teal, not the guide's default
  crimson. Chosen for the "crypto-signal" reading the spec itself suggests
  (cyan/amber over red), kept deep/desaturated rather than neon to match
  "quiet confidence." Verified ≥4.5:1 text contrast on both `#F4F5F7`
  (canvas) and `#FFFFFF` (surface), and ≥3:1 as a non-text focus-ring
  indicator against both.
- **Typography (Gate 4): Fraunces (display) + IBM Plex Sans (body) + IBM
  Plex Mono (mono).** Fraunces carries the "editorial" half of spec §3's
  "editorial-technical" personality; the IBM Plex family (designed by IBM
  for technical product UI) carries the "technical" half, and gives
  display/body/mono a coherent, non-generic identity — deliberately not
  Inter/Poppins/Space Grotesk, which spec's "avoid generic AI portfolio
  aesthetics" rules out. Self-hosted via `@fontsource`, not a Google Fonts
  `<link>`, for reliable loading with no third-party runtime dependency.
- **Ink/border/surface scale:** `#14171A` primary / `#4B5058` secondary /
  `#666C74` muted text, `#E2E4E8` border. All computed and verified against
  WCAG 2.1, not eyeballed (see the contrast figures in tokens.css).
  `--color-surface-elevated` is intentionally identical to `--color-surface`
  — surface is already pure white, so a further tier can't get lighter;
  elevation above it is `--shadow-elevated` alone, per spec's shadow-only
  elevation model (no glow/bloom).
- **Success/warning/error tokens: deliberately omitted.** Nothing in the
  current scope (no forms, no validation states) needs them yet — spec §6
  says add them "only if actually required." Add when a real use appears,
  not speculatively.
- **Token architecture:** `src/styles/tokens.css` is the single source of
  truth (Tailwind v4 `@theme`, verified namespace-by-namespace against the
  installed `tailwindcss/theme.css` before use). **Correctness-critical
  detail, found and fixed on 2026-09-26:** a plain `@theme { --color-x: #fff }`
  only emits `--color-x` as a real `:root` property when a Tailwind utility
  using it is actually found by content scanning — an unused theme color is
  silently tree-shaken away entirely, verified by building with one and
  finding it absent from the compiled CSS. That would have broken any color
  consumed ONLY by a future Three.js material and never as a `bg-*`/`text-*`
  class. Fix: every `--color-*` is declared once in a plain `:root` block
  (ordinary CSS, never tree-shaken), and a separate `@theme inline` block
  maps Tailwind's theme keys to those same variables by `var()` reference
  instead of owning a second, shakeable copy. Typography/spacing/radius/
  shadow/ease stay in a plain (non-inline) `@theme` block — those are only
  ever consumed via Tailwind classes, never read from JS, so their
  usage-based tree-shaking is correct, not a bug. `--shadow-*` specifically
  can't be read back via `getComputedStyle` at all (Tailwind decomposes it
  into its own internal `--tw-shadow` layering system), which is fine since
  nothing needs a shadow value in JS. `src/lib/designTokens.ts` reads the
  `:root` color values for Three.js materials/lights (`getThreeColor`) and
  GSAP durations (`getDurationToken`), per spec §9's requirement that DOM
  and 3D share one token source rather than two — this now holds
  unconditionally, not just for colors some component happens to use.
- **Color tokens extended (2026-09-26):** added `--color-border-strong`
  (`#9BA0A8`, ~2.4–2.6:1 — a visible structural boundary, deliberately still
  short of WCAG's 3:1 non-text minimum, since that threshold is for controls
  where a border is the only affordance; pair with `--color-focus` instead
  of relying on this alone for anything interactive) and
  `--color-accent-strong` (`#0A5A6B`, 7.2:1/7.8:1 text contrast, clearly
  darker than base accent) for pressed/active states. `--color-accent-muted`
  was renamed to `--color-accent-soft` for a consistent soft/strong naming
  pair with border; it had no consumers yet, so the rename was safe
  (verified with a repo-wide grep before renaming).
- **Button system extended (2026-09-26):** `ghost` renamed to `secondary`
  (bordered, ink text) and a third `subtle` variant added (text-only, accent
  colored, for the lowest-emphasis actions) alongside `primary`. All three
  now have explicit `active:` states using `--color-accent-strong`/
  `--color-accent-soft`, not just default/hover/focus-visible/disabled.
  Icon-button variant deliberately not built — no current consumer
  (`lucide-react` is installed but nothing renders an icon-only control
  yet); add it when a real call site needs one, not speculatively.
- **Type-scale consolidation:** spec-adjacent guidance asked for a "label"
  scale step distinct from "caption." Not added as a separate token —
  `Text size="caption"` plus `<SectionLabel>` already cover that tier at the
  same value, and a same-value alias would be a duplicate, not a new
  capability. Documented in `tokens.css` next to the type scale.
- **Motion tokens:** `--duration-fast/base/slow` (150/400/800ms) and
  `--ease-signal` are defined but not yet wired into any real animation —
  no large motion work happens until Hero (Phase 3). GSAP's named eases
  (`expo.out`, `power2.inOut`) are documented in `designTokens.ts` as the
  hand-kept equivalents of the CSS cubic-beziers, since GSAP can't read a
  CSS `cubic-bezier()` value directly.

---

# CORE TECHNOLOGY

Use the technologies already established in the repository.

Expected technology direction includes:

- React
- TypeScript
- Vite where already established
- React Three Fiber / Three.js where established
- GSAP
- HTML/CSS/Tailwind where established
- Figma for design planning
- GLB/GLTF for web 3D assets where appropriate

Do not replace the stack without a documented reason.

---

# DESIGN DIRECTION

The visual direction should combine:

- editorial design
- engineering precision
- premium product visualization
- restrained modernism
- realistic 3D
- cinematic camera work

Avoid:

- excessive neon
- generic cyberpunk
- excessive glassmorphism
- random floating 3D objects
- excessive gradients
- excessive animation
- template-like card layouts
- decorative motion without purpose

The experience should feel premium because of composition, materials, typography, lighting, spacing, and interaction quality.

---

# VISUAL SYSTEM

Preferred foundation:

Light neutral background:
#F4F5F7

White surfaces.

Dark typography.

One strong accent color.

Use the accent sparingly.

Maintain generous whitespace.

Typography should establish strong editorial hierarchy.

Motion should guide attention rather than decorate every element.

---

# 3D QUALITY STANDARD

3D should prioritize realism.

Pay attention to:

- physically believable materials
- roughness variation
- realistic reflections
- contact shadows
- soft lighting
- controlled exposure
- camera composition
- depth
- scale
- subtle imperfections

Avoid perfectly clean CG surfaces when realism would benefit from controlled imperfections.

3D scenes should have a clear visual purpose.

---

# CAMERA LANGUAGE

Camera movement must be intentional.

Prefer:

- slow cinematic pushes
- controlled rotations
- subtle parallax
- perspective changes
- detail reveals
- section-specific framing

Avoid:

- constant camera movement
- excessive camera shake
- random rotations
- movement that interferes with reading

---

# UX PRINCIPLES

The visitor must understand:

1. Who I am
2. What I do
3. What I have built
4. How I think
5. Why the work matters
6. How to contact me

3D should enhance those goals.

Never sacrifice navigation or readability for visual effects.

---

# RESPONSIVENESS

Support:

- desktop
- tablet
- mobile

Do not simply scale desktop layouts down.

For mobile:

- simplify 3D where necessary
- reduce animation
- reduce geometry
- reduce expensive effects
- preserve content hierarchy
- preserve usability

---

# ACCESSIBILITY

All interfaces must consider:

- semantic HTML
- keyboard navigation
- visible focus states
- accessible buttons
- appropriate ARIA
- readable contrast
- reduced-motion preferences
- touch target sizes

Do not make essential information dependent on animation.

---

# PERFORMANCE

Treat WebGL performance as a first-class requirement.

Monitor:

- geometry complexity
- texture sizes
- draw calls
- shader complexity
- animation loops
- memory usage
- bundle size
- asset loading
- mobile GPU performance

Use:

- lazy loading
- optimized textures
- compressed GLB assets
- appropriate DPR
- reduced effects on mobile
- disposal of unused resources

Do not optimize blindly.

Measure or inspect first.

---

# PROJECT ARCHITECTURE

Prefer modular architecture.

Separate:

- UI
- 3D scene
- animation
- content
- data
- utilities
- assets

Keep project content data-driven where practical.

Avoid giant components.

Avoid duplicated animation logic.

Avoid unnecessary abstractions.

---

# DEVELOPMENT WORKFLOW

For every significant task:

## 1. INSPECT

Inspect:

- relevant files
- existing architecture
- current implementation
- dependencies
- assets
- previous phase work

## 2. PLAN

Before modifying substantial code, state:

- objective
- files affected
- implementation approach
- risks
- expected visual/UX effect

## 3. IMPLEMENT

Make the smallest coherent change.

Do not rewrite unrelated systems.

## 4. VERIFY

Run appropriate:

- TypeScript checks
- lint
- tests
- production build

For visual work, inspect the result.

## 5. REVIEW

Check:

- visual consistency
- responsive behavior
- accessibility
- performance
- code quality
- regressions

## 6. REPORT

Return:

- what changed
- files changed
- verification performed
- remaining issues
- recommended next step

---

# IMPORTANT RULE

Do not destroy existing work simply because you prefer another implementation.

Before replacing an existing system:

1. understand why it exists;
2. identify the actual problem;
3. explain the trade-off;
4. propose the smallest safe change.

---

# PHASE DISCIPLINE

The project follows the roadmap in LATTICE Master Specification §8.
Project Foundation (Phase 2), Design System (Phase 1), Hero (Phase 3), and
all of Phase 4 — Core Sections (About 4A, Experience 4B, Skills 4C,
Contact 4D, Footer) are complete — see "Footer — decisions made",
"Contact — decisions made", "Skills — decisions made", "Experience —
decisions made", "About — decisions made", "Hero — decisions made", and
"Design System — decisions made" under CURRENT STATE for what was decided
and why, including a real GSAP ScrollTrigger pin+Lenis interaction that
was investigated and deliberately not shipped in Experience, resolved
instead with native CSS `position: sticky` (see that section — worth
reading before attempting a pin anywhere else in this project), and both
Contact's and Footer's deliberate omission of GitHub/LinkedIn links (no
confirmed URLs exist — see those sections before adding either). Spec §8
Phase 5 (Project Showcases — project cards + per-project 3D artifacts) is
next.

Decision Gates 3 (accent), 4 (typography), and the Hero-blocking parts of 2
(hero concept) and 5 (3D style) are resolved. Gate 6 (character usage) is
still genuinely open — no portrait asset exists, and the Hero was
deliberately built so the lattice carries its identity without one; resolve
6 before any holographic ID card work (spec §4). Gate 7 (project count) is
still open — three, per the resume; do not invent a fourth/fifth without an
explicit answer. Gate 8 (animation intensity — no bloom/chromatic
aberration site-wide) has held through Hero and should keep being confirmed
as work touches motion elsewhere.

Do not restart the Foundation, Design System, Hero, About, Experience,
Skills, Contact, or Footer phases from scratch.

Before starting any new phase, first determine:

- what the repository actually contains right now;
- which planned features are complete;
- which are partially complete;
- which are missing;
- which implementation differs from the spec.

Then continue from the actual state of the repository, not from what this
file or the spec claims should be there.

---

# DESIGN APPROVAL

When a major visual direction has not yet been established:

1. propose the design direction;
2. describe the visual system;
3. explain interaction behavior;
4. wait for approval before implementing major visual changes.

Do not generate large amounts of speculative UI.

---

# OUTPUT FORMAT

For implementation tasks, return:

STATUS:
PHASE:
OBJECTIVE:

INSPECTION:
-

PLAN:
-

FILES TO CHANGE:
-

IMPLEMENTATION:
-

VERIFICATION:
-

RISKS:
-

NEXT STEP:
-

For architectural decisions, explain:

DECISION:
OPTIONS:
TRADE-OFF:
RECOMMENDATION:
RATIONALE:

---

# FINAL PRINCIPLE

LATTICE must feel like a real portfolio belonging to a real engineer.

The goal is not to demonstrate how many technologies can be used.

The goal is to create a coherent, memorable, technically excellent portfolio in which:

CONTENT + 3D + MOTION + TYPOGRAPHY + ENGINEERING

work as one system.
