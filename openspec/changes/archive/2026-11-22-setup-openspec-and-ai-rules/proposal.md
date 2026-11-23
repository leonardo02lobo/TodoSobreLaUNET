## Why

El repositorio ya tiene inicializado OpenSpec (`openspec/` y `.agent/`), pero estos archivos aún están sin seguimiento en `develop` y carecen de contexto y reglas del proyecto. Sin reglas explícitas, cada sesión con IA puede divergir en convenciones de ramas, manejo de imágenes/assets, tipado de datos en `src/data/` y uso de Astro vs React.

## What Changes

- Crear una rama dedicada (`chore/openspec-ai-rules`) desde `develop` para integrar de forma ordenada la instalación de OpenSpec y las reglas de trabajo de la IA.
- Completar `openspec/config.yaml` con el contexto del proyecto (`TodoSobreLaUNET` — Astro 5, React 19, Tailwind CSS v4) y reglas por artefacto (`proposal`, `specs`, `design`, `tasks`).
- Crear reglas permanentes del repositorio en `.agent/rules/` cubriendo:
  - Arquitectura y stack (Astro estático vs islas React `client:load`, estilos Tailwind v4).
  - Gestión de datos y assets (`src/data/*.json` sincronizado con `src/types/`, imágenes locales en `public/`, contenedores con proporción fija y fallback `onError`).
  - Flujo Git y calidad (ramas desde `develop` con PR a `develop` / `main`, Conventional Commits, validación de JSON y build antes de mergear).
- Preparar el PR hacia `develop` para fusionar toda la configuración.

## Capabilities

### New Capabilities
- `ai-governance`: Conjunto de reglas de proyecto en `.agent/rules/` y contexto OpenSpec en `openspec/config.yaml` que estandarizan cómo la IA planifica, implementa, valida y versiona cambios en TodoSobreLaUNET.

### Modified Capabilities
- Ninguna (no se modifican specs funcionales existentes de la aplicación).

## Impact

- Archivos afectados: `openspec/config.yaml`, `.agent/rules/*.md`, más la integración de `.agent/` y `openspec/` ya generados por `openspec init`.
- Flujo de trabajo: Todo cambio futuro asistido por IA seguirá un flujo consistente de ramas, validación de datos/imágenes y documentación OpenSpec.
- Sin impacto en runtime ni en el bundle de producción de Astro.
