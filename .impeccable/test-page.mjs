import { readFileSync, writeFileSync } from 'node:fs';

const html = readFileSync('dist/index.html', 'utf8');

const testScript = `
<script>
window.addEventListener('load', async () => {
    const out = [];
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const log = (k, v) => out.push(k + ': ' + v);
    const tiles = Array.from(document.querySelectorAll('.photo-tile'));
    const visibleCount = () => tiles.filter(t => !t.hidden).length;

    // Filtros
    const chips = Array.from(document.querySelectorAll('[data-filter]'));
    const tanques = chips.find(c => c.dataset.filter === 'tanques');
    tanques.click();
    log('filtro tanques visibles', visibleCount());
    log('aria-pressed tanques', tanques.getAttribute('aria-pressed'));
    log('count label', document.getElementById('obra-count').textContent);
    chips.find(c => c.dataset.filter === 'all').click();
    log('filtro all visibles', visibleCount());

    // Lightbox
    tiles[0].click();
    await sleep(80);
    const dlg = document.getElementById('lightbox');
    log('lightbox abierto', dlg.open);
    log('scroll bloqueado', getComputedStyle(document.documentElement).overflow);
    log('lightbox src', document.getElementById('lightbox-img').getAttribute('src'));
    log('lightbox alt', document.getElementById('lightbox-img').getAttribute('alt').slice(0, 24));
    log('lightbox cuenta', document.getElementById('lightbox-count').textContent);
    document.querySelector('[data-lightbox-next]').click();
    log('lightbox siguiente', document.getElementById('lightbox-count').textContent);
    log('lightbox caption', document.getElementById('lightbox-caption').textContent.slice(0, 30));
    document.querySelector('[data-lightbox-close]').click();
    await sleep(120);
    log('lightbox cerrado', !dlg.open);
    log('scroll liberado', getComputedStyle(document.documentElement).overflow);

    // Formulario
    const form = document.getElementById('consulta-form');
    form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    log('error con campos vacios', !document.getElementById('form-error').hidden);
    form.servicio.value = 'electricidad';
    form.empresa.value = 'Planta Sur';
    form.detalle.value = 'Necesito revisar el tablero principal.';
    let opened = null;
    window.open = (u) => { opened = u; return null; };
    form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    log('wa base ok', Boolean(opened && opened.startsWith('https://wa.me/5492915709492?text=')));
    log('wa mensaje', decodeURIComponent((opened || '').split('text=')[1] || ''));
    log('status visible', !document.getElementById('form-status').hidden);

    // Menu movil
    const btn = document.getElementById('mobile-menu-button');
    btn.click();
    log('menu abierto', !document.getElementById('mobile-menu').classList.contains('hidden'));
    log('aria-expanded', btn.getAttribute('aria-expanded'));
    document.querySelector('#mobile-menu a').click();
    log('menu cerrado al navegar', document.getElementById('mobile-menu').classList.contains('hidden'));

    // Imagenes de la galeria: todas resuelven
    const broken = Array.from(document.images).filter(i => i.complete && i.naturalWidth === 0).map(i => i.getAttribute('src'));
    log('imagenes rotas', broken.length ? broken.join(', ') : 'ninguna');

    const pre = document.createElement('pre');
    pre.id = 'test-out';
    pre.textContent = out.join('\\n');
    document.body.appendChild(pre);
});
</script>
`;

writeFileSync('dist/_test.html', html.replace('</body>', testScript + '</body>'), 'utf8');
console.log('ok');
