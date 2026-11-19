import { readFileSync, writeFileSync } from 'node:fs';

const html = readFileSync('dist/index.html', 'utf8').replace(/ loading="lazy"/g, '');

const sections = ['condiciones', 'especialidades', 'proceso', 'contacto', 'obras'];

for (const id of sections) {
  const page = html.replace(
    '</head>',
    `<style>
      header, footer, .mobile-action-bar, .whatsapp-float,
      main > section:not(#${id}) { display: none !important; }
      #${id} { padding-top: 1.5rem; }
    </style>
  </head>`
  );
  writeFileSync(`dist/_review-${id}.html`, page, 'utf8');
}

console.log('ok');
