// Animación de los widgets de la app y escalado para que encajen en su hueco.
// Cada widget solo se anima mientras está visible y la pestaña está activa. Con
// prefers-reduced-motion no se anima nada: los widgets quedan quietos con los datos de ejemplo.

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Escalado ---------- */
export function fitAll(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-fit]').forEach((box) => {
    const w = Number(box.dataset.fit);
    const max = Number(box.dataset.fitMax ?? 1);
    const inner = box.firstElementChild as HTMLElement;
    const avail = box.clientWidth;
    if (!avail) return;
    const s = Math.min(max, avail / w);
    inner.style.transform = `scale(${s})`;
    box.style.height = `${inner.offsetHeight * s}px`;
  });
}

let fitObserver: ResizeObserver | undefined;

export function initFit() {
  fitAll();
  // Las fuentes cambian la altura de las tablas: reajusta cuando terminan de cargar.
  document.fonts?.ready.then(() => fitAll());
  fitObserver = new ResizeObserver(() => fitAll());
  document.querySelectorAll('[data-fit]').forEach((el) => fitObserver!.observe(el));
}

/* ---------- Bucle por widget (solo visible) ---------- */
function loop(el: Element, step: (t: number, dt: number) => void, fps = 30) {
  let raf = 0;
  let visible = false;
  let last = 0;
  const frame = (t: number) => {
    raf = requestAnimationFrame(frame);
    if (t - last < 1000 / fps) return;
    const dt = last ? (t - last) / 1000 : 0;
    last = t;
    step(t / 1000, dt);
  };
  const sync = () => {
    const run = visible && !document.hidden && (el as HTMLElement).offsetParent !== null;
    if (run && !raf) {
      last = 0;
      raf = requestAnimationFrame(frame);
    } else if (!run && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    sync();
  }).observe(el);
  document.addEventListener('visibilitychange', sync);
}

const fmtGap = (g: number) => (Math.abs(g) < 0.05 ? '0.0' : `${g > 0 ? '+' : '−'}${Math.abs(g).toFixed(1)}`);

function relative(root: HTMLElement) {
  const rows = [...root.querySelectorAll<HTMLElement>('[data-gap]')];
  const gaps = rows.map((r) => Number(r.dataset.gap));
  let acc = 0;
  loop(root, (_t, dt) => {
    acc += dt;
    if (acc < 1.1) return;
    acc = 0;
    rows.forEach((row, i) => {
      if (gaps[i] === 0) return;
      const next = gaps[i] + (Math.random() - 0.5) * 0.24;
      if (Math.sign(next) === Math.sign(gaps[i]) && Math.abs(next) > 0.2) gaps[i] = next;
      const out = row.querySelector<HTMLElement>('[data-gap-out]')!;
      const text = fmtGap(gaps[i]);
      if (out.textContent !== text) {
        out.textContent = text;
        out.classList.add('is-tick');
        setTimeout(() => out.classList.remove('is-tick'), 160);
      }
    });
  });
}

function clock(root: HTMLElement) {
  const el = root.querySelector<HTMLElement>('[data-live-clock]');
  if (!el) return;
  let secs = 23 * 60 + 15;
  const pad = (n: number) => String(n).padStart(2, '0');
  let acc = 0;
  loop(root, (_t, dt) => {
    acc += dt;
    if (acc < 1) return;
    acc = 0;
    secs = secs >= 3600 ? 0 : secs + 1;
    el.textContent = `0:${pad(Math.floor(secs / 60))}:${pad(secs % 60)} / 1:00:00`;
  });
}

function flags(root: HTMLElement) {
  const scenes = [...root.querySelectorAll<HTMLElement>('[data-flag-scene]')];
  let i = 0;
  let acc = 0;
  loop(root, (_t, dt) => {
    acc += dt;
    if (acc < 3.8) return;
    acc = 0;
    scenes[i].classList.remove('is-on');
    i = (i + 1) % scenes.length;
    scenes[i].classList.add('is-on');
  });
}

function fuel(root: HTMLElement) {
  const cap = Number(root.dataset.capacity);
  const avg = Number(root.dataset.avg);
  const finish = Number(root.dataset.finish);
  const start = Number(root.dataset.left);
  let left = start;
  const q = (k: string) => root.querySelector<HTMLElement>(`[data-fuel="${k}"]`)!;
  let acc = 0;
  loop(root, (_t, dt) => {
    acc += dt;
    if (acc < 1) return;
    acc = 0;
    left -= 0.03;
    if (left < start - avg) left = start;
    q('left').textContent = left.toFixed(1);
    q('laps').textContent = (left / avg).toFixed(1);
    q('refuel').textContent = String(Math.ceil(finish - left));
    q('level').style.transform = `scaleX(${left / cap})`;
  });
}

const handlers: Record<string, (el: HTMLElement) => void> = {
  relative: (el) => {
    relative(el);
    clock(el);
  },
  flags,
  fuel,
};

export function initWidgets(root: ParentNode = document) {
  if (reduced()) return;
  root.querySelectorAll<HTMLElement>('[data-live]').forEach((el) => handlers[el.dataset.live!]?.(el));
}

/* ---------- Galería: pestañas accesibles ---------- */
export function initGallery() {
  document.querySelectorAll<HTMLElement>('[data-gallery]').forEach((g) => {
    const tabs = [...g.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
    const panels = [...g.querySelectorAll<HTMLElement>('[role="tabpanel"]')];
    const select = (i: number, focus = false) => {
      tabs.forEach((tab, j) => {
        const on = i === j;
        tab.setAttribute('aria-selected', String(on));
        tab.tabIndex = on ? 0 : -1;
        panels[j].hidden = !on;
      });
      if (focus) tabs[i].focus();
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(i));
      tab.addEventListener('keydown', (e) => {
        const k = e.key;
        let n = -1;
        if (k === 'ArrowRight' || k === 'ArrowDown') n = (i + 1) % tabs.length;
        if (k === 'ArrowLeft' || k === 'ArrowUp') n = (i - 1 + tabs.length) % tabs.length;
        if (k === 'Home') n = 0;
        if (k === 'End') n = tabs.length - 1;
        if (n >= 0) {
          e.preventDefault();
          select(n, true);
        }
      });
    });
  });
}
