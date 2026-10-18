// Sitemap con las dos portadas y sus versiones en cada idioma (hreflang), para Google Search Console.
import type { APIRoute } from 'astro';
import { defaultLang, langPath, languages, type Lang } from '../i18n';

export const GET: APIRoute = ({ site }) => {
  const abs = (path: string) => (site ? new URL(path, site).href : path);
  const langs = Object.keys(languages) as Lang[];
  const lastmod = new Date().toISOString().slice(0, 10);
  const alternates = [
    ...langs.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(langPath(l))}"/>`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(langPath(defaultLang))}"/>`,
  ].join('\n');
  const urls = langs
    .map((l) => `  <url>\n    <loc>${abs(langPath(l))}</loc>\n    <lastmod>${lastmod}</lastmod>\n${alternates}\n  </url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
