(() => {
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const LEET = { E: '3', S: '5', I: '1', A: '4', O: '0' };

/* INDEX: broken compressed words: one gap, one or two leet letters, shuffled on every open */
function breakWord(w) {
  const ch = [...w.toUpperCase()], n = ch.length;
  const swaps = new Set(); const cand = ch.map((c, i) => LEET[c] ? i : -1).filter(i => i > 0);
  if (cand.length) swaps.add(cand[Math.random() * cand.length | 0]);
  const gap = n > 3 ? 1 + (Math.random() * (n - 2) | 0) : -1;
  return ch.map((c, i) => (i === gap ? '<span class="g"></span>' : '') + `<span class="lt">${swaps.has(i) ? LEET[c] : c === ' ' ? '&nbsp;' : c}</span>`).join('');
}
function paintIndex() {
  $$('#index li .t').forEach(t => { const w = t.dataset.raw = t.textContent.replace(/\s+/g, ' ').trim(); t.innerHTML = breakWord(w); t.setAttribute('aria-label', w); });
  const c = $('#ixc'); if (c) c.textContent = document.documentElement.lang === 'en' ? '_CLOSE' : '_CERRAR';
}
const ix = $('#index');
new MutationObserver(() => { if (ix.classList.contains('on')) paintIndex(); }).observe(ix, { attributes: true, attributeFilter: ['class'] });
// keep the language switch working: restore plain words before setLang rewrites them
$$('.lang button').forEach(b => b.addEventListener('click', () => setTimeout(() => ix.classList.contains('on') && paintIndex(), 0), true));
$$('#index li .t').forEach(t => t.addEventListener('pointerenter', () => { if (!reduce) t.innerHTML = breakWord(t.dataset.raw || t.textContent); }));

/* glitch slices: big titles fire a short glitch when they come in, then now and then */
const GL = ['#merch .head h2', '#brands .head h2', '.vsec', '#film h2', '#hero h1'];
const gls = [];
GL.forEach(sel => $$(sel).forEach(el => { el.classList.add('glx'); el.dataset.g = el.textContent.trim(); gls.push(el); }));
const fire = el => { if (reduce) return; el.dataset.g = el.textContent.trim(); el.classList.remove('fire'); void el.offsetWidth; el.classList.add('fire'); };
const seen = new Set();
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { seen.add(e.target); setTimeout(() => fire(e.target), 350); } else seen.delete(e.target); }), { threshold: .4 });
gls.forEach(el => io.observe(el));
setInterval(() => { const v = [...seen]; if (v.length && Math.random() < .55) fire(v[Math.random() * v.length | 0]); }, 4200);

/* halftone edges into the white sections */
const edge = (before, inv) => { const d = document.createElement('div'); d.className = 'ht-edge' + (inv ? ' inv' : ''); d.setAttribute('aria-hidden', 'true'); before.parentNode.insertBefore(d, before); };
const merch = $('#merch'), contact = $('#contact');
if (merch) edge(merch);
if (contact && contact.previousElementSibling !== merch) edge(contact);
})();
