## ADDED Requirements

### Requirement: Contexto y reglas OpenSpec configuradas
El archivo `openspec/config.yaml` SHALL definir el `context` del proyecto TodoSobreLaUNET (stack Astro 5, React 19, Tailwind CSS v4, idioma español en UI, estructura `src/data/` y `public/`) y reglas claras para la generación de artefactos (`proposal`, `tasks`).

#### Scenario: IA genera un nuevo cambio con OpenSpec
- **WHEN** un asistente lee `openspec/config.yaml` para crear una propuesta o lista de tareas
- **THEN** recibe el stack exacto, convenciones del repositorio y restricciones de formato sin tener que inferirlas del código

### Requirement: Reglas permanentes de desarrollo para la IA
El directorio `.agent/rules/` SHALL contener reglas concisas y accionables sobre arquitectura Astro/React, manejo de datos en `src/data/` con tipos en `src/types/`, uso de assets en `public/` con renderizado seguro de imágenes, y flujo de ramas Git.

#### Scenario: IA agrega o edita un proyecto o recurso de datos
- **WHEN** se modifica `src/data/proyectos.json` u otro archivo en `src/data/`
- **THEN** las reglas exigen mantener sincronizado `src/types/`, priorizar imágenes locales en `public/` y validar el JSON antes de commitear

#### Scenario: IA trabaja un feature o fix en el repositorio
- **WHEN** se inicia un nuevo cambio de código
- **THEN** las reglas indican crear una rama desde `develop` (`feature/*`, `fix/*`, `chore/*`), usar Conventional Commits y abrir PR hacia `develop`

### Requirement: Integración limpia en rama dedicada
Todos los archivos de OpenSpec (`.agent/`, `openspec/`) y las nuevas reglas SHALL quedar versionados en una rama dedicada creada desde `develop`, lista para fusionar mediante Pull Request.

#### Scenario: Revisión e integración del setup
- **WHEN** se completa la implementación del cambio
- **THEN** la rama `chore/openspec-ai-rules` contiene commits limpios, sin archivos temporales ni conflictos con `develop`
