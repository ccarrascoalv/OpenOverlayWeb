// Configuración del sitio: todo lo que cambia con cada release o despliegue vive aquí.

export const REPO = 'andreuservera/OpenOverlay';
const REPO_URL = `https://github.com/${REPO}`;

/**
 * Estado de las releases publicadas en GitHub.
 * - 'published': el CTA descarga directamente el instalador de la última release.
 * - 'none': aún no hay ninguna release; el CTA muestra "Próximamente" y enlaza a la página de releases.
 * Aunque esté en 'published', si la API de GitHub responde que no hay releases (404),
 * el CTA cambia solo a "Próximamente" para no llevar nunca a un 404.
 */
export const RELEASE_STATUS: 'published' | 'none' = 'published';

export const URLS = {
  repo: REPO_URL,
  download: `${REPO_URL}/releases/latest/download/OpenOverlay-win-Setup.exe`,
  latestRelease: `${REPO_URL}/releases/latest`,
  releases: `${REPO_URL}/releases`,
  issues: `${REPO_URL}/issues`,
  contributing: `${REPO_URL}/blob/HEAD/CONTRIBUTING.md`,
  license: `${REPO_URL}/blob/HEAD/LICENSE`,
  api: `https://api.github.com/repos/${REPO}/releases/latest`,
  donate: 'https://paypal.me/ccarrascoalv',
} as const;
