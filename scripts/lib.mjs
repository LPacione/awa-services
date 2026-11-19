import { spawn } from 'node:child_process';
import { createReadStream } from 'node:fs';
import { copyFile, mkdir, readdir, stat } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = fileURLToPath(new URL('..', import.meta.url));
export const distDir = path.join(root, 'dist');
export const imagesDir = path.join(root, 'images');

/** Páginas y archivos sueltos que se publican en la raíz del sitio. */
export const ROOT_FILES = ['index.html', '404.html', 'robots.txt'];

/** Se copian sólo si existen (por ejemplo, cuando agregues sitemap o dominio). */
export const OPTIONAL_ROOT_FILES = ['sitemap.xml', 'site.webmanifest'];

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.pdf': 'application/pdf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
};

// --------------------------------------------------------------------------
// Tailwind
// --------------------------------------------------------------------------

function tailwindCli() {
  // Se ejecuta el CLI con node directamente: evita `shell: true`
  // (que rompe en Windows y dispara DEP0190).
  return path.join(root, 'node_modules', 'tailwindcss', 'lib', 'cli.js');
}

const cliArgs = (extra = []) => [
  tailwindCli(),
  '-i',
  path.join('src', 'styles', 'main.css'),
  '-o',
  path.join('dist', 'assets', 'main.css'),
  ...extra,
];

const cssEnv = { ...process.env, BROWSERSLIST_IGNORE_OLD_DATA: '1' };

/** Compila src/styles/main.css -> dist/assets/main.css */
export function buildCss({ minify = false } = {}) {
  const child = spawn(process.execPath, cliArgs(minify ? ['--minify'] : []), {
    cwd: root,
    stdio: 'inherit',
    env: cssEnv,
  });

  return new Promise((resolve, reject) => {
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`tailwindcss terminó con código ${code}`));
    });
  });
}

/** Arranca tailwindcss en modo watch (proceso hijo de larga vida). */
export function watchCss() {
  const child = spawn(process.execPath, cliArgs(['--watch']), {
    cwd: root,
    stdio: 'inherit',
    env: cssEnv,
  });
  child.on('error', (err) => console.error('[css] error:', err.message));
  return child;
}

// --------------------------------------------------------------------------
// Copia de archivos estáticos
// --------------------------------------------------------------------------

async function copyDir(from, to) {
  await mkdir(to, { recursive: true });
  const entries = await readdir(from, { withFileTypes: true });
  let count = 0;

  for (const entry of entries) {
    const src = path.join(from, entry.name);
    const dest = path.join(to, entry.name);
    if (entry.isDirectory()) {
      count += await copyDir(src, dest);
    } else {
      await copyFile(src, dest);
      count += 1;
    }
  }

  return count;
}

/** Copia páginas, robots.txt e images/ al directorio de build. */
export async function copyStatic() {
  await mkdir(distDir, { recursive: true });
  const files = [];

  for (const name of [...ROOT_FILES, ...OPTIONAL_ROOT_FILES]) {
    try {
      await stat(path.join(root, name));
      await copyFile(path.join(root, name), path.join(distDir, name));
      files.push(name);
    } catch {
      // Opcional: si no existe, se ignora.
    }
  }

  const images = await copyDir(imagesDir, path.join(distDir, 'images'));
  return { files, images };
}

/** Copia un único archivo tocado durante el modo watch. */
export async function copyOne(relativePath) {
  const normalized = relativePath.split(path.sep).join('/');

  if (ROOT_FILES.includes(normalized) || OPTIONAL_ROOT_FILES.includes(normalized)) {
    await copyFile(path.join(root, normalized), path.join(distDir, normalized));
    return true;
  }

  if (normalized.startsWith('images/')) {
    await mkdir(path.join(distDir, 'images'), { recursive: true });
    await copyFile(path.join(root, normalized), path.join(distDir, normalized));
    return true;
  }

  return false;
}

// --------------------------------------------------------------------------
// Servidor estático (desarrollo / preview)
// --------------------------------------------------------------------------

function safeMime(filePath) {
  return MIME_TYPES[path.extname(filePath).toLowerCase()] ?? 'application/octet-stream';
}

export function createServer({ dir = distDir, port = 3000 } = {}) {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url ?? '/').split('?')[0]);
    const relative = urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '');
    const filePath = path.resolve(dir, relative);

    // Evita salir del directorio servido.
    if (!filePath.startsWith(path.resolve(dir))) {
      res.writeHead(403).end('Forbidden');
      return;
    }

    const notFound = () => {
      const custom = path.join(dir, '404.html');
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      createReadStream(custom)
        .on('error', () => res.end('<h1>404</h1>'))
        .pipe(res);
    };

    stat(filePath).then(
      (info) => {
        if (info.isDirectory()) {
          res.writeHead(302, { Location: `${urlPath.replace(/\/?$/, '/')}index.html` }).end();
          return;
        }
        res.writeHead(200, { 'Content-Type': safeMime(filePath) });
        createReadStream(filePath).pipe(res);
      },
      () => notFound(),
    );
  });

  return new Promise((resolve) => {
    server.listen(port, '127.0.0.1', () => resolve({ server, port }));
  });
}
