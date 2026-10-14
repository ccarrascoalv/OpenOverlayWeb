// Textos de la web en español. Tiene exactamente la misma estructura que en.ts (idioma por defecto).
// Fuente de verdad del contenido: LANDING-PAGE.md.
import type { Content } from './en';

export const es: Content = {
  lang: 'es',
  ogLocale: 'es_ES',
  meta: {
    title: 'OpenOverlay: overlay de telemetría gratis para iRacing',
    description:
      '12 widgets flotantes sobre iRacing: relative, clasificación, combustible, banderas, clima y más. Gratis, código abierto (MIT), 100 % local, sin cuenta.',
    ogAlt: 'OpenOverlay: overlay de telemetría para iRacing, gratis y de código abierto',
  },

  nav: {
    label: 'Principal',
    home: 'OpenOverlay, inicio',
    links: [
      { href: '#features', label: 'Ventajas' },
      { href: '#widgets', label: 'Widgets' },
      { href: '#panel', label: 'Panel' },
      { href: '#get-started', label: 'Cómo empezar' },
      { href: '#faq', label: 'FAQ' },
    ],
    github: 'GitHub',
    download: 'Descargar',
    skip: 'Saltar al contenido',
    language: 'Idioma',
  },

  download: {
    cta: 'Descargar para Windows',
    ctaSoon: 'Próximamente',
    ctaSoonHint: 'Ver releases en GitHub',
    tagline: ['Gratis', 'Open source', 'Sin cuenta'],
    facts: [
      { strong: 'Sin permisos de administrador', text: 'Se instala en tu perfil de usuario.' },
      { strong: 'Incluye .NET', text: 'No hay que instalar nada más.' },
      { strong: 'Se actualiza solo', text: 'Busca actualizaciones al arrancar y las aplica en segundo plano.' },
    ],
    smartscreen:
      'El instalador aún no está firmado, así que Windows SmartScreen puede avisarte al abrirlo. Pulsa «Más información» y luego «Ejecutar de todas formas».',
  },

  hero: {
    titleA: 'Overlay de telemetría para iRacing.',
    titleB: 'Gratis y de código abierto.',
    subtitle:
      'Widgets flotantes sobre el simulador — relative, clasificación, combustible, banderas, clima y más — que configuras en un panel con vista previa en directo.',
    sceneLabel: 'Ejemplo de los widgets de OpenOverlay sobre iRacing, con datos de ejemplo',
  },

  // Datos de ejemplo de los mockups. Son ficticios, solo para ilustrar.
  mock: {
    relative: {
      title: 'Relative',
      session: 'Carrera',
      sof: 'SOF 2.184',
      rows: [
        { pos: 4, num: '17', brand: 'toyota', flag: 'Germany', name: 'L. Brandt', ir: '2.6k', lic: 'A 3.10', gap: -3.8 },
        { pos: 5, num: '88', brand: 'chevrolet', flag: 'Italy', name: 'M. Ricci', ir: '2.3k', lic: 'B 3.92', gap: -1.4 },
        { pos: 6, num: '7', brand: 'bmw', flag: 'Belgium', name: 'Tú', ir: '2.1k', lic: 'A 2.85', gap: 0, me: true },
        { pos: 7, num: '23', brand: 'mercedes', flag: 'France', name: 'J. Moreau', ir: '1.9k', lic: 'B 4.10', gap: 0.9 },
        { pos: 8, num: '51', brand: 'ford', flag: 'United_Kingdom', name: 'O. Hale', ir: '2.4k', lic: 'A 3.47', gap: 2.6 },
        { pos: 9, num: '3', brand: 'audi', flag: 'Netherlands', name: 'T. de Vries', ir: '1.7k', lic: 'C 3.02', gap: 4.3 },
      ],
    },
    fuel: {
      title: 'Fuel calculator',
      remaining: 'Restante',
      perLap: 'Consumo / vuelta',
      perLapStats: ['Últ.', 'Med.', 'Mín.', 'Máx.'],
      lapsLeft: 'Vueltas restantes',
      toFinish: 'Hasta el final',
      refuel: 'Repostar',
    },
    flags: {
      title: 'Flags',
      states: [
        { id: 'green', label: 'Verde', detail: 'Pista libre' },
        { id: 'yellow', label: 'Amarilla', detail: 'Sector 2 · precaución' },
        { id: 'white', label: 'Blanca', detail: 'Última vuelta' },
        { id: 'checkered', label: 'A cuadros', detail: 'Fin de carrera' },
      ],
    },
    track: {
      title: 'Track & session',
      circuit: 'Nogaro',
      session: 'Carrera',
      trackTemp: 'Pista',
      airTemp: 'Aire',
      wind: 'Viento',
      humidity: 'Humedad',
      rubber: 'Uso de pista',
      rubberValue: 'Moderado',
      humidityValue: '54 %',
      remaining: 'Restante',
      lap: 'Vuelta',
    },
  },

  // Etiquetas dentro de los mockups de widgets, como las muestra la app (Assets/Locales/es.json).
  wl: {
    lap: 'VTA',
    time: 'TIEMPO',
    race: 'CARRERA',
    sof: 'SOF',
    leader: 'Líder',
    pit: 'BOX',
    fuelTitle: 'Combustible',
    fuelLeft: 'RESTANTE',
    lapsLeft: 'VUELTAS RESTANTES',
    perLap: 'CONSUMO / VUELTA',
    last: 'ÚLTIMA',
    avg: 'MEDIA 10',
    min: 'MÍN',
    max: 'MÁX',
    toFinish: 'PARA ACABAR',
    refuel: 'REPOSTAR',
    kmh: 'KM/H',
    rpm: 'RPM',
    fuelL: 'COMB. L',
    gear: 'MARCHA',
    abs: 'ABS',
    bb: 'BB %',
    tc: 'TC',
    inc: 'INC',
    delta: 'DELTA',
    trackTemp: 'TEMP. PISTA',
    airTemp: 'TEMP. AIRE',
    rainChance: 'PROB. LLUVIA',
    mostlyDry: 'CASI SECA',
    wind: 'VIENTO',
    kph: 'KM/H',
    flagScenes: [
      [
        { sw: 'yellow', waving: true, name: 'Amarilla agitada', desc: 'Peligro cerca · reduce' },
        { sw: 'debris', name: 'Residuos', desc: 'Superficie deslizante adelante' },
        { sw: 'blue', name: 'Bandera azul', desc: 'Coche más rápido detrás' },
      ],
      [{ sw: 'green', name: 'Bandera verde', desc: 'Pista libre' }],
      [
        { sw: 'white', name: 'Bandera blanca', desc: 'Última vuelta' },
        { sw: 'blue', name: 'Bandera azul', desc: 'Coche más rápido detrás' },
      ],
      [{ sw: 'checkered', name: 'A cuadros', desc: 'Fin de carrera' }],
    ],
  },

  gallery: {
    title: 'Galería de overlays',
    intro: 'Cada widget exactamente como lo dibuja OpenOverlay. Elige uno para verlo de cerca.',
    tabsLabel: 'Widgets',
    alt: 'El widget {name}, capturado de OpenOverlay',
  },

  features: {
    title: 'Todo lo que necesitas en pista. Nada que no.',
    intro: 'Pensado para correr sin distracciones, sin suscripciones y sin que tus datos salgan de tu PC.',
    items: [
      {
        figure: '0 €',
        title: 'Gratis y open source',
        text: 'Licencia MIT. Sin suscripción y sin cuenta: descargas, instalas y corres.',
      },
      {
        figure: '100 %',
        title: 'Local y privado',
        text: 'Ninguna telemetría sale de tu PC: se lee de la memoria compartida de iRacing y se dibuja en la propia app.',
      },
      {
        figure: 'Solo lectura',
        title: 'Seguro',
        text: 'Usa la interfaz pública de telemetría que iRacing ofrece a herramientas de terceros, la misma que SimHub, CrewChief o RaceLab. No modifica archivos ni memoria del juego.',
      },
      {
        figure: '12',
        title: 'Widgets configurables',
        text: 'Cada cambio se ve al instante en la vista previa en vivo del panel de control.',
      },
      {
        figure: '1 clic',
        title: 'Layouts',
        text: 'Cambia de configuración con un clic o con un atajo de teclado.',
      },
      {
        figure: '≤ 60 Hz',
        title: 'Ligero',
        text: 'Pensado para dejarle los FPS a iRacing: los widgets de alta frecuencia van hasta ~60 Hz, o más lento para ahorrar CPU.',
      },
    ],
  },

  widgets: {
    title: '12 widgets. Activa solo los que uses.',
    intro: 'Muévelos, cambia su tamaño y ajusta cada detalle a tu gusto: el overlay es totalmente configurable.',
    groups: [
      {
        name: 'Tiempos y posiciones',
        items: [
          { name: 'Relative', text: 'Los coches a tu alrededor en pista, el más cercano primero, con gaps que siguen el ritmo real de cada coche y posiciones en vivo.' },
          { name: 'Standings', text: 'Pantalla de tiempos clásica: orden y gaps oficiales en meta, etiquetas de pit y penalización en vivo. Agrupada por clase en multiclase, con nº de pilotos y SOF por clase; tu batalla siempre a la vista.' },
          { name: 'Delta', text: 'Diferencia en vivo con tu mejor vuelta de la sesión, tu récord personal o la vuelta óptima.' },
          { name: 'Track map', text: 'La posición de cada coche en la vuelta, coloreada por clase.' },
        ],
      },
      {
        name: 'Tu coche',
        items: [
          { name: 'Cockpit', text: 'Dashboard modular: marcha, velocidad, RPM, ABS, combustible, pedales, temperaturas de agua/aceite, reparto de frenada, control de tracción, incidentes y delta, en el orden que elijas; luces de cambio y barras de proximidad opcionales.' },
          { name: 'Fuel calculator', text: 'Combustible restante, consumo por vuelta (último/medio/mín/máx), vueltas restantes, combustible hasta el final y cuánto repostar.' },
          { name: 'Tires', text: 'Temperaturas y desgaste de cada rueda.' },
          { name: 'Pedal trace', text: 'Gráfica de acelerador, freno y embrague con el ABS marcado; opcionalmente marcha, velocidad y volante.' },
        ],
      },
      {
        name: 'Carrera y entorno',
        items: [
          { name: 'Flags', text: 'Todas las banderas de iRacing, activables una a una, con simulador para previsualizarlas.' },
          { name: 'Incidents', text: 'Tus incidentes, y los de tu equipo en carreras por equipos.' },
          { name: 'Weather', text: 'Cuatro tarjetas: temperatura de pista y aire, humedad, probabilidad de lluvia y estado de la pista, y brújula de viento relativa a tu coche.' },
          { name: 'Track & session', text: 'Circuito, sesión, temperaturas, viento, humedad, uso de pista, tiempo restante y vuelta. Campos a elegir y ordenar.' },
        ],
      },
    ],
    columns: {
      title: 'Columnas a tu medida en Relative y Standings',
      text: 'Se muestran, ocultan y reordenan arrastrando.',
      list: [
        'Posición', 'Puestos ganados/perdidos', 'Dorsal', 'Marca', 'País', 'Piloto', 'Última parada',
        'Neumático', 'iRating ±', 'Licencia', 'Vuelta', 'Mejor vuelta', 'Última vuelta', 'Gap',
      ],
    },
    brands: {
      title: '32 marcas y 198 banderas incluidas',
      text: 'Cada coche lleva el logo de su marca y la bandera del país de su piloto.',
    },
  },

  panel: {
    title: 'Un panel de control que se ve como corres.',
    intro: 'Configura cada widget con vista previa en vivo y guarda tus configuraciones como layouts.',
    control: {
      title: 'Panel de control',
      items: [
        'Página de inicio con tu sesión y lo que hay en pantalla.',
        'Cada widget tiene su página con vista previa en vivo de lo que cambias.',
        'Buscador de cualquier ajuste, barra lateral plegable, tamaño de interfaz ajustable y restablecer valores por widget.',
        'Multidioma: sigue el idioma de tu Windows y puedes cambiarlo desde los ajustes.',
      ],
      alt: 'El panel de control de OpenOverlay: la página de Relative con sus columnas y la vista previa en vivo',
    },
    layouts: {
      title: 'Layouts',
      items: [
        'Guarda tus widgets como layouts: posición, tamaño, opacidad, auto-ocultar y ajustes por widget.',
        'Editor con lienzo a la resolución real del monitor: arrastra desde el catálogo, mueve con ratón o flechas, rejilla, orden de apilado, zoom y autoguardado.',
        'Exporta e importa layouts como archivo para compartirlos.',
        'Atajo propio por layout y atajos globales para abrir/cerrar, siguiente/anterior y editar.',
      ],
      alt: 'El editor de layouts de OpenOverlay: los widgets sobre un lienzo a la resolución del monitor, con las propiedades del widget seleccionado',
    },
    comfort: {
      title: 'Comodidad',
      items: [
        'Auto-ocultar cuando no conduces: menús, garaje, repeticiones o espectador.',
        'En repetición o como espectador, las tablas se centran en el coche que enfoca la cámara.',
        'Unidades según iRacing, o métrico/imperial a la fuerza.',
        'Icono en la bandeja del sistema.',
      ],
    },
    reliability: {
      title: 'Fiabilidad',
      items: [
        'Si un widget falla, se pausa y se reconstruye solo; el resto sigue funcionando.',
        'Se reconecta solo con iRacing tras un bloqueo o reinicio del simulador.',
        'Ajustes guardados a prueba de cierres inesperados, con copia de seguridad.',
        'Logs locales, «Copiar diagnóstico» y «Exportar informe» para reportar bugs.',
      ],
    },
  },

  start: {
    title: 'En marcha en cuatro pasos.',
    intro: 'Requisitos: Windows 10 u 11 de 64 bits e iRacing instalado.',
    install: {
      title: 'Descarga e instala',
      text: 'Ejecuta OpenOverlay-win-Setup.exe. Se instala sin permisos de administrador, crea accesos directos en el Escritorio y el menú Inicio, y abre la app al terminar.',
    },
    borderless: {
      title: 'Pon iRacing en modo Sin bordes',
      keyLabel: 'Paso clave',
      text: 'Es el paso más importante: la pantalla completa exclusiva no deja que ninguna otra ventana se dibuje encima.',
      path: ['Options', 'Graphics', 'Display Mode', 'Borderless'],
      pathAlt: 'o Windowed',
    },
    widgets: {
      title: 'Abre tus widgets',
      text: 'En el panel de control, activa desde la barra lateral los widgets que quieras. Cada uno tiene su vista previa en vivo mientras lo configuras.',
      toggles: [
        { name: 'Relative', on: true },
        { name: 'Standings', on: false },
        { name: 'Fuel calculator', on: true },
        { name: 'Flags', on: true },
      ],
      unlock: {
        text: 'Para colocarlos, desbloquea los widgets. Bloqueados, los clics pasan a iRacing: es el modo para correr.',
      },
    },
    session: {
      title: 'Entra en una sesión',
      text: 'Práctica, clasificación, carrera o repetición. El estado pasa a en vivo y los widgets muestran datos reales.',
      statusWaiting: 'Esperando a iRacing',
      statusLive: 'En vivo',
    },
    closing: 'Listo para la próxima carrera.',
  },

  faq: {
    title: 'Preguntas frecuentes',
    items: [
      { q: '¿Es gratis?', a: 'Sí, totalmente, y de código abierto bajo licencia MIT.' },
      { q: '¿Puede provocar un baneo? ¿Es legal?', a: 'Solo lee la interfaz de telemetría que iRacing publica para herramientas de terceros, la misma que usan SimHub o CrewChief. No toca archivos ni memoria del juego.' },
      { q: '¿Envía mis datos a algún sitio?', a: 'No. Sin cuenta, sin nube: todo se queda en tu PC.' },
      { q: 'Windows SmartScreen me avisa al abrir el instalador.', a: 'El instalador todavía no está firmado y Windows avisa con cualquier programa sin firma. Pulsa «Más información» y después «Ejecutar de todas formas».' },
      { q: 'No veo los widgets sobre iRacing.', a: 'Pon iRacing en modo Borderless (Sin bordes) o Windowed: en Options → Graphics → Display Mode. La pantalla completa exclusiva no deja que nada se dibuje encima.' },
      { q: 'Los widgets no muestran datos.', a: 'Tienes que estar dentro de una sesión (práctica, clasificación, carrera o repetición). En el menú principal de iRacing no hay nada que leer.' },
      { q: '¿Cómo actualizo?', a: 'No hace falta: OpenOverlay busca actualizaciones al arrancar y se actualiza solo en segundo plano.' },
      { q: 'Los neumáticos no cambian en carrera.', a: 'En la mayoría de coches, iRacing solo actualiza esos datos cuando pasas por el box.' },
      { q: '¿Funciona con otros simuladores?', a: 'No, solo con iRacing.' },
      { q: '¿Afecta a los FPS?', a: 'Está optimizado para usar poca CPU y GPU. Los widgets de alta frecuencia pueden bajarse de ~60 Hz para ahorrar todavía más.' },
      { q: 'He encontrado un bug.', a: 'Abre un issue en GitHub y adjunta el archivo de «Exportar informe» (en el panel de control).', link: { label: 'Abrir un issue', key: 'issues' } },
    ],
  },

  support: {
    label: 'Apoyar',
    title: 'Apoya OpenOverlay con una donación en PayPal (se abre en una pestaña nueva)',
  },

  footer: {
    tagline: 'Overlay de telemetría para iRacing, gratis y de código abierto.',
    linksTitle: 'Proyecto',
    links: [
      { label: 'Código fuente', key: 'repo' },
      { label: 'Releases y changelog', key: 'releases' },
      { label: 'Reportar un problema', key: 'issues' },
      { label: 'Contribuir', key: 'contributing' },
      { label: 'Licencia MIT', key: 'license' },
    ],
    creditsTitle: 'Créditos',
    credits: 'YamlDotNet (MIT), Velopack (MIT), SharpVectors (BSD-3-Clause), Barlow Semi Condensed (SIL OFL), logos de marcas mayoritariamente de Simple Icons (CC0).',
    photoCredit: 'Foto de portada:',
    copyright: '© Carlos Carrasco Alvarez, Andreu Marc Servera Lauder y colaboradores (OpenOverlay contributors).',
    legal:
      'OpenOverlay es una herramienta no oficial hecha por aficionados y no está afiliada ni respaldada por iRacing Motorsport Simulations. Los logos de las marcas son de sus respectivos propietarios y solo se usan para identificar la marca de cada coche.',
    privacy: 'Esta web no usa cookies, analítica ni rastreadores.',
  },
};
