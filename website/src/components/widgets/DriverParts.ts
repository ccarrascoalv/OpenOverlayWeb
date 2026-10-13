// Piezas compartidas por Relative y Standings: logos de marca, banderas y formatos.
// Los logos se pintan con mask-image sobre un archivo (se descarga una vez y queda en caché) en
// lugar de incrustar el SVG en cada fila: algunos pesan más de 20 KB.
const brands = import.meta.glob<string>('../../assets/brands/*.svg', { eager: true, query: '?url', import: 'default' });
const flags = import.meta.glob<string>('../../assets/flags-sm/*.webp', { eager: true, query: '?url', import: 'default' });

// Como en la app, cada logo se ajusta a su celda: McLaren solo ocupa una esquina de su caja de 24.
const maskFix: Record<string, string> = { mclaren: '--logo-size:400%;--logo-pos:93% 40%;' };

export const brandStyle = (key: string) => `--logo:url("${brands[`../../assets/brands/${key}.svg`]}");${maskFix[key] ?? ''}`;

export const flagUrl = (key: string) => flags[`../../assets/flags-sm/${key}.webp`];

export const licClass = (lic: string) => `lic-${lic.trim()[0].toLowerCase()}`;

export const fmtGap = (g: number) => (Math.abs(g) < 0.05 ? '0.0' : `${g > 0 ? '+' : '−'}${Math.abs(g).toFixed(1)}`);
