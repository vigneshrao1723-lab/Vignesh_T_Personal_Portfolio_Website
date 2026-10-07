# Safe Deletion Report

Inventory and reference checks were completed before this cleanup's proposed deletions. The working tree already contained pending changes from earlier work when this report was created; this report does not claim those earlier removals were performed by this cleanup.

## A. Project root inventory

- `.git/` — existing Git history and configuration.
- `.gitignore` — dependency, build, local environment, editor, log, and OS exclusions.
- `.claude/` — empty local directory at inspection time.
- `node_modules/` — installed development dependencies and compiler cache.
- `dist/` — generated Vite production output.
- `public/Vignesh_T_Resume.pdf` — downloadable CV.
- `src/` — React application, content, styles, animation, hooks, UI, and artwork.
- `package.json`, `package-lock.json` — scripts and pinned dependency graph.
- `vite.config.ts`, `eslint.config.js`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` — build, lint, and TypeScript configuration.
- `index.html` — Vite HTML entry point.
- `CLAUDE.md` and `LATTICE Master Specification.md` — existing project notes/specification; retained as documentation, not required by the runtime.
- `README.md` — project setup and overview, added for repository preparation.

### Source tree at inspection

- `src/App.tsx`, `src/main.tsx`, `src/vite-env.d.ts`
- `src/animation/`: `gsap.ts`, `useExperienceDeck.ts`, `useHeroEntrance.ts`, `useHeroScrollTransition.ts`, `useProjectScrollMotion.ts`, `useScrollProgress.ts`, `useScrollReveal.ts`, `useSmoothScroll.ts`
- `src/components/layout/`: `Nav.tsx`, `RootLayout.tsx`
- `src/components/sections/`: `About.tsx`, `Achievements.tsx`, `Contact.tsx`, `Experience.tsx`, `Hero.tsx`, `ProjectDetailsModal.tsx`, `Projects.tsx`, `Skills.tsx`
- `src/components/ui/`: `Button.tsx`, `Container.tsx`, `DigitalIdCard.tsx`, `Divider.tsx`, `Heading.tsx`, `index.ts`, `Link.tsx`, `Marquee.tsx`, `Section.tsx`, `Text.tsx`
- `src/content/`: `profile.ts`, `projects.ts`
- `src/hooks/`: `useHasHover.ts`, `useIsMobileViewport.ts`, `useReducedMotionPreference.ts`
- `src/lib/`: `designTokens.ts`, `noBreak.tsx`
- `src/store/useAppStore.ts`
- `src/styles/`: `index.css`, `tokens.css`
- `src/assets/`: `portrait.jpg` and the project assets listed below.

### Project asset reference check

The four active logo mappings in `src/content/projects.ts` are:

| Project | Asset |
| --- | --- |
| Quantum-Resistant Secure Communication System | `src/assets/projects/quantum-secure-communication-logo.png` |
| Advanced RAG Knowledge Assistant | `src/assets/projects/rag-logo.png` |
| Project Store | `src/assets/projects/project-store-icon.png` |
| Personal Portfolio | `src/assets/projects/personal-portfolio-briefcase.png` |

The additional files proposed for deletion are not imported or referenced by source/config/document text. Exact filename searches were performed outside `node_modules/`, `dist/`, and `.git/`; their images were also visually inspected. The three 16:9 teal 3D illustrations are legacy artwork, not any of the four active logos.

## B. Files confirmed required

- **Development/build:** `package.json`, `package-lock.json`, `vite.config.ts`, `eslint.config.js`, all three TypeScript config files, `index.html`, and `src/main.tsx`/`src/vite-env.d.ts`.
- **Runtime/application:** `src/App.tsx` and all current files under `src/components/`, `src/content/`, `src/animation/`, `src/hooks/`, `src/lib/`, `src/store/`, and `src/styles/`. These implement the currently rendered sections, navigation, interaction, modal, styling, and app initialization.
- **Identity artwork:** `src/assets/portrait.jpg`, imported by `src/content/profile.ts`.
- **Project artwork:** the four mapped files in the table above, imported by `src/content/projects.ts`.
- **Project source actions:** the `links` data in `src/content/projects.ts`, rendered in `Projects.tsx` and `ProjectDetailsModal.tsx`.
- **CV download:** `public/Vignesh_T_Resume.pdf`, referenced by `src/content/profile.ts`.
- **Fonts:** the three `@fontsource*` packages in `package.json`, imported in `src/styles/index.css`; font files are supplied by installed dependencies.
- **Production URL serving:** Vite's default `public/` handling serves the CV at `/Vignesh_T_Resume.pdf`; no custom router is used.
- **Git preparation:** `.git/` and `.gitignore` are preserved. `README.md` documents local development and validation commands.

## C. Files confirmed safe to delete

| Path | Reason / evidence | Classification |
| --- | --- | --- |
| `src/assets/projects/quantum-secure-communication.png` | No source/config/document reference by exact filename; a legacy 1524×704 teal 3D illustration, distinct from the active 512×512 logo. | Obsolete unused artwork |
| `src/assets/projects/rag-knowledge-assistant.png` | No source/config/document reference by exact filename; a legacy 1488×716 teal 3D illustration, distinct from the active 512×512 logo. | Obsolete unused artwork |
| `src/assets/projects/project-store.png` | No source/config/document reference by exact filename; a legacy 1488×716 teal 3D illustration, distinct from the active Project Store icon. | Obsolete unused artwork |
| `.claude/` | Empty at inspection (zero files recursively); not tracked and has no project references. | Empty local directory |

No other files are approved for deletion by this report.

### Existing removals observed before this report

The following tracked files were already absent from the working tree when inspection began and appeared as pending deletions in `git status`. They were not deleted by this cleanup. They belong to the old portrait/lattice/Three.js implementation; a source search found no current references, and the current dependency manifest does not include Three.js/R3F:

- `src/components/layout/Footer.tsx`
- `src/components/ui/CursorPortrait.tsx`
- `src/components/ui/PortraitSlot.tsx`
- `src/components/ui/SectionLabel.tsx`
- `src/hooks/useNearViewport.ts`
- `src/lib/cursorOffset.ts`
- `src/lib/designTokensThree.ts`
- `src/scene/HeadScene.tsx`
- `src/scene/ProjectScene.tsx`
- `src/scene/ProjectShowcase.tsx`
- `src/scene/StudioEnvironment.tsx`
- `src/scene/edgeTransform.ts`
- `src/scene/projectArtifacts.tsx`
- `src/scene/useArtifactMotion.ts`

## D. Files requiring caution

- `package.json` and `package-lock.json` — package/dependency contract; preserve and validate together.
- `src/`, all TypeScript/CSS/token files, and all current animations/hooks — runtime behavior and visual system.
- The four active project logos and `src/assets/portrait.jpg` — imported assets.
- `public/Vignesh_T_Resume.pdf` — required by the CV action.
- `vite.config.ts`, `eslint.config.js`, `tsconfig*.json`, `index.html` — required project configuration/entry point.
- `.git/` and `.gitignore` — repository history and exclusion policy.
- `CLAUDE.md` and `LATTICE Master Specification.md` — retained existing documentation. They are not runtime inputs, but this cleanup makes no decision to remove them.
- `src/assets/projects/project-store-logo.png`, `personal-portfolio-logo.jpg`, and `personal-portfolio.svg` — unreferenced alternate art with names that could imply project ownership. They are not in the deletion whitelist; retain unless the owner confirms they are obsolete.
- `node_modules/` and `dist/` — generated/ignored local dependency and build output. Retain for local validation; do not stage them.

## E. Proposed deletion list (whitelist)

Only these paths are authorized for removal by this cleanup:

1. `src/assets/projects/quantum-secure-communication.png`
2. `src/assets/projects/rag-knowledge-assistant.png`
3. `src/assets/projects/project-store.png`
4. `.claude/` (only if it remains empty)

No recursive deletion outside this exact whitelist is authorized. No source files, current logo assets, CV, configuration, lock files, Git files, or project data will be removed.

## Repository and project source destinations

- Portfolio remote: `https://github.com/vigneshrao1723-lab/Vignesh_T_Personal_Portfolio_Website`
- All four project “View Source” actions: `https://github.com/vigneshrao1723-lab/Project-store`

The portfolio remote and project-source destination are intentionally different.
