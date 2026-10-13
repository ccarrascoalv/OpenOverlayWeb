// Pool de fotos de fondo del hero. En cada visita se elige una al azar en el navegador (sin repetir
// la anterior en la misma sesión). La primera es la foto por defecto: se usa sin JavaScript y en la
// imagen para compartir en redes.
//
// Para añadir una: copia la imagen (3000 px de ancho o más, licencia libre) a src/assets/heroes/ y
// añade una entrada. `position` es el object-position del recorte y `brightness` oscurece la foto
// para que el texto se lea; `flip` la voltea en espejo.
import type { ImageMetadata } from 'astro';
import nogaro from '../assets/heroes/nogaro.jpg';
import spa from '../assets/heroes/spa.jpg';
import barcelona from '../assets/heroes/barcelona.jpg';
import sunsetDust from '../assets/heroes/sunset-dust.jpg';
import sunsetSky from '../assets/heroes/sunset-sky.jpg';

export interface Hero {
  id: string;
  image: ImageMetadata;
  /** Nombre que muestra la barra Track & session del mockup; si falta, se mantiene el del texto. */
  circuit?: string;
  title: { en: string; es: string };
  author: string;
  /** Página de la foto en Unsplash (licencia Unsplash). */
  source: string;
  position: string;
  brightness: number;
  flip?: boolean;
}

export const heroes: Hero[] = [
  {
    id: 'nogaro',
    image: nogaro,
    circuit: 'Nogaro',
    title: { en: 'Circuit de Nogaro at sunrise', es: 'circuito de Nogaro al amanecer' },
    author: 'Gabriel Weyand',
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
    source: 'https://unsplash.com/photos/nMH44-5DTmY',
    position: '65% 75%',
    brightness: 0.8,
  },
  {
    id: 'barcelona',
    image: barcelona,
    circuit: 'Barcelona',
    title: { en: 'Circuit de Barcelona-Catalunya at dusk', es: 'Circuit de Barcelona-Catalunya al anochecer' },
    author: 'Jesper Giortz-Behrens',
    source: 'https://unsplash.com/photos/At82tz5FgFg',
    position: '50% 60%',
    brightness: 0.8,
  },
  {
    id: 'sunset-dust',
    image: sunsetDust,
    title: { en: 'A prototype at sunset', es: 'un prototipo al atardecer' },
    author: 'Drew Stock',
    source: 'https://unsplash.com/photos/NDYDiPQp3G4',
    position: '50% 45%',
    brightness: 0.85,
    flip: true,
  },
  {
    id: 'sunset-sky',
    image: sunsetSky,
    title: { en: 'A sports car on track at sunset', es: 'un deportivo en pista al atardecer' },
    author: 'Mitul Grover',
    source: 'https://unsplash.com/photos/3Crq9loUuEg',
    position: '50% 60%',
    brightness: 0.8,
    flip: true,
  },
];
