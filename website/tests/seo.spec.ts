import { expect, test } from '@playwright/test';
import { URLS } from '../src/config';

type Node = { '@type': string; [k: string]: unknown };

for (const [path, lang, og] of [
  ['/', 'en', 'og.png'],
  ['/es/', 'es', 'og-es.png'],
] as const) {
  test(`${path}: datos estructurados, título y Open Graph del idioma`, async ({ page }) => {
    await page.goto(path);
    const title = await page.title();
    expect(title.length, title).toBeLessThanOrEqual(60);
    const desc = (await page.locator('meta[name="description"]').getAttribute('content')) ?? '';
    expect(desc.length, desc).toBeLessThanOrEqual(160);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', new RegExp(`${og}$`));
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);

    const raw = await page.locator('script[type="application/ld+json"]').textContent();
    const graph = (JSON.parse(raw ?? '{}')['@graph'] ?? []) as Node[];
    const app = graph.find((n) => n['@type'] === 'SoftwareApplication')!;
    expect(app.downloadUrl).toBe(URLS.download);
    expect(app.operatingSystem).toContain('Windows');
    expect((app.offers as Node).price).toBe('0');
    const faq = graph.find((n) => n['@type'] === 'FAQPage')!;
    expect(faq.inLanguage).toBe(lang);
    // Las preguntas de los datos estructurados son las mismas que se ven en la página.
    const questions = (faq.mainEntity as Node[]).map((q) => q.name);
    for (const q of questions) await expect(page.getByText(q as string, { exact: true }).first()).toBeAttached();
  });
}

test('el sitemap lista las dos portadas con sus alternativas de idioma', async ({ request }) => {
  const res = await request.get('/sitemap.xml');
  expect(res.ok()).toBe(true);
  const xml = await res.text();
  expect(xml).toContain('<urlset');
  expect(xml.match(/<url>/g)).toHaveLength(2);
  expect(xml).toContain('hreflang="es"');
  expect(xml).toContain('hreflang="x-default"');
});

test('la 404 no se indexa y enlaza a las dos portadas', async ({ page }) => {
  await page.goto('/404.html');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.locator('.nf-links a')).toHaveCount(2);
});
