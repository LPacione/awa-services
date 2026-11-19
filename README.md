# AWA — Soluciones Integrales para la Industria

Sitio web de AWA (Bahía Blanca, Argentina). Es un sitio **estático** de una sola página con
Tailwind compilado, pensado para deployar en Vercel y para usarse principalmente desde el
teléfono.

- **Acción principal:** WhatsApp con mensaje prearmado → **(291) 570-9492**
  (`5492915709492`).
- **Acciones secundarias:** llamar al (291) 570-9492 / (291) 464-5869 y escribir a
  `aravicule269@gmail.com`.
- **Dirección visual:** “tablero de obra” — tablero de esmalte claro, franjas azul marino,
  imanes dorados, órdenes de trabajo, sellos y papel kraft. La marca se mantiene: logo
  circular, azul marino (`#0B2E59`) y dorado (`#C2A158`).

## Requisitos

- Node.js 18 o superior
- npm

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm install` | Instala las dependencias (sólo Tailwind como devDependency) |
| `npm run dev` | Compila el CSS, sirve el sitio en **http://127.0.0.1:3000** y observa cambios |
| `npm run build` | Genera la versión de producción en `dist/` (CSS minificado) |
| `npm run preview` | Build minificado + servidor local, igual que en producción |

En `npm run dev`, los cambios de CSS se recompilan solos. Si tocás un `.html` o una imagen,
se copian a `dist/` y sólo hay que recargar el navegador.

## Estructura

```
.
├─ index.html              Página principal (se edita acá)
├─ 404.html                Página de error con el mismo sistema visual
├─ robots.txt
├─ PRODUCT.md              Hechos confirmados del negocio y límites de prueba social
├─ images/                 Fotos reales, logo, favicon, OG y logo del desarrollador
├─ src/styles/main.css     Tailwind + sistema visual (tablero, botones, mosaico, formulario)
├─ scripts/
│  ├─ build.mjs            Build de producción -> dist/
│  ├─ dev.mjs              Servidor de desarrollo
│  └─ lib.mjs              Tailwind, copia de archivos y servidor estático
├─ tailwind.config.js      Tokens de color, tipografías y sombras
├─ vercel.json             Configuración de deploy (headers, caché)
└─ dist/                   Salida del build (no se versiona)
```

El HTML usa rutas relativas (`images/...`, `assets/main.css`), así que no hace falta
configurar nada especial para que funcione en Vercel.

## Tipografías

- **Barlow Condensed** — títulos y botones.
- **Barlow** — texto corrido.
- **Azeret Mono** — etiquetas, numeración y datos de la orden de trabajo.

Se cargan desde Google Fonts con `display=swap` y `preconnect`.

## Comportamiento en mobile

El sitio está optimizado para uso en smartphone:

- Barra fija inferior con **WhatsApp** y **Llamar** (el flotante de WhatsApp se oculta en
  mobile para no duplicar).
- Menú desplegable con cierre por toque, navegación y tecla `Esc`.
- Áreas táctiles de 40–44 px en filtros, botones y enlaces secundarios.
- Filtros de obra en dos filas, sin scroll horizontal oculto.
- Mosaico de obras en 2 columnas con lightbox nativo (`<dialog>`), navegación por flechas y
  cierre con `Esc` o toque fuera.
- Formulario con teclado adecuado, validación en el navegador y apertura de WhatsApp con el
  mensaje ya escrito. No envía datos a ningún servidor.
- `padding-bottom` para que la barra fija no tape el pie.

## Accesibilidad

- Foco visible propio (azul en fondos claros, dorado en fondos oscuros).
- `aria-pressed` en filtros, `aria-live` en el contador de obras, `aria-expanded` en el menú.
- Texto funcional con piso de 11 px y contrastes AA en texto pequeño.
- `prefers-reduced-motion`: se desactivan las animaciones de entrada y los zooms de hover.
- Imágenes con `alt` descriptivo y dimensiones declaradas.

## Deploy en Vercel

### Opción A — desde Git (recomendado)

```bash
git init
git add .
git commit -m "Sitio AWA listo para deploy"
git branch -M main
git remote add origin <url-de-tu-repo>
git push -u origin main
```

Después, en Vercel: **Add New → Project → importá el repo**. Vercel detecta `vercel.json`
y no hay que tocar ninguna opción:

- Build Command: `npm run build`
- Output Directory: `dist`

### Opción B — con la CLI

```bash
npx vercel          # deploy de prueba (preview)
npx vercel --prod   # deploy a producción
```

### Opción C — drag & drop

Corré `npm run build` y arrastrá la carpeta `dist/` en <https://vercel.com/new>.

## Crédito de desarrollo

Al pie de `index.html` figura “Sitio desarrollado por Luciano Pacione Alvez”, con enlace a
LinkedIn y un WhatsApp de contacto para consultas por sitios web.

El logo del desarrollador es `images/dev-logo.png` (original con fondo transparente). El
sitio usa una copia optimizada de 157×96 px, `images/dev-logo-96.png`, para no cargar
~218 KB en el pie. Si cambiás el logo, regenerá esa copia o ajustá el `src` en el pie.

## Pendientes antes de publicar

1. **Dominio propio**: al tenerlo, agregar `<link rel="canonical">`, `og:url`, `og:image` y
   `twitter:image` con URLs absolutas, y generar un `sitemap.xml`. Hoy el `og:image` usa
   ruta relativa.
2. **Email**: `aravicule269@gmail.com` parece personal; conviene uno del dominio.
3. **Fotos**: la galería usa 10 fotos reales del trabajo. Una sesión fotográfica con buena
   luz y encuadre (obras terminadas + detalles) es la mejora de venta con más impacto.
4. **Prueba social**: no se inventaron años, cantidad de obras, clientes, testimonios,
   certificaciones, plazos ni precios. Si AWA consigue testimonios o habilitaciones reales,
   sumarlos.
5. **Imágenes sin usar**: quedan fotos descartadas en `images/` (por ejemplo `piso1.jpg`,
   `ventilacion1.jpg`, `techo_chapas3.jpg`, `tanques1.jpg`, `tanques3.jpg`, `pared1.jpg`,
   `pared3.jpg`, `pared4.jpg` y `logo-circle.png`). Se pueden borrar para alivianar el
   deploy.
6. **Analítica** (opcional): Vercel Analytics o Plausible si se quiere medir el clic a
   WhatsApp y las consultas.
