// Datos de ejemplo de los widgets, copiados de la vista previa de la app
// (IRacingOverlay.App/ControlPanel/PreviewData.cs): la misma carrera multiclase congelada en un instante.
// Son ficticios; solo ilustran cómo se ve cada widget.

export type ClassId = 'gt3' | 'gt4' | 'tcr';
export type Tyre = 'H' | 'W' | 'S';
export type PenaltyFlag = 'black' | 'furled' | 'meatball';

export interface DriverRow {
  cls: ClassId;
  pos: number;
  num: string;
  brand: string;
  name: string;
  /** Archivo de bandera en src/assets/flags-sm/ (sin extensión). */
  country: string;
  tyre: Tyre;
  lic: string;
  ir: string;
  /** Ganancia/pérdida estimada de iRating. */
  irDelta: number;
  /** Puestos ganados (+) o perdidos (−) desde la salida (solo Standings). */
  places?: number;
  pit?: { lap: number; time: string };
  inPit?: boolean;
  penalty?: PenaltyFlag;
  isPlayer?: boolean;
  /** Relative: 'lapped' (un vuelta menos, azul) o 'lapping' (una vuelta más, rojo). */
  lap?: 'lapped' | 'lapping';
}

export interface RelativeRow extends DriverRow {
  gap: number;
}

export interface StandingsRow extends DriverRow {
  lapNo: number;
  best: string;
  last: string;
  bestPurple?: boolean;
  lastTone?: 'purple' | 'green';
  gap: string;
  leader?: boolean;
}

export const classes: Record<ClassId, { name: string; drivers: number; sof: string }> = {
  gt3: { name: 'GT3', drivers: 10, sof: '2.6k' },
  gt4: { name: 'GT4', drivers: 8, sof: '2.4k' },
  tcr: { name: 'TCR', drivers: 6, sof: '2.1k' },
};

export const session = {
  incidents: '7/17',
  trackTemp: '33.8°C',
  airTemp: '21.4°C',
  humidity: '54%',
  sof: '2.9k',
  lap: '7/~23.8',
  time: '0:23:15 / 1:00:00',
};

// Relative: el jugador en el centro, tres coches a cada lado.
export const relativeRows: RelativeRow[] = [
  { cls: 'gt3', pos: 4, num: '71', brand: 'mercedes', name: 'Kenji Nakamura', country: 'japan', tyre: 'H', lic: 'B 2.41', ir: '4.3k', irDelta: 22, penalty: 'furled', lap: 'lapped', gap: -1.5 },
  { cls: 'tcr', pos: 1, num: '5', brand: 'hyundai', name: 'Owen Radcliffe', country: 'united-kingdom', tyre: 'H', lic: 'C 4.03', ir: '4.0k', irDelta: 18, penalty: 'black', gap: -1.0 },
  { cls: 'gt4', pos: 3, num: '62', brand: 'bmw', name: 'Pierre Lacroix', country: 'france', tyre: 'H', lic: 'C 3.55', ir: '3.7k', irDelta: 13, pit: { lap: 11, time: '01:16' }, lap: 'lapped', gap: -0.4 },
  { cls: 'gt3', pos: 5, num: '24', brand: 'mclaren', name: 'You', country: 'spain', tyre: 'H', lic: 'C 3.12', ir: '3.5k', irDelta: 8, isPlayer: true, gap: 0 },
  { cls: 'tcr', pos: 2, num: '11', brand: 'honda', name: 'Diego Santoro', country: 'argentina', tyre: 'H', lic: 'C 2.88', ir: '3.3k', irDelta: 4, gap: 0.4 },
  { cls: 'gt4', pos: 4, num: '88', brand: 'mclaren', name: 'Hannah Brooks', country: 'united-states', tyre: 'H', lic: 'C 2.10', ir: '3.1k', irDelta: -1, penalty: 'meatball', pit: { lap: 9, time: '01:21' }, gap: 0.7 },
  { cls: 'gt3', pos: 6, num: '40', brand: 'audi', name: 'Viktor Sorensen', country: 'denmark', tyre: 'W', lic: 'D 4.44', ir: '2.9k', irDelta: -6, lap: 'lapping', gap: 1.4 },
];

// Standings: agrupada por clase, con el líder, tu batalla y un coche en boxes.
export const standingsGroups: { cls: ClassId; rows: StandingsRow[]; gapAfter?: number }[] = [
  {
    cls: 'gt3',
    gapAfter: 3,
    rows: [
      { cls: 'gt3', pos: 1, places: 0, num: '17', brand: 'porsche', name: 'Carlos Carrasco', country: 'spain', tyre: 'H', ir: '6.4k', irDelta: 100, lic: 'A 4.21', lapNo: 18, best: '1:32.418', last: '1:32.418', bestPurple: true, lastTone: 'purple', gap: 'Leader', leader: true },
      { cls: 'gt3', pos: 2, places: 1, num: '3', brand: 'bmw', name: 'Andreu Servera', country: 'spain', tyre: 'H', ir: '5.9k', irDelta: 41, lic: 'A 3.88', pit: { lap: 10, time: '01:06' }, lapNo: 18, best: '1:32.438', last: '1:32.539', gap: '+0.4' },
      { cls: 'gt3', pos: 3, places: -1, num: '44', brand: 'ferrari', name: 'Jan Kowalczyk', country: 'poland', tyre: 'S', ir: '5.2k', irDelta: 37, lic: 'A 2.97', lapNo: 18, best: '1:32.473', last: '1:32.681', gap: '+1.1' },
      { cls: 'gt3', pos: 4, places: 0, num: '71', brand: 'mercedes', name: 'Kenji Nakamura', country: 'japan', tyre: 'H', ir: '4.3k', irDelta: 22, lic: 'B 2.41', penalty: 'furled', lapNo: 17, best: '1:32.629', last: '1:32.806', gap: '+4.2' },
      { cls: 'gt3', pos: 5, places: 0, num: '24', brand: 'mclaren', name: 'You', country: 'spain', tyre: 'H', ir: '3.5k', irDelta: 8, lic: 'C 3.12', isPlayer: true, lapNo: 17, best: '1:32.813', last: '1:32.971', gap: '+7.9' },
      { cls: 'gt3', pos: 6, places: 3, num: '40', brand: 'audi', name: 'Viktor Sorensen', country: 'denmark', tyre: 'W', ir: '2.9k', irDelta: -6, lic: 'D 4.44', lapNo: 17, best: '1:32.978', last: '1:33.481', gap: '+11.2' },
      { cls: 'gt3', pos: 7, places: 1, num: '33', brand: 'audi', name: 'Ethan Caldwell', country: 'united-states', tyre: 'H', ir: '2.2k', irDelta: -20, lic: 'D 2.18', lapNo: 17, best: '1:33.223', last: '1:33.732', gap: '+16.1' },
      { cls: 'gt3', pos: 8, places: -2, num: '66', brand: 'porsche', name: 'Mika Virtanen', country: 'finland', tyre: 'H', ir: '1.5k', irDelta: -34, lic: 'R 3.02', lapNo: 17, best: '1:33.568', last: '1:34.121', gap: '+23.0' },
    ],
  },
  {
    cls: 'gt4',
    rows: [
      { cls: 'gt4', pos: 1, places: 2, num: '9', brand: 'astonmartin', name: 'Marco Bianchi', country: 'italy', tyre: 'H', ir: '5.0k', irDelta: 32, lic: 'B 4.55', lapNo: 17, best: '1:32.533', last: '1:32.859', bestPurple: true, gap: 'Leader', leader: true },
      { cls: 'gt4', pos: 2, places: -1, num: '28', brand: 'porsche', name: 'Ana Ruiz Delgado', country: 'spain', tyre: 'W', ir: '4.6k', irDelta: 27, lic: 'B 3.72', pit: { lap: 13, time: '01:11' }, lapNo: 17, best: '1:32.568', last: '1:32.628', gap: '+3.0' },
      { cls: 'gt4', pos: 3, places: -1, num: '62', brand: 'bmw', name: 'Pierre Lacroix', country: 'france', tyre: 'H', ir: '3.7k', irDelta: 13, lic: 'C 3.55', pit: { lap: 11, time: '01:16' }, lapNo: 17, best: '1:32.762', last: '1:32.762', lastTone: 'green', gap: '+6.9' },
    ],
  },
  {
    cls: 'tcr',
    rows: [
      { cls: 'tcr', pos: 1, places: 3, num: '5', brand: 'hyundai', name: 'Owen Radcliffe', country: 'united-kingdom', tyre: 'H', ir: '4.0k', irDelta: 18, lic: 'C 4.03', penalty: 'black', lapNo: 17, best: '1:32.693', last: '1:32.990', bestPurple: true, gap: 'Leader', leader: true },
      { cls: 'tcr', pos: 2, places: -1, num: '11', brand: 'honda', name: 'Diego Santoro', country: 'argentina', tyre: 'H', ir: '3.3k', irDelta: 4, lic: 'C 2.88', lapNo: 17, best: '1:32.855', last: '1:33.122', gap: '+8.7' },
      { cls: 'tcr', pos: 3, places: -1, num: '56', brand: 'audi', name: 'Samir El Amrani', country: 'turkey', tyre: 'H', ir: '2.6k', irDelta: -10, lic: 'D 3.61', penalty: 'meatball', inPit: true, pit: { lap: 11, time: '01:24' }, lapNo: 17, best: '1:33.060', last: '1:33.317', gap: '+12.9' },
    ],
  },
];

export const fuel = { left: 31.4, capacity: 68, last: 2.71, avg: 2.68, min: 2.54, max: 2.89, toFinish: 37.5 };

export const cockpit = { speed: 214, rpm: 7180, fuel: 31.4, gear: '4', abs: 3, tc: 3, bb: 54.5, inc: '4 / 17', delta: -0.184, lit: 9, lamps: 15 };

export const tyres = [
  { wear: [41, 36, 33], temps: [82, 96, 91] },
  { wear: [52, 47, 44], temps: [79, 92, 88] },
  { wear: [71, 68, 66], temps: [74, 84, 80] },
  { wear: [76, 74, 72], temps: [72, 82, 79] },
];

export const weather = { track: 33.8, air: 21.4, humidity: 54, rain: 40, windKmh: 13, windFrom: 315 };

/** Traza de pedales de PreviewData.PedalTrace(): una frenada con ABS y vuelta a fondo. */
export function pedalTrace(samples = 160) {
  const throttle: number[] = [];
  const brake: number[] = [];
  const clutch: number[] = [];
  const abs: boolean[] = [];
  for (let i = 0; i < samples; i++) {
    const t = i / (samples - 1);
    clutch.push(Math.max(0, 1 - Math.min(Math.abs(t - 0.47), Math.abs(t - 0.55)) / 0.018));
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
    throttle.push(th);
    brake.push(br);
    abs.push(ab);
  }
  return { throttle, brake, clutch, abs };
}
