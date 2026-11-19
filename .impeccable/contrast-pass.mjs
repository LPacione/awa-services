import { readFileSync, writeFileSync } from 'node:fs';

const file = 'index.html';
let html = readFileSync(file, 'utf8');

const map = [
  ['text-ink/45', 'text-ink/65'],
  ['text-ink/35', 'text-ink/60'],
  ['text-ink/30', 'text-ink/60'],
  ['text-ink/40', 'text-ink/65'],
  ['text-ink/55', 'text-ink/65'],
  ['text-white/45', 'text-white/65'],
  ['text-white/40', 'text-white/60'],
  ['text-white/35', 'text-white/60'],
  ['text-white/55', 'text-white/70'],
  ['mono-label text-gold-deep">Contacto directo', 'mono-label text-navy/70">Contacto directo'],
];

for (const [from, to] of map) {
  const before = html.split(from).length - 1;
  html = html.split(from).join(to);
  console.log(`${from} -> ${to}  (${before})`);
}

writeFileSync(file, html, 'utf8');
