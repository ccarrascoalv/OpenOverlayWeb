# Copy audit: OpenOverlay (landing)

**Contexto aplicado** (el brief tenía huecos sin rellenar; he usado esto, corrígelo si no encaja):

- Web: OpenOverlay, https://ccarrascoalv.github.io/OpenOverlayWeb/ (`/` en inglés, `/es/` en español).
- Idiomas: inglés y español. Cada uno revisado por separado, en su idioma.
- Tono: directo, técnico, de piloto a piloto, sin marketing.
- Stack: Astro estático. Casi todo el texto visible vive en `website/src/content/en.ts` y `website/src/content/es.ts`. También hay texto en `website/src/data/heroes.ts` (crédito de la foto), `website/scripts/og.mjs` (texto de la imagen OG) y `website/src/components/Gallery.astro` (nombres de widget).

**Estado: solo auditoría. No he cambiado ningún archivo.** Aprueba, rechaza o edita filas y aplico solo lo aprobado.

En general el texto ya es concreto: casi todo describe funciones reales con datos de la app. Lo que sale son sobre todo:

- rayas (—) usadas como pausa dramática;
- tres eslóganes de sección («Everything you need… Nothing you don't», «A control panel that looks the way you race», «Up and running»);
- un par de cierres de relleno;
- una promesa sin dato («optimizado para usar poca CPU y GPU»).

---

## Inglés (`website/src/content/en.ts`)

### Metadatos (title, description, OG)

| archivo:línea | texto actual | problema detectado | propuesta | texto nuevo |
|---|---|---|---|---|
| en.ts:9 | `OpenOverlay — Free, open-source telemetry overlay for iRacing` | Raya como separador. Es aceptable en un `<title>`, pero el brief pide evitarla. | Reescribir | `OpenOverlay: free, open-source telemetry overlay for iRacing` (60 car.) |
| en.ts:11 | `Floating widgets over iRacing: relative, standings, fuel, flags, weather and more. Free, open source (MIT), 100% local, no account needed. For Windows 10/11.` | Bien: concreto y con palabras clave. «and more» es vago, pero «12 widgets» lo concreta. | Reescribir (mínimo) | `12 floating widgets over iRacing: relative, standings, fuel, flags, weather and more. Free, open source (MIT), 100% local, no account. For Windows 10/11.` (153 car.) |

### Hero

| archivo:línea | texto actual | problema detectado | propuesta | texto nuevo |
|---|---|---|---|---|
| en.ts:49 | `Floating widgets over the sim — relative, standings, fuel, flags, weather and more — set up in a control panel with a live preview.` | Rayas dramáticas que encierran una enumeración. «and more» vago. | Reescribir | `Relative, standings, fuel, flags, weather and seven more widgets over the sim, set up in a control panel with a live preview.` |

### Ventajas (Features)

| archivo:línea | texto actual | problema detectado | propuesta | texto nuevo |
|---|---|---|---|---|
| en.ts:158 | `Everything you need on track. Nothing you don’t.` | Fórmula hecha («Everything you need… nothing you don't»). Podría estar en cualquier web. | Reescribir | `Free, and nothing leaves your PC.` |
| en.ts:159 | `Built for racing without distractions, without subscriptions, and without your data leaving your PC.` | Anáfora de tres («without… without… without»). «without distractions» no dice nada. | Reescribir | `It reads iRacing’s telemetry on your PC and draws the widgets on top of the sim.` |
| en.ts:164 | `MIT licence. No subscription and no account: download, install, race.` | Tríada final por ritmo («download, install, race»). | Reescribir | `MIT licence. No subscription and no account.` |
| en.ts:174 | `It uses the public telemetry interface iRacing provides for third-party tools — the same one SimHub, CrewChief and RaceLab use. It never touches game files or memory.` | Raya como pausa dramática. | Reescribir (solo puntuación) | `It uses the public telemetry interface iRacing provides for third-party tools, the same one SimHub, CrewChief and RaceLab use. It never touches game files or memory.` |

### Panel de control

| archivo:línea | texto actual | problema detectado | propuesta | texto nuevo |
|---|---|---|---|---|
| en.ts:241 | `A control panel that looks the way you race.` | Eslogan vacío: no explica nada y la frase no tiene un sentido claro. | Reescribir | `Everything is set up in the control panel.` |

### Cómo empezar (Get started)

| archivo:línea | texto actual | problema detectado | propuesta | texto nuevo |
|---|---|---|---|---|
| en.ts:284 | `Up and running in four steps.` | Cliché («up and running»). | Reescribir | `Four steps to your first session.` |
| en.ts:316 | `Ready for your next race.` | Cierre de relleno. **Ojo:** es el título del bloque final de descarga. Si lo elimino, el botón queda solo y hay un hueco en el diseño. | Reescribir | `Download it and try it in your next session.` |

### FAQ

| archivo:línea | texto actual | problema detectado | propuesta | texto nuevo |
|---|---|---|---|---|
| en.ts:331 | `It’s optimised to use little CPU and GPU. High-frequency widgets can be turned down from ~60 Hz to save even more.` | Promesa sin dato («optimised to use little CPU and GPU»). | Reescribir con el dato que sí tenemos. Si hay medición de CPU/FPS, ver **[NEEDS INPUT] 1**. | `High-frequency widgets refresh at up to ~60 Hz, and you can turn them down to use less CPU.` |

### Revisado en inglés sin cambios

Revisado y sin slop: `meta.ogAlt`, `nav.*`, `download.*`, `hero.titleA/titleB/sceneLabel`, `wl.*` (etiquetas literales de la app), `gallery.*`, el resto de `features.items` («Local and private», «Configurable widgets», «Layouts», «Lightweight»), `widgets.*` y `panel.control/layouts/comfort/reliability`.

Casos que he mantenido a propósito:

- `widgets.intro` (en.ts:196): «fully configurable» es vago, pero es el texto que pediste tú hace poco («totalmente configurable, no des datos tan específicos»). Lo mantengo.
- `widgets.groups` Standings (en.ts:202): «your battle always in view» suena algo a marketing, pero es una función real (la tabla siempre incluye a tus rivales directos). Lo mantengo.
- `download.tagline` (en.ts:35): «Free · Open source · No account» es una tríada, pero son tres datos reales en formato de etiquetas, no una enumeración por inercia. Lo mantengo.

También sin cambios: el resto de `start.*`, el resto de `faq.items`, `support.*` y `footer.*`.

---

## Español (`website/src/content/es.ts`)

### Metadatos

| archivo:línea | texto actual | problema detectado | propuesta | texto nuevo |
|---|---|---|---|---|
| es.ts:9 | `OpenOverlay — Overlay de telemetría para iRacing, gratis y open source` | Raya como separador (igual que en inglés). Además mide 70 car. (>60). | Reescribir | `OpenOverlay: overlay de telemetría gratis para iRacing` (54 car.) |
| es.ts:11 | `Widgets flotantes sobre iRacing: relative, clasificación, combustible, banderas, clima y más. Gratis, de código abierto (MIT), 100 % local y sin cuenta. Para Windows 10/11.` | Bien. Solo concreto «y más». Mide 172 car. (>155). | Reescribir | `12 widgets flotantes sobre iRacing: relative, clasificación, combustible, banderas, clima y más. Gratis, código abierto (MIT), 100 % local, sin cuenta.` (151 car.; «Windows 10/11» se queda en el texto de la página) |

### Hero

| archivo:línea | texto actual | problema detectado | propuesta | texto nuevo |
|---|---|---|---|---|
| es.ts:49 | `Widgets flotantes sobre el simulador — relative, clasificación, combustible, banderas, clima y más — que configuras en un panel con vista previa en directo.` | Rayas dramáticas. «y más» vago. Incoherencia: aquí dice «en directo» y en el resto de la web «en vivo». | Reescribir | `Relative, clasificación, combustible, banderas, clima y siete widgets más sobre el simulador, que configuras en un panel con vista previa en vivo.` |

### Ventajas

| archivo:línea | texto actual | problema detectado | propuesta | texto nuevo |
|---|---|---|---|---|
| es.ts:158 | `Todo lo que necesitas en pista. Nada que no.` | Fórmula hecha, y «Nada que no» suena a traducción. | Reescribir | `Gratis, y nada sale de tu PC.` |
| es.ts:159 | `Pensado para correr sin distracciones, sin suscripciones y sin que tus datos salgan de tu PC.` | Anáfora de tres («sin… sin… sin»). «sin distracciones» no dice nada. | Reescribir | `Lee la telemetría de iRacing en tu PC y dibuja los widgets encima del simulador.` |
| es.ts:164 | `Licencia MIT. Sin suscripción y sin cuenta: descargas, instalas y corres.` | Tríada final por ritmo. | Reescribir | `Licencia MIT. Sin suscripción y sin cuenta.` |

### Panel de control

| archivo:línea | texto actual | problema detectado | propuesta | texto nuevo |
|---|---|---|---|---|
| es.ts:241 | `Un panel de control que se ve como corres.` | Eslogan vacío. En español además no se entiende bien. | Reescribir | `Todo se configura desde el panel de control.` |

### Cómo empezar

| archivo:línea | texto actual | problema detectado | propuesta | texto nuevo |
|---|---|---|---|---|
| es.ts:316 | `Listo para la próxima carrera.` | Cierre de relleno. Es el título del bloque final: si lo elimino queda un hueco (ver nota en inglés). | Reescribir | `Descárgalo y pruébalo en tu próxima sesión.` |

### FAQ

| archivo:línea | texto actual | problema detectado | propuesta | texto nuevo |
|---|---|---|---|---|
| es.ts:331 | `Está optimizado para usar poca CPU y GPU. Los widgets de alta frecuencia pueden bajarse de ~60 Hz para ahorrar todavía más.` | Promesa sin dato. | Reescribir (ver **[NEEDS INPUT] 1**) | `Los widgets de alta frecuencia se refrescan hasta ~60 Hz, y puedes bajarlos para usar menos CPU.` |

### Revisado en español sin cambios

Revisado y sin slop: `meta.ogAlt`, `nav.*`, `download.*`, `hero.titleA/titleB/sceneLabel`, `wl.*`, `gallery.*`, el resto de `features.items`, `widgets.*`, `panel.*` (salvo el título), `start.*` (salvo el cierre), el resto de `faq.items`, `support.*` y `footer.*`.

- `start.title` (es.ts:284), «En marcha en cuatro pasos.»: en español es una expresión natural y no un calco. Lo mantengo. Solo cambio el inglés.
- `widgets.intro` (es.ts:196): lo mantengo, igual que en inglés, porque es el texto que pediste.

---

## Otros archivos con texto visible

| archivo | texto | resultado |
|---|---|---|
| `website/scripts/og.mjs:34-35` | Imagen OG: «Telemetry overlay for iRacing. Free and open source.» y «Windows 10/11 · No account · 100% local» | Sin slop. Nota: la imagen OG solo existe en inglés y es la misma para `/es/`. No lo cambio porque es fuera de alcance (no es un string de i18n). |
| `website/src/data/heroes.ts:36,47,58` | Títulos de las fotos del hero («Circuit de Nogaro at sunrise», etc.) | Sin slop. |
| `website/src/data/heroes.ts:69` | El crédito se monta como `` `${title} — ${author} (…)` `` | La raya es aquí un separador de crédito, no una pausa dramática, y está en código (plantilla), no en un string de texto. **Excepción justificada**, no se toca. |
| `website/src/components/Gallery.astro:21-32` | Nombres de los widgets («Relative», «Standings»…) | Nombres propios de la app. Sin cambios. |
| `website/src/components/Header.astro`, `Footer.astro`, `Hero.astro` | «OpenOverlay» (marca y `alt` del logo) | Nombre propio. Sin cambios. |
| `website/src/layouts/Base.astro` | Solo lee `meta.*` y `nav.skip` de los archivos de contenido | Cubierto arriba. |
| `website/src/data/preview.ts` | Datos ficticios de los widgets (nombres de pilotos, tiempos) | No es copy. Sin cambios. |

No existen en el proyecto: página 404, manifest, emails, notificaciones ni mensajes de error propios. El único estado alternativo es el CTA «Coming soon / Próximamente», revisado y sin slop.

Strings sin uso: `mock.relative`, `mock.fuel` y `mock.flags` (en.ts y es.ts:54-85) ya no se muestran en ninguna parte (solo se usa `mock.track`). No los toco porque el brief prohíbe tocar claves. Si quieres, los borro aparte en otro commit.

---

## Excepciones a la búsqueda final (grep)

| término | dónde | por qué se mantiene |
|---|---|---|
| `unlock` | Clave i18n `start.widgets.unlock` y el texto «unlock the widgets» (en.ts:306-307) | Es el nombre literal de la función de la app («Unlock widgets» / «Desbloquear widgets»), no el «unlock your potential» del slop. La clave no se puede cambiar. |
| `—` | `heroes.ts:69` (plantilla de código) | Separador del crédito de la foto, en código. |
| `—` | `footer.legal`, `footer.copyright` | No contienen rayas. Se citan solo porque el brief dice que los textos legales no se tocan. |

Textos legales sin tocar (el brief los excluye) y sin slop: `footer.legal`, `footer.copyright`, `footer.privacy`, `footer.credits`.

---

## [NEEDS INPUT]

1. **Consumo real de CPU/FPS** (FAQ «Does it affect FPS? / ¿Afecta a los FPS?» y tarjeta «Lightweight / Ligero»). Si tienes una medición (por ejemplo, «~2 % de CPU con 6 widgets en un i5-12400»), la pongo. Sin ese dato, la propuesta de arriba solo dice lo que sabemos (~60 Hz, ajustable) y no promete nada.

---

## Notas

- `LANDING-PAGE.md` es la «fuente de verdad» del contenido y ya no coincide del todo con la web por los cambios anteriores. Estos cambios aumentan esa diferencia. ¿Quieres que también lo actualice cuando aplique?
- Todas las propuestas son de longitud igual o menor que el original, salvo el subtítulo del hero en español (+3 car.), que no rompe el layout.
- Plan de commits al aplicar (uno por sección): `copy: tighten meta titles and descriptions`, `copy: remove dashes and filler from hero`, `copy: replace slogan and filler in features`, `copy: replace control panel slogan`, `copy: rewrite get started title and closing line`, `copy: drop unsupported performance claim from FAQ`.
