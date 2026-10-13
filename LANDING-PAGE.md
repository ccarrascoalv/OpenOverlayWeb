# OpenOverlay — Información para la landing page

Documento de referencia para diseñar y construir la web de descarga de OpenOverlay. Todo lo que
aparece aquí sale del código y del repositorio (versión **0.12.0**, 12-oct-2026). Los textos de
marketing propuestos están en español; la app está disponible en inglés y español.

---

## 1. Identidad

| Campo | Valor |
|---|---|
| Nombre | **OpenOverlay** |
| Qué es | Overlay de telemetría para iRacing, gratuito y de código abierto |
| Versión actual | 0.12.0 (la versión siempre es la primera entrada de `CHANGELOG.md`) |
| Licencia | MIT |
| Repositorio | https://github.com/andreuservera/OpenOverlay |
| Autor / copyright | Andreu Marc Servera Lauder y colaboradores ("OpenOverlay contributors") |
| Plataforma | Windows 10/11 64-bit |
| Tecnología | .NET 10 + WPF |

### Recursos gráficos disponibles

- Logo: `IRacingOverlay.App/Assets/logo.png` y `IRacingOverlay.App/Assets/logo-512.png` (alta resolución).
- Icono / favicon: `IRacingOverlay.App/Assets/icon.ico`.
- Fondo usado en las previsualizaciones de la app: `IRacingOverlay.App/Assets/spa2.jpg` (Spa).
- Capturas: `docs/screenshots/` (renderizadas por la propia app con datos de ejemplo):
  - `floating-widgets.png` — widgets flotantes sobre el simulador (buena imagen *hero*)
  - `timing-tables.png` — Standings y Relative
  - `cockpit.png` — configuraciones del Cockpit
  - `weather.png` — Weather y Track & session
  - `widgets.png` — Fuel calculator, Flags, Tires, Pedal trace, Delta, Incidents y Track map
  - `control-panel.png` — Panel de control
  - `layout-editor.png` — Editor de layouts
  - `dashboard.png` — **no usar**: el dashboard de segundo monitor está retirado (ver §9)

> ⚠️ Las capturas `control-panel.png` y `cockpit.png` pueden ser anteriores al rediseño del Panel de
> control (0.12.0) y del Cockpit modular (0.11.0). Conviene regenerarlas antes de publicar la web.

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
| **Acento (ámbar)** | **`#FFD24D`** — solo para "activo / seleccionado" y CTAs |
| Estado "en vivo" (verde) | `#3DD68C` |
| Aviso | `#F5A524` |
| Error | `#F26D6D` |

Tipografía: las tablas de tiempos usan **Barlow Semi Condensed** (SIL OFL, disponible en Google
Fonts) — encaja bien para titulares o cifras de la web.

---

## 2. Mensajes clave

**Titular propuesto:** Overlay de telemetría para iRacing. Gratis y de código abierto.

**Subtítulo:** Widgets flotantes sobre el simulador — relative, clasificación, combustible, banderas,
clima y más — que configuras en un panel con vista previa en directo.

**Argumentos principales:**

1. **Gratis y open source (MIT).** Sin suscripción, sin cuenta.
2. **100 % local y privado.** Ninguna telemetría sale de tu PC: se lee de la memoria compartida de
   iRacing y se dibuja en la propia app.
3. **12 widgets** configurables, con vista previa en vivo de cada cambio.
4. **Layouts** para cambiar de configuración con un clic o un atajo.
5. **Ligero:** pensado para dejar FPS a iRacing; los widgets de alta frecuencia van hasta ~60 Hz o
   más lento para ahorrar CPU.
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
| Generado por | GitHub Actions (`.github/workflows/release.yml`) con Velopack, al publicar un tag `vX.Y.Z` |

Lo que hace el instalador (texto útil junto al botón de descarga):

- Instala en el perfil del usuario — **no necesita permisos de administrador**.
- Incluye el runtime de .NET — **no hay que instalar nada más**.
- Crea accesos directos en el Escritorio y en el menú Inicio.
- Abre la app al terminar.
- Busca actualizaciones en cada arranque y se actualiza sola en segundo plano (parches delta pequeños).

Para mostrar la versión actual dinámicamente en la web se puede consultar la API de GitHub:
`https://api.github.com/repos/andreuservera/OpenOverlay/releases/latest` (campo `tag_name`).

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

## 5. Primeros pasos (sección "Cómo empezar")

1. **Descarga e instala** `OpenOverlay-win-Setup.exe`.
2. **Pon iRacing en modo Sin bordes.** En iRacing: *Options → Graphics → Display Mode →
   Borderless* (o *Windowed*). Es el paso más importante: la pantalla completa exclusiva no deja que
   ninguna otra ventana se dibuje encima.
3. **Elige un preset en el asistente.** En el primer arranque se abre un asistente: eliges el
   monitor y un preset, y los widgets se colocan solos:
   - **Esencial** — Relative, Cockpit y Flags: "quién está a tu alrededor, tu coche y las banderas".
   - **Completo** — Relative, Standings, Track map, Flags, Cockpit, Tires, Fuel calculator, Delta y
     Track & session: "un fin de semana de carreras completo".
   - **Streamer** — Relative, Standings, Track map, Flags, Incidents, Track & session y Weather:
     "lo que siguen los espectadores".
4. **Entra en una sesión.** El estado pasa de *ESPERANDO A IRACING* a en vivo y los widgets
   muestran datos reales.

Mover widgets: botón **Desbloquear widgets** o `Ctrl+Shift+F10`. Bloqueados, los clics pasan a
iRacing (es el modo para correr).

---

## 6. Widgets (12)

| Widget | Descripción corta |
|---|---|
| **Relative** | Los coches a tu alrededor en pista, el más cercano primero, con gaps que siguen el ritmo real de cada coche (también en multiclase y tras paradas) y posiciones en vivo: un adelantamiento se ve al instante. |
| **Standings** | Pantalla de tiempos clásica: orden y gaps oficiales en meta, etiquetas de pit y penalización en vivo. Agrupada por clase en multiclase, con nº de pilotos y SOF por clase; tu batalla siempre a la vista. |
| **Cockpit** | Dashboard modular: marcha, velocidad, RPM, ABS, combustible, pedales, temperaturas de agua/aceite, reparto de frenada, control de tracción, incidentes y delta, en el orden que elijas; luces de cambio y barras de proximidad opcionales. |
| **Delta** | Diferencia en vivo con tu mejor vuelta de la sesión, tu récord personal o la vuelta óptima; verde cuando ganas tiempo, rojo cuando pierdes. |
| **Fuel calculator** | Combustible restante, consumo por vuelta (último/medio/mín/máx), vueltas restantes, combustible hasta el final y cuánto repostar. Funciona en carreras por tiempo e ignora repostajes y vueltas de salida. |
| **Flags** | Todas las banderas de iRacing (estado de pista, banderas para ti, progreso de carrera y avisos), activables una a una, con simulador para previsualizarlas. |
| **Weather** | Cuatro tarjetas: temperatura de pista y aire, humedad, probabilidad de lluvia y estado de la pista, y brújula de viento relativa a tu coche (10–60 Hz). |
| **Track & session** | Barra de una línea: circuito, sesión, temperaturas, viento, humedad, uso de pista, tiempo restante y vuelta. Campos a elegir y ordenar. |
| **Tires** | Temperaturas y desgaste de cada rueda. |
| **Pedal trace** | Gráfica de acelerador, freno y embrague con el ABS marcado; opcionalmente marcha, velocidad y volante. |
| **Incidents** | Tus incidentes, y los de tu equipo en carreras por equipos. |
| **Track map** | La posición de cada coche en la vuelta, coloreada por clase. |

**Columnas de Relative y Standings** (se muestran, ocultan y reordenan arrastrando): posición,
puestos ganados/perdidos desde la salida, dorsal, logo de la marca, bandera del país, piloto, última
parada (vuelta y tiempo en pit lane, p. ej. `L24 | 01:18`), compuesto de neumático, iRating con
ganancia/pérdida estimada (a menos de ~1 punto de la de iRacing, calculada por clase), licencia de
seguridad, vuelta, mejor y última vuelta, y gap. Además, información de sesión (tipo, SOF, vueltas,
tiempo, temperaturas, humedad, reparto de frenada, incidentes) en cualquier esquina.

Datos curiosos para la web: **32 logos de marcas** de coche y **198 banderas** de país incluidos.

---

## 7. Otras funciones

### Panel de control
- Página de inicio con tu sesión y lo que hay en pantalla.
- Cada widget tiene su página con **vista previa en vivo** de lo que cambias.
- **Buscador** de cualquier ajuste, barra lateral plegable, tamaño de interfaz ajustable y
  restablecer valores por widget.
- **Idiomas:** inglés y español (automático según Windows). Añadir uno nuevo es un solo archivo.

### Layouts
- Guarda tus widgets como layouts: posición, tamaño, opacidad, auto-ocultar y ajustes por widget.
- **Editor de layouts** con lienzo a la resolución real del monitor: arrastrar desde el catálogo,
  mover con ratón o flechas, rejilla, orden de apilado, zoom y autoguardado.
- **Exportar e importar** layouts como archivo (para compartirlos).
- Atajo propio por layout y atajos globales para abrir/cerrar, siguiente/anterior y editar.

### Comodidad
- **Atajos globales** (todos configurables): mostrar/ocultar overlays `Ctrl+Shift+F9`,
  desbloquear widgets `Ctrl+Shift+F10`, panel de control `Ctrl+Shift+F11`, reiniciar overlays
  `Ctrl+Shift+F8`.
- **Tamaño** de cada widget del 65 % al 200 %; todo escala en proporción, nunca se recorta.
- **Opacidad** por widget que solo atenúa el fondo: los datos siguen legibles.
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
- **¿Afecta a los FPS?** Está optimizado para usar poca CPU/GPU; los widgets de alta frecuencia
  pueden bajarse de ~60 Hz para ahorrar más.
- **Encontré un bug.** Abre un issue en GitHub adjuntando el informe de *Exportar informe*.

---

## 9. Lo que NO hay que anunciar

El README todavía menciona cosas que ya no existen; la web no debe incluirlas:

- **Dashboard a pantalla completa para segundo monitor:** retirado en 0.12.0 mientras se
  rediseña ("volverá en una versión futura"). Como mucho, mencionarlo como "próximamente".
- **Temas del dashboard** (Classic, Digital HUD, Raw DIY) y temas del Cockpit: retirados.
- **Tamaños XXS–XXXL:** ahora el tamaño es un porcentaje (65–200 %).
- **Widget "Fuel"** independiente: sustituido por Fuel calculator.

---

## 10. Enlaces del pie de página

- Código fuente: https://github.com/andreuservera/OpenOverlay
- Releases / changelog: https://github.com/andreuservera/OpenOverlay/releases
- Reportar un problema: https://github.com/andreuservera/OpenOverlay/issues
- Contribuir: `CONTRIBUTING.md` del repositorio
- Licencia: MIT

**Créditos de terceros:** YamlDotNet (MIT), Velopack (MIT), SharpVectors (BSD-3-Clause), Barlow
Semi Condensed (SIL OFL), logos de marcas mayoritariamente de Simple Icons (CC0).

**Aviso legal (obligatorio en el pie):**
> OpenOverlay es una herramienta no oficial hecha por aficionados y no está afiliada ni respaldada
> por iRacing Motorsport Simulations. Los logos de las marcas son de sus respectivos propietarios y
> solo se usan para identificar la marca de cada coche.

---

## 11. Estructura de página sugerida

1. **Hero** — logo, titular, subtítulo, botón "Descargar para Windows" (enlace directo) con la
   versión y "Gratis · Open source · Sin cuenta". Imagen: `floating-widgets.png`.
2. **Argumentos** — 4–6 tarjetas con los puntos de §2.
3. **Widgets** — galería con `timing-tables.png`, `cockpit.png`, `weather.png`, `widgets.png` y
   la tabla de §6.
4. **Panel de control y layouts** — `control-panel.png`, `layout-editor.png`.
5. **Cómo empezar** — los 4 pasos de §5, destacando el modo Borderless.
6. **FAQ** — §8.
7. **Pie** — §10.
