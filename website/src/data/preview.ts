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
export const fuel = { left: 31.4, capacity: 68, last: 2.71, avg: 2.68, min: 2.54, max: 2.89, toFinish: 37.5 };
