## Context

TodoSobreLaUNET es un sitio estático (Astro 5 `output: 'static'` por defecto — `astro.config.mjs` no declara ningún adapter). No hay backend, base de datos, ni almacenamiento persistente, y el contenido existente ya sigue el patrón "JSON en `src/data/` + página/componente que lo consume" (`Departamentos.json`, `Pensum.json`, `proyectos.json`). Esta propuesta extiende ese mismo patrón a las pruebas técnicas en lugar de introducir infraestructura nueva.

El pedido original incluía un endpoint HTTP de subida con una llave en el body como mecanismo de autenticación. Se descarta por incompatibilidad con la arquitectura, no por preferencia:
- Sin adapter (`@astrojs/node`, `@astrojs/vercel`, etc.) Astro no ejecuta endpoints de servidor en producción — solo build estático.
- Aun con un adapter, el hosting típico de un sitio estático (Vercel/Netlify/GitHub Pages) usa funciones serverless efímeras: escribir en `public/` en tiempo de ejecución no persiste entre invocaciones ni sobrevive al siguiente deploy.
- Una llave fija en el body como único mecanismo de autenticación es además un patrón débil (CWE-798-like: secreto compartido sin rotación, expuesto a fuerza bruta si no hay rate limiting) — no se buscó reforzarlo, sino evitar la superficie de ataque introduciendo cero endpoints nuevos.

## Goals / Non-Goals

**Goals:**
- Apartado navegable "Pruebas Técnicas" con búsqueda (título/materia/departamento/año) y grid de resultados.
- Página de detalle por prueba técnica generada estáticamente (`getStaticPaths`), enlazando al PDF o mostrando el texto.
- Manifiesto de datos (`src/data/PruebasTecnicas.json`) como única fuente de verdad, consistente con el resto del sitio.
- Proceso de contribución documentado y simple (editar JSON + añadir archivo a `public/`) para que agregar una prueba técnica no requiera tocar código de página.

**Non-Goals:**
- Endpoint HTTP de subida en producción (requiere SSR + adapter + almacenamiento persistente — fuera de alcance; ver Open Questions).
- Autenticación de usuarios, roles o moderación de contenido subido por terceros.
- Búsqueda full-text dentro del contenido de los PDFs (la búsqueda opera sobre metadatos del manifiesto, no sobre el texto del documento).
- Edición o borrado de pruebas técnicas desde el navegador.

## Decisions

**1. Manifiesto JSON estático en vez de endpoint de subida.**
`src/data/PruebasTecnicas.json` es un array de objetos `{ id, titulo, materia, departamento, anio, tipo, archivo, extension }`, donde `archivo` es la ruta relativa dentro de `public/pruebas-tecnicas/`. Se elige JSON (no una carpeta escaneada en build) porque Astro no permite listar `public/` en tiempo de build de forma nativa sin Node `fs`, y el JSON ya es el patrón establecido en `src/data/` — mantiene consistencia y permite metadatos (materia, año) que el nombre de archivo por sí solo no expresaría con fiabilidad.
*Alternativa descartada:* escanear `public/pruebas-tecnicas/` con `fs.readdirSync` en build. Se descarta porque perdería los metadatos (materia, departamento, año, tipo) necesarios para la búsqueda — el nombre de archivo no es una fuente confiable para eso.

**2. Rutas dinámicas Astro con `getStaticPaths`, no una ruta de servidor.**
`src/pages/pruebas-tecnicas/[slug].astro` genera una página HTML por entrada del manifiesto en build (`getStaticPaths` iterando `PruebasTecnicas.json`), igual que podría hacerse con `Pensum` o `Proyectos`. `slug` se deriva del `id` del manifiesto (kebab-case, único). Consistente con "no hay SSR" y evita cualquier endpoint nuevo.

**3. Búsqueda y grid en un componente React (`client:*`), filtrando en memoria.**
El manifiesto es pequeño (decenas/cientos de entradas, no miles), así que filtrar en el cliente sobre el array ya cargado es suficiente — no se requiere un índice de búsqueda ni llamadas de red. Sigue el patrón existente del repo (interactividad = React con `client:*`, contenido estático = `.astro`), igual que `Carrucel.jsx` o `PlanEstudios.jsx`.

**4. Proceso de contribución manual (reemplaza el endpoint de subida).**
Añadir una prueba técnica es: (a) colocar el PDF en `public/pruebas-tecnicas/<archivo>.pdf`, (b) añadir la entrada correspondiente en `PruebasTecnicas.json`, (c) commit + deploy. Se documenta este flujo en `tasks.md` y, opcionalmente, en `CLAUDE.md`. No se construye un script CLI de "subida" en esta iteración porque el manifiesto es pequeño y editarlo a mano es directo; si el volumen crece, es un cambio incremental futuro (ver Open Questions), no un bloqueante de esta propuesta.

**5. Enlace de descarga directo, sin proxy.**
El detalle de cada prueba técnica enlaza directamente al archivo servido desde `public/` (`/pruebas-tecnicas/<archivo>.pdf`) — no hay endpoint intermedio que sirva el archivo, evitando cualquier superficie de servidor nueva.

## Risks / Trade-offs

- **[Riesgo] El manifiesto puede desincronizarse del contenido real de `public/pruebas-tecnicas/`** (entrada en el JSON sin archivo, o archivo sin entrada) → **Mitigación:** un script de validación simple en build/dev (o un paso manual en `tasks.md`) que verifique que cada `archivo` del JSON exista en `public/pruebas-tecnicas/`; documentado como parte del proceso de contribución.
- **[Riesgo] Cualquier persona con acceso de escritura al repo puede añadir/reemplazar archivos** (no hay control de acceso más allá de git) → **Mitigación:** aceptable para el alcance actual (mismo nivel de confianza que el resto del contenido del sitio, todo versionado en git con historial); si se requiere una vía de contribución para no-colaboradores, la ruta natural es un PR de GitHub, no un endpoint público.
- **[Riesgo] Archivos grandes en `public/` incrementan el tamaño del repo y del build** → **Mitigación:** recomendar PDFs comprimidos y documentar un límite orientativo de tamaño por archivo en `tasks.md`.
- **[Trade-off] Sin búsqueda full-text del contenido del PDF** → aceptado: la búsqueda por metadatos (materia/año/departamento/título) cubre el caso de uso principal ("quiero las pruebas de tal materia"); full-text requeriría indexación adicional, fuera de alcance.

## Migration Plan

No hay datos existentes que migrar (funcionalidad nueva). Pasos de despliegue:
1. Añadir `src/data/PruebasTecnicas.json` (puede iniciar vacío `[]` o con 1-2 entradas de ejemplo).
2. Crear `public/pruebas-tecnicas/` y colocar los archivos iniciales.
3. Añadir página índice, ruta dinámica de detalle, componente de búsqueda y tipos.
4. Enlazar el nuevo apartado desde `Header.jsx`.
5. `npm run build` para verificar que `getStaticPaths` genera una página por entrada sin errores.
Rollback: revertir el commit — no hay estado de servidor ni migraciones de datos que deshacer.

## Open Questions

- ¿El volumen esperado de pruebas técnicas justifica, a futuro, invertir en SSR + almacenamiento (p. ej. Vercel Blob) para habilitar subida real por parte de los estudiantes? No se resuelve en este cambio; el manifiesto JSON es la base sobre la que esa migración futura podría construirse sin romper la estructura de datos.
- ¿Se requiere un formulario "sugerir una prueba técnica" que abra un PR o un formulario externo (Google Forms) en vez de subida directa? No incluido en esta iteración; el proceso de contribución vía git es el punto de partida.
