# Convenciones del Proyecto (TodoSobreLaUNET)

## Stack y Arquitectura
- **Astro 5 + Tailwind CSS v4**: Usa componentes `.astro` para contenido estático y layout (`src/layout/Layout.astro`).
- **React 19**: Usa `.jsx` con `client:load` únicamente cuando el componente requiera estado o interactividad en el cliente (por ejemplo `Carrucel.jsx`, `Header.jsx`, `PlanEstudios.jsx`).
- **Idioma**: Todos los textos visibles al usuario (UI, `alt`, mensajes de error) deben estar en español.

## Datos y Tipado (`src/data/` y `src/types/`)
- Al agregar o modificar campos en `src/data/*.json` (como `proyectos.json`), actualiza también su interfaz correspondiente en `src/types/` (por ejemplo `src/types/Proyectos.ts`).
- Valida la sintaxis de todos los JSON modificados antes de hacer commit (`node -e "JSON.parse(...)"`).

## Imágenes y Assets (`public/`)
- Guarda las imágenes del proyecto localmente en `public/` (preferiblemente `.webp` o `.png`) en lugar de depender de URLs externas que puedan expirar o devolver 404.
- En carruseles y tarjetas de vista previa, usa contenedores con relación de aspecto fija (por ejemplo `aspect-video`), `object-contain` para evitar recortes en capturas, `key` único por imagen al cambiar de elemento y manejo de `onError` con fallback visual.
- El logo y favicon principal de la página es `/gceii.webp`.

## Verificación
- Antes de abrir un PR, ejecuta `npm run build` (si `node_modules` está instalado) o al menos valida los JSON y revisa `git diff`.
