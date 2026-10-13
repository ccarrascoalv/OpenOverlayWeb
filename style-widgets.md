# Estilo de los widgets — OpenOverlay

Especificación del diseño de los widgets de la landing (Relative, Fuel calculator, Flags y Track & session, más el Panel de control). Sirve para llevar el mismo aspecto a la app WPF.

Fuente del código: `website/src/components/WidgetFrame.astro`, `website/src/components/mockups/*.astro` y `website/src/styles/tokens.css`. Las medidas en px suponen 1rem = 16px.

---

## 1. Paleta

### Colores base

| Token | Hex | Uso en los widgets |
|---|---|---|
| `bg` | `#0E1116` | Fondo del widget (con transparencia, ver abajo) y casillas oscuras de la bandera a cuadros |
| `side` | `#121519` | Barra lateral del panel de control |
| `surface` | `#161A21` | Cabecera del widget (con transparencia), tarjetas |
| `surface-alt` | `#1B2029` | Fila del piloto ("Tú"), fondo de la barra de combustible |
| `border` | `#262C36` | Bordes, separadores, recuadro de licencia |
| `text` | `#F2F4F7` | Datos principales: nombres, gaps, cifras |
| `text-2` | `#B4BCC8` | Títulos de widget, posiciones, iRating, logos de marca, subtítulos |
| `text-3` | `#8B95A3` | Etiquetas pequeñas, dorsal, licencia, gap propio |
| `accent` (ámbar) | `#FFD24D` | **Solo** activo/seleccionado: tu posición, elemento activo del menú, interruptores encendidos, widget seleccionado |
| `live` (verde) | `#3DD68C` | Indicador "en vivo", nivel de combustible, bandera verde |
| `warn` | `#F5A524` | Bandera amarilla, "Repostar", marca de combustible necesario |
| `error` | `#F26D6D` | Pérdidas (por ejemplo, delta en rojo) |

### Colores con transparencia

En la web se calculan con `color-mix()`. Abajo está el equivalente en ARGB (`#AARRGGBB`) para WPF.

| Uso | Base y opacidad | ARGB |
|---|---|---|
| Fondo del widget | `bg` al 84 % | `#D60E1116` |
| Cabecera del widget | `surface` al 70 % | `#B3161A21` |
| Borde exterior y separadores de cabecera/pie | `border` al 70 % | `#B3262C36` |
| Separador entre filas (Relative) | `border` al 45 % | `#73262C36` |
| Fila del piloto | `surface-alt` al 92 % | `#EB1B2029` |
| Halo del punto "en vivo" | `live` al 16 % | `#293DD68C` |
| Fondo del elemento activo (menú del panel) | `accent` al 14 % | `#24FFD24D` |
| Sombra del widget | `bg` al 70 % | `#B30E1116` |

> **Opacidad del widget:** la opacidad solo atenúa el **fondo**: se cambia el alfa del color de fondo, nunca la opacidad del elemento entero. Así los datos siguen al 100 % y legibles. El 84 % de arriba es el valor por defecto de la maqueta.

### Reglas de color

- El ámbar no es decorativo: si no está activo o seleccionado, no es ámbar.
- Verde para "en vivo" o "bien" (ganas tiempo, nivel de combustible); rojo (`error`) para "mal" (pierdes tiempo).
- `warn` para atención: precaución, repostar, banderas amarillas.
- Nada de degradados, brillos de neón ni texto con degradado dentro de los widgets.

---

## 2. Tipografía

- **Fuente de los widgets:** Barlow Semi Condensed (SIL OFL), la misma que ya usa la app en las tablas de tiempos. Pesos **500** (normal), **600** (destacado) y **700** (cifras grandes, posiciones).
- **Números tabulares siempre**: todas las cifras con el mismo ancho, para que los gaps y tiempos no "bailen" al cambiar. En la web es `font-variant-numeric: tabular-nums`; en WPF, `Typography.NumeralAlignment="Tabular"` (funciona si la fuente trae cifras tabulares).
- El texto largo de la web usa Inter, pero **dentro de los widgets todo es Barlow Semi Condensed**.
- Los gaps negativos llevan el signo menos tipográfico (`−`, U+2212), no un guion: `−3.8`, `+0.9`, `0.0`. Siempre con un decimal.

### Escala de texto

| Rol | Tamaño | Peso | Estilo | Color |
|---|---|---|---|---|
| Título del widget | 12.8 px | 600 | MAYÚSCULAS, espaciado 0.08em | `text-2` |
| Meta de la cabecera ("Carrera · SOF 2.184") | 12.5 px | 500 | — | `text-3` |
| Fila de tabla (Relative) | 15.2 px | 500 | interlineado 1.2 | `text` |
| Etiqueta de dato ("RESTANTE", "PISTA") | 11.5 px | 500 | MAYÚSCULAS, espaciado 0.06em | `text-3` |
| Cifra grande (combustible restante) | 33.6 px | 700 | interlineado 1 | `text` |
| Unidad junto a la cifra grande ("L") | 15.2 px | 500 | — | `text-3` |
| Cifra media (vueltas restantes) | 24 px | 600 | interlineado 1 | `text` |
| Valor normal (consumos, barra de sesión) | 15.2–16.8 px | 600 | — | `text` |
| Nombre de bandera ("AMARILLA") | 18.4 px | 700 | MAYÚSCULAS, espaciado 0.04em | `text` |
| Detalle de bandera ("Sector 2 · precaución") | 13.6 px | 500 | — | `text-2` |

> WPF no tiene espaciado entre letras en `TextBlock`. Si no puedes aplicarlo, sube un poco el peso de las etiquetas en mayúsculas para compensar.

---

## 3. Marco común del widget

```
┌──────────────────────────────────────────┐  radio 8 px, borde 1 px #B3262C36
│ RELATIVE            Carrera · SOF 2.184 ● │  cabecera: fondo #B3161A21
├──────────────────────────────────────────┤  separador 1 px #B3262C36
│  contenido                                │  fondo #D60E1116
└──────────────────────────────────────────┘  sombra: 0 18 px, desenfoque 40 px, contracción −18 px, #B30E1116
```

| Elemento | Valor |
|---|---|
| Radio de esquina | 8 px |
| Borde | 1 px, `#B3262C36` |
| Fondo | `#D60E1116` (bg al 84 %) |
| Sombra | desplazamiento Y 18 px, desenfoque 40 px, contracción −18 px, `#B30E1116`; suave y solo hacia abajo |
| Cabecera: relleno | 6.4 px vertical × 11.2 px horizontal |
| Cabecera: contenido | título a la izquierda, meta y punto "en vivo" a la derecha, separación 12 px |
| Cuerpo: relleno vertical | 5.6 px |
| Punto "en vivo" | círculo de 7 px `live` con anillo de 3 px `#293DD68C` |

---

## 4. Relative

Tabla con 6 filas: tres coches delante, tú en medio y dos detrás.

### Columnas (de izquierda a derecha)

| Columna | Ancho | Alineación | Estilo |
|---|---|---|---|
| Posición | 25.6 px | derecha | 700, `text-2`; **la tuya en `accent`** |
| Dorsal | 36.8 px | izquierda | "#17", 13.6 px, `text-3` |
| Logo de la marca | 17.6 px (icono de 16 px) | centro | monocromo, `text-2` |
| Bandera del país | 18.4 px (imagen de 17.6 × 11.7 px) | centro | esquinas de 2 px, colores originales |
| Piloto | resto del ancho | izquierda | `text`; si no cabe, termina en "…"; **el tuyo en 700** |
| Licencia | 49.6 px | centro | "A 3.10", 12.8 px, `text-3`, recuadro 1 px `border`, radio 3 px |
| iRating | 36.8 px | derecha | "2.6k", 13.6 px, `text-2` |
| Gap | 46.4 px | derecha | 600, `text`; **el tuyo "0.0" en `text-3`** |

| Elemento | Valor |
|---|---|
| Separación entre columnas | 7.2 px |
| Relleno de cada fila | 4.5 px vertical × 11.2 px horizontal |
| Separador entre filas | 1 px `#73262C36` |
| Tu fila | fondo `#EB1B2029` |
| Ancho total cómodo | unos 360–380 px |

**En pantallas estrechas** (por debajo de 420 px) se oculta la columna Licencia y las columnas se reducen ligeramente.

**Al cambiar un gap**, el valor baja a opacidad 0.55 durante 160 ms y vuelve: es un parpadeo suave que indica que el dato se ha actualizado.

---

## 5. Fuel calculator

```
RESTANTE                    VUELTAS RESTANTES
23.4 L                                    8.6
[████████░░░░░░░░░░░|░░░░░░░░░░░░░░░░░░░░░░]   nivel (verde) + marca de lo necesario (warn)
CONSUMO / VUELTA
ÚLT.    MED.    MÍN.    MÁX.
2.74    2.71    2.66    2.80
──────────────────────────────────────────
HASTA EL FINAL              REPOSTAR
31.2 L                       +7.8 L       ← en warn
```

| Elemento | Valor |
|---|---|
| Relleno | 4.8 px arriba, 12 px a los lados, 7.2 px abajo; 8.8 px entre bloques |
| Restante | cifra de 33.6 px (700) + unidad "L" de 15.2 px |
| Vueltas restantes | 24 px (600), alineado a la derecha |
| Barra del depósito | 6 px de alto, radio 3 px, fondo `surface-alt` |
| Nivel | relleno `live`, proporcional a restante / capacidad |
| Combustible necesario | línea vertical de 2 px `warn` en la posición hasta el final / capacidad |
| Consumos | rejilla de 4 columnas, valores de 16 px (600), etiquetas de 10.6 px |
| Pie | separado por una línea de 1 px `#B3262C36`; 16.8 px (600); "Repostar" en `warn` y alineado a la derecha |

---

## 6. Flags

Muestra la bandera activa: un rectángulo de color y su nombre.

| Elemento | Valor |
|---|---|
| Relleno | 6.4 px arriba, 11.2 px a los lados, 8 px abajo |
| Rectángulo de color | 51 × 35 px, radio 3 px |
| Separación entre rectángulo y texto | 11.2 px |
| Nombre | 18.4 px, 700, MAYÚSCULAS |
| Detalle | 13.6 px, `text-2` |

| Bandera | Color |
|---|---|
| Verde | `live` `#3DD68C` |
| Amarilla | `warn` `#F5A524`, **parpadea**: cada 1 s alterna entre opacidad 1 y 0.25, sin transición |
| Blanca | `text` `#F2F4F7` |
| A cuadros | tablero de casillas de 4.4 px `text` / `bg`, con contorno de 1 px `border` |

**Cambio de bandera:** la nueva aparece con un fundido de 400 ms y sube desde 4 px más abajo; la anterior se desvanece a la vez.

---

## 7. Track & session

Una sola línea con los datos separados por líneas verticales finas.

```
● Spa-Francorchamps │ Carrera │ PISTA 31 °C │ AIRE 19 °C │ VIENTO ➤ 12 km/h │ HUMEDAD 54 % │ USO DE PISTA Moderado │ RESTANTE 00:42:18 │ VUELTA 14
```

| Elemento | Valor |
|---|---|
| Contenedor | mismo fondo, borde, radio y sombra que el marco común, pero sin cabecera |
| Cada dato | relleno 6.7 × 12 px; separador izquierdo de 1 px `#B3262C36` |
| Etiqueta | delante del valor, en la misma línea, 11.5 px MAYÚSCULAS `text-3` |
| Valor | 15.2 px, 600, `text` |
| Circuito | precedido del punto "en vivo" |
| Sesión | en `text-2` |
| Viento | flecha de 12 px en `text-2`, girada según la dirección relativa a tu coche |

Si no cabe, se ocultan datos en este orden: uso de pista, después viento y humedad, después la sesión, después las temperaturas, y por último la vuelta. Nunca se corta un dato por la mitad.

---

## 8. Panel de control (maqueta)

| Elemento | Estilo |
|---|---|
| Barra lateral | fondo `side`, borde derecho 1 px `border` |
| Elemento activo del menú | fondo `#24FFD24D` (ámbar al 14 %), texto `accent`, 600, radio 4 px |
| Buscador | fondo `surface`, borde 1 px `border`, texto `text-3`, radio 4 px |
| Estado "EN VIVO" | `live`, MAYÚSCULAS, espaciado 0.06em, con punto verde |
| Vista previa | recuadro con degradado diagonal sutil de `surface-alt` a `bg`, borde `border`, radio 6 px |
| Deslizador | pista de 4 px `border`, relleno `text-2` (no ámbar: no es un estado activo) |
| Interruptor apagado | pista `border`, botón `text-3` |
| Interruptor encendido | pista `accent`, botón `bg` desplazado a la derecha |
| Widget seleccionado (editor de layouts) | borde `accent`, fondo con un toque de ámbar mezclado, tiradores cuadrados ámbar de 9 px en las esquinas |
| Lienzo del editor | fondo `surface` con rejilla de líneas de 1 px `#B3262C36` |

---

## 9. Movimiento

| Parámetro | Valor |
|---|---|
| Curva estándar | `cubic-bezier(0.22, 1, 0.36, 1)`, una desaceleración suave |
| Duraciones | 150 ms (microcambios), 250 ms (hover, iconos), 400 ms (entradas, cambio de bandera, barra de combustible) |
| Propiedades animadas | solo posición y opacidad; nunca tamaños, para que nada salte de sitio |

Frecuencia de actualización en la maqueta (en la app vendrá de la telemetría):

| Widget | Frecuencia |
|---|---|
| Gaps del Relative | cada 1.1 s |
| Combustible y reloj de sesión | cada 1 s |
| Cambio de bandera | cada 3.8 s |

Con "reducir movimiento" activo en el sistema: sin parpadeos, sin fundidos y con los datos estáticos.

---

## 10. Principios

1. **Los datos mandan.** Los números en `text` y grandes; las etiquetas pequeñas, en mayúsculas y apagadas (`text-3`).
2. **Un solo acento.** El ámbar indica dónde estás o qué está seleccionado; nada más.
3. **El color tiene significado.** El verde, el amarillo y el rojo hablan del estado de la carrera, no decoran.
4. **Líneas finas, sin cajas dentro de cajas.** Las filas se separan con líneas de 1 px, no con tarjetas.
5. **Transparente pero legible.** Se ve el simulador por detrás, pero el texto nunca pierde contraste.
