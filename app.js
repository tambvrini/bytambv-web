(() => {
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const prog = el => { const r = el.getBoundingClientRect(); return clamp(-r.top / Math.max(1, r.height - innerHeight), 0, 1); };

/* ---------- data ---------- */
const CLIPS = [
  { t: 'Mas que se', v: '136K', img: 'masquese', url: 'https://www.youtube.com/watch?v=b7Q6FWaLPWg', tag: 'Nuevo', likes: '5.2K', dur: '2:29', age: '2026-10-13' },
  { t: 'Crysel', v: '497K', img: 'crysel', url: 'https://www.youtube.com/watch?v=RX7UUcbB6rE', likes: '14K', dur: '3:17', age: '2025-11-20' },
  { t: 'VUDU', v: '444K', img: 'vudu', url: 'https://www.youtube.com/watch?v=pBTnjICATt8', likes: '11K', age: '2026-08-26' },
  { t: 'Corona de Flores', v: '95K', img: 'corona', url: 'https://www.youtube.com/watch?v=Rw9RxRElJAU', dur: '2:18', age: '6m' },
  { t: 'Polvo de estrellas', v: '155K', img: 'polvo', url: 'https://www.youtube.com/watch?v=Zw3WfPCBSXk', likes: '8K', age: '2025-08-29' },
  { t: 'Eter', v: '111K', img: 'eter', url: 'https://www.youtube.com/watch?v=OqTtsEaMvg8', dur: '3:02', age: '1y' },
  { t: 'No me mires', v: '96K', img: 'nomemires', url: 'https://www.youtube.com/watch?v=iCjTMngRDJw', dur: '2:50', age: '1y' },
  { t: 'Dejame Volar // Debilidad', v: '67K', img: 'dejamevolar', url: 'https://www.youtube.com/watch?v=xSDp29Fx2yg', dur: '4:42', age: '8m', feat: 'zerostumped' },
];
const TILES = [
  { k: 'wide', b: 'La Velada del Año VI', logo: 'velada6', m: '+8.5M', l: 'Views orgánicas · 0 € en ads', le: 'Organic views · €0 in ads', img: 'velada-w', url: 'https://www.instagram.com/reel/Da72bCOtkdN/', g: 'a' },
  { k: 'wide', b: 'DWT4 · Jordi Wild', logo: 'dwt', m: '+5.5M', l: 'Views · visuales oficiales', le: 'Views · official visuals', img: 'dwt-w', url: 'https://www.instagram.com/reel/DWovKYrDiAG/', g: 'b' },
  { k: 'reel', b: 'UFC 330', logo: null, m: '1M', l: 'Views · Makhachev vs Machado Garry', le: 'Views · Makhachev vs Machado Garry', img: 'ufc', url: 'https://www.instagram.com/reel/Db3ZLAoNhxH/', g: 'c' },
  { k: 'reel', b: 'ProShake', logo: null, m: 'Concept', l: 'Film estilo Nike · con FORMA', le: 'Nike-style film · with FORMA', img: 'proshake', url: 'https://www.instagram.com/reel/DbVrgtGs2ev/', g: 'd' },
  { k: 'wide', b: 'CUPRA', logo: null, nologo: 1, m: 'Spot', l: 'Spot oficial · Cupra × TAMBV', le: 'Official ad · Cupra × TAMBV', img: 'cupra-spot', url: 'https://www.instagram.com/reel/DbYPK5Rs0jF/', g: 'e' },
  { k: 'wide', b: 'The Wild Project', logo: 'thewildproject', m: 'Intro', l: 'Intro y logo animado oficial', le: 'Official intro & animated logo', img: 'wildproject', url: 'https://www.youtube.com/c/TheWildProject', g: 'f' },
  { k: 'wide', b: 'Duelbits', logo: null, nologo: 1, m: 'Campaña', l: 'Campaña oficial con IA', le: 'Official AI campaign', img: 'duelbits-w', url: 'https://x.com/Duelbits/status/2102356501704929401', g: 'g' },
  { k: 'wide', b: 'MSA · Hot Car', logo: null, nologo: 1, m: 'Anime', l: 'Proyecto anime para MSA', le: 'Anime project for MSA', img: 'hotcar', url: 'https://higgsfield.ai/@tambv/projects/hot-car-msa', g: 'h' },
  { k: 'wide', b: 'Stake', logo: null, nologo: 1, m: 'Spot', l: 'Campaña oficial', le: 'Official campaign', img: 'stake-w', url: 'https://www.instagram.com/p/DdR5zVRySwu/', g: 'i' },
  { k: 'wide', b: 'JACK.com', logo: null, nologo: 1, m: 'Spot', l: 'Campaña oficial', le: 'Official campaign', img: 'jack-w', url: 'https://www.instagram.com/p/DdWYJpDOnI_/', g: 'j' },
];
const MORE = [
  { b: 'BYD', logo: 'byd' },
    { b: 'American Barbell', logo: 'americanbarbell', sq: 1 }, { b: 'Higgsfield', logo: 'higgsfield', url: 'https://higgsfield.ai/@tambv' },
];
const LOGOS = ['cupra', 'byd', 'duelbits', 'stake', 'jack', 'higgsfield', 'velada6', 'thewildproject', 'dwt', 'americanbarbell'];
const SQ = new Set(['cupra', 'velada6', 'thewildproject', 'dwt', 'americanbarbell']);
const MERCH = [
  ['camiseta-sport-club', 'Camiseta Sport Club', 20], ['polo-regius', 'Polo Regius', 30], ['americana-umbra', 'Americana Umbra', 150],
  ['sueter-sylva', 'Suéter Sylva', 40], ['camiseta-imperium', 'Camiseta Imperium', 20], ['polo-domus', 'Polo Domus', 25],
  ['bolso-monograma-tambvrini', 'Bolso Monograma', 260], ['polo-golf', 'Polo Golf', 30], ['ignatius-sweater-thumb', 'Suéter Ignatius', 300, 'sueter-ignatius'],
  ['polo-patricius', 'Polo Patricius', 25], ['sueter-captain', 'Suéter Captain', 50], ['polo-aureus', 'Polo Aureus', 30], ['traje-monograma-tambvrini', 'Traje Monograma', 200],
];
const FRAMES = ['gd-boy', 'gd1', 'gd2', 'gd3', 'gd4', 'gd6', 'gd7', 'gd8'];
const LINESI = { es: ['Un romance psicológico.', 'Anime de los 90.', 'Deseo, confianza…', '…y oscuridad.'], en: ['A psychological romance.', '90s anime.', 'Desire, trust…', '…and darkness.'] };
let LANG = 'es', LINES = LINESI.es;

/* ---------- grain texture (generated once) ---------- */
{
  const c = document.createElement('canvas'); c.width = c.height = 220; const x = c.getContext('2d'), d = x.createImageData(220, 220);
  for (let i = 0; i < d.data.length; i += 4) { const v = Math.random() * 255 | 0; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
  x.putImageData(d, 0, 0); const nz = `url(${c.toDataURL()})`; $('#grain').style.backgroundImage = nz; document.documentElement.style.setProperty('--noise', nz);
}

/* ---------- build DOM ---------- */
$('#h1').innerHTML = 'TAMBV'.split('').map((l, i) => `<span class="in-l" style="animation-delay:${200 + i * 110}ms">${l}</span>`).join('');
$$('#lema .w').forEach((w, i) => { w.classList.add('in-w'); w.style.animationDelay = `${700 + i * 160}ms`; });
$('#marq').innerHTML = [...LOGOS, ...LOGOS].map(l => `<img src="logos/${l}.png" alt="${l}" class="${SQ.has(l) ? 'sq' : ''}">`).join('');
$('#ixlinks').innerHTML = ['YouTube|https://www.youtube.com/@TAMBV', 'Spotify|https://open.spotify.com/artist/05xmF2p7odRwlPQsQPnadk', 'Instagram|https://www.instagram.com/tambv_/', 'TAMBVRINI|https://www.tambvrini.com/', 'FORMA.MOV|https://formamov.com/'].map(s => { const [t, u] = s.split('|'); return `<a href="${u}" target="_blank" rel="noopener" data-scr>${t} ↗</a>`; }).join('');

$('#rows').innerHTML = CLIPS.map((c, i) => `<li class="row"><a href="${c.url}" target="_blank" rel="noopener" data-cur="PLAY" data-dur="${c.dur || ''}" data-age="${c.age || ''}" data-likes="${c.likes || ''}" data-feat="${c.feat || ''}" data-new="${c.tag ? 1 : ''}"><span class="n mono">${String(i + 1).padStart(2, '0')}</span><span class="t">${c.t}${c.tag ? ` <sup class="mono" data-en="New">${c.tag}</sup>` : ''}</span><span class="th"><img src="img/${c.img}.jpg" alt="${c.t}" loading="lazy"></span><span class="v">${c.v}</span><span class="go mono">Play ↗</span></a></li>`).join('');

$('#tiles').innerHTML = TILES.map(c => `<a class="tile ${c.k}" href="${c.url}" target="_blank" rel="noopener" data-cur="VER"><img class="bg" src="img/${c.img}.jpg" alt="${c.b}" loading="lazy">${c.nologo ? '' : `<span class="tl">${c.logo ? `<img src="logos/${c.logo}.png" alt="">` : `<b>${c.b}</b>`}</span>`}<span class="bl"><b class="cond">${c.m}</b><span class="mono" data-en="${c.b} — ${c.le}">${c.b} — ${c.l}</span></span></a>`).join('');
$('#more').innerHTML = '<span class="mono" style="color:var(--mute)" data-en="Also">También</span>' + MORE.map(m => `<a ${m.url ? `href="${m.url}" target="_blank" rel="noopener"` : ''} title="${m.b}"><img class="${m.sq ? 'sq' : ''}" src="logos/${m.logo}.png" alt="${m.b}"></a>`).join('');

/* ---------- text fitting ---------- */
function fit() {
  $$('[data-fit]').forEach(el => {
    const host = el.parentElement, cs = getComputedStyle(host);
    const w = host.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    el.style.fontSize = '100px'; el.style.display = 'inline-block';
    const s = el.scrollWidth; el.style.fontSize = (100 * w / s * .995) + 'px'; el.style.display = 'block';
  });
}
fit(); addEventListener('resize', fit); document.fonts && document.fonts.ready.then(fit);

/* ---------- lema word cycle ---------- */
const lw = $$('#lema .w'); let li = -1;
setTimeout(() => setInterval(() => { li = (li + 1) % 4; lw.forEach((w, i) => w.classList.toggle('dim', li < 3 && i !== li)); }, 1600), 2200);

/* ---------- scramble ---------- */
const GL = '01#/\\_3457<>*+';
function scramble(el) {
  if (el._s || reduce) return; const t = el.dataset.txt || (el.dataset.txt = el.textContent); el._s = 1; let f = 0;
  const run = () => { el.textContent = t.split('').map((c, i) => c === ' ' ? ' ' : i < f / 2 ? t[i] : GL[Math.random() * GL.length | 0]).join(''); f++; if (f / 2 < t.length) requestAnimationFrame(run); else { el.textContent = t; el._s = 0; } };
  run();
}
document.addEventListener('pointerover', e => { const el = e.target.closest('[data-scr]'); if (!el) return; const tgt = el.children.length && !el.matches('a.mono') ? el : el; if (el.children.length === 0) scramble(el); else { const n = [...el.childNodes].find(n => n.nodeType === 3 && n.textContent.trim()); if (n) { const s = document.createElement('span'); s.textContent = n.textContent; n.replaceWith(s); scramble(s); } else if (el.firstElementChild && !el.firstElementChild.children.length && el.firstElementChild.tagName !== 'B') scramble(el.firstElementChild); } });

/* ---------- index overlay ---------- */
const ix = $('#index'), ixb = $('#ixb');
const setIx = on => { ix.classList.toggle('on', on); ixb.setAttribute('aria-expanded', on); };
ixb.onclick = () => setIx(!ix.classList.contains('on')); $('#ixc').onclick = () => setIx(false);
$$('#index a[href^="#"]').forEach(a => a.addEventListener('click', () => setIx(false)));
addEventListener('keydown', e => { if (e.key === 'Escape') setIx(false); });

/* ---------- counters + motion captions + reveals ---------- */
const fmt = (n, el) => el.hasAttribute('data-m') ? '+' + Math.round(n / 1e6) + 'M' : el.hasAttribute('data-full') ? Math.round(n).toLocaleString('es-ES') : n >= 1000 ? Math.round(n / 1000) + 'K' : Math.round(n);
function count(el) { const to = +el.dataset.count, t0 = performance.now(), D = 1600; const step = t => { const k = Math.min(1, (t - t0) / D), e = 1 - Math.pow(1 - k, 4); el.textContent = fmt(to * e, el); if (k < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); }
$$('[data-cap]').forEach(el => { el.innerHTML = el.textContent.trim().split(/\s+/).map((w, i) => `<span class="w"><i style="transition-delay:${i * 70}ms">${w}</i></span>`).join(' '); });
const io = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; const t = e.target; t.classList.add('on'); if (t.dataset.count && !t.dataset.live) count(t); io.unobserve(t); }), { threshold: .25 });
$$('[data-cap],[data-rv],[data-count]').forEach(el => io.observe(el));

/* ---------- timecode + clock ---------- */
const tc = $('#tc'), t00 = performance.now(), clock = $('#clock');
const p2 = n => String(n).padStart(2, '0');
setInterval(() => { const s = (performance.now() - t00) / 1000, f = Math.floor(s * 24) % 24; tc.textContent = `REC ${p2(Math.floor(s / 3600))}:${p2(Math.floor(s / 60) % 60)}:${p2(Math.floor(s) % 60)}:${p2(f)}`; }, 42);
const tick = () => { try { clock.textContent = 'Barcelona — ' + new Date().toLocaleTimeString('es-ES', { timeZone: 'Europe/Madrid', hour: '2-digit', minute: '2-digit', second: '2-digit' }); } catch (e) { } };
tick(); setInterval(tick, 1000);

/* ---------- cursor + peek ---------- */
const cur = $('#cur'), curL = $('span', cur), peek = $('#peek'), pimg = $('img', peek);
let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my, px = mx, py = my;
addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
document.addEventListener('pointerover', e => {
  const a = e.target.closest('[data-cur]'); cur.classList.toggle('big', !!a); if (a) curL.textContent = a.dataset.cur;
  const p = e.target.closest('[data-peek]');
  if (p && fine) { if (!peek.classList.contains('on') || pimg.dataset.src !== p.dataset.peek) { pimg.src = p.dataset.peek; pimg.dataset.src = p.dataset.peek; peek.classList.remove('cut'); void peek.offsetWidth; peek.classList.add('cut'); } peek.classList.add('on'); }
  else if (!p) peek.classList.remove('on');
});

/* ---------- fashion track + film + merch, one loop ---------- */
/* raw photos in the section heads: parallax + they stretch with scroll speed */
const raws = $$('.rawph');

const frames = $('#frames'), fipin = $('#fipin'), filmst = $('#filmst'), sub = $('#sub'), fprog = $('#fprog');
frames.innerHTML = FRAMES.map((f, i) => `<img src="img/${f}.jpg" alt="" loading="${i ? 'lazy' : 'eager'}">`).join('');
const fimgs = $$('img', frames); let fk = -1, sk = -1;

/* merch */
const stage = $('#stage'), pn = $('#pn'), pp = $('#pp');
stage.innerHTML = MERCH.map(m => `<a class="item" href="https://www.tambvrini.com/producto/${m[3] || m[0]}" target="_blank" rel="noopener" data-cur="VER" tabindex="-1"><img src="m/${m[0]}.webp" alt="${m[1]}" draggable="false" loading="lazy"></a>`).join('');
const items = $$('.item', stage), N = items.length;
let mi = 0, mcur = 0, auto = true, lastMove = performance.now();
const go = d => { mi += d; lastMove = performance.now(); };
const mUrl = () => { const m = MERCH[((Math.round(mcur) % N) + N) % N]; return `https://www.tambvrini.com/producto/${m[3] || m[0]}`; };
$('#wprev').onclick = () => { go(-1); auto = false; }; $('#wnext').onclick = () => { go(1); auto = false; };
$('#wpp').onclick = () => { auto = !auto; lastMove = performance.now(); };
$('#wctr').onclick = () => window.open(mUrl(), '_blank', 'noopener');
// wheel drag: rotating around the ring steps the carousel
const wheel = $('#wheel'); let wa = null, acc = 0;
const ang = e => { const r = wheel.getBoundingClientRect(); return Math.atan2(e.clientY - r.top - r.height / 2, e.clientX - r.left - r.width / 2); };
wheel.addEventListener('pointerdown', e => { if (e.target.closest('button,a')) return; wa = ang(e); acc = 0; wheel.setPointerCapture(e.pointerId); auto = false; });
wheel.addEventListener('pointermove', e => { if (wa === null) return; const a = ang(e); let d = a - wa; if (d > Math.PI) d -= 2 * Math.PI; if (d < -Math.PI) d += 2 * Math.PI; wa = a; acc += d; while (acc > .5) { go(1); acc -= .5; } while (acc < -.5) { go(-1); acc += .5; } });
wheel.addEventListener('pointerup', () => wa = null); wheel.addEventListener('pointercancel', () => wa = null);
// swipe on the stage
let sx = null; stage.addEventListener('pointerdown', e => { sx = e.clientX; });
stage.addEventListener('pointerup', e => { if (sx === null) return; const d = e.clientX - sx; if (Math.abs(d) > 40) { go(d < 0 ? 1 : -1); auto = false; e.preventDefault(); } sx = null; });
stage.addEventListener('click', e => { const it = e.target.closest('.item'); if (!it) return; const k = items.indexOf(it), o = (((k - Math.round(mcur)) % N) + N + N / 2) % N - N / 2 | 0; if (Math.round(o) !== 0) { e.preventDefault(); go(Math.round(o)); auto = false; } });
addEventListener('keydown', e => { const r = $('#merch').getBoundingClientRect(); if (r.top > innerHeight * .6 || r.bottom < innerHeight * .4) return; if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); });
let lastName = -1;

function loop(now) {
  // fashion
  if (!reduce) raws.forEach(r => {
    const b = r.parentElement.getBoundingClientRect(); if (b.bottom < -200 || b.top > innerHeight + 200) return;
    const sp = +r.dataset.sp || .15, y = (b.top + b.height / 2 - innerHeight / 2) * -sp;
    r.style.transform = `translate3d(0,${y}px,0) rotate(${r.dataset.r || 0}deg)`;
  });
  // film
  const q = prog(fipin), k = q < .2 ? 0 : Math.min(fimgs.length - 1, 1 + Math.floor((q - .2) / .8 * (fimgs.length - 1)));
  if (k !== fk) { fimgs.forEach((m, i) => { m.classList.toggle('on', i === k); m.classList.remove('flick'); }); if (fk >= 0 && !reduce) { void fimgs[k].offsetWidth; fimgs[k].classList.add('flick'); } fk = k; }
  const s = Math.min(LINES.length - 1, Math.floor(q * LINES.length)); if (s !== sk) { sk = s; sub.textContent = LINES[s]; }
  filmst.style.setProperty('--b', `${clamp(13 - q * 30, 7, 13)}vh`); fprog.style.transform = `scaleX(${q})`;
  // merch
  if (auto && now - lastMove > 2600 && !reduce) go(1);
  mcur += (mi - mcur) * .085;
  const vw = Math.min(innerWidth, 1600), sp = vw < 700 ? vw * .42 : vw * .19;
  items.forEach((it, i) => {
    let o = ((i - mcur) % N + N) % N; if (o > N / 2) o -= N; const a = Math.abs(o);
    const sc = a < 1 ? 1 - a * .45 : .55 - (a - 1) * .05, op = a > 3.6 ? 0 : 1 - Math.max(0, a - 2.6);
    const bob = reduce ? 0 : Math.sin(now / 900 + i) * (a < .5 ? 8 : 4);
    it.style.transform = `translate3d(${o * sp}px,${bob + a * 14}px,${-a * 140}px) rotateY(${clamp(o * -22, -50, 50)}deg) scale(${sc})`;
    it.style.opacity = op; it.style.zIndex = 100 - Math.round(a * 10); it.style.pointerEvents = op < .2 ? 'none' : 'auto';
  });
  const ci = ((Math.round(mcur) % N) + N) % N;
  if (ci !== lastName) { lastName = ci; pn.textContent = MERCH[ci][1]; pp.textContent = MERCH[ci][2] + ' € · TAMBVRINI'; }
  // cursor
  cx += (mx - cx) * .25; cy += (my - cy) * .25; cur.style.transform = `translate3d(${cx}px,${cy}px,0)`;
  px += (mx - px) * .14; py += (my - py) * .14; peek.style.transform = `translate3d(${px + 24}px,${py - 120}px,0) rotate(${clamp((mx - px) * .03, -6, 6)}deg)`;
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);


/* ---------- ES / EN ---------- */
function setLang(l) {
  LANG = l; LINES = LINESI[l]; sk = -1; document.documentElement.lang = l;
  $$('[data-en]').forEach(el => {
    if (el.dataset.es === undefined) el.dataset.es = el.dataset.txt || el.textContent.trim();
    const t = l === 'en' ? el.dataset.en : el.dataset.es; delete el.dataset.txt;
    if (el.hasAttribute('data-cap')) { el.innerHTML = t.split(/\s+/).map(w => `<span class="w"><i>${w}</i></span>`).join(' '); }
    else el.textContent = t;
  });
  $$('.lang button').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === l));
  try { localStorage.setItem('tambv-lang', l); } catch (e) { }
  fit();
}
$$('.lang button').forEach(b => b.onclick = () => setLang(b.dataset.lang));
{ let l = null; try { l = localStorage.getItem('tambv-lang'); } catch (e) { } if (!l) l = (navigator.language || 'es').toLowerCase().startsWith('es') || (navigator.language || '').toLowerCase().startsWith('ca') ? 'es' : 'en'; setLang(l); }

/* ---------- hero: video through WebGL with a liquid cursor trail (Active Theory-style) ---------- */
const video = $('#hv'); video.muted = true; const pv = video.play(); pv && pv.catch(() => { });
(function heroGL() {
  if (reduce || !window.THREE) return;
  const canvas = $('#hgl'); let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'high-performance' }); } catch (e) { return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 820 || matchMedia('(pointer:coarse)').matches ? 1 : 1.5));
  const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), quad = new THREE.PlaneGeometry(2, 2);
  const TW = 192, TH = 108, opts = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, depthBuffer: false };
  let rtA = new THREE.WebGLRenderTarget(TW, TH, opts), rtB = new THREE.WebGLRenderTarget(TW, TH, opts);
  const V = 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }';
  // trail: velocity in rg (0.5 = still), energy in b; decays and drifts like ink
  const trailMat = new THREE.ShaderMaterial({ vertexShader: V, uniforms: { prev: { value: null }, mouse: { value: new THREE.Vector2(-1, -1) }, vel: { value: new THREE.Vector2() }, asp: { value: 1.78 }, amt: { value: 0 } },
    fragmentShader: `uniform sampler2D prev; uniform vec2 mouse, vel; uniform float asp, amt; varying vec2 vUv;
    void main(){ vec3 p = texture2D(prev, vUv).rgb; vec2 f = (p.rg - .5); vec3 q = texture2D(prev, vUv - f * .012).rgb;
      vec2 v = (q.rg - .5) * .965; float e = q.b * .955;
      vec2 d = vUv - mouse; d.x *= asp; float g = exp(-dot(d, d) / .0035) * amt;
      v += vel * g; e += g * .55; gl_FragColor = vec4(clamp(v + .5, 0., 1.), clamp(e, 0., 1.), 1.); }` });
  const sceneT = new THREE.Scene(); sceneT.add(new THREE.Mesh(quad, trailMat));
  // clear trail to neutral
  renderer.setClearColor(new THREE.Color(.5, .5, 0), 1); renderer.setRenderTarget(rtA); renderer.clear(); renderer.setRenderTarget(rtB); renderer.clear(); renderer.setRenderTarget(null); renderer.setClearColor(0x000000, 1);
  const poster = new THREE.TextureLoader().load('img/poster.jpg'); poster.minFilter = THREE.LinearFilter;
  const vtex = new THREE.VideoTexture(video); vtex.minFilter = THREE.LinearFilter; vtex.magFilter = THREE.LinearFilter;
  const mat = new THREE.ShaderMaterial({ vertexShader: V, uniforms: { tex: { value: poster }, trail: { value: rtA.texture }, res: { value: new THREE.Vector2(1, 1) }, vid: { value: new THREE.Vector2(16, 9) }, time: { value: 0 }, scroll: { value: 0 } },
    fragmentShader: `uniform sampler2D tex, trail; uniform vec2 res, vid; uniform float time, scroll; varying vec2 vUv;
    float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
    void main(){
      float rr = res.x / res.y, vr = vid.x / vid.y; vec2 s = rr > vr ? vec2(1., vr / rr) : vec2(rr / vr, 1.);
      vec2 uv = (vUv - .5) * s / (1. + scroll * .12) + .5;
      vec3 t = texture2D(trail, vUv).rgb; vec2 f = (t.rg - .5) * 2.;
      uv += f * .045;
      vec2 dir = length(f) > .001 ? normalize(f) : vec2(1., 0.);
      float ab = .0012 + length(f) * .018 + t.b * .006;
      vec3 c = vec3(texture2D(tex, uv + dir * ab).r, texture2D(tex, uv).g, texture2D(tex, uv - dir * ab).b);
      float l = dot(c, vec3(.299, .587, .114));
      c += vec3(-.006, .012, .016) * (1. - l);              // teal in the shadows
      c = mix(c, c * c * (3. - 2. * c), .25);                 // a touch of contrast
      c += t.b * vec3(.02, .05, .05);                          // trail glows faintly cyan
      vec2 q = vUv - .5; c *= 1. - dot(q, q) * .9;            // vignette
      c *= 1. - scroll * .55;
      c += (h(vUv * res + fract(time) * 100.) - .5) * .07;    // grain
      gl_FragColor = vec4(c, 1.); }` });
  const scene = new THREE.Scene(); scene.add(new THREE.Mesh(quad, mat));
  const hero = $('#hero');
  const size = () => { const w = hero.clientWidth, h = hero.clientHeight; renderer.setSize(w, h, false); mat.uniforms.res.value.set(w * renderer.getPixelRatio(), h * renderer.getPixelRatio()); trailMat.uniforms.asp.value = w / h; };
  addEventListener('resize', size); size();
  const useVideo = () => { if (video.videoWidth) { mat.uniforms.tex.value = vtex; mat.uniforms.vid.value.set(video.videoWidth, video.videoHeight); } };
  video.addEventListener('playing', useVideo); if (!video.paused && video.readyState > 2) useVideo();
  let m = new THREE.Vector2(-1, -1), pm = null, lastIn = 0;
  hero.addEventListener('pointermove', e => { const r = hero.getBoundingClientRect(); m.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height); lastIn = performance.now(); }, { passive: true });
  document.documentElement.classList.add('gl-on');
  let visible = true; new IntersectionObserver(es => visible = es[0].isIntersecting).observe(hero);
  function frame(now) {
    requestAnimationFrame(frame); if (!visible) return;
    const t = now / 1000; let target = m, amt = 1;
    if (now - lastIn > 2200) { target = new THREE.Vector2(.5 + Math.sin(t * .37) * .32, .45 + Math.sin(t * .53 + 1.3) * .22); amt = .35; }
    const vel = pm ? new THREE.Vector2((target.x - pm.x) * 9, (target.y - pm.y) * 9) : new THREE.Vector2();
    if (vel.length() > 1.2) vel.setLength(1.2);
    pm = target.clone();
    trailMat.uniforms.prev.value = rtA.texture; trailMat.uniforms.mouse.value.copy(target); trailMat.uniforms.vel.value.copy(vel); trailMat.uniforms.amt.value = amt * Math.min(1, vel.length() * 6);
    renderer.setRenderTarget(rtB); renderer.render(sceneT, cam); renderer.setRenderTarget(null);
    const tmp = rtA; rtA = rtB; rtB = tmp;
    mat.uniforms.trail.value = rtA.texture; mat.uniforms.time.value = t;
    mat.uniforms.scroll.value = clamp(scrollY / hero.clientHeight, 0, 1);
    renderer.render(scene, cam);
  }
  requestAnimationFrame(frame);
})();
})();
