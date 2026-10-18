// All site copy in English (default language). The Spanish version (es.ts) has exactly the same shape.
// Content source of truth: LANDING-PAGE.md. Widget names and app wording follow the app's own
// locale (Assets/Locales/en.json).

export const en = {
  lang: 'en',
  ogLocale: 'en_US',
  meta: {
    title: 'OpenOverlay: free, open-source iRacing overlay for Windows',
    description:
      '12 floating widgets over iRacing: relative, standings, fuel, flags, weather and more. Free, open source (MIT), 100% local, no account. For Windows 10/11.',
    ogAlt: 'OpenOverlay: a free, open-source telemetry overlay for iRacing',
  },

  nav: {
    label: 'Main',
    home: 'OpenOverlay, home',
    links: [
      { href: '#features', label: 'Features' },
      { href: '#widgets', label: 'Widgets' },
      { href: '#panel', label: 'Control panel' },
      { href: '#get-started', label: 'Get started' },
      { href: '#faq', label: 'FAQ' },
    ],
    github: 'GitHub',
    download: 'Download',
    skip: 'Skip to content',
    language: 'Language',
  },

  download: {
    cta: 'Download for Windows',
    ctaSoon: 'Coming soon',
    ctaSoonHint: 'See releases on GitHub',
    tagline: ['Free', 'Open source', 'No account'],
    facts: [
      { strong: 'No admin rights needed', text: 'It installs to your user profile.' },
      { strong: '.NET included', text: 'Nothing else to install.' },
      { strong: 'Updates itself', text: 'Checks for updates on every launch and applies them in the background.' },
    ],
    smartscreen:
      "The installer isn't signed yet, so Windows SmartScreen may warn you when you open it. Click “More info” and then “Run anyway”.",
  },

  hero: {
    titleA: 'Telemetry overlay for iRacing.',
    titleB: 'Free and open source.',
    subtitle:
      'Relative, standings, fuel, flags, weather and seven more widgets over the sim, set up in a control panel with a live preview.',
    sceneLabel: 'Example of OpenOverlay widgets over iRacing, with sample data',
  },

  // Sample data for the mockups. Fictional, for illustration only.
  mock: {
    relative: {
      title: 'Relative',
      session: 'Race',
      sof: 'SOF 2,184',
      rows: [
        { pos: 4, num: '17', brand: 'toyota', flag: 'Germany', name: 'L. Brandt', ir: '2.6k', lic: 'A 3.10', gap: -3.8 },
        { pos: 5, num: '88', brand: 'chevrolet', flag: 'Italy', name: 'M. Ricci', ir: '2.3k', lic: 'B 3.92', gap: -1.4 },
        { pos: 6, num: '7', brand: 'bmw', flag: 'Belgium', name: 'You', ir: '2.1k', lic: 'A 2.85', gap: 0, me: true },
        { pos: 7, num: '23', brand: 'mercedes', flag: 'France', name: 'J. Moreau', ir: '1.9k', lic: 'B 4.10', gap: 0.9 },
        { pos: 8, num: '51', brand: 'ford', flag: 'United_Kingdom', name: 'O. Hale', ir: '2.4k', lic: 'A 3.47', gap: 2.6 },
        { pos: 9, num: '3', brand: 'audi', flag: 'Netherlands', name: 'T. de Vries', ir: '1.7k', lic: 'C 3.02', gap: 4.3 },
      ],
    },
    fuel: {
      title: 'Fuel calculator',
      remaining: 'Remaining',
      perLap: 'Per lap',
      perLapStats: ['Last', 'Avg', 'Min', 'Max'],
      lapsLeft: 'Laps left',
      toFinish: 'To finish',
      refuel: 'Add',
    },
    flags: {
      title: 'Flags',
      states: [
        { id: 'green', label: 'Green', detail: 'Track clear' },
        { id: 'yellow', label: 'Yellow', detail: 'Sector 2 · caution' },
        { id: 'white', label: 'White', detail: 'Final lap' },
        { id: 'checkered', label: 'Checkered', detail: 'Race finished' },
      ],
    },
    track: {
      title: 'Track & session',
      circuit: 'Nogaro',
      session: 'Race',
      trackTemp: 'Track',
      airTemp: 'Air',
      wind: 'Wind',
      humidity: 'Humidity',
      rubber: 'Track usage',
      rubberValue: 'Moderate',
      humidityValue: '54%',
      remaining: 'Remaining',
      lap: 'Lap',
    },
  },

  // Labels drawn inside the widget mockups, as the app shows them (Assets/Locales/en.json).
  wl: {
    lap: 'LAP',
    time: 'TIME',
    race: 'RACE',
    sof: 'SOF',
    leader: 'Leader',
    pit: 'PIT',
    fuelTitle: 'Fuel calculator',
    fuelLeft: 'FUEL LEFT',
    lapsLeft: 'LAPS LEFT',
    perLap: 'PER LAP',
    last: 'LAST',
    avg: 'AVG 10',
    min: 'MIN',
    max: 'MAX',
    toFinish: 'TO FINISH',
    refuel: 'REFUEL',
    kmh: 'KM/H',
    rpm: 'RPM',
    fuelL: 'FUEL L',
    gear: 'GEAR',
    abs: 'ABS',
    bb: 'BB %',
    tc: 'TC',
    inc: 'INC',
    delta: 'DELTA',
    trackTemp: 'TRACK TEMP',
    airTemp: 'AIR TEMP',
    rainChance: 'RAIN CHANCE',
    mostlyDry: 'MOSTLY DRY',
    wind: 'WIND',
    kph: 'KPH',
    flagScenes: [
      [
        { sw: 'yellow', waving: true, name: 'Waving yellow', desc: 'Hazard close by · slow down' },
        { sw: 'debris', name: 'Debris', desc: 'Slippery surface ahead' },
        { sw: 'blue', name: 'Blue flag', desc: 'Faster car behind' },
      ],
      [{ sw: 'green', name: 'Green flag', desc: 'Track clear' }],
      [
        { sw: 'white', name: 'White flag', desc: 'Final lap' },
        { sw: 'blue', name: 'Blue flag', desc: 'Faster car behind' },
      ],
      [{ sw: 'checkered', name: 'Checkered', desc: 'Race finished' }],
    ],
  },

  gallery: {
    title: 'Overlay gallery',
    intro: 'Every widget exactly as OpenOverlay draws it. Pick one to see it up close.',
    tabsLabel: 'Widgets',
    alt: 'The {name} widget, captured from OpenOverlay',
  },

  features: {
    title: 'Free, and nothing leaves your PC.',
    intro: 'It reads iRacing’s telemetry on your PC and draws the widgets on top of the sim.',
    items: [
      {
        figure: '€0',
        title: 'Free and open source',
        text: 'MIT licence. No subscription and no account.',
      },
      {
        figure: '100%',
        title: 'Local and private',
        text: 'No telemetry ever leaves your PC: it’s read from iRacing’s shared memory and drawn by the app itself.',
      },
      {
        figure: 'Read-only',
        title: 'Safe',
        text: 'It uses the public telemetry interface iRacing provides for third-party tools, the same one SimHub, CrewChief and RaceLab use. It never touches game files or memory.',
      },
      {
        figure: '12',
        title: 'Configurable widgets',
        text: 'Every change shows up instantly in the control panel’s live preview.',
      },
      {
        figure: '1 click',
        title: 'Layouts',
        text: 'Switch between setups with one click or a keyboard shortcut.',
      },
      {
        figure: '≤ 60 Hz',
        title: 'Lightweight',
        text: 'Designed to leave the frames to iRacing: high-frequency widgets run at up to ~60 Hz, or slower to save CPU.',
      },
    ],
  },

  widgets: {
    title: '12 widgets. Switch on only the ones you use.',
    intro: 'Move them, resize them and set every detail the way you like: the whole overlay is fully configurable.',
    groups: [
      {
        name: 'Timing and positions',
        items: [
          { name: 'Relative', text: 'The cars around you on track, closest first, with gaps that follow each car’s real pace and live positions.' },
          { name: 'Standings', text: 'A classic timing screen: official order and gaps at the line, live pit and penalty tags. Grouped by class in multiclass, with driver count and SOF per class; your battle always in view.' },
          { name: 'Delta', text: 'Live gap to your best lap of the session, your personal best or the optimal lap.' },
          { name: 'Track map', text: 'Where every car is around the lap, coloured by class.' },
        ],
      },
      {
        name: 'Your car',
        items: [
          { name: 'Cockpit', text: 'A modular dashboard: gear, speed, RPM, ABS, fuel, pedals, water/oil temperatures, brake bias, traction control, incidents and delta, in the order you choose; optional shift lights and proximity bars.' },
          { name: 'Fuel calculator', text: 'Fuel left, usage per lap (last/average/min/max), laps left, fuel to finish and how much to add.' },
          { name: 'Tires', text: 'Temperatures and wear for every tyre.' },
          { name: 'Pedal trace', text: 'A graph of throttle, brake and clutch with ABS marked; optionally gear, speed and steering.' },
        ],
      },
      {
        name: 'Race and conditions',
        items: [
          { name: 'Flags', text: 'Every iRacing flag, each one switchable, with a simulator to preview them.' },
          { name: 'Incidents', text: 'Your incidents, and your team’s in team races.' },
          { name: 'Weather', text: 'Four cards: track and air temperature, humidity, chance of rain and track state, plus a wind compass relative to your car.' },
          { name: 'Track & session', text: 'Track, session, temperatures, wind, humidity, track usage, time remaining and lap. Pick and order the fields.' },
        ],
      },
    ],
    columns: {
      title: 'Your own columns in Relative and Standings',
      text: 'Show, hide and reorder them by dragging.',
      list: [
        'Position', 'Places gained/lost', 'Car number', 'Make', 'Country', 'Driver', 'Last pit stop',
        'Tyre', 'iRating ±', 'Licence', 'Lap', 'Best lap', 'Last lap', 'Gap',
      ],
    },
    brands: {
      title: '32 makes and 198 flags included',
      text: 'Every car shows its make’s logo and its driver’s country flag.',
    },
  },

  panel: {
    title: 'Everything is set up in the control panel.',
    intro: 'Set up every widget with a live preview and save your setups as layouts.',
    control: {
      title: 'Control panel',
      items: [
        'A home page with your session and what’s on screen.',
        'Every widget has its own page with a live preview of what you change.',
        'Search any setting, a foldable sidebar, adjustable interface size and per-widget reset.',
        'Multilingual: it follows your Windows language, and you can switch it from the settings.',
      ],
      alt: 'The OpenOverlay control panel: the Relative page with its columns and the live preview',
    },
    layouts: {
      title: 'Layouts',
      items: [
        'Save your widgets as layouts: position, size, opacity, auto-hide and per-widget settings.',
        'An editor with a canvas at your monitor’s real resolution: drag from the catalogue, move with mouse or arrow keys, grid, stacking order, zoom and autosave.',
        'Export and import layouts as files to share them.',
        'A shortcut per layout, plus global shortcuts to open/close, next/previous and edit.',
      ],
      alt: 'The OpenOverlay layout editor: the widgets on a canvas at the monitor’s resolution, with the selected widget’s properties',
    },
    comfort: {
      title: 'Comfort',
      items: [
        'Auto-hide when you’re not driving: menus, garage, replays or spectating.',
        'In replays or when spectating, the tables follow the car the camera is on.',
        'Units from iRacing, or force metric/imperial.',
        'A system tray icon.',
      ],
    },
    reliability: {
      title: 'Reliability',
      items: [
        'If a widget fails, it pauses and rebuilds itself; everything else keeps running.',
        'Reconnects to iRacing on its own after a crash or a sim restart.',
        'Settings saved safely against unexpected shutdowns, with a backup.',
        'Local logs, “Copy diagnostics” and “Export report” to report bugs.',
      ],
    },
  },

  start: {
    title: 'Four steps to your first session.',
    intro: 'Requirements: 64-bit Windows 10 or 11 and iRacing installed.',
    install: {
      title: 'Download and install',
      text: 'Run OpenOverlay-win-Setup.exe. It installs without admin rights, adds shortcuts to the Desktop and Start menu, and opens the app when it’s done.',
    },
    borderless: {
      title: 'Set iRacing to Borderless',
      keyLabel: 'Key step',
      text: 'This is the most important step: exclusive full screen won’t let any other window draw on top of it.',
      path: ['Options', 'Graphics', 'Display Mode', 'Borderless'],
      pathAlt: 'or Windowed',
    },
    widgets: {
      title: 'Open your widgets',
      text: 'In the control panel, switch on the widgets you want from the sidebar. Each one has a live preview while you set it up.',
      toggles: [
        { name: 'Relative', on: true },
        { name: 'Standings', on: false },
        { name: 'Fuel calculator', on: true },
        { name: 'Flags', on: true },
      ],
      unlock: {
        text: 'To place them, unlock the widgets. Once locked, clicks go through to iRacing: that’s the mode for racing.',
      },
    },
    session: {
      title: 'Join a session',
      text: 'Practice, qualifying, race or replay. The status switches to live and the widgets show real data.',
      statusWaiting: 'Waiting for iRacing',
      statusLive: 'Live',
    },
    closing: 'Ready for your next race.',
  },

  faq: {
    title: 'Frequently asked questions',
    items: [
      { q: 'Is it free?', a: 'Yes, completely, and open source under the MIT licence.' },
      { q: 'Can it get me banned? Is it allowed?', a: 'It only reads the telemetry interface iRacing publishes for third-party tools, the same one SimHub and CrewChief use. It never touches game files or memory.' },
      { q: 'Does it send my data anywhere?', a: 'No. No account, no cloud: everything stays on your PC.' },
      { q: 'Windows SmartScreen warns me when I open the installer.', a: 'The installer isn’t signed yet, and Windows warns about any unsigned program. Click “More info” and then “Run anyway”.' },
      { q: 'I can’t see the widgets over iRacing.', a: 'Set iRacing to Borderless or Windowed in Options → Graphics → Display Mode. Exclusive full screen doesn’t let anything draw on top.' },
      { q: 'The widgets show no data.', a: 'You need to be in a session (practice, qualifying, race or replay). There’s nothing to read in iRacing’s main menu.' },
      { q: 'How do I update?', a: 'You don’t need to: OpenOverlay checks for updates when it starts and updates itself in the background.' },
      { q: 'Tyre data doesn’t change during the race.', a: 'In most cars, iRacing only updates that data when you’re in the pits.' },
      { q: 'Does it work with other sims?', a: 'No, only with iRacing.' },
      { q: 'Does it affect FPS?', a: 'It’s optimised to keep your FPS up. High-frequency widgets refresh at up to ~60 Hz, and you can turn them down to use less CPU.' },
      { q: 'I found a bug.', a: 'Open an issue on GitHub and attach the file from “Export report” (in the control panel).', link: { label: 'Open an issue', key: 'issues' } },
    ],
  },

  support: {
    label: 'Support',
    title: 'Support OpenOverlay with a donation on PayPal (opens in a new tab)',
  },

  footer: {
    tagline: 'A free, open-source telemetry overlay for iRacing.',
    linksTitle: 'Project',
    links: [
      { label: 'Source code', key: 'repo' },
      { label: 'Releases and changelog', key: 'releases' },
      { label: 'Report a problem', key: 'issues' },
      { label: 'Contribute', key: 'contributing' },
      { label: 'MIT licence', key: 'license' },
    ],
    creditsTitle: 'Credits',
    credits: 'YamlDotNet (MIT), Velopack (MIT), SharpVectors (BSD-3-Clause), Barlow Semi Condensed (SIL OFL), car brand logos mostly from Simple Icons (CC0).',
    photoCredit: 'Hero photo:',
    copyright: '© Carlos Carrasco Alvarez, Andreu Marc Servera Lauder and contributors (OpenOverlay contributors).',
    legal:
      'OpenOverlay is an unofficial, fan-made tool and is not affiliated with or endorsed by iRacing Motorsport Simulations. Car brand logos belong to their respective owners and are used only to identify each car’s make.',
    privacy: 'This site uses no cookies, analytics or trackers.',
  },
};

export type Content = typeof en;
