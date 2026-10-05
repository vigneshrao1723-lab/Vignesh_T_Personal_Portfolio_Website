# Vignesh T — Portfolio

A responsive personal portfolio presenting Vignesh's engineering experience, selected projects, and contact details.

## Built with

React, TypeScript, Vite, Tailwind CSS, GSAP, and Lenis.

## Features

- Responsive editorial layout with accessible navigation and reduced-motion support.
- Hanging digital identity card with pointer/touch drag and spring return.
- Project cards with supplied artwork and scroll-triggered movement.
- Keyboard-accessible project case-study dialogs.
- Contact form that prepares an email in the visitor's mail app.
- Downloadable CV.

## Project structure

- `src/components/` — layout, sections, shared UI, and project case-study dialog.
- `src/content/` — profile and project data, including source links.
- `src/animation/` — GSAP and scroll interaction hooks.
- `src/assets/` — portrait and project artwork.
- `src/styles/` — Tailwind entry point and design tokens.
- `public/` — static files, including the CV PDF.

## Run locally

```sh
npm ci
npm run dev
```

## Validate and build

```sh
npm run typecheck
npm run lint
npm run build
npm run preview
```

The production build is written to `dist/`.
