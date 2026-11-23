## 1. Preparación de rama Git

- [x] 1.1 Crear y cambiar a la rama `chore/openspec-ai-rules` desde `develop`

## 2. Configuración de OpenSpec

- [x] 2.1 Actualizar `openspec/config.yaml` con `context` del proyecto (Astro 5, React 19, Tailwind v4, idioma español en UI, estructura `src/data/` y `public/`) y `rules` para `proposal` y `tasks`

## 3. Reglas permanentes para la IA

- [x] 3.1 Crear `.agent/rules/project-conventions.md` con reglas de arquitectura Astro/React, sincronización `src/data/` ↔ `src/types/`, manejo seguro de imágenes (`public/`, `aspect-*`, `onError`) y validaciones
- [x] 3.2 Crear `.agent/rules/git-workflow.md` con flujo de ramas (`develop` → `feature/*` / `fix/*` / `chore/*` → PR a `develop` → PR a `main`) y Conventional Commits

## 4. Verificación e integración

- [x] 4.1 Verificar estructura de `openspec/` y `.agent/rules/` y validar los JSON de `src/data/`
- [x] 4.2 Hacer commit de `.agent/`, `openspec/` y las nuevas reglas en `chore/openspec-ai-rules`, pushear y crear el PR hacia `develop`
