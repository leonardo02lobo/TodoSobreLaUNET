# pruebas-tecnicas-catalog

## Purpose

Catálogo de pruebas técnicas (parciales, exámenes, quizzes) del sitio TodoSobreLaUNET: un manifiesto de datos versionado en el repositorio, una página índice con búsqueda y grid, y páginas de detalle generadas estáticamente por cada prueba, sin exponer ningún endpoint de subida en producción.

## Requirements

### Requirement: Manifiesto de pruebas técnicas
El sistema SHALL mantener un manifiesto de datos en `src/data/PruebasTecnicas.json` como única fuente de verdad para el catálogo. Cada entrada MUST incluir al menos: `id` (único, kebab-case), `titulo`, `materia`, `departamento`, `anio`, `tipo` (p. ej. "parcial", "examen", "quiz"), y `archivo` (ruta relativa del documento dentro de `public/pruebas-tecnicas/`).

#### Scenario: Entrada válida en el manifiesto
- **WHEN** se añade una entrada al manifiesto con `id`, `titulo`, `materia`, `departamento`, `anio`, `tipo` y `archivo` presentes
- **THEN** la página índice y la página de detalle correspondiente se generan sin errores en el build

#### Scenario: Entrada sin archivo asociado en `public/`
- **WHEN** el manifiesto referencia un `archivo` que no existe en `public/pruebas-tecnicas/`
- **THEN** el proceso de validación documentado (o el propio flujo de contribución) SHALL señalar la inconsistencia antes de publicar el cambio

### Requirement: Página índice con búsqueda y grid
El sistema SHALL exponer una página `PruebasTecnicas` que muestre todas las entradas del manifiesto en una cuadrícula (grid) de tarjetas, y una barra de búsqueda que filtre esas tarjetas en el cliente por título, materia, departamento o año, sin requerir una llamada de red.

#### Scenario: Carga inicial de la página
- **WHEN** un usuario visita la página de Pruebas Técnicas
- **THEN** el grid muestra una tarjeta por cada entrada del manifiesto, con título, materia, departamento, año y tipo visibles

#### Scenario: Búsqueda por texto
- **WHEN** el usuario escribe un término en la barra de búsqueda que coincide con el título, materia o departamento de una o más entradas
- **THEN** el grid se actualiza para mostrar únicamente las tarjetas cuyas entradas coinciden con el término, sin recargar la página

#### Scenario: Búsqueda sin resultados
- **WHEN** el término de búsqueda no coincide con ninguna entrada del manifiesto
- **THEN** el grid muestra un estado vacío indicando que no se encontraron pruebas técnicas para ese término

### Requirement: Página de detalle por prueba técnica
El sistema SHALL generar, en tiempo de build, una página de detalle por cada entrada del manifiesto usando rutas dinámicas de Astro (`getStaticPaths`), accesible en `/pruebas-tecnicas/<slug>`, donde `slug` se deriva del `id` de la entrada.

#### Scenario: Navegación desde el grid al detalle
- **WHEN** el usuario hace clic en una tarjeta del grid
- **THEN** es dirigido a la página de detalle de esa prueba técnica, mostrando sus metadatos y un enlace para ver/descargar el archivo

#### Scenario: Acceso directo a la URL de detalle
- **WHEN** el usuario navega directamente a `/pruebas-tecnicas/<slug>` de una entrada existente en el manifiesto
- **THEN** la página se sirve correctamente con los metadatos de esa entrada

#### Scenario: Slug inexistente
- **WHEN** el usuario navega a `/pruebas-tecnicas/<slug>` para un slug que no corresponde a ninguna entrada del manifiesto
- **THEN** el sitio responde con la página 404 existente del proyecto

### Requirement: Sin endpoint de subida en producción
El sistema SHALL NOT exponer un endpoint HTTP de subida de archivos en producción. La incorporación de nuevas pruebas técnicas SHALL realizarse añadiendo el archivo a `public/pruebas-tecnicas/` y su entrada correspondiente al manifiesto `src/data/PruebasTecnicas.json`, siguiendo el flujo de contribución del repositorio (commit/PR).

#### Scenario: Intento de subida vía formulario público
- **WHEN** un usuario del sitio busca una forma de subir una prueba técnica directamente desde el navegador
- **THEN** no existe tal funcionalidad; el sitio no expone ningún endpoint de escritura, y el catálogo solo refleja lo publicado en el manifiesto versionado en el repositorio
