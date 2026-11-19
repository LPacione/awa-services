import { readFileSync, writeFileSync } from 'node:fs';

const html = readFileSync('dist/index.html', 'utf8').replace(/ loading="lazy"/g, '');

const gallery = html.replace(
  '</head>',
  `<style>
    header, footer, .mobile-action-bar, .whatsapp-float,
    main > section:not(#obras) { display: none !important; }
    #obras { padding-top: 2rem; }
  </style>
</head>`
);

const footer = html.replace(
  '</head>',
  `<style>
    header, main, .mobile-action-bar, .whatsapp-float { display: none !important; }
    body { padding-top: 2rem; }
  </style>
</head>`
);

writeFileSync('dist/_review-gallery.html', gallery, 'utf8');
writeFileSync('dist/_review-footer.html', footer, 'utf8');
console.log('ok');
