import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(rootDir, "src/data/PruebasTecnicas.json");
const filesDir = path.join(rootDir, "public/pruebas-tecnicas");

const manifest = JSON.parse(await readFile(manifestPath, "utf-8"));

const seenIds = new Set();
const errors = [];

for (const prueba of manifest) {
    if (seenIds.has(prueba.id)) {
        errors.push(`id duplicado: "${prueba.id}"`);
    }
    seenIds.add(prueba.id);

    const filePath = path.join(filesDir, prueba.archivo);
    if (!existsSync(filePath)) {
        errors.push(
            `"${prueba.id}": archivo "${prueba.archivo}" no existe en public/pruebas-tecnicas/`,
        );
    }
}

if (errors.length > 0) {
    console.error("Validación de PruebasTecnicas.json falló:\n");
    for (const error of errors) {
        console.error(`  - ${error}`);
    }
    process.exit(1);
}

console.log(
    `PruebasTecnicas.json válido: ${manifest.length} entrada(s), todos los archivos presentes.`,
);
