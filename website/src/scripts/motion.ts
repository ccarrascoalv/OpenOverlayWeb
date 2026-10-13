// Animaciones de la página: entradas al hacer scroll, cabecera fija y datos "en vivo" de los mockups.
// Con prefers-reduced-motion no se arranca nada: todo queda visible y estático.

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initReveal() {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (reduced() || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  els.forEach((el) => io.observe(el));
}

export function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  const update = () => header.classList.toggle('is-stuck', window.scrollY > 8);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

/** Ejecuta `tick` cada `ms` solo mientras `el` es visible y la pestaña está activa. */
function whileVisible(el: Element, ms: number, tick: () => void) {
  let timer: number | undefined;
  let visible = false;
  const sync = () => {
    const run = visible && !document.hidden;
    if (run && timer === undefined) timer = window.setInterval(tick, ms);
    if (!run && timer !== undefined) {
      clearInterval(timer);
      timer = undefined;
    }
  };
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    sync();
  }).observe(el);
  document.addEventListener('visibilitychange', sync);
}

function liveRelative(root: HTMLElement) {
  const rows = [...root.querySelectorAll<HTMLElement>('.rel-row')];
  const gaps = rows.map((r) => Number(r.dataset.gap));
  const fmt = (g: number) => (Math.abs(g) < 0.05 ? '0.0' : `${g > 0 ? '+' : '−'}${Math.abs(g).toFixed(1)}`);
  whileVisible(root, 1100, () => {
    rows.forEach((row, i) => {
      if (gaps[i] === 0) return;
      // Paseo aleatorio pequeño; el signo (delante/detrás) no cambia.
      const drift = (Math.random() - 0.5) * 0.24;
      const next = gaps[i] + drift;
      gaps[i] = Math.sign(next) === Math.sign(gaps[i]) && Math.abs(next) > 0.2 ? next : gaps[i];
      const out = row.querySelector<HTMLElement>('[data-gap-out]');
      if (!out) return;
      const text = fmt(gaps[i]);
      if (out.textContent !== text) {
        out.classList.add('is-tick');
        out.textContent = text;
        window.setTimeout(() => out.classList.remove('is-tick'), 160);
      }
    });
  });
}

function liveFuel(root: HTMLElement) {
  const capacity = Number(root.dataset.capacity);
  const avg = Number(root.dataset.avg);
  const finish = Number(root.dataset.finish);
  const start = Number(root.dataset.remaining);
  let remaining = start;
  const q = (k: string) => root.querySelector<HTMLElement>(`[data-fuel="${k}"]`)!;
  const [rem, laps, level, refuel] = [q('remaining'), q('laps'), q('level'), q('refuel')];
  whileVisible(root, 1000, () => {
    remaining -= 0.03;
    if (remaining < start - 2.7) remaining = start; // una "vuelta" de consumo y vuelve a empezar
    rem.textContent = remaining.toFixed(1);
    laps.textContent = (remaining / avg).toFixed(1);
    refuel.textContent = Math.max(0, finish - remaining).toFixed(1);
    level.style.transform = `scaleX(${remaining / capacity})`;
  });
}

function liveFlags(root: HTMLElement) {
  const states = [...root.querySelectorAll<HTMLElement>('[data-flag]')];
  let i = states.findIndex((s) => s.classList.contains('is-on'));
  whileVisible(root, 3800, () => {
    states[i].classList.remove('is-on');
    i = (i + 1) % states.length;
    states[i].classList.add('is-on');
  });
}

function liveTrack(root: HTMLElement) {
  const clock = root.querySelector<HTMLElement>('[data-track="clock"]');
  if (!clock) return;
  let secs = 42 * 60 + 18;
  const pad = (n: number) => String(n).padStart(2, '0');
  whileVisible(root, 1000, () => {
    secs = secs > 0 ? secs - 1 : 42 * 60 + 18;
    clock.textContent = `${pad(Math.floor(secs / 3600))}:${pad(Math.floor((secs % 3600) / 60))}:${pad(secs % 60)}`;
  });
}

export function initLiveMockups() {
  if (reduced()) return;
  document.querySelectorAll<HTMLElement>('[data-mock="relative"]').forEach(liveRelative);
  document.querySelectorAll<HTMLElement>('[data-mock="fuel"]').forEach(liveFuel);
  document.querySelectorAll<HTMLElement>('[data-mock="flags"]').forEach(liveFlags);
  document.querySelectorAll<HTMLElement>('[data-mock="track"]').forEach(liveTrack);
}
