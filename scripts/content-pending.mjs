#!/usr/bin/env node
/**
 * Lista los marcadores [COMPLETAR] y [CONFIRMAR] pendientes en el contenido y
 * los datos del sitio, para no publicarlos sin querer.
 *
 *   npm run content:pending            → solo informa
 *   npm run content:pending -- --strict → termina con error si hay pendientes
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const TARGETS = ['content', 'src/data'];
const EXTENSIONS = new Set(['.mdx', '.md', '.ts', '.tsx']);
const MARKER = /\[(COMPLETAR|CONFIRMAR)[^\]]*\]/g;

async function* walk(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (EXTENSIONS.has(path.extname(entry.name))) yield full;
  }
}

let total = 0;
for (const target of TARGETS) {
  for await (const file of walk(path.join(ROOT, target))) {
    const lines = (await fs.readFile(file, 'utf8')).split(/\r?\n/);
    lines.forEach((line, index) => {
      const matches = line.match(MARKER);
      if (!matches) return;
      total += matches.length;
      const rel = path.relative(ROOT, file).replaceAll('\\', '/');
      console.log(`${rel}:${index + 1}  ${matches.join(' ')}`);
    });
  }
}

console.log(total === 0 ? '\nSin pendientes.' : `\n${total} pendiente(s).`);
if (total > 0 && process.argv.includes('--strict')) process.exit(1);
