// @ts-check
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Función para obtener rutas estáticas de las páginas
const getStaticRoutes = (dir) => {
  const entries = [{ url: "/", revision: uuidv4() }];
  const baseDir = path.join(process.cwd(), dir);

  fs.readdirSync(baseDir).forEach((file) => {
    if (file.endsWith(".html")) {
      const route =
        file === "index.html" ? "/" : `/detail/${file.replace(".html", "")}`;
      entries.push({ url: route, revision: uuidv4() });
    }
  });

  return entries;
};

// Función para obtener todos los archivos en subdirectorios de `public`, de forma recursiva
const getPublicAssets = (dir) => {
  const entries = [];
  const baseDir = path.join(process.cwd(), dir);

  const walkSync = (currentDir) => {
    fs.readdirSync(currentDir).forEach((file) => {
      const absolutePath = path.join(currentDir, file);

      if (fs.statSync(absolutePath).isDirectory()) {
        // Si es un directorio, se recurre para leer el contenido
        walkSync(absolutePath);
      } else if (currentDir !== baseDir && fs.statSync(absolutePath).isFile()) {
        // Si es un archivo, agregar su ruta relativa
        const relativePath = absolutePath
          .replace(baseDir, "")
          .replace(/\\/g, "/");
        entries.push({ url: `${relativePath}`, revision: uuidv4() });
      }
    });
  };

  walkSync(baseDir);
  return entries;
};

// Generar las rutas estáticas y los assets de `public`
const staticRoutes = getStaticRoutes(".next/server/app/detail");
const publicAssets = getPublicAssets("public");
const allEntries = [...staticRoutes, ...publicAssets];

// Guardar en `precacheRoutes.json`
const outputPath = path.join(process.cwd(), "precacheRoutes.json");
fs.writeFileSync(outputPath, JSON.stringify(allEntries, null, 2));
console.log(
  "Precache routes and all nested subdirectory assets generated successfully."
);
