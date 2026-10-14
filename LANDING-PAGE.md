# OpenOverlay: información para la landing page

Documento de referencia para diseñar y construir la web de descarga de OpenOverlay. Todo lo que
aparece aquí sale del código y del repositorio (versión **0.12.0**, 12-oct-2026). Los textos de
la web están en `website/src/content/en.ts` (inglés, idioma por defecto) y `website/src/content/es.ts`
(español). Este documento recoge los textos en español y debe coincidir con ellos.

---

## 1. Identidad

| Campo | Valor |
|---|---|
| Nombre | **OpenOverlay** |
| Qué es | Overlay de telemetría para iRacing, gratuito y de código abierto |
| Versión actual | 0.12.0 (la versión siempre es la primera entrada de `CHANGELOG.md`) |
| Licencia | MIT |
| Repositorio | https://github.com/andreuservera/OpenOverlay |
| Autor / copyright | Carlos Carrasco Alvarez, Andreu Marc Servera Lauder y colaboradores ("OpenOverlay contributors") |
| Plataforma | Windows 10/11 64-bit |
| Tecnología | .NET 10 + WPF |

### Recursos gráficos disponibles

- Logo: `IRacingOverlay.App/Assets/logo.png` y `IRacingOverlay.App/Assets/logo-512.png` (alta resolución).
- Icono / favicon: `IRacingOverlay.App/Assets/icon.ico`.
- Fondo usado en las previsualizaciones de la app: `IRacingOverlay.App/Assets/spa2.jpg` (Spa).
- Capturas de la web (0.12.0, en inglés y en español), sacadas de la vista previa del Panel de control:
  - `website/src/assets/gallery/{en,es}/*.webp`: los 12 widgets, capturados al 200 %, para la Galería de overlays.
  - `website/src/assets/shots/panel-{en,es}.webp`: Panel de control (página de Relative).
  - `website/src/assets/shots/editor-{en,es}.webp`: Editor de layouts.
- `docs/screenshots/` del repositorio de la app **no se usa**: algunas capturas son anteriores al
  rediseño del Panel de control (0.12.0) y del Cockpit modular (0.11.0), y `dashboard.png` muestra una
  función retirada (ver §9).
- Fotos de portada (rotan al recargar): Nogaro y Spa (Unsplash) y una captura de simulador de Carlos
  Carrasco (Porsche GTP en Spa). Cada una lleva su crédito en el pie.

### Paleta de colores (del tema del Panel de control)

El acento ámbar es el color propio del overlay, así la web se verá como el producto.

| Uso | Color |
|---|---|
| Fondo ventana | `#0E1116` |
| Fondo lateral | `#121519` |
| Superficie / tarjeta | `#161A21` |
| Superficie alternativa | `#1B2029` |
| Borde | `#262C36` |
| Texto principal | `#F2F4F7` |
| Texto secundario | `#B4BCC8` |
| Texto apagado | `#8B95A3` |
| **Acento (ámbar)** | **`#FFD24D`**: solo para "activo / seleccionado" y CTAs |
| Estado "en vivo" (verde) | `#3DD68C` |
| Aviso | `#F5A524` |
| Error | `#F26D6D` |

Tipografía: las tablas de tiempos usan **Barlow Semi Condensed** (SIL OFL, disponible en Google
Fonts). En la web se usa para titulares y cifras, con Inter para el texto.

---

## 2. Mensajes clave

**Titular propuesto:** Overlay de telemetría para iRacing. Gratis y de código abierto.

**Subtítulo:** Relative, clasificación, combustible, banderas, clima y siete widgets más sobre el
simulador, que configuras en un panel con vista previa en vivo.

**Título de la sección de argumentos:** Gratis, y nada sale de tu PC.
Entradilla: Lee la telemetría de iRacing en tu PC y dibuja los widgets encima del simulador.

**Argumentos principales:**

1. **Gratis y open source (MIT).** Sin suscripción y sin cuenta.
2. **100 % local y privado.** Ninguna telemetría sale de tu PC: se lee de la memoria compartida de
   iRacing y se dibuja en la propia app.
3. **12 widgets** configurables, con vista previa en vivo de cada cambio.
4. **Layouts** para cambiar de configuración con un clic o un atajo.
5. **Ligero:** pensado para dejarle los FPS a iRacing. Los widgets de alta frecuencia van hasta ~60 Hz,
   o más lento para ahorrar CPU.
6. **Se actualiza solo** en segundo plano.
7. **Seguro:** solo lee la interfaz pública de telemetría que iRacing ofrece a herramientas de
   terceros (la misma que SimHub, CrewChief o RaceLab). No modifica archivos ni memoria del juego.

---

## 3. Descarga

| Campo | Valor |
|---|---|
| Archivo | `OpenOverlay-win-Setup.exe` |
| Enlace directo (última versión) | https://github.com/andreuservera/OpenOverlay/releases/latest/download/OpenOverlay-win-Setup.exe |
| Página de releases | https://github.com/andreuservera/OpenOverlay/releases/latest |
| Comportamiento del botón | Enlace fijo a la última release, sin número de versión. Si la API de GitHub responde que no hay ninguna release (404), el botón pasa a "Próximamente" y enlaza a la página de releases. |
| Generado por | GitHub Actions (`.github/workflows/release.yml`) con Velopack, al publicar un tag `vX.Y.Z` |

Lo que hace el instalador (texto útil junto al botón de descarga):

- Instala en el perfil del usuario: **no necesita permisos de administrador**.
- Incluye el runtime de .NET: **no hay que instalar nada más**.
- Crea accesos directos en el Escritorio y en el menú Inicio.
- Abre la app al terminar.
- Busca actualizaciones en cada arranque y se actualiza sola en segundo plano (parches delta pequeños).

La web **no muestra el número de versión**, para no tener que tocarla en cada release. Solo consulta
`https://api.github.com/repos/andreuservera/OpenOverlay/releases/latest` para saber si hay alguna release.

> Windows SmartScreen puede avisar al ejecutar el instalador (no está firmado). Conviene un FAQ
> que lo explique: "Más información → Ejecutar de todas formas".

---

## 4. Requisitos

- Windows 10 u 11 de 64 bits.
- iRacing instalado.
- Estar dentro de una sesión (práctica, clasificación, carrera o repetición) para ver datos en
  directo; en el menú principal no hay nada que leer.
- **iRacing en modo Sin bordes (Borderless) o Ventana**, no Pantalla completa exclusiva (ver §5).

---

## 5. Primeros pasos (sección "Cómo empezar": "En marcha en cuatro pasos.")

1. **Descarga e instala** `OpenOverlay-win-Setup.exe`.
2. **Pon iRacing en modo Sin bordes.** En iRacing: *Options → Graphics → Display Mode →
   Borderless* (o *Windowed*). Es el paso más importante: la pantalla completa exclusiva no deja que
   ninguna otra ventana se dibuje encima.
3. **Abre tus widgets.** En el panel de control, activa desde la barra lateral los widgets que
   quieras. Cada uno tiene su vista previa en vivo mientras lo configuras. Para colocarlos,
   desbloquea los widgets. Bloqueados, los clics pasan a iRacing: es el modo para correr.
4. **Entra en una sesión.** El estado pasa de *ESPERANDO A IRACING* a en vivo y los widgets
   muestran datos reales.

Cierre de la sección, junto al botón de descarga: "Listo para la próxima carrera."

> No se citan atajos de teclado concretos: cada usuario los configura a su gusto.

---

## 6. Widgets (12)

Entradilla: Muévelos, cambia su tamaño y ajusta cada detalle a tu gusto: el overlay es totalmente configurable.

| Widget | Descripción corta |
|---|---|
| **Relative** | Los coches a tu alrededor en pista, el más cercano primero, con gaps que siguen el ritmo real de cada coche y posiciones en vivo. |
| **Standings** | Pantalla de tiempos clásica: orden y gaps oficiales en meta, etiquetas de pit y penalización en vivo. Agrupada por clase en multiclase, con nº de pilotos y SOF por clase; tu batalla siempre a la vista. |
| **Cockpit** | Dashboard modular: marcha, velocidad, RPM, ABS, combustible, pedales, temperaturas de agua/aceite, reparto de frenada, control de tracción, incidentes y delta, en el orden que elijas; luces de cambio y barras de proximidad opcionales. |
| **Delta** | Diferencia en vivo con tu mejor vuelta de la sesión, tu récord personal o la vuelta óptima. |
| **Fuel calculator** | Combustible restante, consumo por vuelta (último/medio/mín/máx), vueltas restantes, combustible hasta el final y cuánto repostar. |
| **Flags** | Todas las banderas de iRacing, activables una a una, con simulador para previsualizarlas. |
| **Weather** | Cuatro tarjetas: temperatura de pista y aire, humedad, probabilidad de lluvia y estado de la pista, y brújula de viento relativa a tu coche. |
| **Track & session** | Circuito, sesión, temperaturas, viento, humedad, uso de pista, tiempo restante y vuelta. Campos a elegir y ordenar. |
| **Tires** | Temperaturas y desgaste de cada rueda. |
| **Pedal trace** | Gráfica de acelerador, freno y embrague con el ABS marcado; opcionalmente marcha, velocidad y volante. |
| **Incidents** | Tus incidentes, y los de tu equipo en carreras por equipos. |
| **Track map** | La posición de cada coche en la vuelta, coloreada por clase. |

**Columnas de Relative y Standings** (se muestran, ocultan y reordenan arrastrando): posición,
puestos ganados/perdidos desde la salida, dorsal, logo de la marca, bandera del país, piloto, última
parada (vuelta y tiempo en pit lane, p. ej. `L24 | 01:18`), compuesto de neumático, iRating con
ganancia/pérdida estimada, licencia de
seguridad, vuelta, mejor y última vuelta, y gap. Además, información de sesión (tipo, SOF, vueltas,
tiempo, temperaturas, humedad, reparto de frenada, incidentes) en cualquier esquina.

Datos curiosos para la web: **32 logos de marcas** de coche y **198 banderas** de país incluidos.

---

## 7. Otras funciones

Título de la sección: "Todo se configura desde el panel de control."
Entradilla: Configura cada widget con vista previa en vivo y guarda tus configuraciones como layouts.

### Panel de control
- Página de inicio con tu sesión y lo que hay en pantalla.
- Cada widget tiene su página con **vista previa en vivo** de lo que cambias.
- **Buscador** de cualquier ajuste, barra lateral plegable, tamaño de interfaz ajustable y
  restablecer valores por widget.
- **Multidioma:** sigue el idioma de tu Windows y puedes cambiarlo desde los ajustes. En la web no se
  nombran los idiomas, porque habrá más.

### Layouts
- Guarda tus widgets como layouts: posición, tamaño, opacidad, auto-ocultar y ajustes por widget.
- **Editor de layouts** con lienzo a la resolución real del monitor: arrastrar desde el catálogo,
  mover con ratón o flechas, rejilla, orden de apilado, zoom y autoguardado.
- **Exportar e importar** layouts como archivo (para compartirlos).
- Atajo propio por layout y atajos globales para abrir/cerrar, siguiente/anterior y editar.

### Comodidad
- **Auto-ocultar** cuando no conduces (menús, garaje, repeticiones, espectador).
- En modo espectador o repetición, las tablas se centran en el coche que enfoca la cámara.
- **Unidades** según iRacing, o forzar métrico/imperial.
- Icono en la **bandeja del sistema**.

### Fiabilidad
- Si un widget falla, se pausa y se reconstruye solo; el resto sigue funcionando.
- Reconexión automática con iRacing tras un bloqueo o reinicio del simulador.
- Ajustes guardados a prueba de cierres inesperados, con copia de seguridad.
- Logs locales (30 días), **Copiar diagnóstico** y **Exportar informe** (.zip) para reportar bugs.
- Novedades, Changelog y Acerca de dentro de la app; aviso breve tras cada actualización.

---

## 8. FAQ sugerida

- **¿Es gratis?** Sí, totalmente, y de código abierto bajo licencia MIT.
- **¿Puede provocar un baneo / es legal?** Solo lee la interfaz de telemetría que iRacing publica
  para herramientas de terceros, la misma que usan SimHub o CrewChief. No toca archivos ni memoria
  del juego.
- **¿Envía mis datos a algún sitio?** No. Sin cuenta, sin nube; todo se queda en tu PC.
- **No veo los widgets sobre iRacing.** Pon iRacing en modo *Borderless* o *Windowed*.
- **Los widgets no muestran datos.** Tienes que estar dentro de una sesión, no en el menú.
- **¿Cómo actualizo?** No hace falta: se actualiza solo al arrancar.
- **Los neumáticos no cambian en carrera.** En la mayoría de coches iRacing solo actualiza esos
  datos en el box.
- **¿Funciona con otros simuladores?** No, solo iRacing.
- **¿Afecta a los FPS?** Está optimizado para que el juego vaya bien de FPS. Los widgets de alta
  frecuencia se refrescan hasta ~60 Hz, y puedes bajarlos para usar menos CPU.
- **Encontré un bug.** Abre un issue en GitHub adjuntando el informe de *Exportar informe*.

---

## 9. Lo que NO hay que anunciar

El README todavía menciona cosas que ya no existen; la web no debe incluirlas:

- **Dashboard a pantalla completa para segundo monitor:** retirado en 0.12.0 mientras se
  rediseña ("volverá en una versión futura"). Como mucho, mencionarlo como "próximamente".
- **Temas del dashboard** (Classic, Digital HUD, Raw DIY) y temas del Cockpit: retirados.
- **Tamaños XXS–XXXL:** ahora el tamaño es un porcentaje (65–200 %).
- **Widget "Fuel"** independiente: sustituido por Fuel calculator.
- **Atajos de teclado concretos** (`Ctrl+Shift+F10`, etc.): son configurables, así que no se
  presentan como si vinieran así por defecto.
- **Datos demasiado específicos** (escala del 65 al 200 %, precisión del iRating, frecuencia del
  Weather): la web dice que los widgets se mueven, se escalan y se configuran, sin cifras de detalle.

---

## 10. Enlaces del pie de página

- Código fuente: https://github.com/andreuservera/OpenOverlay
- Releases / changelog: https://github.com/andreuservera/OpenOverlay/releases
- Reportar un problema: https://github.com/andreuservera/OpenOverlay/issues
- Contribuir: `CONTRIBUTING.md` del repositorio
- Licencia: MIT
- Botón flotante **Apoyar / Support** (abajo a la derecha): donaciones en https://paypal.me/ccarrascoalv

**Copyright:** © Carlos Carrasco Alvarez, Andreu Marc Servera Lauder y colaboradores (OpenOverlay contributors).

**Créditos de terceros:** YamlDotNet (MIT), Velopack (MIT), SharpVectors (BSD-3-Clause), Barlow
Semi Condensed (SIL OFL), logos de marcas mayoritariamente de Simple Icons (CC0).

**Aviso legal (obligatorio en el pie):**
> OpenOverlay es una herramienta no oficial hecha por aficionados y no está afiliada ni respaldada
> por iRacing Motorsport Simulations. Los logos de las marcas son de sus respectivos propietarios y
> solo se usan para identificar la marca de cada coche.

---

## 11. Estructura de la página publicada

https://ccarrascoalv.github.io/OpenOverlayWeb/ (inglés) y `/es/` (español), con selector de idioma.

1. **Hero:** logo, titular, subtítulo y botón "Descargar para Windows" (enlace directo, sin versión)
   con "Gratis · Open source · Sin cuenta". Al lado, widgets animados (Track & session, Relative,
   Flags y Fuel calculator) sobre una foto de portada que rota.
2. **Argumentos:** 6 tarjetas con los puntos de §2.
3. **Widgets:** la tabla de §6, las columnas de Relative y Standings, y las marcas y banderas.
4. **Panel de control y layouts:** capturas reales del panel y del editor, más Comodidad y Fiabilidad.
5. **Cómo empezar:** los 4 pasos de §5, destacando el modo Borderless.
6. **FAQ:** §8.
7. **Galería de overlays:** pestañas con la captura de cada uno de los 12 widgets.
8. **Pie:** §10, con el crédito de la foto de portada.
9. **Botón flotante "Apoyar"** (PayPal).
