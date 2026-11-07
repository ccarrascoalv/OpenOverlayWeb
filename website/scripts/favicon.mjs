// Genera public/favicon.ico (16–256 px, PNG embebidos) a partir de src/assets/logo-wheel.png: el volante
// del logo sin el aro de rayas exterior, que a tamaño de pestaña se ve como ruido.
// Uso: node scripts/favicon.mjs
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const here = (p) => fileURLToPath(new URL(p, import.meta.url));
const src = here('../src/assets/logo-wheel.png');
const sizes = [16, 32, 48, 64, 256];
const pngs = await Promise.all(
  sizes.map((s) => sharp(src).resize(s, s, { kernel: 'lanczos3' }).sharpen(s <= 32 ? { sigma: 0.6 } : undefined).png().toBuffer()),
);

// Cabecera ICO: 6 bytes + 16 por imagen; cada imagen es un PNG completo.
const head = Buffer.alloc(6 + 16 * sizes.length);
head.writeUInt16LE(0, 0);
head.writeUInt16LE(1, 2);
head.writeUInt16LE(sizes.length, 4);
let offset = head.length;
sizes.forEach((s, i) => {
  const e = 6 + i * 16;
  head.writeUInt8(s >= 256 ? 0 : s, e);
  head.writeUInt8(s >= 256 ? 0 : s, e + 1);
  head.writeUInt16LE(1, e + 4);
  head.writeUInt16LE(32, e + 6);
  head.writeUInt32LE(pngs[i].length, e + 8);
  head.writeUInt32LE(offset, e + 12);
  offset += pngs[i].length;
});
await writeFile(here('../public/favicon.ico'), Buffer.concat([head, ...pngs]));
console.log('OK: public/favicon.ico');
