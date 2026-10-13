// Pool de fotos de fondo del hero. En cada visita se elige una al azar en el navegador (sin repetir
// la anterior en la misma sesión). La primera es la foto por defecto: se usa sin JavaScript y en la
// imagen para compartir en redes.
//
// Para añadir una: copia la imagen a src/assets/heroes/ (JPG; si es PNG, conviértela, los PNG no se
// suben al repositorio) y añade una entrada. `position` es el object-position del recorte,
// `brightness` oscurece la foto para que el texto se lea y `flip` la voltea en espejo.
import type { ImageMetadata } from 'astro';
import nogaro from '../assets/heroes/nogaro.jpg';
import spa from '../assets/heroes/spa.jpg';
import lemans499p from '../assets/heroes/lemans-499p-2.jpg';
import porscheGtp from '../assets/heroes/porsche-gtp.jpg';
import valkyrie1 from '../assets/heroes/spa-valkyrie-1.jpg';
import valkyrie3 from '../assets/heroes/spa-valkyrie-3.jpg';

export interface Hero {
  id: string;
  image: ImageMetadata;
  /** Nombre que muestra la barra Track & session del mockup; si falta, se mantiene el del texto. */
  circuit?: string;
  title: { en: string; es: string };
  author: string;
  /** 'unsplash': foto de Unsplash (licencia Unsplash); 'sim': captura de simulador propia. */
  kind: 'unsplash' | 'sim';
  /** Página de la foto en Unsplash. */
  source?: string;
  position: string;
  brightness: number;
  flip?: boolean;
}

const ME = 'Carlos Carrasco';

export const heroes: Hero[] = [
  {
    id: 'nogaro',
    image: nogaro,
    circuit: 'Nogaro',
    title: { en: 'Circuit de Nogaro at sunrise', es: 'circuito de Nogaro al amanecer' },
    author: 'Gabriel Weyand',
    kind: 'unsplash',
    source: 'https://unsplash.com/photos/k39Bj2OOFlA',
    position: '30% 55%',
    brightness: 0.85,
  },
  {
    id: 'spa',
    image: spa,
    circuit: 'Spa-Francorchamps',
    title: { en: 'Eau Rouge, Spa-Francorchamps, at dawn', es: 'Eau Rouge, Spa-Francorchamps, al amanecer' },
    author: 'Chris Kursikowski',
    kind: 'unsplash',
    source: 'https://unsplash.com/photos/nMH44-5DTmY',
    position: '65% 75%',
    brightness: 0.8,
  },
  {
    id: 'lemans-499p',
    image: lemans499p,
    circuit: 'Le Mans',
    title: { en: 'Ferrari 499P at Le Mans at night', es: 'Ferrari 499P en Le Mans de noche' },
    author: ME,
    kind: 'sim',
    position: '30% 50%',
    brightness: 0.95,
  },
  {
    id: 'porsche-gtp',
    image: porscheGtp,
    circuit: 'Spa-Francorchamps',
    title: { en: 'Porsche GTP at Spa at sunset', es: 'Porsche GTP en Spa al atardecer' },
    author: ME,
    kind: 'sim',
    position: '30% 50%',
    brightness: 0.95,
  },
  {
    id: 'spa-valkyrie-1',
    image: valkyrie1,
    circuit: 'Spa-Francorchamps',
    title: { en: 'Aston Martin Valkyrie at Spa', es: 'Aston Martin Valkyrie en Spa' },
    author: ME,
    kind: 'sim',
    position: '60% 50%',
    brightness: 0.85,
  },
  {
    id: 'spa-valkyrie-3',
    image: valkyrie3,
    circuit: 'Spa-Francorchamps',
    title: { en: 'Aston Martin Valkyrie at Spa', es: 'Aston Martin Valkyrie en Spa' },
    author: ME,
    kind: 'sim',
    position: '50% 50%',
    brightness: 0.85,
  },
];

/** Texto del crédito de una foto en el idioma dado. */
export function heroCredit(h: Hero, lang: 'en' | 'es') {
  const tag = h.kind === 'unsplash' ? 'Unsplash' : lang === 'es' ? 'captura de simulador' : 'sim screenshot';
  return `${h.title[lang]} — ${h.author} (${tag})`;
}
