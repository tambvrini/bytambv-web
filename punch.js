(() => {
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const root = document.documentElement;

/* ---------- intro disabled: show the hero immediately ---------- */
const intro = $('#intro');
if (intro) intro.classList.add('done');

/* ---------- hero: lema words split apart, TAMBV letters spread as you scroll away ---------- */
const hero = $('#hero'), lema = $('#lema'), lw = $$('#lema .w'), ll = $$('#h1 span');
lw.forEach(w => w.addEventListener('animationend', () => { w.style.animation = 'none'; w.style.opacity = 1; w.style.filter = 'none'; }));

/* ---------- kinetic strips ---------- */
const kins = $$('.kin').map(k => ({ el: $('.kt', k), dir: +k.dataset.dir || 1, x: 0 }));
let lastY = scrollY, vel = 0;

/* ---------- section titles: scramble once the wipe starts ---------- */
const GL = '01#/\\_3457<>*+';
const scr = el => { const t = el.textContent; let f = 0; const run = () => { el.textContent = t.split('').map((c, i) => i < f / 2 ? t[i] : GL[Math.random() * GL.length | 0]).join(''); f++; if (f / 2 < t.length) requestAnimationFrame(run); else el.textContent = t; }; run(); };
const tio = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; if (!reduce) $$('.w > i', e.target).forEach((i, k) => setTimeout(() => scr(i), k * 80)); tio.unobserve(e.target); }), { threshold: .3 });
$$('.head h2[data-cap]').forEach(h => tio.observe(h));

/* ---------- videoclips: flood layer behind each row ---------- */
$$('.row > a').forEach(a => { const im = $('.th img', a); if (!im) return; const f = document.createElement('span'); f.className = 'flood'; f.innerHTML = `<img src="${im.getAttribute('src')}" alt="" loading="lazy">`; a.prepend(f); });

/* ---------- brands tiles: staggered wipe, counting numbers, tilt + glare ---------- */
const tiles = $$('.tile');
tiles.forEach((t, i) => { t.style.transitionDelay = `${(i % 4) * 90}ms`; const g = document.createElement('span'); g.className = 'gl'; t.appendChild(g); });
const countUp = b => {
  const m = b.textContent.trim().match(/^(\+?)([\d.]+)([KM]?)$/); if (!m) return;
  const to = parseFloat(m[2]), dec = (m[2].split('.')[1] || '').length, t0 = performance.now();
  const step = t => { const k = Math.min(1, (t - t0) / 1400), e = 1 - Math.pow(1 - k, 4); b.textContent = m[1] + (to * e).toFixed(dec) + m[3]; if (k < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
};
const bio = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; const t = e.target; t.classList.add('in'); const b = $('.bl b', t); if (b && !reduce) setTimeout(() => countUp(b), 250); bio.unobserve(t); }), { threshold: .15 });
tiles.forEach(t => bio.observe(t));
if (fine && !reduce) tiles.forEach(t => {
  t.addEventListener('pointermove', e => { const r = t.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height; t.style.transitionDelay = '0ms'; t.style.transform = `rotateY(${(x - .5) * 10}deg) rotateX(${(.5 - y) * 8}deg)`; t.style.setProperty('--gx', x * 100 + '%'); t.style.setProperty('--gy', y * 100 + '%'); });
  t.addEventListener('pointerleave', () => { t.style.transform = ''; });
});

/* ---------- film: a white frame flashes as the film arrives ---------- */
const flash = document.createElement('div'); flash.id = 'flash'; document.body.appendChild(flash);
const fio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting && e.boundingClientRect.top > 0 && !reduce) { flash.classList.remove('on'); void flash.offsetWidth; flash.classList.add('on'); } }), { threshold: .02 });
const fp = $('#fipin'); if (fp) fio.observe(fp);

/* ---------- magnetic buttons ---------- */
if (fine && !reduce) $$('.btn, #hero .soc a').forEach(b => {
  b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); const dx = e.clientX - r.left - r.width / 2, dy = e.clientY - r.top - r.height / 2; b.style.transform = `translate(${clamp(dx * .22, -10, 10)}px,${clamp(dy * .3, -8, 8)}px)`; });
  b.addEventListener('pointerleave', () => b.style.transform = '');
});


/* ---------- videoclips: clips orbit a 3D halftone spine; the camera drifts and settles on each clip ---------- */
const prog = el => { const r = el.getBoundingClientRect(); return clamp(-r.top / Math.max(1, r.height - innerHeight), 0, 1); };
const vfly = $('#vfly'), vspace = $('#vspace'), vscene = $('#vscene'), strobe = $('#strobe');
const num = v => parseFloat(v) * (/M/i.test(v) ? 1e6 : /K/i.test(v) ? 1e3 : 1);
const VC = $$('#rows li > a').map(a => ({ url: a.href, t: ($('.t', a).firstChild || {}).textContent.trim(), v: $('.v', a).textContent.trim(), img: $('.th img', a).getAttribute('src'), dur: a.dataset.dur, age: a.dataset.age, likes: a.dataset.likes, feat: a.dataset.feat, isNew: !!a.dataset.new }));
const NV = VC.length, STEP = 42; let maxV = Math.max(...VC.map(c => num(c.v)));
vfly.style.setProperty('--n', NV);
// clips
vspace.innerHTML = VC.map((c, i) => `<a class="vcard" href="${c.url}" target="_blank" rel="noopener" data-cur="PLAY"><img src="${c.img}" alt="${c.t}" loading="lazy"><span class="lbl">${String(i + 1).padStart(2, '0')}</span><span class="vw">${c.v}</span></a>`).join('')
  // vertebrae: halftone planes stacked on the axis, two crossed planes each so the column has volume
  + Array.from({ length: NV * 3 + 6 }, (_, j) => `<span class="vert" data-j="${j - 3}"><i></i><i></i></span>`).join('');
const vcards = $$('.vcard', vspace), verts = $$('.vert', vspace), ambs = $$('.amb img'), vt = $('#vt'), vfeat = $('#vfeat'), vbar = $('#vprog');
const vno = $('#vno'), vof = $('#vof'), vviews = $('#vviews'), vmeter = $('#vmeter'), vmeta = $('#vmeta'), vlab = $('#vlab'), vplay = $('#vplay'), vlist = $('#vlist');
vof.textContent = `/ ${String(NV).padStart(2, '0')}`;
vlist.innerHTML = VC.map((c, i) => `<li><button data-i="${i}"><span>${String(i + 1).padStart(2, '0')}</span>${c.t}</button></li>`).join('');
const lis = $$('#vlist li');
$$('#vlist button').forEach(b => b.onclick = () => { const i = +b.dataset.i, r = vfly.getBoundingClientRect(), H = r.height - innerHeight; scrollTo({ top: scrollY + r.top + H * (i / (NV - 1)), behavior: 'smooth' }); });
let vf = 0, vk = -1, ambi = 0, R = 400, GAP = 120, VG = 60;
const vlayout = () => {
  const w = vcards[0].offsetWidth; R = w * 1.25; GAP = w * .42; VG = GAP / 3;
  vcards.forEach((c, i) => c.style.transform = `translate(-50%,-50%) rotateY(${i * STEP}deg) translateZ(${R}px) translateY(${i * GAP}px)`);
};
addEventListener('resize', vlayout); vlayout();
const AGE = { es: { '6m': 'hace 6 meses', '8m': 'hace 8 meses', '1y': 'hace 1 año' }, en: { '6m': '6 months ago', '8m': '8 months ago', '1y': '1 year ago' } };
const L = { es: { views: 'Views en YouTube', dur: 'Duración', age: 'Publicado', likes: 'Likes', play: 'Ver videoclip ↗', new: 'Nuevo', feat: 'con' }, en: { views: 'YouTube views', dur: 'Length', age: 'Released', likes: 'Likes', play: 'Watch video ↗', new: 'New', feat: 'with' } };
const fmtK = n => n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : Math.round(n / 1e3) + 'K';
let cu = 0;
function setClip(k, quiet) {
  const c = VC[k], lg = root.lang === 'en' ? 'en' : 'es', T = L[lg]; vk = k;
  vno.textContent = String(k + 1).padStart(2, '0'); vno.classList.remove('in'); void vno.offsetWidth; vno.classList.add('in');
  vt.innerHTML = [...c.t].map((ch, i) => `<span class="ch" style="animation-delay:${i * 18}ms">${ch === ' ' ? '&nbsp;' : ch}</span>`).join('');
  vfeat.textContent = (c.isNew ? T.new : '') + (c.feat ? `${c.isNew ? ' · ' : ''}${T.feat} ${c.feat}` : '');
  vlab.textContent = T.views;
  const to = num(c.v), t0 = performance.now(), id = ++cu;
  const step = t => { if (id !== cu) return; const q = Math.min(1, (t - t0) / 900), e = 1 - Math.pow(1 - q, 4); vviews.textContent = fmtK(to * e).replace(/^0K$/, '0'); if (q < 1) requestAnimationFrame(step); else vviews.textContent = c.v; };
  reduce ? (vviews.textContent = c.v) : requestAnimationFrame(step);
  vmeter.style.transform = `scaleX(${(to / maxV).toFixed(3)})`;
  const meta = []; if (c.likes) meta.push([T.likes, c.likes]); if (c.dur) meta.push([T.dur, c.dur]); if (c.age) meta.push([T.age, /^\d{4}-/.test(c.age) ? new Date(c.age + 'T12:00:00').toLocaleDateString(lg === 'en' ? 'en-GB' : 'es-ES', { day: 'numeric', month: 'short', year: 'numeric' }).replace('.', '') : AGE[lg][c.age]]);
  vmeta.innerHTML = meta.map(([a, b], i) => `<span style="animation-delay:${120 + i * 70}ms"><em>${a}</em><b>${b}</b></span>`).join('');
  vplay.href = c.url; vplay.textContent = T.play;
  lis.forEach((li, i) => li.classList.toggle('on', i === k));
  ambi = 1 - ambi; ambs[ambi].src = c.img; ambs[ambi].classList.add('on'); ambs[1 - ambi].classList.remove('on');
  if (!quiet && !reduce) { strobe.classList.remove('on'); void strobe.offsetWidth; strobe.classList.add('on'); }
}
$$('.lang button').forEach(b => b.addEventListener('click', () => vk >= 0 && setClip(vk, true)));
// mouse orbit (Active Theory-style camera drift)
let omx = 0, omy = 0, ox = 0, oy = 0;
addEventListener('pointermove', e => { omx = e.clientX / innerWidth - .5; omy = e.clientY / innerHeight - .5; }, { passive: true });
// the page dims as you approach so the section pulls you in
const dim = document.createElement('div'); dim.id = 'dim'; document.body.appendChild(dim);
// scroll → index with a pause on each clip so it can be read
const hold = t => { const i = Math.floor(t), fr = t - i; const e = fr < .42 ? 0 : fr > .92 ? 1 : (x => x * x * (3 - 2 * x))((fr - .42) / .5); return i + e; };
function vloop(vel, now) {
  const r = vfly.getBoundingClientRect();
  const din = clamp((innerHeight * .45 - r.top) / (innerHeight * .45), 0, 1), dout = clamp(r.bottom / innerHeight, 0, 1);
  dim.style.opacity = (Math.min(din, dout) * .85).toFixed(3);
  if (r.bottom < -100 || r.top > innerHeight + 100) return;
  const p = prog(vfly), target = hold(Math.min(p * NV, NV - .0001)) ;
  vf += (clamp(target, 0, NV - 1) - vf) * (reduce ? 1 : .07);
  const k = clamp(Math.round(vf), 0, NV - 1); if (k !== vk) setClip(k, vk < 0);
  ox += (omx - ox) * .05; oy += (omy - oy) * .05;
  const settle = 1 - Math.min(1, Math.abs(vf - Math.round(vf)) * 2.2);      // 1 when a clip is centred
  const t = now / 1000, drift = reduce ? 0 : Math.sin(t * .35) * 3;
  const tilt = -11 + Math.sin(p * Math.PI * 2) * 7 + oy * -10;
  const zoom = -R * 1.05 + settle * R * .28;
  vspace.style.transform = `translateZ(${zoom}px) rotateX(${tilt}deg) rotateZ(${ox * -3 + drift * .3}deg) translateY(${-vf * GAP}px) rotateY(${-vf * STEP + ox * 16 + drift}deg)`;
  vcards.forEach((c, i) => {
    const d = i - vf, face = (Math.cos(d * STEP * Math.PI / 180) + 1) / 2, near = clamp(1 - Math.abs(d) / 4.5, 0, 1);
    c.style.opacity = clamp(.04 + .96 * face * near, 0, 1).toFixed(3); c.style.filter = `brightness(${(.28 + .72 * face).toFixed(2)})`;
    c.style.pointerEvents = Math.abs(d) < .5 ? 'auto' : 'none';
  });
  // vertebrae face the camera (billboards) but keep their place on the axis; they swell near the active clip
  const camY = -vf * STEP + ox * 16 + drift;
  verts.forEach(v => { const j = +v.dataset.j, y = j * VG, dj = Math.abs(j / 3 - vf), sw = 1 + clamp(1 - dj, 0, 1) * .25; v.style.transform = `translate(-50%,-50%) translateY(${y}px) rotateY(${-camY}deg) scale(${sw})`; v.style.opacity = clamp(1 - dj / 4, .05, 1).toFixed(2); });
  const sv = clamp(Math.abs(vel) * .3, 0, 8);
  vscene.style.filter = sv > .3 ? `drop-shadow(${sv}px 0 0 rgba(255,40,80,.4)) drop-shadow(${-sv}px 0 0 rgba(60,255,220,.4))` : 'none';
  vbar.style.transform = `scaleX(${p})`;
}

/* ---------- brands: a world map of the work. See it all, then the camera dives in and flies piece to piece ---------- */
const bfly = $('#bfly'), board = $('#board'), bscene = $('#bscene'), bmap = $('#bmap');
const bname = $('#bname'), blab = $('#blab'), bmet = $('#bmet'), bgo = $('#bgo'), bstep = $('#bstep');
const BT = $$('#tiles .tile').map((t, i) => { const sp = $('.bl span', t); return { url: t.href, img: $('.bg', t).getAttribute('src'), logo: ($('.tl img', t) || {}).src || '', m: $('.bl b', t).textContent.trim(), es: sp.dataset.es || sp.textContent, en: sp.dataset.en || sp.textContent, g: 'abcdefghij'[i] }; });
const NB = BT.length; bfly.style.setProperty('--n', NB);
const mtxt = (b, en) => en && b.m === 'Campaña' ? 'Campaign' : b.m;
const drawBoard = () => {
  const en = root.lang === 'en';
  board.innerHTML = '<span class="floor"></span>' + BT.map(b => { const tx = en ? b.en : b.es, nm = tx.split(' — ')[0];
    const isBranch = b.g === 'a' || b.g === 'b' || b.g === 'e'; const tag = isBranch ? 'div' : 'a';
    const branch = b.g === 'a' ? 'velada' : b.g === 'e' ? 'cupra' : 'dwt';
    const branchCount = b.g === 'a' ? 3 : b.g === 'e' ? 4 : 5;
    return `<${tag} class="bt"${isBranch ? ` data-branch="${branch}" role="button" tabindex="0" data-cur="+${branchCount}"` : ` href="${b.url}" target="_blank" rel="noopener" data-cur="VER"`} style="grid-area:${b.g}"><img src="${b.img}" alt="${nm}" loading="lazy"><span class="sh"></span>${b.logo ? `<img class="lg" src="${b.logo}" alt="">` : ''}${isBranch ? `<span class="brk mono">+${branchCount} reels ✦ ${en ? 'click' : 'click'}</span>` : ''}<span class="mt"><b class="cond">${mtxt(b, en)}</b><span class="mono">${nm}</span></span></${tag}>`; }).join('');
  bmap.innerHTML = '<div class="mg">' + BT.map(b => `<i style="grid-area:${b.g}"></i>`).join('') + '</div><span class="mono">Map</span>';
  bk2 = -2;
};
let bk2 = -2; drawBoard(); $$('.lang button').forEach(b => b.addEventListener('click', drawBoard));
let bp = 0, bcu = 0;
function setFocus(k) {
  bk2 = k; const en = root.lang === 'en', tiles = $$('.bt', board), mi = $$('.mg i', bmap);
  tiles.forEach((t, i) => t.classList.toggle('on', i === k)); mi.forEach((t, i) => t.classList.toggle('on', i === k));
  bscene.classList.toggle('focus', k >= 0);
  if (k < 0) { ++bcu; bstep.textContent = en ? `Overview · ${NB} brands` : `Vista general · ${NB} marcas`; bname.textContent = ''; blab.textContent = en ? 'Scroll to fly in' : 'Haz scroll para entrar'; bmet.textContent = '+20M'; bgo.style.visibility = 'hidden'; return; }
  const b = BT[k], tx = en ? b.en : b.es;
  bstep.textContent = `${String(k + 1).padStart(2, '0')} / ${String(NB).padStart(2, '0')}`;
  bname.textContent = tx.split(' — ')[0]; blab.textContent = tx.split(' — ').slice(1).join(' — ');
  bgo.style.visibility = 'visible'; bgo.href = b.url; bgo.textContent = en ? 'Watch piece ↗' : 'Ver pieza ↗';
  const m = mtxt(b, en); bmet.textContent = m;
  const mm = m.match(/^(\+?)([\d.]+)([KM]?)$/), id = ++bcu;
  if (mm && !reduce) { const to = parseFloat(mm[2]), dec = (mm[2].split('.')[1] || '').length, t0 = performance.now(); const st = t => { if (id !== bcu) return; const q = Math.min(1, (t - t0) / 1000), e = 1 - Math.pow(1 - q, 4); bmet.textContent = mm[1] + (to * e).toFixed(dec) + mm[3]; if (q < 1) requestAnimationFrame(st); }; requestAnimationFrame(st); }
  [bname, bmet].forEach(el => { el.classList.remove('in'); void el.offsetWidth; el.classList.add('in'); });
}
const ss = x => x * x * (3 - 2 * x);
function bloop() {
  const r = bfly.getBoundingClientRect(); if (r.bottom < -100 || r.top > innerHeight + 100) return;
  ox += (omx - ox) * .05; oy += (omy - oy) * .05;
  const p = prog(bfly); bp += (p - bp) * (reduce ? 1 : .07);
  const W = board.offsetWidth, H = board.offsetHeight, SW = bscene.clientWidth, SH = bscene.clientHeight, mob = innerWidth < 820;
  const fit = Math.min(SW * .86 / W, SH * .62 / H);
  const tiles = $$('.bt', board);
  // camera keyframes: 0 = overview, 1..NB = each piece, NB+1 = overview again
  const cam = j => {
    if (j <= 0 || j > NB) return { x: W / 2, y: H / 2, s: fit, rx: 24, rz: 0, oy: .6 };
    const t = tiles[j - 1], w = t.offsetWidth, h = t.offsetHeight;
    const s = Math.min(SW * (mob ? .8 : .4) / w, SH * .42 / h);
    return { x: t.offsetLeft + w / 2, y: t.offsetTop + h / 2, s, rx: 46, rz: (j % 2 ? -7 : 6), oy: mob ? .52 : .46 };
  };
  const T = bp * (NB + 1), i = Math.floor(T), fr = T - i;
  const e = fr < .45 ? 0 : fr > .95 ? 1 : ss((fr - .45) / .5);
  const A = cam(i), B = cam(i + 1), L = (u, v) => u + (v - u) * e;
  // dip the camera between stops so the move feels like a flight
  const lift = Math.sin(e * Math.PI) * .22;
  const c = { x: L(A.x, B.x), y: L(A.y, B.y), s: L(A.s, B.s) * (1 - lift), rx: L(A.rx, B.rx) + lift * 18, rz: L(A.rz, B.rz), oy: L(A.oy, B.oy) };
  board.style.transform = `translate3d(${SW / 2}px,${SH * c.oy}px,0) rotateX(${c.rx + oy * -5}deg) rotateZ(${c.rz + ox * 4}deg) scale(${c.s}) translate3d(${-c.x}px,${-c.y}px,0)`;
  const k = e > .5 ? i + 1 : i, f = k >= 1 && k <= NB ? k - 1 : -1;
  if (f !== bk2) setFocus(f);
}

/* ---------- DWT4: click the piece and its five reels branch out of it ---------- */
const REELS = [
  ['img/dwt-r1.jpg', 'https://www.instagram.com/p/DWovKYrDiAG/'], ['img/dwt-r2.jpg', 'https://www.instagram.com/p/DYPmr6nIoly/'],
  ['img/dwt-r3.jpg', 'https://www.instagram.com/p/DYcRmqjoDaC/'], ['img/dwt-r4.jpg', 'https://www.instagram.com/p/DYkjbtGxXZ7/'],
  ['img/dwt-r5.jpg', 'https://www.instagram.com/p/DYwzUeUNcgE/']];
const CUPRA_REELS = [
  ['img/cupra-reel-02.png', 'https://www.instagram.com/p/DYfGXyHMQnR/?hl=es'],
  ['img/cupra-reel-03.png', 'https://www.instagram.com/p/DZ7fEtiM31Z/?hl=es'],
  ['img/cupra-reel-04.png', 'https://www.instagram.com/p/DaAyIntM6M0/?hl=es']
];
const VELADA_REELS = [
  ['img/velada-reel-01.png', 'https://www.instagram.com/p/Da72bCOtkdN/?hl=es'],
  ['img/velada-reel-02.png', 'https://www.instagram.com/p/DbGQuN5Ix_g/?hl=es'],
  ['img/velada-reel-03.png', 'https://www.instagram.com/p/DbLZh6BNsEz/?hl=es']
];
const bst = $('.bst', bfly);
const br = document.createElement('div'); br.className = 'branch'; br.setAttribute('aria-hidden', 'true');
br.innerHTML = `<svg class="bl" aria-hidden="true"></svg><button class="bx mono" aria-label="Cerrar">✕</button><div class="bh"><span class="mono">DWT4 · Jordi Wild</span><b class="cond">5 reels</b></div>` +
  REELS.map((r, i) => `<a class="rl" href="${r[1]}" target="_blank" rel="noopener" data-cur="VER" style="--i:${i}"><img src="${r[0]}" alt=""><span class="mono">Reel ${String(i + 1).padStart(2, '0')} ↗</span></a>`).join('');
bst.appendChild(br);
const rls = $$('.rl', br), svg = $('.bl', br);
let brOpen = false, brY = 0;
function openBranch(tile) {
  const branchName = tile.dataset.branch;
  const isCupra = branchName === 'cupra', isVelada = branchName === 'velada';
  const active = isVelada ? VELADA_REELS : isCupra ? [['img/cupra-reel-01.png', 'https://www.instagram.com/p/DbYPK5Rs0jF/?hl=es'], ...CUPRA_REELS] : REELS;
  rls.forEach((r, i) => { const d = active[i]; r.style.display = d ? '' : 'none'; if (d) { r.href = d[1]; $('img', r).src = d[0]; $('span', r).textContent = 'Reel ' + String(i + 1).padStart(2, '0') + ' ↗'; } });
  $('.bh span', br).textContent = isVelada ? 'LA VELADA DEL AÑO VI' : isCupra ? 'CUPRA · RAVAL' : 'DWT4 · Jordi Wild';
  $('.bh b', br).textContent = active.length + ' reels';
  const S = bst.getBoundingClientRect(), T = tile.getBoundingClientRect();
  let ox0 = T.left + T.width / 2 - S.left, oy0 = T.top + T.height / 2 - S.top; const W = S.width, H = S.height, mob = W < 820;
  const count = active.length;
  let cw = Math.min(W * .14, 230), ch = cw * 16 / 10, pts;
  if (mob) {
    // phone: a centred grid that always fits on screen (3 per row; 4 reels go 2+2)
    const per = count <= 3 ? count : count === 4 ? 2 : 3, rows = Math.ceil(count / per), gap = 10, pad = 16;
    const top = H * .27, room = H - top - 90;
    cw = Math.min((W - pad * 2 - gap * (per - 1)) / per, (room - gap * (rows - 1)) / rows / 1.6, 170); ch = cw * 1.6;
    pts = rls.map((_, i) => { const r = Math.floor(i / per), inRow = Math.min(per, count - r * per), c = i - r * per;
      return { x: W / 2 + (c - (inRow - 1) / 2) * (cw + gap), y: top + ch / 2 + r * (ch + gap) }; });
    // keep the branch origin on screen, just under the grid
    const gridBottom = top + rows * ch + (rows - 1) * gap;
    ox0 = Math.min(W - 24, Math.max(24, ox0)); oy0 = Math.min(H - 30, Math.max(gridBottom + 34, Math.min(oy0, H - 30)));
  } else {
    pts = rls.map((_, i) => { const mid = (count - 1) / 2, u = (i - mid) / Math.max(1, mid); return { x: W / 2 + (i - mid) * cw * 1.2, y: H * .56 - Math.abs(u) * 30 }; });
  }
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.innerHTML = pts.slice(0, count).map((p, i) => { const mx = (ox0 + p.x) / 2, my = mob ? Math.max(oy0, p.y) + 40 : Math.min(oy0, p.y) - 80, ey = mob ? p.y + ch / 2 : p.y - ch / 2; return `<path d="M${ox0},${oy0} Q${mx},${my} ${p.x},${ey}" style="--d:${i * 70}ms" pathLength="1"/>`; }).join('') + `<circle cx="${ox0}" cy="${oy0}" r="5"/>`;
  rls.forEach((r, i) => { r.style.width = cw + 'px'; r.style.height = ch + 'px'; r.style.setProperty('--fx', (ox0 - pts[i].x) + 'px'); r.style.setProperty('--fy', (oy0 - pts[i].y) + 'px'); r.style.left = (pts[i].x - cw / 2) + 'px'; r.style.top = (pts[i].y - ch / 2) + 'px'; });
  br.classList.remove('on'); void br.offsetWidth; br.classList.remove('ready'); br.classList.add('on'); bst.classList.add('br-on'); clearTimeout(br._t); br._t = setTimeout(() => br.classList.add('ready'), 1200); br.setAttribute('aria-hidden', 'false'); brOpen = true; brY = scrollY;
}
const closeBranch = () => { if (!brOpen) return; br.classList.remove('on'); bst.classList.remove('br-on'); br.setAttribute('aria-hidden', 'true'); brOpen = false; };
board.addEventListener('click', e => { const t = e.target.closest('.bt[data-branch]'); if (!t) return; e.preventDefault(); e.stopPropagation(); if (!brOpen) openBranch(t); });
$('.bx', br).onclick = closeBranch;
br.addEventListener('click', e => { if (e.target === br || e.target === svg) closeBranch(); });
addEventListener('keydown', e => { if (e.key === 'Escape') closeBranch(); if ((e.key === 'Enter' || e.key === ' ') && document.activeElement && document.activeElement.matches('.bt[data-branch]')) { e.preventDefault(); openBranch(document.activeElement); } });
addEventListener('scroll', () => { if (brOpen && Math.abs(scrollY - brY) > 120) closeBranch(); }, { passive: true });


/* ---------- live numbers: /api/stats (YouTube Data API, refreshed daily on the server) ---------- */
const k1 = n => n >= 1e6 ? (n / 1e6).toFixed(n >= 1e7 ? 0 : 1).replace(/\.0$/, '') + 'M' : n >= 1e3 ? (n / 1e3).toFixed(n >= 1e5 ? 0 : 1).replace(/\.0$/, '') + 'K' : String(n);
/* total followers = live YouTube + live Instagram (30K fallback) + Spotify (~1.5K), floored to the thousand */
const FOL = { yt: 84300, ig: 30000, sp: 1500 };
const paintFollowers = () => { const t = FOL.yt + FOL.ig + FOL.sp; $$('[data-total-followers]').forEach(el => el.textContent = '+' + (t >= 1e6 ? (Math.floor(t / 1e5) / 10).toString() + 'M' : Math.floor(t / 1e3) + 'K')); };
paintFollowers();
fetch('/api/stats').then(r => r.ok ? r.json() : null).then(d => {
  if (!d) return;
  if (d.channel && d.channel.subscribers) { FOL.yt = d.channel.subscribers; paintFollowers(); }
  if (d.channel && d.channel.subscribers) $$('[data-count="80000"],[data-count="83000"]').forEach(el => { el.dataset.count = d.channel.subscribers; el.textContent = k1(d.channel.subscribers); });
  if (d.videos) {
    VC.forEach(c => { const id = (c.url.match(/[?&]v=([\w-]{11})/) || [])[1], v = id && d.videos[id]; if (!v) return;
      if (v.views) c.v = k1(v.views); if (v.likes) c.likes = k1(v.likes); if (v.duration) c.dur = v.duration; if (v.published) c.age = v.published.slice(0, 10); });
    maxV = Math.max(...VC.map(c => num(c.v)));
    $$('.vcard .vw').forEach((el, i) => el.textContent = VC[i].v);
    if (vk >= 0) setClip(vk, true);
  }
}).catch(() => { });

/* ---------- live Instagram followers (professional account, with fallback) ---------- */
const instagramFmt = n => n >= 1e6 ? (n / 1e6).toFixed(n >= 1e7 ? 0 : 1).replace(/\.0$/, '') + 'M' : n >= 1e3 ? Math.round(n / 1e3) + 'K' : String(n);
fetch('/api/instagram').then(r => r.ok ? r.json() : null).then(d => {
  if (!d || typeof d.followers !== 'number') return;
  $$('[data-live="instagram-followers"]').forEach(el => { el.dataset.count = d.followers; el.textContent = instagramFmt(d.followers); });
  FOL.ig = d.followers; paintFollowers();
}).catch(() => { });

/* ---------- one loop for scroll-driven bits ---------- */
function loop() {
  const y = scrollY; vel += ((y - lastY) - vel) * .12; lastY = y;
  if (!reduce) {
    const hp = clamp(y / Math.max(1, hero.clientHeight), 0, 1);
    if (hp < 1) {
      // lema stays together: on desktop it grows from 70% to full width as you leave the hero, no word spreading
      if (lema) { const g = innerWidth > 820 ? 1 + hp * .4 : 1; lema.style.transform = `scale(${g.toFixed(4)})`; lema.style.opacity = (1 - hp * .7).toFixed(3); }
      ll.forEach((l, i) => { l.style.transform = `translate3d(${(i - 2) * hp * 5}vw,${-hp * 60}px,0)`; });
    }
    kins.forEach(k => {
      const r = k.el.parentElement.getBoundingClientRect(); if (r.bottom < -50 || r.top > innerHeight + 50) return;
      const third = k.el.scrollWidth / 3;
      k.x -= (0.6 + Math.abs(vel) * .5) * k.dir * (vel < 0 ? -1 : 1);
      if (k.x <= -third) k.x += third; if (k.x > 0) k.x -= third;
      k.el.style.transform = `translate3d(${k.x}px,0,0) skewX(${clamp(-vel * .25, -12, 12)}deg)`;
    });
  }
  vloop(vel, performance.now());
  bloop();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
})();
