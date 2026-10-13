import { expect, test, type Page } from '@playwright/test';
import { URLS } from '../src/config';

const API = 'https://api.github.com/repos/andreuservera/OpenOverlay/releases/**';

/** Simula la API de GitHub para no depender de la red ni del límite de peticiones. */
async function mockApi(page: Page, status: number, body: object = { tag_name: 'v1.0.0' }) {
  await page.route(API, (route) =>
    route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) }),
  );
}

/** URLs externas permitidas: las de LANDING-PAGE.md (§3 y §10). */
const ALLOWED_EXTERNAL = new Set([
  'https://github.com/andreuservera/OpenOverlay',
  'https://github.com/andreuservera/OpenOverlay/releases/latest/download/OpenOverlay-win-Setup.exe',
  'https://github.com/andreuservera/OpenOverlay/releases/latest',
  'https://github.com/andreuservera/OpenOverlay/releases',
  'https://github.com/andreuservera/OpenOverlay/issues',
  // CONTRIBUTING.md y la licencia MIT del repositorio (§10)
  'https://github.com/andreuservera/OpenOverlay/blob/HEAD/CONTRIBUTING.md',
  'https://github.com/andreuservera/OpenOverlay/blob/HEAD/LICENSE',
]);

test.describe('Diseño responsive', () => {
  for (const [path, width] of ['/', '/es/'].flatMap((p) => [375, 768, 1440].map((w) => [p, w] as const))) {
    test(`${path} a ${width}px: sin scroll horizontal y captura`, async ({ page }, info) => {
      await mockApi(page, 200);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBe(0);
      // Ningún elemento visible se sale por la derecha del viewport.
      const offenders = await page.evaluate(() =>
        [...document.querySelectorAll('body *')]
          .filter((el) => {
            const r = el.getBoundingClientRect();
            const clipped = el.closest('.ts, .shot, .wf-panel');
            return !clipped && r.width > 0 && r.right > window.innerWidth + 1;
          })
          .map((el) => `${el.tagName}.${el.className}`),
      );
      expect(offenders).toEqual([]);
      await page.screenshot({ path: info.outputPath(`landing-${path === '/' ? 'en' : 'es'}-${width}.png`), fullPage: true });
    });
  }
});

test('cero errores en la consola', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(e.message));
  await mockApi(page, 200);
  await page.goto('/');
  // Recorre la página para disparar las animaciones de entrada y la carga diferida.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
  });
  await page.waitForTimeout(1500);
  expect(errors).toEqual([]);
});

test('anclas internas: todas tienen destino y navegan', async ({ page }) => {
  await mockApi(page, 200);
  await page.goto('/');
  const hrefs = await page.$$eval('a[href^="#"]', (as) => [...new Set(as.map((a) => a.getAttribute('href')!))]);
  expect(hrefs.length).toBeGreaterThan(3);
  for (const href of hrefs) {
    await expect(page.locator(href), `destino de ${href}`).toHaveCount(1);
  }
  for (const href of ['#widgets', '#get-started', '#faq']) {
    await page.locator(`header nav a[href="${href}"]`).click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
    await expect(page.locator(href)).toBeInViewport();
  }
});

test('enlaces externos apuntan a las URLs de LANDING-PAGE.md', async ({ page }) => {
  await mockApi(page, 200);
  await page.goto('/');
  const external = await page.$$eval('a[href^="http"]', (as) => as.map((a) => (a as HTMLAnchorElement).href));
  expect(external.length).toBeGreaterThan(0);
  for (const url of external) expect(ALLOWED_EXTERNAL, url).toContain(url);
  // El CTA principal es el enlace directo al instalador.
  await expect(page.locator('.hero [data-dl-link]')).toHaveAttribute('href', URLS.download);
});

test.describe('FAQ en acordeón', () => {
  test('se abre y se cierra con el ratón', async ({ page }) => {
    await mockApi(page, 200);
    await page.goto('/#faq');
    const item = page.locator('#faq details').first();
    const answer = item.locator('.qa-a');
    await expect(answer).toBeHidden();
    await item.locator('summary').click();
    await expect(item).toHaveAttribute('open', '');
    await expect(answer).toBeVisible();
    await item.locator('summary').click();
    await expect(item).not.toHaveAttribute('open', '');
    await expect(answer).toBeHidden();
  });

  test('se abre y se cierra con el teclado', async ({ page }) => {
    await mockApi(page, 200);
    await page.goto('/#faq');
    const item = page.locator('#faq details').nth(1);
    const summary = item.locator('summary');
    await summary.focus();
    await expect(summary).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(item).toHaveAttribute('open', '');
    await expect(item.locator('.qa-a')).toBeVisible();
    await page.keyboard.press('Space');
    await expect(item).not.toHaveAttribute('open', '');
    // El foco sigue en la pregunta y Tab lleva a la siguiente.
    await page.keyboard.press('Tab');
    await expect(page.locator('#faq details').nth(2).locator('summary')).toBeFocused();
  });
});

test('con prefers-reduced-motion no hay animaciones', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await mockApi(page, 200);
  await page.goto('/');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  await page.waitForTimeout(300);
  const state = await page.evaluate(() => {
    const running = document.getAnimations().filter((a) => a.playState === 'running').length;
    const revealHidden = [...document.querySelectorAll('[data-reveal]')].filter(
      (el) => getComputedStyle(el).opacity !== '1',
    ).length;
    const withTransition = [...document.querySelectorAll('*')].filter((el) => {
      const s = getComputedStyle(el);
      return parseFloat(s.transitionDuration) > 0 || (s.animationName !== 'none' && parseFloat(s.animationDuration) > 0);
    }).length;
    return { running, revealHidden, withTransition };
  });
  expect(state).toEqual({ running: 0, revealHidden: 0, withTransition: 0 });
  // Los datos de los mockups no cambian.
  const gaps = () => page.$$eval('[data-gap-out]', (els) => els.map((e) => e.textContent));
  const before = await gaps();
  await page.waitForTimeout(2500);
  expect(await gaps()).toEqual(before);
});

test.describe('Descarga según la API de GitHub', () => {
  test('no se muestra ningún número de versión', async ({ page }) => {
    await mockApi(page, 200);
    await page.goto('/');
    await expect(page.locator('[data-version]')).toHaveCount(0);
    await expect(page.locator('main')).not.toContainText(/\bv?\d+\.\d+\.\d+\b/);
  });

  for (const status of [500, 403]) {
    test(`si la API falla (${status}), el CTA sigue descargando el instalador`, async ({ page }) => {
      await mockApi(page, status, { message: 'error' });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      for (const a of await page.locator('[data-dl-link]').all()) {
        await expect(a).toHaveAttribute('href', URLS.download);
      }
    });
  }

  for (const [path, label] of [['/', 'Coming soon'], ['/es/', 'Próximamente']]) {
    test(`${path}: si no hay ninguna release (404), el CTA dice "${label}" y no lleva a un 404`, async ({ page }) => {
      await mockApi(page, 404, { message: 'Not Found' });
      await page.goto(path);
      const cta = page.locator('.hero [data-dl-link]');
      await expect(cta).toContainText(label);
      await expect(cta).toHaveAttribute('href', URLS.releases);
      for (const a of await page.locator('[data-dl-link]').all()) {
        await expect(a).not.toHaveAttribute('href', URLS.download);
      }
    });
  }
});

test('selector de idioma: inglés por defecto y cambio a español y vuelta', async ({ page }) => {
  await mockApi(page, 200);
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('h1')).toContainText('Telemetry overlay for iRacing.');
  await page.locator('a[data-lang-link][hreflang="es"]').click();
  await expect(page).toHaveURL(/\/es\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.locator('h1')).toContainText('Overlay de telemetría para iRacing.');
  await expect(page.locator('a[data-lang-link][hreflang="es"]')).toHaveAttribute('aria-current', 'page');
  // Conserva la sección al cambiar de idioma.
  await page.goto('/es/#faq');
  await page.locator('a[data-lang-link][hreflang="en"]').click();
  await expect(page).toHaveURL(/:4321\/#faq$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('el paso 3 es "Abre tus widgets" y no hay presets', async ({ page }) => {
  await mockApi(page, 200);
  await page.goto('/es/');
  const steps = page.locator('#get-started .step h3');
  await expect(steps.nth(2)).toHaveText('Abre tus widgets');
  await page.goto('/');
  await expect(steps.nth(2)).toHaveText('Open your widgets');
  await expect(page.locator('#get-started')).not.toContainText(/preset/i);
});

test('el aviso legal aparece literal en el pie (español, LANDING-PAGE.md §10)', async ({ page }) => {
  await mockApi(page, 200);
  await page.goto('/es/');
  await expect(page.locator('footer')).toContainText(
    'OpenOverlay es una herramienta no oficial hecha por aficionados y no está afiliada ni respaldada por iRacing Motorsport Simulations. Los logos de las marcas son de sus respectivos propietarios y solo se usan para identificar la marca de cada coche.',
  );
});

test.describe('Foto del hero rotatoria', () => {
  test('carga una foto del pool y el crédito y el circuito cuadran con ella', async ({ page }) => {
    await mockApi(page, 200);
    await page.goto('/?hero=spa');
    const img = page.locator('[data-hero-picture] img');
    await expect(img).toHaveJSProperty('complete', true);
    expect(await img.evaluate((i: HTMLImageElement) => i.currentSrc)).toContain('/spa.');
    await expect(page.locator('[data-hero-circuit]')).toHaveText('Spa-Francorchamps');
    await expect(page.locator('[data-hero-credit]')).toContainText('Chris Kursikowski');
  });

  test('no repite la misma foto al recargar en la misma sesión', async ({ page }) => {
    await mockApi(page, 200);
    await page.goto('/');
    let last = await page.evaluate(() => sessionStorage.getItem('oo-hero'));
    for (let i = 0; i < 6; i++) {
      await page.reload();
      const now = await page.evaluate(() => sessionStorage.getItem('oo-hero'));
      expect(now).not.toBe(last);
      last = now;
    }
  });

  test('sin JavaScript se ve la foto por defecto', async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto('/');
    const img = page.locator('.hero-bg noscript img');
    await expect(img).toBeVisible();
    await expect(img).toHaveJSProperty('complete', true);
    expect(await img.evaluate((i: HTMLImageElement) => i.currentSrc)).toContain('/nogaro.');
    await ctx.close();
  });
});
