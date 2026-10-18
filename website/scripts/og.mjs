// Genera public/og.png (inglés), public/og-es.png (español), ambas de 1200×630, y public/apple-touch-icon.png
// a partir del logo y la paleta.
// Uso: node scripts/og.mjs
import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const here = (p) => fileURLToPath(new URL(p, import.meta.url));
const tokens = await readFile(here('../src/styles/tokens.css'), 'utf8');
const logo = (await readFile(here('../src/assets/logo-512.png'))).toString('base64');
const spa = (await sharp(here('../src/assets/heroes/nogaro.jpg')).resize(1200).modulate({ saturation: 1.1, brightness: 0.85 }).jpeg({ quality: 80 }).toBuffer()).toString('base64');
const b64 = async (p) => (await readFile(p)).toString('base64');
const font = `data:font/woff2;base64,${await b64(here('../node_modules/@fontsource/barlow-semi-condensed/files/barlow-semi-condensed-latin-700-normal.woff2'))}`;
const font6 = `data:font/woff2;base64,${await b64(here('../node_modules/@fontsource/barlow-semi-condensed/files/barlow-semi-condensed-latin-600-normal.woff2'))}`;

const texts = {
  en: { file: 'og.png', lang: 'en', title: 'Telemetry overlay<br>for iRacing.', sub: 'Free and open source.', facts: 'Windows 10/11 · No account · 100% local' },
  es: { file: 'og-es.png', lang: 'es', title: 'Overlay de telemetría<br>para iRacing.', sub: 'Gratis y de código abierto.', facts: 'Windows 10/11 · Sin cuenta · 100 % local' },
};

const html = (t) => `<!doctype html><html lang="${t.lang}"><head><style>
${tokens}
@font-face { font-family: 'Barlow Semi Condensed'; font-weight: 700; src: url(${font}); }
@font-face { font-family: 'Barlow Semi Condensed'; font-weight: 600; src: url(${font6}); }
body { margin: 0; width: 1200px; height: 630px; overflow: hidden; background: var(--c-bg); font-family: var(--font-display); }
.bg { position: absolute; inset: 0; background: url(data:image/jpeg;base64,${spa}) 30% 55% / cover; }
.shade { position: absolute; inset: 0; background: linear-gradient(90deg, var(--c-bg) 30%, color-mix(in srgb, var(--c-bg) 55%, transparent) 100%); }
.c { position: absolute; left: 80px; top: 80px; right: 80px; display: grid; gap: 28px; }
img { width: 96px; height: 96px; border-radius: 20px; }
h1 { margin: 0; font-size: 76px; line-height: 0.98; color: var(--c-text); font-weight: 700; letter-spacing: -0.01em; }
h1 span { display: block; color: var(--c-text-2); font-weight: 600; }
p { margin: 0; display: flex; gap: 16px; align-items: center; font-size: 30px; font-weight: 600; color: var(--c-text-2); }
.pill { padding: 10px 22px; border-radius: 10px; background: var(--c-accent); color: var(--c-on-accent); }
.bar { position: absolute; left: 0; right: 0; bottom: 0; height: 8px; background: linear-gradient(90deg, var(--c-live) 0 62%, var(--c-warn) 62% 86%, var(--c-error) 86%); }
</style></head><body>
<div class="bg"></div><div class="shade"></div>
<div class="c">
  <img src="data:image/png;base64,${logo}" alt="">
  <h1>${t.title}<span>${t.sub}</span></h1>
  <p><span class="pill">OpenOverlay</span> ${t.facts}</p>
</div>
<div class="bar"></div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const t of Object.values(texts)) {
  await page.setContent(html(t), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const shot = await page.screenshot();
  await sharp(shot).png({ palette: true, quality: 90, compressionLevel: 9 }).toFile(here(`../public/${t.file}`));
}
await browser.close();

await sharp(here('../src/assets/logo-512.png')).resize(180, 180).png({ palette: true, compressionLevel: 9 }).toFile(here('../public/apple-touch-icon.png'));
console.log('OK: public/og.png, public/og-es.png y public/apple-touch-icon.png');
