import { readFileSync, writeFileSync } from 'node:fs';

const file = 'index.html';
let html = readFileSync(file, 'utf8');

const startToken = '                <div id="obra-grid"';
const endToken = '                </div>\n            </div>\n        </section>';

const start = html.indexOf(startToken);
if (start === -1) throw new Error('No se encontró el inicio de la galería');
const end = html.indexOf(endToken, start);
if (end === -1) throw new Error('No se encontró el cierre de la galería');

const tiles = [
  {
    span: 'col-span-2 row-span-2',
    cat: 'techos',
    category: 'Techos exteriores',
    caption: 'Cubierta de chapa metálica terminada, con la ciudad de Bahía Blanca al atardecer.',
    src: 'images/techo_chapas1.jpg',
    w: 1350,
    h: 899,
    alt: 'Cubierta de chapa metálica de gran superficie, terminada y lista, con la ciudad de Bahía Blanca al fondo.',
    label: 'Techos exteriores',
  },
  {
    span: 'col-span-1 row-span-2',
    cat: 'tanques',
    category: 'Tanques',
    caption: 'Batería de tanques instalada y puesta en servicio.',
    src: 'images/tanques4.jpg',
    w: 720,
    h: 480,
    alt: 'Batería de tanques negros instalados en un recinto de mampostería.',
    label: 'Tanques',
  },
  {
    span: 'col-span-1 row-span-2',
    cat: 'ventilacion',
    category: 'Ventilación',
    caption: 'Extracción de aire en cubierta: conducto y terminación.',
    src: 'images/ventilacion3.jpg',
    w: 720,
    h: 1008,
    alt: 'Conducto de extracción de aire instalado sobre una cubierta metálica.',
    label: 'Ventilación',
  },
  {
    span: 'col-span-2',
    cat: 'techos',
    category: 'Techos exteriores',
    caption: 'Impermeabilización de cubierta en ejecución, con la ciudad al fondo.',
    src: 'images/techo_chapas4.jpg',
    w: 1184,
    h: 790,
    alt: 'Colocación de membrana asfáltica sobre una cubierta plana, con la ciudad de Bahía Blanca al fondo.',
    label: 'Techos exteriores',
  },
  {
    span: 'col-span-1',
    cat: 'interiores',
    category: 'Techos interiores',
    caption: 'Cielorraso interior terminado.',
    src: 'images/techo4.jpg',
    w: 1077,
    h: 718,
    alt: 'Cielorraso interior terminado con placas y luminarias.',
    label: 'Interiores',
  },
  {
    span: 'col-span-1',
    cat: 'interiores',
    category: 'Techos interiores',
    caption: 'Techo interior con aislación y luminarias.',
    src: 'images/techo3.jpg',
    w: 1077,
    h: 718,
    alt: 'Techo interior con aislación y luminarias instaladas.',
    label: 'Interiores',
  },
  {
    span: 'col-span-1',
    cat: 'interiores',
    category: 'Techos interiores',
    caption: 'Cielorraso nuevo bajo la estructura original.',
    src: 'images/techo5.jpg',
    w: 1077,
    h: 718,
    alt: 'Cielorraso de placas instalado bajo la estructura original de madera y ladrillo.',
    label: 'Interiores',
  },
  {
    span: 'col-span-1',
    cat: 'ventilacion',
    category: 'Ventilación',
    caption: 'Salida de extracción sobre cubierta de chapa.',
    src: 'images/ventilacion5.jpg',
    w: 720,
    h: 1008,
    alt: 'Caño de extracción de aire con sombrerete instalado sobre una cubierta de chapa.',
    label: 'Ventilación',
  },
  {
    span: 'col-span-1',
    cat: 'paredes',
    category: 'Paredes',
    caption: 'Cerramiento y aislación de paredes en ejecución.',
    src: 'images/pared2.jpg',
    w: 1080,
    h: 720,
    alt: 'Cerramiento de paredes con aislación, en ejecución.',
    label: 'Paredes',
  },
  {
    span: 'col-span-1',
    cat: 'calderas',
    category: 'Calderas',
    caption: 'Sala de máquinas: puesta a punto de calderas.',
    src: 'images/caldera1.jpg',
    w: 882,
    h: 588,
    alt: 'Calderas y cañerías en una sala de máquinas.',
    label: 'Calderas',
  },
];

const tileHtml = tiles.map((tile) => `                    <button type="button" class="photo-tile ${tile.span}" data-cat="${tile.cat}" data-category="${tile.category}" data-caption="${tile.caption}" data-full="${tile.src}" aria-label="Ampliar obra de ${tile.category.toLowerCase()}: ${tile.caption.replace(/\.$/, '')}">
                        <img src="${tile.src}" alt="${tile.alt}" width="${tile.w}" height="${tile.h}" loading="lazy" decoding="async">
                        <span class="photo-tile__bar">
                            <span class="mono-label text-white/90">${tile.label}</span>
                            <span class="photo-tile__zoom" aria-hidden="true">Ampliar +</span>
                        </span>
                    </button>`).join('\n\n');

const replacement = `                <div id="obra-grid" class="mt-4 grid auto-rows-[10.5rem] grid-cols-2 grid-flow-dense gap-2.5 md:auto-rows-[11.5rem] md:grid-cols-4">
${tileHtml}
`;

html = html.slice(0, start) + replacement + html.slice(end);
writeFileSync(file, html, 'utf8');
console.log('Galería reemplazada:', tiles.length, 'tiles');
