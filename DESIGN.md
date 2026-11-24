# Sistema de diseño — AWA “Tablero de obra”

Dirección visual: un **tablero operativo de planta**. Hoja de esmalte claro con grilla
tenue, franjas azul marino, imanes y sellos dorados, órdenes de trabajo de papel y registro
de especialidades. La marca no cambia: logo circular, azul marino y dorado.

La idea de venta: que la página se lea como una **orden de trabajo real**, no como un
folleto genérico. Todo lo que se muestra existe: fotos de obra, oficios y contactos.

## Paleta

| Token | Valor | Uso |
| --- | --- | --- |
| `navy` | `#0B2E59` | Texto principal, botones fantasma, títulos |
| `navy-deep` | `#071B33` | Fondos oscuros, barra móvil, hero |
| `navy-ink` | `#0A1A2E` | Pie de página, fondo de fotos |
| `gold` | `#C2A158` | Acción principal, sellos, imanes |
| `gold-bright` | `#E4C27A` | Acentos sobre fondo oscuro |
| `gold-deep` | `#9C7C38` | Hover de acentos sobre claro |
| `board` | `#F3EFE6` | Fondo de tablero |
| `board-dark` | `#E8E1D2` | Grilla y separadores suaves |
| `paper` | `#FBF8F0` | Hojas, header, tarjetas |
| `kraft` | `#DCCFB6` | Pestañas de orden de trabajo |
| `ink` | `#14202E` | Texto corrido |
| `rule` | `#D8D0BF` | Líneas y bordes |
| `alert` | `#A6402C` | Errores de formulario |

Regla de contraste: el texto pequeño no baja de `text-ink/70` sobre claro ni de
`text-white/65` sobre oscuro. Los grises intermedios (`/45`, `/55`, `/60`) no se usan para
texto funcional.

## Tipografía

- **Barlow Condensed** (`font-display`): títulos, botones, cifras de obra.
- **Barlow** (`font-sans`): texto corrido, formularios.
- **Azeret Mono** (`font-mono`, `.mono-label`): etiquetas, numeración, metadatos.

Escala: cuerpo 16–17 px; títulos de sección `clamp(2.15rem, 4vw, 3.4rem)`; hero
`clamp(2.05rem, 4.4vw, 3.75rem)`; etiquetas 11 px con tracking `0.16em` y mayúsculas.
Los títulos usan `text-wrap: balance`; los párrafos, `text-wrap: pretty`.

## Materiales y componentes

- `.board-surface` / `.board-surface-dark`: grilla de tablero (44 px) sobre claro u oscuro.
- `.paper-sheet`: hoja de papel con borde y sombra.
- `.work-order`: hoja rotada −0.55°, con dos imanes dorados en las esquinas.
- `.work-order__tab`: pestaña kraft que sobresale del borde superior.
- `.stamp`: sello de goma girado, borde doble azul, texto mono.
- `.magnet`: celda del riel de especialidades (ícono + nombre).
- `.register-row`: fila de registro con número, ícono, tareas y CTA.
- `.filter-chip`: filtro de obra con `aria-pressed`; 44 px de alto en mobile.
- `.photo-tile`: mosaico con barra de categoría y “Ampliar +” (este último sólo en desktop).
- `.capilar-rail`: tira de etapas de la intervención por humedad; tarjetas verticales 9:16 con scroll-snap en mobile y cinco columnas en desktop.
- `.lightbox`: `<dialog>` nativo, con flechas, contador y cierre por `Esc` o backdrop; pantalla completa en mobile.
- `.btn-primary`: dorado con sombra de apoyo; `.btn-ghost` y `.btn-ghost-light`.
- `.field-control`: inputs de 16 px (evita zoom en iOS), foco dorado.
- `.mobile-action-bar`: WhatsApp + Llamar fija abajo, sólo en mobile.
- `.whatsapp-float`: acceso flotante en desktop.

## Layout

- Contenedor: `max-width: 1240px`, padding 20 px (mobile) / 32 px (desktop).
- Secciones: `py-16` mobile, `py-24` desktop, separadas por `border-rule`.
- Grillas de 12 columnas en desktop; una columna en mobile salvo el mosaico (2 columnas).
- Header sticky sólido; `scroll-padding-top: 6.5rem` para anclas.

## Movimiento

Un solo gesto autoral: la orden de trabajo “cae” sobre el tablero (`sheetIn`) y los imanes
se acomodan (`magnetIn`, escalonados por `--i`). El resto son transiciones cortas de color,
borde y elevación. `prefers-reduced-motion` desactiva las animaciones y los zooms.

## Reglas de contenido

- No inventar años, cantidad de obras, clientes, testimonios, certificaciones, plazos ni
  precios. La prueba es visual: fotos reales del trabajo.
- Las fotos de proceso se admiten y se rotulan como tales; por eso el título de la galería
  es “Obra real, no renders.”
- La acción principal siempre es WhatsApp con mensaje prearmado; llamar y escribir son
  secundarias.

## Accesibilidad

- Foco visible: azul marino en claro, dorado en oscuro.
- `aria-pressed` en filtros, `aria-live` en el contador de obras, `aria-expanded` en el menú.
- Áreas táctiles de 40–44 px en controles de mobile.
- Texto funcional ≥ 11 px; contraste AA en texto pequeño.
- Imágenes con `alt` descriptivo, dimensiones declaradas y `loading="lazy"` salvo el hero.
