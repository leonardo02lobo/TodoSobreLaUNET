# Flujo de Trabajo Git

## Ramas
- `main`: rama de producción estable. Nunca hagas commits directos a `main`.
- `develop`: rama de integración, sincronizada con `main`.
- Crea siempre una rama nueva desde `develop` para cada tarea:
  - `feature/<nombre>`: nuevas funcionalidades o contenido.
  - `fix/<nombre>`: corrección de bugs.
  - `chore/<nombre>`: configuración, dependencias, reglas o mantenimiento.
  - `docs/<nombre>`: documentación.

## Commits y Pull Requests
- Usa **Conventional Commits**: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`.
- Haz commits atómicos y descriptivos sin incluir archivos temporales o secretos.
- Abre los PRs hacia `develop` (y luego de `develop` hacia `main`), limpiando la rama de trabajo tras el merge.
