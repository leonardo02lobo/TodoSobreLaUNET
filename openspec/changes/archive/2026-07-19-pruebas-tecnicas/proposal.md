## Why

Los estudiantes de UNET comparten pruebas técnicas (exámenes, parciales) en PDF o texto de forma dispersa (grupos de WhatsApp, Drive personales). El sitio no tiene un lugar centralizado para buscarlas y consultarlas, a pesar de que ya centraliza otra información institucional (departamentos, pensum, becas). Un apartado dedicado con búsqueda y navegación resolvería esa dispersión.

Se evaluó un endpoint HTTP de subida (`POST` con archivo + llave en el body) y **no es viable con la arquitectura actual**: `astro.config.mjs` no declara ningún adapter (`output` es `static` por defecto), el proyecto no tiene backend, base de datos, ni almacenamiento persistente (confirmado en `CLAUDE.md` y en el build actual). Un endpoint de subida requeriría SSR + un adapter de servidor + almacenamiento persistente (las funciones serverless típicas no persisten escritura en `public/` entre invocaciones ni entre despliegues), lo cual es una pieza de infraestructura nueva y desproporcionada para el alcance pedido. Se sigue la alternativa que el propio usuario autorizó: un manifiesto JSON con las rutas de los archivos en `public/`.

## What Changes

- Nuevo apartado "Pruebas Técnicas" enlazado desde el header, con:
  - Página índice (`src/pages/PruebasTecnicas.astro`) con barra de búsqueda (cliente, React) y grid de tarjetas (materia, tipo, año, departamento).
  - Rutas dinámicas Astro (`src/pages/pruebas-tecnicas/[slug].astro`, `getStaticPaths`) para el detalle/descarga de cada prueba técnica.
  - Filtrado/búsqueda en el cliente sobre el manifiesto (por título, materia, departamento, año) — sin llamada a servidor.
- Nuevo manifiesto de datos `src/data/PruebasTecnicas.json`, con un objeto por prueba técnica: id, título, materia, departamento, año, tipo (parcial/examen/quiz), ruta del archivo (relativa a `public/`), y metadatos opcionales.
- Los archivos (PDF) se ubican en `public/pruebas-tecnicas/<archivo>.pdf` y se registran manualmente en el manifiesto — no hay endpoint de subida ni base de datos.
- **No incluido / explícitamente descartado:** endpoint HTTP de subida autenticado por llave en el body. Ver `design.md` para el proceso de contribución que lo reemplaza (edición manual del manifiesto + PR) y las condiciones bajo las que se podría reconsiderar un endpoint real.

## Capabilities

### New Capabilities
- `pruebas-tecnicas-catalog`: apartado del sitio que expone un catálogo buscable de pruebas técnicas (PDF/texto), con página índice (búsqueda + grid) y páginas de detalle generadas dinámicamente por Astro a partir de un manifiesto JSON en `src/data/` y archivos servidos desde `public/`.

### Modified Capabilities
(ninguna — no existen specs previas en `openspec/specs/`; este es el primer capability formal del proyecto)

## Impact

- **Nuevos archivos:** `src/pages/PruebasTecnicas.astro`, `src/pages/pruebas-tecnicas/[slug].astro`, `src/data/PruebasTecnicas.json`, `src/types/PruebasTecnicas.ts`, componente(s) React para búsqueda/grid (p.ej. `src/components/PruebasTecnicasBuscador.jsx`), directorio `public/pruebas-tecnicas/`.
- **Archivos modificados:** `src/components/Header.jsx` (nuevo enlace de navegación), posiblemente `CLAUDE.md` (documentar la nueva convención de datos).
- **Sin impacto en:** backend/API (no existe ninguno y esta propuesta no lo introduce), dependencias de build, CI/CD.
- **Proceso operativo nuevo:** añadir una prueba técnica pasa a ser: colocar el archivo en `public/pruebas-tecnicas/`, añadir su entrada en `src/data/PruebasTecnicas.json`, y desplegar — documentado en `design.md`.
