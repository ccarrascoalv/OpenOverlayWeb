// Comprobación en cliente de que existe alguna release en GitHub.
// La web no muestra número de versión: el CTA siempre apunta a /releases/latest/download/…,
// que GitHub redirige a la última release. Solo si la API responde 404 (no hay ninguna release)
// el CTA pasa a "Próximamente" y enlaza a la página de releases, para no llevar nunca a un 404.
// Si la API falla o se supera el límite de peticiones, no se cambia nada.

const CACHE_KEY = 'oo-has-release';
const CACHE_MS = 30 * 60 * 1000;

function readCache(): boolean | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const c = JSON.parse(raw) as { has: boolean; at: number };
    return Date.now() - c.at < CACHE_MS ? c.has : null;
  } catch {
    return null;
  }
}

function writeCache(has: boolean) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ has, at: Date.now() }));
  } catch {
    /* almacenamiento no disponible */
  }
}

function applyNoRelease() {
  document.querySelectorAll<HTMLAnchorElement>('[data-dl-link]').forEach((a) => {
    a.href = a.dataset.soonHref!;
    a.title = a.dataset.soonTitle ?? '';
    const label = a.querySelector('[data-dl-label]');
    if (label) label.textContent = a.dataset.soonLabel ?? '';
  });
}

export async function initRelease(apiUrl: string) {
  const cached = readCache();
  if (cached !== null) {
    if (!cached) applyNoRelease();
    return;
  }
  try {
    const res = await fetch(apiUrl, { headers: { Accept: 'application/vnd.github+json' } });
    if (res.status === 404) {
      writeCache(false);
      applyNoRelease();
    } else if (res.ok) {
      writeCache(true);
    }
  } catch {
    /* sin red: el CTA se queda como está */
  }
}
