import { copyFile, mkdir } from "node:fs/promises";

const source = new URL("../", import.meta.url);
const output = new URL("dist/", source);
const files = [
  "index.html",
  "estilos.css",
  "galeria.js",
  "logo-spora.png",
  "transformacion.jpg",
  "innovacion.jpg",
  "iniciativas.jpg",
];

await mkdir(output, { recursive: true });
await Promise.all(files.map((file) => copyFile(new URL(file, source), new URL(file, output))));
