// Idiomas de la web. El inglés es el idioma por defecto y vive en la raíz; el resto, en /<código>/.
import { en } from '../content/en';
import { es } from '../content/es';

export const languages = {
  en: { label: 'EN', name: 'English' },
  es: { label: 'ES', name: 'Español' },
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

const dictionaries = { en, es };

/** Textos del idioma de la página actual (Astro.currentLocale). */
export function useT(locale: string | undefined) {
  return dictionaries[(locale ?? defaultLang) as Lang] ?? dictionaries[defaultLang];
}

/** Ruta de la portada en un idioma, respetando la base del despliegue. */
export function langPath(lang: Lang) {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  return lang === defaultLang ? base : `${base}${lang}/`;
}
