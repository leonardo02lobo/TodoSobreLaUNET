## 1. Datos y tipos

- [x] 1.1 Crear `src/data/PruebasTecnicas.json` con 2-3 entradas de ejemplo (`id`, `titulo`, `materia`, `departamento`, `anio`, `tipo`, `archivo`, `extension`)
- [x] 1.2 Crear `src/types/PruebasTecnicas.ts` con la interfaz `PruebaTecnica` (siguiendo el patrón de `src/types/Proyectos.ts`)
- [x] 1.3 Crear `public/pruebas-tecnicas/` y añadir los archivos PDF de ejemplo correspondientes a las entradas de 1.1

## 2. Componente de búsqueda y grid

- [x] 2.1 Crear `src/components/PruebasTecnicasBuscador.jsx` (React, `client:load`): input de búsqueda + estado local, filtra por `titulo`/`materia`/`departamento` (case-insensitive, sin acentos si es sencillo de soportar)
- [x] 2.2 Renderizar el grid de tarjetas dentro del mismo componente (o un subcomponente `PruebaTecnicaCard`), mostrando título, materia, departamento, año y tipo
- [x] 2.3 Añadir estado vacío ("No se encontraron pruebas técnicas para tu búsqueda") cuando el filtro no arroja resultados
- [x] 2.4 Cada tarjeta enlaza a `/pruebas-tecnicas/<id>`

## 3. Páginas Astro

- [x] 3.1 Crear `src/pages/PruebasTecnicas.astro`: usa `Layout`, importa el manifiesto, monta `PruebasTecnicasBuscador` con `client:load` pasándole las entradas como prop
- [x] 3.2 Crear `src/pages/pruebas-tecnicas/[slug].astro` con `getStaticPaths` que itera `PruebasTecnicas.json` y genera `params: { slug: id }` + `props` con la entrada completa
- [x] 3.3 En `[slug].astro`, mostrar metadatos de la entrada y un enlace de descarga/visualización directo a `/pruebas-tecnicas/<archivo>`
- [x] 3.4 Verificar que una URL con `slug` inexistente cae en `404.astro` (comportamiento por defecto de Astro para rutas no generadas)

## 4. Navegación

- [x] 4.1 Añadir enlace "Pruebas Técnicas" en `src/components/Header.jsx` (desktop y menú móvil)

## 5. Validación y documentación

- [x] 5.1 Añadir una verificación (script simple o paso manual documentado) que confirme que cada `archivo` del manifiesto existe en `public/pruebas-tecnicas/`
- [x] 5.2 Documentar en `CLAUDE.md` el proceso de contribución: cómo añadir una nueva prueba técnica (archivo + entrada en el manifiesto)
- [x] 5.3 Confirmar explícitamente en la documentación que no existe endpoint de subida y por qué (referenciar `design.md`)

## 6. Verificación

- [x] 6.1 `npm run build` sin errores, confirmando que `getStaticPaths` genera una página por entrada del manifiesto
- [x] 6.2 Probar manualmente en `npm run dev`: carga del grid, búsqueda con y sin resultados, navegación a detalle, descarga del archivo, enlace desde el header en desktop y mobile
