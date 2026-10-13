// Comprueba que no hay colores literales (hex, rgb, hsl) fuera de src/styles/tokens.css.
// Los SVG de banderas y logos son recursos gráficos, no estilos de la web, y se excluyen.
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root = new URL('../src/', import.meta.url).pathname.replace(/^\/(\w:)/, '$1');
const allowed = new Set(['styles/tokens.css']);
const exts = ['.astro', '.css', '.ts', '.js', '.mjs'];
const pattern = /#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(/g;

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (exts.some((x) => e.name.endsWith(x))) yield p;
  }
}

let bad = 0;
for await (const file of walk(root)) {
  const rel = relative(root, file).replaceAll('\\', '/');
  if (allowed.has(rel)) continue;
  const lines = (await readFile(file, 'utf8')).split('\n');
  lines.forEach((line, i) => {
    for (const m of line.matchAll(pattern)) {
      console.log(`${rel}:${i + 1}  ${m[0]}  →  ${line.trim()}`);
      bad++;
    }
  });
}

if (bad) {
  console.error(`\n${bad} color(es) fuera de la paleta.`);
  process.exit(1);
}
console.log('OK: todos los colores salen de las variables de src/styles/tokens.css');
