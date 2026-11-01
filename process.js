(() => {
/* PROCESS · behind the work: sideways carousel + editorial detail page */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const sec = $('#proc'); if (!sec) return;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const L = () => document.documentElement.lang === 'en' ? 'en' : 'es';

const P = [
  { photo: 'pr/live-blue.jpg', bg: { v: 'pr/fl.mp4', p: 'pr/fl.jpg' }, hero: 'pr/fl.jpg',
    es: { tag: 'Música', name: 'Producción', lead: 'Las canciones salen de aquí: las escribo, las produzco y las canto yo.',
      body: ['Todo empieza en FL Studio. Beat, capas, voces y mezcla en la misma sesión, sin pasar la canción de mano en mano.', 'Del trap al nu metal melódico de “Mas que se”, cada tema se construye pensando ya en cómo se va a ver.'],
      meta: [['Rol', 'Artista · productor · voz'], ['Herramienta', 'FL Studio'], ['Escuchar', 'Spotify']] },
    en: { tag: 'Music', name: 'Production', lead: 'The songs come out of this room: I write them, produce them and sing them.',
      body: ['It all starts in FL Studio. Beat, layers, vocals and mix in one session, without handing the song around.', 'From trap to the melodic nu metal of “Mas que se”, every track is built already thinking about how it will look.'],
      meta: [['Role', 'Artist · producer · vocals'], ['Tool', 'FL Studio'], ['Listen', 'Spotify']] } },
  { photo: 'pr/live-green.jpg', bg: { i: 'pr/edit.jpg' }, hero: 'pr/edit.jpg',
    es: { tag: 'Vídeo', name: 'Dirección y edición', lead: 'Dirijo y edito mis propios videoclips: la canción y la imagen nacen juntas.',
      body: ['Montaje, ritmo, color y efectos en la línea de tiempo, plano a plano y al corte del beat.', 'Mezclo rodaje real con IA para levantar mundos que no cabrían en un presupuesto normal.'],
      meta: [['Rol', 'Director · editor'], ['YouTube', '+84K suscriptores'], ['Alcance', '+40M views orgánicas']] },
    en: { tag: 'Video', name: 'Direction & edit', lead: 'I direct and edit my own music videos: the song and the image are born together.',
      body: ['Cutting, rhythm, colour and effects on the timeline, shot by shot and on the beat.', 'I mix real footage with AI to build worlds that would never fit a normal budget.'],
      meta: [['Role', 'Director · editor'], ['YouTube', '+84K subscribers'], ['Reach', '+40M organic views']] } },
  { photo: 'pr/live-red.jpg', bg: { i: 'ph/live-red.jpg' }, hero: 'ph/live-red.jpg',
    es: { tag: 'Directo', name: 'Escenario', lead: 'El directo es donde las canciones dejan de ser archivos.',
      body: ['Lo que se graba en el estudio se prueba delante de la gente: volumen, luces y energía.', 'Cada concierto devuelve algo al siguiente tema.'],
      meta: [['Rol', 'Voz'], ['Base', 'Barcelona']] },
    en: { tag: 'Live', name: 'Stage', lead: 'Live is where the songs stop being files.',
      body: ['What gets recorded in the studio is tested in front of people: volume, lights and energy.', 'Every show feeds something back into the next track.'],
      meta: [['Role', 'Vocals'], ['Based in', 'Barcelona']] } },
  { photo: 'pr/clip.jpg', bg: { i: 'img/gd3.jpg' }, hero: 'img/gd3.jpg',
    es: { tag: 'IA', name: 'Cine con IA', lead: 'Uso la IA como una cámara más, para contar historias que antes eran imposibles.',
      body: ['Empecé desde cero con Higgsfield en sus inicios y hoy soy creative partner. De ahí salió Girls / Demons, mi corto de anime, en el Top 14 del Higgsfield Global Film Festival.', 'Ese mismo proceso lo llevo a marcas como CUPRA, DWT o La Velada del Año VI: más de 20M de views en trabajos para marcas.'],
      meta: [['Herramienta', 'Higgsfield'], ['Corto', 'Girls / Demons'], ['Festival', 'Top 14']] },
    en: { tag: 'AI', name: 'AI film', lead: 'I use AI as one more camera, to tell stories that used to be impossible.',
      body: ['I started from zero with Higgsfield in its early days and I’m now a creative partner. That’s where Girls / Demons came from, my anime short, Top 14 at the Higgsfield Global Film Festival.', 'I take the same process to brands like CUPRA, DWT or La Velada del Año VI: over 20M views on brand work.'],
      meta: [['Tool', 'Higgsfield'], ['Short', 'Girls / Demons'], ['Festival', 'Top 14']] } },
  { photo: 'pr/skate.jpg', bg: { i: 'pr/skate.jpg' }, hero: 'ph/skate.jpg',
    es: { tag: 'Inspo', name: 'Underground', lead: 'Lo que me formó viene de abajo: skate, punk, punk rock, metalcore y hardcore.',
      body: ['La energía del skate y de las salas pequeñas está en todo lo que hago: en cómo suena una guitarra, en cómo se corta un plano y en la ropa.', 'Por eso mi música cruza el rap con guitarras y gritos, y la estética siempre tira a lo crudo.'],
      meta: [['Escena', 'Underground'], ['Sonido', 'Punk · metalcore · hardcore'], ['Calle', 'Skate']] },
    en: { tag: 'Inspo', name: 'Underground', lead: 'What shaped me comes from below: skate, punk, punk rock, metalcore and hardcore.',
      body: ['The energy of skating and small venues is in everything I make: in how a guitar sounds, in how a shot is cut and in the clothes.', 'That’s why my music crosses rap with guitars and screams, and the look always leans raw.'],
      meta: [['Scene', 'Underground'], ['Sound', 'Punk · metalcore · hardcore'], ['Street', 'Skate']] } },
  { photo: 'pr/studio.jpg', bg: { i: 'pr/studio.jpg' }, hero: 'pr/studio.jpg',
    es: { tag: 'Estudio', name: 'Estudio y marca', lead: 'Fuera de la música: FORMA.MOV, mi estudio, y TAMBVRINI, mi marca de ropa.',
      body: ['En FORMA.MOV hago visuales, spots y campañas para marcas con el mismo lenguaje que mis videoclips.', 'TAMBVRINI lleva esa estética a la ropa, desde Barcelona.'],
      meta: [['Estudio', 'FORMA.MOV'], ['Marca', 'TAMBVRINI'], ['Base', 'Barcelona']] },
    en: { tag: 'Studio', name: 'Studio & brand', lead: 'Outside the music: FORMA.MOV, my studio, and TAMBVRINI, my clothing brand.',
      body: ['At FORMA.MOV I make visuals, spots and campaigns for brands in the same language as my music videos.', 'TAMBVRINI takes that look into clothing, from Barcelona.'],
      meta: [['Studio', 'FORMA.MOV'], ['Brand', 'TAMBVRINI'], ['Based in', 'Barcelona']] } }
];
const N = P.length;

/* ---------- build ---------- */
const pbg = $('#pbg'), track = $('#ptrack');
pbg.innerHTML = P.map(p => `<div class="pb">${p.bg.v ? `<video muted loop playsinline preload="none" poster="${p.bg.p}" src="${p.bg.v}"></video>` : `<img src="${p.bg.i}" alt="" loading="lazy">`}</div>`).join('');
track.innerHTML = P.map((p, i) => `<button class="pc" data-i="${i}" role="option"><span class="ph"><img src="${p.photo}" alt="" loading="lazy" draggable="false"></span><span class="tg"></span><span class="op"></span></button>`).join('');
const bgs = $$('.pb', pbg), cards = $$('.pc', track);
const paintText = () => {
  const l = L();
  cards.forEach((c, i) => { $('.tg', c).textContent = `${String(i + 1).padStart(2, '0')} · ${P[i][l].tag}`; $('.op', c).textContent = l === 'en' ? 'Open +' : 'Abrir +'; c.setAttribute('aria-label', P[i][l].name); });
  $('#pcta').textContent = l === 'en' ? 'Drag · click to open' : 'Desliza · clic para abrir';
  setLabel(true);
};

/* ---------- state ---------- */
let cur = 0, pos = 0, shown = -1;
const wrap = d => { d = ((d % N) + N) % N; return d > N / 2 ? d - N : d; };
const idx = () => ((Math.round(pos) % N) + N) % N;
function setLabel(force) {
  const k = idx(); if (k === shown && !force) return; shown = k;
  $('#pidx').textContent = `${String(k + 1).padStart(2, '0')} / ${String(N).padStart(2, '0')}`;
  $('#pname').textContent = P[k][L()].name;
  bgs.forEach((b, i) => b.classList.toggle('on', i === k));
  cards.forEach((c, i) => { c.classList.toggle('cur', i === k); c.setAttribute('aria-selected', i === k); c.tabIndex = i === k ? 0 : -1; });
  syncVideo();
}
let inView = false;
function syncVideo() { bgs.forEach((b, i) => { const v = $('video', b); if (!v) return; if (inView && i === idx() && !reduce) { v.preload = 'auto'; v.play().catch(() => { }); } else v.pause(); }); }

/* ---------- layout ---------- */
const gapOf = () => { const w = cards[0].offsetWidth; return innerWidth > 820 ? w * 1.32 : w * 1.1; };
let G = 400; const measure = () => { G = gapOf(); }; addEventListener('resize', measure); measure();
function render() {
  cards.forEach((c, i) => {
    const d = wrap(i - pos), a = Math.abs(d);
    const s = 1 - Math.min(a, 2) * .17, o = a > 2.4 ? 0 : 1 - Math.min(a, 2) * .32;
    c.style.transform = `translate3d(${d * G}px,${a * a * 6}px,0) scale(${s.toFixed(4)})`;
    c.style.opacity = o.toFixed(3); c.style.zIndex = 10 - Math.round(a);
    c.style.filter = a < .02 ? 'none' : `brightness(${(1 - Math.min(a, 1.5) * .45).toFixed(3)})`;
    c.style.pointerEvents = a > 1.6 ? 'none' : 'auto';
  });
}
const go = k => { cur = k; };
const step = s => go(Math.round(pos) + s);
$('#pprev').onclick = () => step(-1); $('#pnext').onclick = () => step(1);

/* ---------- drag / swipe (vertical gestures keep scrolling the page) ---------- */
let sx = 0, sy = 0, sp = 0, mode = null, moved = 0, pid = null;
track.addEventListener('pointerdown', e => { sx = e.clientX; sy = e.clientY; sp = pos; mode = null; moved = 0; pid = e.pointerId; });
track.addEventListener('pointermove', e => {
  if (pid !== e.pointerId) return; const dx = e.clientX - sx, dy = e.clientY - sy;
  if (!mode) { if (Math.abs(dx) > 7 && Math.abs(dx) > Math.abs(dy)) { mode = 'x'; track.setPointerCapture(e.pointerId); track.classList.add('drag'); } else if (Math.abs(dy) > 7) mode = 'y'; }
  if (mode === 'x') { moved = Math.abs(dx); pos = sp - dx / G; cur = pos; }
});
const end = e => {
  if (pid !== e.pointerId) return; pid = null; track.classList.remove('drag');
  if (mode === 'x') { const v = (e.clientX - sx) / G; cur = Math.round(sp - v + (Math.abs(v) > .15 && Math.abs(v) < .5 ? -Math.sign(v) * .5 : 0)); }
  mode = null;
};
track.addEventListener('pointerup', end); track.addEventListener('pointercancel', end);
track.addEventListener('click', e => {
  const c = e.target.closest('.pc'); if (!c || moved > 6) { moved = 0; return; }
  const i = +c.dataset.i, d = wrap(i - pos);
  if (Math.abs(d) < .5) open(i); else go(Math.round(pos) + Math.round(d));
});

/* ---------- trackpad / shift-wheel sideways ---------- */
let acc = 0, lock = 0;
track.parentElement.addEventListener('wheel', e => {
  const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
  if (!dx) return; e.preventDefault(); const t = performance.now(); if (t < lock) return;
  acc += dx; if (Math.abs(acc) > 40) { step(Math.sign(acc)); acc = 0; lock = t + 420; }
}, { passive: false });

/* ---------- keys ---------- */
addEventListener('keydown', e => {
  if (pov.classList.contains('on')) { if (e.key === 'Escape') close(); return; }
  if (!inView) return; const r = sec.getBoundingClientRect(); if (r.top > innerHeight * .5 || r.bottom < innerHeight * .5) return;
  if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1);
  if (e.key === 'Enter' && document.activeElement && document.activeElement.classList.contains('pc')) { e.preventDefault(); open(idx()); }
});

/* ---------- detail page ---------- */
const pov = $('#pov'); document.body.appendChild(pov); let lastFocus = null;
function open(i) {
  const p = P[i], t = p[L()];
  $('#povi').textContent = `${String(i + 1).padStart(2, '0')} / ${String(N).padStart(2, '0')} · ${t.tag}`;
  $('#povt').textContent = t.name; $('#povl').textContent = t.lead;
  $('#povb').innerHTML = t.body.map(x => `<p>${x}</p>`).join('');
  $('#povm').innerHTML = t.meta.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
  $('#povh').src = p.hero; pov.scrollTop = 0;
  lastFocus = document.activeElement; pov.setAttribute('aria-hidden', 'false');
  document.documentElement.classList.add('pov-lock'); requestAnimationFrame(() => pov.classList.add('on'));
  setTimeout(() => $('#pback').focus({ preventScroll: true }), 50);
}
function close() {
  pov.classList.remove('on'); pov.setAttribute('aria-hidden', 'true');
  document.documentElement.classList.remove('pov-lock');
  if (lastFocus) lastFocus.focus({ preventScroll: true });
}
$('#pback').onclick = close;

/* ---------- page darkens as you arrive ---------- */
const dim = document.createElement('div'); dim.id = 'pdim'; document.body.appendChild(dim);
function dimUpdate() {
  const r = sec.getBoundingClientRect(), vh = innerHeight;
  const c = r.top + r.height / 2, k = Math.max(0, 1 - Math.abs(c - vh / 2) / (vh * .95));
  dim.style.opacity = (Math.min(1, k * 1.25) * .8).toFixed(3);
}
new IntersectionObserver(es => es.forEach(e => { inView = e.isIntersecting; syncVideo(); }), { rootMargin: '20% 0px' }).observe(sec);

/* ---------- loop ---------- */
function loop() {
  if (inView) {
    if (mode !== 'x') pos += (cur - pos) * (reduce ? 1 : .11);
    if (Math.abs(cur - pos) < .0005) pos = cur;
    render(); setLabel(); dimUpdate();
  } else if (dim.style.opacity !== '0') dim.style.opacity = '0';
  requestAnimationFrame(loop);
}
paintText(); render(); loop();
$$('.lang button').forEach(b => b.addEventListener('click', () => setTimeout(() => { paintText(); if (pov.classList.contains('on')) open(idx()); }, 0)));
})();
