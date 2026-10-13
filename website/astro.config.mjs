// @ts-check
import { defineConfig } from 'astro/config';

// Para GitHub Pages en https://<usuario>.github.io/<repo>/ define al construir:
//   SITE_URL=https://<usuario>.github.io  BASE_PATH=/<repo>
// Con un dominio propio basta con SITE_URL y BASE_PATH=/ (por defecto).
export default defineConfig({
  site: process.env.SITE_URL || undefined,
  base: process.env.BASE_PATH || '/',
  output: 'static',
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'always' },
  // Logos y banderas como archivos, no incrustados: se repiten muchas veces en las tablas.
  vite: { build: { assetsInlineLimit: 0 } },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: { prefixDefaultLocale: false },
  },
});
