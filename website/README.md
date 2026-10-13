# Web de OpenOverlay

Landing page de descarga de OpenOverlay. Astro con salida estática, CSS propio con variables, sin frameworks de UI, analítica ni cookies.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm install` | Instala dependencias |
| `npx playwright install chromium` | Descarga el navegador para las pruebas (una vez) |
| `npm run dev` | Servidor de desarrollo en `localhost:4321` |
| `npm run build` | Genera el sitio estático en `dist/` |
| `npm run preview` | Sirve `dist/` en `localhost:4321` |
| `npm test` | Pruebas de Playwright (necesita `npm run build` antes) |
| `npm run screenshots` | Capturas a 375, 768 y 1440 px en `test-results/screenshots/` (con `preview` en marcha) |
| `npm run lighthouse` | Informe de Lighthouse móvil en `test-results/` (con `preview` en marcha) |
| `npm run check:colors` | Comprueba que no hay colores fuera de la paleta |
| `npm run og` | Regenera `public/og.png` y `public/apple-touch-icon.png` |

## Dónde cambiar cada cosa

- **Idiomas:** inglés por defecto en `/` y español en `/es/`, con selector en la cabecera.
  - Textos: `src/content/en.ts` y `src/content/es.ts` (misma estructura; TypeScript avisa si falta una clave).
  - Para añadir un idioma: crea `src/content/<código>.ts`, regístralo en `src/i18n/index.ts` y en `astro.config.mjs`, y añade `src/pages/<código>/index.astro`.
- **Enlaces y releases:** `src/config.ts`. La web no muestra número de versión: el botón apunta siempre a `/releases/latest/download/…`, que GitHub redirige a la última release, así que no hay que tocar nada al publicar una versión nueva.
  - `RELEASE_STATUS`: `'published'` (el botón descarga el instalador) o `'none'` (el botón dice "Coming soon" y enlaza a las releases). Además, si la API de GitHub responde que no hay ninguna release, el botón cambia solo.
- **Fotos de fondo del hero:** `src/data/heroes.ts`. En cada visita se elige una al azar (sin repetir la anterior en la misma sesión); la primera es la de por defecto, sin JavaScript y en la imagen para compartir. Para añadir una, copia la imagen a `src/assets/heroes/` (3000 px de ancho o más, licencia libre) y añade su entrada con autor, encuadre y brillo. Para revisar una concreta: `/?hero=<id>`.
- **Widgets de la app:** `src/components/widgets/` (Relative, Standings, Cockpit, Fuel calculator, Flags, Tires, Pedal trace, Weather), con sus estilos en `src/styles/widgets.css`, los datos de ejemplo en `src/data/preview.ts` (copiados de `PreviewData.cs` de la app) y la animación en `src/scripts/widgets.ts`. Los colores propios de los widgets (clases, licencias, compuestos…) están en `tokens.css` con prefijo `--w-`. La galería del final de la página es `src/components/Gallery.astro`.
- **Colores:** `src/styles/tokens.css` (paleta de LANDING-PAGE.md §1). Es el único archivo con colores literales.
- **Estilo de los widgets:** `../style-widgets.md`.

## Sustituir los mockups por capturas reales

Los widgets del hero usan `WidgetFrame` y los del panel `ShotFrame`. Ambos aceptan `image` y `alt`: si se pasa una imagen, el mockup deja de renderizarse y el layout no cambia.

```astro
---
import relativePng from '../assets/screenshots/relative.png';
---
<WidgetFrame title="Relative" image={relativePng} alt="Widget Relative durante una carrera" />
<ShotFrame label="Panel de control" image={panelPng} alt="Panel de control de OpenOverlay" />
```

`ShotFrame` mantiene una proporción de 16:10: recorta la captura a esa proporción o ajusta `aspect-ratio` en el componente.

## Despliegue en GitHub Pages

El workflow `.github/workflows/deploy.yml` construye esta carpeta y la publica en cada push a `main` que toque `website/` (también se puede lanzar a mano desde la pestaña *Actions*). La URL y la ruta base las toma de la configuración de Pages del repositorio, así que no hay que tocarlo si cambia el repositorio o se añade un dominio propio.

Activación (una vez): *Settings → Pages → Source: GitHub Actions*.

Para reproducir el build de producción en local:

```bash
SITE_URL=https://ccarrascoalv.github.io BASE_PATH=/OpenOverlayWeb npm run build
```
