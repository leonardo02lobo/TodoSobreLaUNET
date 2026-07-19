# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TodoSobreLaUNET is an informational static website (in Spanish) about the UNET university (Universidad Nacional Experimental del Táchira): departments, study plan (pensum), scholarships, events, projects, and study regulations.

Stack: Astro 5 + React 19 (via `@astrojs/react`) + Tailwind CSS 4 (via the `@tailwindcss/vite` plugin, configured in `astro.config.mjs` — there is no `tailwind.config` file; global styles and the Tailwind import live in `src/styles/global.css`). TypeScript uses Astro's `strict` tsconfig with React JSX.

## Commands

```sh
npm install        # install dependencies
npm run dev        # dev server at localhost:4321
npm run build      # production build to ./dist/
npm run preview    # preview the production build
npm run astro ...  # Astro CLI (e.g. npm run astro -- check)
npm run validate:pruebas-tecnicas  # check src/data/PruebasTecnicas.json against public/pruebas-tecnicas/
```

There are no tests and no linter configured.

## Architecture

- **File-based routing**: each `.astro` file in `src/pages/` is a route (`index.astro`, `Departamentos.astro`, `Pensum.astro`, `Proyectos.astro`, `Eventos.astro`, `BecaFrancia.astro`, `BecaAndCorreo.astro`, `NormasDeEstudio.astro`, `AcercaDe.astro`, `404.astro`). Route names are in Spanish and PascalCase — keep that convention for new pages.
- **Single layout**: `src/layout/Layout.astro` (note: `layout/`, singular, not `layouts/`) wraps every page. It imports `global.css`, the `Header` (React) and `Footer` (Astro), and enables `ViewTransitions` from `astro:transitions`.
- **Content as JSON**: page content lives in `src/data/` (`Departamentos.json`, `Pensum.json`, `proyectos.json`, `Documento.json`) and is imported directly by pages/components. To change site content, edit these JSON files rather than the markup.
- **Mixed components in `src/components/`**: static/presentational pieces are `.astro` (Footer, Main, Button, CardInformation, BenefitsLetter…); anything interactive is a React `.jsx` component (Header with mobile menu, Carrucel, Card, PlanEstudios, HeaderSection) and must be given a `client:*` directive when used from an `.astro` file to hydrate.
- **Types**: shared TypeScript interfaces (for proyectos and pruebas técnicas) are in `src/types/`.
- Static assets (logos, images, favicon) go in `public/`.

## Pruebas Técnicas

The "Pruebas Técnicas" section (`src/pages/PruebasTecnicas.astro` + `src/pages/pruebas-tecnicas/[slug].astro`) is a searchable catalog of shared exams/quizzes (PDF or text). It follows the same static-content pattern as the rest of the site — no upload endpoint, no backend:

- **To add a technical test**: (1) drop the file in `public/pruebas-tecnicas/<archivo>`, (2) add a matching entry to `src/data/PruebasTecnicas.json` (`id`, `titulo`, `materia`, `departamento`, `anio`, `tipo`, `archivo`, `extension`), (3) run `npm run validate:pruebas-tecnicas` to confirm the entry and file are in sync, (4) commit/deploy.
- **Why no upload endpoint**: the site builds with `output: 'static'` (no adapter in `astro.config.mjs`) and has no backend, database, or persistent storage. A real upload endpoint would need SSR + a server adapter + persistent/object storage — infrastructure this project doesn't have. See `openspec/changes/pruebas-tecnicas/design.md` for the full rationale and the conditions under which that could be revisited.
- Detail pages are generated at build time via `getStaticPaths`; a slug with no matching manifest entry falls through to `404.astro`.

## OpenSpec

The repo uses OpenSpec (`openspec/`, config `openspec/config.yaml`, schema `spec-driven`) for spec-driven change management, with the `/opsx:*` commands available in `.claude/commands/opsx/` (propose, apply, sync, archive, explore, update). Use these skills when planning or implementing non-trivial changes.

## Git

- Main branch: `main`; a `develop` branch is used for feature work and merged into `main`.
- Commit messages follow a loose conventional style (e.g. `feat: ...`).
