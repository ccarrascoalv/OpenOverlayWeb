// Capturas de página completa a 375, 768 y 1440 px.
// Uso: npm run preview (en otra terminal) y luego `node scripts/capture.mjs [url] [carpeta]`.
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const url = process.argv[2] ?? 'http://127.0.0.1:4321/';
const out = process.argv[3] ?? 'test-results/screenshots';
const widths = [375, 768, 1440];

await mkdir(out, { recursive: true });
const browser = await chromium.launch();
for (const width of widths) {
  // Movimiento reducido: todo visible y estático, capturas deterministas.
  const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
  await page.route('https://api.github.com/**', (r) =>
    r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ tag_name: 'v0.12.0' }) }),
  );
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  await page.screenshot({ path: `${out}/full-${width}.png`, fullPage: true });
  await page.screenshot({ path: `${out}/top-${width}.png` });
  if (process.env.SECTIONS) {
    for (const id of ['features', 'widgets', 'panel', 'get-started', 'faq']) {
      await page.locator(`#${id}`).screenshot({ path: `${out}/${id}-${width}.png` });
    }
    await page.locator('footer').screenshot({ path: `${out}/footer-${width}.png` });
  }
  console.log(`${width}px  overflow-x: ${overflow}px`);
  await page.close();
}
await browser.close();
