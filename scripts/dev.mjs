/**
 * Entorno de desarrollo.
 *   npm run dev      -> compila CSS, sirve dist/ y observa cambios (CSS, HTML, imágenes)
 *   npm run preview  -> build minificado + servidor estático (como en producción)
 */
import { watch } from 'node:fs';
import { mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { buildCss, copyOne, copyStatic, createServer, distDir, imagesDir, root, watchCss } from './lib.mjs';

const preview = process.argv.includes('--preview');
const port = Number(process.env.PORT) || 3000;

async function main() {
  console.log(preview ? '> Build de produccion (minificado)' : '> Compilando CSS (desarrollo)');

  await rm(distDir, { recursive: true, force: true });
  await mkdir(path.join(distDir, 'assets'), { recursive: true });
  await buildCss({ minify: preview });
  const { files, images } = await copyStatic();

  await createServer({ dir: distDir, port });

  console.log(`\n  Listo: http://127.0.0.1:${port}`);
  console.log(`  ${files.length} pagina(s) + ${images} imagen(es)\n`);

  if (preview) {
    console.log('  Modo preview: sin watch. Ctrl+C para salir.\n');
    return;
  }

  console.log('  Observando cambios... Ctrl+C para salir.\n');

  const cssWatcher = watchCss();
  const watchers = [];

  // Re-copia HTML / robots.txt tocados en la raíz.
  let timer = null;
  const pending = new Set();

  const scheduleCopy = (baseDir, fileName) => {
    const relative = path.join(baseDir, fileName);
    pending.add(relative);
    clearTimeout(timer);
    timer = setTimeout(async () => {
      const items = [...pending];
      pending.clear();
      for (const item of items) {
        try {
          if (await copyOne(item)) console.log(`  ~ ${item.split(path.sep).join('/')}`);
        } catch (err) {
          console.error(`  ! no se pudo copiar ${item}: ${err.message}`);
        }
      }
      console.log('  (recarga el navegador)');
    }, 120);
  };

  const rootWatcher = watch(root, { persistent: true }, (_event, fileName) => {
    if (!fileName) return;
    if (!/\.(html|txt|xml|webmanifest)$/i.test(fileName)) return;
    scheduleCopy('', fileName);
  });
  watchers.push(rootWatcher);

  // Re-copia imágenes nuevas o modificadas.
  const imgWatcher = watch(imagesDir, { persistent: true }, (_event, fileName) => {
    if (!fileName) return;
    scheduleCopy('images', fileName);
  });
  watchers.push(imgWatcher);

  const shutdown = () => {
    clearTimeout(timer);
    for (const w of watchers) w.close();
    cssWatcher.kill();
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

main().catch((err) => {
  console.error('\nError:', err.message);
  process.exit(1);
});
