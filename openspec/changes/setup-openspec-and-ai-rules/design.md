## Context

El repositorio `TodoSobreLaUNET` usa Astro 5, React 19 y Tailwind CSS v4. Actualmente `develop` y `main` están sincronizados en `ddd587d` y contienen la estructura base generada por `openspec init --tools antigravity` (`.agent/skills/`, `.agent/workflows/`, `openspec/config.yaml`) como archivos sin seguimiento.

## Goals / Non-Goals

**Goals:**
- Aislar la configuración de OpenSpec y las reglas para IA en una rama dedicada (`chore/openspec-ai-rules`) partiendo de `develop`.
- Definir reglas claras y breves en `.agent/rules/` para evitar regresiones ya vistas (URLs externas rotas en `proyectos.json`, contenedores de imagen sin relación de aspecto, tipos desincronizados, commits directos a `main`).
- Configurar `openspec/config.yaml` con `context` y `rules` adaptados al proyecto.

**Non-Goals:**
- No modificar páginas ni componentes de la aplicación (`src/pages/`, `src/components/`).
- No instalar dependencias nuevas de npm ni alterar `package.json`.

## Decisions

1. **Separación en dos capas de reglas**:
   - `openspec/config.yaml`: contexto del proyecto y reglas de artefactos OpenSpec (`proposal`, `tasks`).
   - `.agent/rules/project-conventions.md` y `.agent/rules/git-workflow.md`: reglas operativas cortas para cualquier tarea de código o Git en Antigravity.
   - *Alternativa descartada*: poner todo en un solo archivo gigante o duplicar en `AGENTS.md`/`GEMINI.md`, ya que aumenta el ruido de contexto y dificulta el mantenimiento.

2. **Rama `chore/openspec-ai-rules` desde `develop`**:
   - Mantiene `develop` limpio hasta que los cambios pasen por revisión/PR hacia `develop` (y luego `main`), alineándose con la propia regla de flujo Git que estamos estableciendo.

## Risks / Trade-offs

- **Reglas demasiado extensas consumen contexto**: Mantener cada archivo en `.agent/rules/` breve y directo (viñetas concretas, sin prosa innecesaria).
- **`node_modules` puede no estar instalado en entornos efímeros**: Las reglas de verificación deben indicar ejecutar `npm run build` cuando las dependencias estén instaladas, y validar sintaxis JSON/JS con Node como verificación mínima garantizada.
