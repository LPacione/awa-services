/**
 * Build de producción -> dist/
 *   1. limpia dist/
 *   2. compila Tailwind (minificado) a dist/assets/main.css
 *   3. copia páginas, robots.txt e images/
 */
import { mkdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import { buildCss, copyStatic, distDir } from './lib.mjs';

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

async function main() {
  const started = Date.now();

  console.log('> Limpiando dist/');
  await rm(distDir, { recursive: true, force: true });
  await mkdir(path.join(distDir, 'assets'), { recursive: true });

  console.log('> Compilando Tailwind');
  await buildCss({ minify: true });

  console.log('> Copiando archivos estaticos');
  const { files, images } = await copyStatic();

  if (!files.includes('index.html')) {
    throw new Error('No se copió index.html: revisá que exista en la raíz del proyecto.');
  }

  const css = await stat(path.join(distDir, 'assets', 'main.css'));

  console.log(`\nOK - Build listo en dist/ (${((Date.now() - started) / 1000).toFixed(1)}s)`);
  console.log(`   assets/main.css   ${kb(css.size)}`);
  console.log(`   paginas           ${files.join(', ')}`);
  console.log(`   imagenes          ${images}`);
}

main().catch((err) => {
  console.error('\nError de build:', err.message);
  process.exit(1);
});
