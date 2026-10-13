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

function standings(root: HTMLElement) {
  const lasts = [...root.querySelectorAll<HTMLElement>('[data-standings-row="car"] [data-last]')];
  let acc = 0;
  loop(root, (_t, dt) => {
    acc += dt;
    if (acc < 2.2) return;
    acc = 0;
    const el = lasts[Math.floor(Math.random() * lasts.length)];
    const [m, s] = el.textContent!.trim().split(':');
    const secs = Number(s) + (Math.random() - 0.45) * 0.4;
    el.textContent = `${m}:${secs.toFixed(3).padStart(6, '0')}`;
    el.classList.add('is-tick');
    setTimeout(() => el.classList.remove('is-tick'), 160);
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

function cockpit(root: HTMLElement) {
  const lamps = [...root.querySelectorAll<HTMLElement>('[data-cp="lamps"] i')];
  const lampBox = root.querySelector<HTMLElement>('[data-cp="lamps"]')!;
  const q = (k: string) => root.querySelector<HTMLElement>(`[data-cp="${k}"]`)!;
  const [speedEl, rpmEl, gearEl, fuelEl, deltaEl, proxEl] = ['speed', 'rpm', 'gear', 'fuel', 'delta', 'prox'].map(q);
  // Ratios aproximados: km/h por cada 1000 rpm en cada marcha.
  const ratio = [0, 9.5, 14, 19, 25, 31, 37];
  const MIN = 4300;
  const MAX = 8000;
  let gear = 3;
  let rpm = 6000;
  let fuelL = 31.4;
  let t0 = 0;
  loop(root, (t, dt) => {
    if (!t0) t0 = t;
    rpm += dt * (gear < 6 ? 2600 / gear : 300);
    if (rpm >= MAX) {
      if (gear < 6) {
        gear++;
        rpm = Math.max(MIN, (rpm * ratio[gear - 1]) / ratio[gear]);
      } else {
        // Frenada: reduce a tercera y vuelve a empezar.
        gear = 3;
        rpm = 5200;
      }
    }
    const lit = Math.max(0, Math.min(lamps.length, Math.round(((rpm - 5600) / (MAX - 5600)) * lamps.length)));
    lamps.forEach((l, i) => l.classList.toggle('is-lit', i < lit));
    lampBox.classList.toggle('is-blink', rpm > MAX - 150);
    speedEl.textContent = String(Math.round((rpm / 1000) * ratio[gear]));
    rpmEl.textContent = String(Math.round(rpm / 10) * 10);
    gearEl.textContent = String(gear);
    fuelL -= dt * 0.01;
    fuelEl.textContent = fuelL.toFixed(1);
    const d = -0.184 + Math.sin((t - t0) / 3) * 0.26;
    deltaEl.textContent = `${d < 0 ? '−' : '+'}${Math.abs(d).toFixed(3)}`;
    deltaEl.classList.toggle('is-gain', d < 0);
    deltaEl.classList.toggle('is-loss', d >= 0);
    proxEl.style.transform = `translateY(${Math.sin((t - t0) / 1.7) * 35}%)`;
    proxEl.style.opacity = String(0.55 + 0.45 * Math.max(0, Math.sin((t - t0) / 2.3)));
  });
}

function tires(root: HTMLElement) {
  const temps = [...root.querySelectorAll<HTMLElement>('[data-tyre-temp]')];
  let acc = 0;
  loop(root, (_t, dt) => {
    acc += dt;
    if (acc < 1.4) return;
    acc = 0;
    temps.forEach((el) => {
      const base = Number(el.dataset.tyreTemp);
      el.textContent = `${base + Math.round((Math.random() - 0.5) * 4)}°`;
    });
  });
}

function pedals(root: HTMLElement) {
  const N = 120;
  // Una "vuelta" corta: recta a fondo, frenada con ABS y dos reducciones, salida a fondo.
  const sample = (p: number) => {
    const t = ((p % 1) + 1) % 1;
    const clutch = Math.max(0, 1 - Math.min(Math.abs(t - 0.47), Math.abs(t - 0.55)) / 0.018);
    let th = 0;
    let br = 0;
    let ab = false;
    if (t < 0.34) th = 1;
    else if (t < 0.42) {
      th = Math.max(0, 1 - (t - 0.34) / 0.08);
      br = Math.min(1, (t - 0.34) / 0.05);
    } else if (t < 0.62) {
      br = 0.96 - (t - 0.42) * 1.4;
      ab = t > 0.44 && t < 0.52;
    } else th = Math.min(1, (t - 0.62) / 0.22);
    return { th, br, clutch, ab, t };
  };
  const q = (k: string) => root.querySelector<SVGElement & HTMLElement>(`[data-pd="${k}"]`)!;
  const lines = { th: q('throttle'), br: q('brake'), cl: q('clutch'), abs: q('abs') };
  const [gearEl, speedEl, wheel] = [q('gear'), q('speed'), q('wheel')];
  const bars = { cl: q('b-clutch'), br: q('b-brake'), th: q('b-throttle') };
  const vals = { cl: q('v-clutch'), br: q('v-brake'), th: q('v-throttle') };
  const y = (v: number) => (4 + (1 - v) * 92).toFixed(1);
  let head = 0;
  loop(root, (_t, dt) => {
    head += dt * 0.16;
    const pts = { th: '', br: '', cl: '', abs: '' };
    for (let i = 0; i < N; i++) {
      const s = sample(head + (i - N) / N);
      const x = ((i / (N - 1)) * 400).toFixed(1);
      pts.th += `${x},${y(s.th)} `;
      pts.br += `${x},${y(s.br)} `;
      pts.cl += `${x},${y(s.clutch)} `;
      if (s.ab) pts.abs += `${x},${y(s.br)} `;
    }
    lines.th.setAttribute('points', pts.th);
    lines.br.setAttribute('points', pts.br);
    lines.cl.setAttribute('points', pts.cl);
    lines.abs.setAttribute('points', pts.abs);
    const now = sample(head);
    bars.th.style.transform = `scaleY(${now.th})`;
    bars.br.style.transform = `scaleY(${now.br})`;
    bars.cl.style.transform = `scaleY(${now.clutch})`;
    vals.th.textContent = String(Math.round(now.th * 100));
    vals.br.textContent = String(Math.round(now.br * 100));
    vals.cl.textContent = String(Math.round(now.clutch * 100));
    const gear = now.t < 0.47 ? 4 : now.t < 0.55 ? 3 : now.t < 0.7 ? 2 : now.t < 0.85 ? 3 : 4;
    gearEl.textContent = String(gear);
    const speed = now.t < 0.34 ? 190 : now.t < 0.62 ? 190 - ((now.t - 0.34) / 0.28) * 105 : 85 + ((now.t - 0.62) / 0.38) * 105;
    speedEl.textContent = String(Math.round(speed));
    const steer = now.t > 0.4 && now.t < 0.8 ? Math.sin(((now.t - 0.4) / 0.4) * Math.PI) * 70 : 0;
    wheel.style.transform = `rotate(${steer}deg)`;
  });
}

function weather(root: HTMLElement) {
  const arrow = root.querySelector<SVGElement>('[data-wx="arrow"]')!;
  const wind = root.querySelector<HTMLElement>('[data-wx="wind"]')!;
  let acc = 0;
  loop(root, (t, dt) => {
    acc += dt;
    if (acc < 1.2) return;
    acc = 0;
    arrow.style.transform = `rotate(${315 + Math.sin(t / 2) * 12}deg)`;
    wind.textContent = String(12 + Math.round(Math.random() * 2));
  });
}

const handlers: Record<string, (el: HTMLElement) => void> = {
  relative: (el) => {
    relative(el);
    clock(el);
  },
  standings: (el) => {
    standings(el);
    clock(el);
  },
  flags,
  fuel,
  cockpit,
  tires,
  pedals,
  weather,
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
      // Primer uso de la pestaña: pinta el widget desde su <template>.
      const tpl = panels[i].querySelector<HTMLTemplateElement>('template[data-gal-template]');
      if (tpl) {
        panels[i].append(tpl.content.cloneNode(true));
        tpl.remove();
        initWidgets(panels[i]);
        panels[i].querySelectorAll('[data-fit]').forEach((el) => fitObserver?.observe(el));
      }
      fitAll(panels[i]);
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
