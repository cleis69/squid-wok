// Squid Wok — carte, composeur de wok et panier WhatsApp
// Prix = carte du restaurant (sur place / à emporter / commande directe).
(() => {
  const WA = '212708088139';
  const GLOVO = 'https://glovoapp.com/fr/ma/marrakech/stores/squid-wok-mar';
  const img = (id, w = 400) => `https://images.unsplash.com/photo-${id}?w=${w}&h=${w}&q=75&auto=format&fit=crop`;
  const PROT = [['Végé', 59], ['Poulet', 69], ['Bœuf', 75], ['Gambas', 79]];

  const MENU = [
    { id: 'plats', title: 'Plats', note: 'Sautés minute au wok', items: [
      { n: 'Nouilles sautées', d: 'Carottes, chou, brocolis, champignons, poivrons.', img: '1585032226651-759b368d7246', badge: 'Top vente', opts: PROT },
      { n: 'Riz sauté', d: 'Poivrons, oignons, gingembre, ail.', img: '1512058564366-18510be2db19', opts: PROT },
      { n: 'Wok saté', d: 'Sauce saté, légumes croquants. Servi avec riz ou nouilles.', img: '1574484284002-952d92456975', opts: PROT },
      { n: 'Pad Thaï', d: 'Cacahuètes, sauce aigre-douce, légumes croquants.', img: '1559314809-0d155014e29e', badge: 'Signature', opts: PROT },
      { n: 'Bœuf lôc lac', d: '100 % filet de bœuf mariné, œuf au plat, riz à la tomate.', img: '1600891964092-4316c288032e', badge: 'Signature', p: 79 },
      { n: 'Menu Wrap', d: 'Wrap et frites.', img: '1626804475297-41608ea09aeb', p: 59 },
    ]},
    { id: 'entrees', title: 'Entrées & salades', note: 'À partager (ou pas)', items: [
      { n: 'Nems', d: '3 pièces.', img: '1534422298391-e4f8c172dddb', badge: 'Signature', opts: [['Végé', 45], ['Poulet', 49], ['Gambas', 55]] },
      { n: 'Rouleaux de printemps', d: '3 pièces.', img: '1541696432-82c6da8ce7bf', opts: [['Végé', 45], ['Poulet', 49], ['Gambas', 55]] },
      { n: 'Gambas panées', d: '4 pièces.', img: '1525755662778-989d0524087e', p: 49 },
      { n: 'Brochettes de poulet panées au cheddar', d: '2 pièces.', img: '1563245372-f21724e3856d', p: 49 },
      { n: 'Salade thaï au filet de bœuf', d: 'Bœuf mariné, concombre, tomates cerises, coriandre, menthe.', img: '1504674900247-0877df9cc836', p: 55 },
      { n: 'Salade de vermicelles', d: 'Gambas, tomates cerises, carottes, coriandre, cacahuètes.', img: '1546069901-ba9599a7e63c', p: 55 },
      { n: 'Salade César', d: '', img: '1546069901-ba9599a7e63c', p: 49 },
      { n: 'Salade gambas', d: '', img: '1504674900247-0877df9cc836', badge: 'Choix du chef', p: 55 },
    ]},
    { id: 'desserts', title: 'Desserts', note: 'Faits maison', items: [
      { n: 'Tiramisu', d: 'Fait maison.', img: '1571877227200-a0d98ea607e9', opts: [['Chocolat', 39], ['Café', 39]] },
      { n: 'Cheesecake', d: 'Fait maison.', img: '1533134242443-d4fd215305ad', opts: [['Mangue', 39], ['Framboise', 39]] },
      { n: 'Mousse au chocolat', d: 'Fait maison.', img: '1571877227200-a0d98ea607e9', p: 39 },
    ]},
    { id: 'boissons', title: 'Boissons', note: '', items: [
      { n: 'Soda', d: 'Coca-Cola, Sprite, Fanta, Orangina, Hawaï, Poms…', p: 15 },
      { n: 'Café', d: '', p: 15 },
      { n: 'Eau 50 cl / 33 cl', d: '', opts: [['Sidi Ali 50 cl', 15], ['Oulmès 33 cl', 15]] },
      { n: 'Eau 1,5 L / 1 L', d: '', opts: [['Sidi Ali 1,5 L', 22], ['Oulmès 1 L', 22]] },
    ]},
  ];

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const icon = {
    wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7a11.6 11.6 0 0 1-4.5-4c-.4-.5-1-1.5-1-2.8 0-1.3.7-2 1-2.3.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.4.6-.3.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2 1.1 1 2 1.3 2.3 1.4.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.6-.1 1.2z"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
  };

  /* ---------- Panier ---------- */
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem('sw-cart') || '[]'); } catch (e) { cart = []; }
  const save = () => { try { localStorage.setItem('sw-cart', JSON.stringify(cart)); } catch (e) {} };
  const total = () => cart.reduce((s, l) => s + l.p * l.q, 0);
  const count = () => cart.reduce((s, l) => s + l.q, 0);

  function add(name, opt, price) {
    const key = name + '|' + (opt || '');
    const line = cart.find(l => l.k === key);
    line ? line.q++ : cart.push({ k: key, n: name, o: opt || '', p: price, q: 1 });
    save(); renderCart(); toast(`${name}${opt ? ' · ' + opt : ''} ajouté`);
  }

  function waText() {
    const mode = (document.querySelector('input[name="mode"]:checked') || {}).value || 'À emporter';
    const lines = cart.map(l => `• ${l.q}× ${l.n}${l.o ? ' (' + l.o + ')' : ''} — ${l.p * l.q} DH`);
    return `Bonjour Squid Wok ! Je souhaite commander :\n${lines.join('\n')}\n\nTotal : ${total()} DH\nMode : ${mode}\n\nNom :${mode === 'Livraison' ? '\nAdresse :' : '\nHeure de retrait :'}`;
  }

  const drawer = document.createElement('div');
  drawer.className = 'drawer';
  drawer.innerHTML = `
    <div class="drawer__bg" data-close></div>
    <aside class="drawer__panel" role="dialog" aria-modal="true" aria-labelledby="dtitle">
      <div class="drawer__head"><h2 id="dtitle" class="display">Ma commande</h2><button class="drawer__close" data-close aria-label="Fermer">×</button></div>
      <ul class="drawer__list"></ul>
      <div class="drawer__foot">
        <div class="mode" role="radiogroup" aria-label="Mode">
          <span><input type="radio" name="mode" id="m1" value="À emporter" checked><label for="m1">À emporter</label></span>
          <span><input type="radio" name="mode" id="m2" value="Livraison"><label for="m2">Livraison</label></span>
        </div>
        <div class="drawer__total"><span>Total</span><b>0 DH</b></div>
        <a class="btn btn--wa btn--block" id="send" target="_blank" rel="noopener">${icon.wa}Envoyer sur WhatsApp</a>
        <a class="btn btn--glovo btn--block" href="${GLOVO}" target="_blank" rel="noopener">Commander sur Glovo</a>
        <p class="drawer__note">Prix carte. Le restaurant confirme ta commande et le délai sur WhatsApp.</p>
      </div>
    </aside>`;
  document.body.appendChild(drawer);

  const fab = document.createElement('button');
  fab.className = 'cartfab';
  fab.setAttribute('aria-label', 'Voir ma commande');
  fab.innerHTML = `<span>Ma commande</span><b>0 DH</b><span class="count">0</span>`;
  document.body.appendChild(fab);

  const mbar = document.createElement('div');
  mbar.className = 'mbar';
  mbar.innerHTML = `<button class="btn btn--wa" data-open>${icon.wa}<span class="mbar__label">WhatsApp</span> <span class="count" hidden>0</span></button><a class="btn btn--glovo" href="${GLOVO}" target="_blank" rel="noopener">Glovo</a>`;
  document.body.appendChild(mbar);

  const toastEl = document.createElement('div');
  toastEl.className = 'toast'; toastEl.setAttribute('role', 'status');
  document.body.appendChild(toastEl);
  let tt; function toast(m) { toastEl.textContent = m; toastEl.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => toastEl.classList.remove('show'), 1800); }

  let lastFocus;
  function openCart() {
    lastFocus = document.activeElement;
    drawer.classList.add('open'); document.body.style.overflow = 'hidden';
    drawer.querySelector('.drawer__close').focus();
  }
  function closeCart() { drawer.classList.remove('open'); document.body.style.overflow = ''; lastFocus && lastFocus.focus(); }
  drawer.addEventListener('click', e => { if (e.target.closest('[data-close]')) closeCart(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && drawer.classList.contains('open')) closeCart(); });
  fab.addEventListener('click', openCart);
  document.addEventListener('click', e => { if (e.target.closest('[data-open]')) { e.preventDefault(); cart.length ? openCart() : window.open(`https://wa.me/${WA}?text=${encodeURIComponent('Bonjour Squid Wok ! Je voudrais commander : ')}`, '_blank', 'noopener'); } });
  drawer.addEventListener('change', renderCart);

  drawer.querySelector('.drawer__list').addEventListener('click', e => {
    const b = e.target.closest('[data-q]'); if (!b) return;
    const l = cart.find(x => x.k === b.dataset.k); if (!l) return;
    l.q += +b.dataset.q; if (l.q <= 0) cart = cart.filter(x => x !== l);
    save(); renderCart();
  });

  function renderCart() {
    const list = drawer.querySelector('.drawer__list');
    list.innerHTML = cart.length ? cart.map(l => `
      <li class="line"><div><b>${esc(l.n)}</b>${l.o ? `<small>${esc(l.o)}</small>` : ''}</div><span class="line__price">${l.p * l.q} DH</span>
      <div class="qty"><button data-q="-1" data-k="${esc(l.k)}" aria-label="Retirer un">−</button><span>${l.q}</span><button data-q="1" data-k="${esc(l.k)}" aria-label="Ajouter un">+</button></div></li>`).join('')
      : '<li class="drawer__empty">Ton panier est vide.<br>Ajoute un plat depuis la carte.</li>';
    drawer.querySelector('.drawer__total b').textContent = total() + ' DH';
    const send = drawer.querySelector('#send');
    send.href = `https://wa.me/${WA}?text=${encodeURIComponent(waText())}`;
    send.toggleAttribute('aria-disabled', !cart.length);
    send.style.pointerEvents = cart.length ? '' : 'none';
    send.style.opacity = cart.length ? '' : '.5';
    fab.classList.toggle('show', cart.length > 0);
    fab.querySelector('b').textContent = total() + ' DH';
    fab.querySelector('.count').textContent = count();
    const mc = mbar.querySelector('.count');
    mc.hidden = !cart.length; mc.textContent = count();
    mbar.querySelector('.mbar__label').textContent = cart.length ? `Commande · ${total()} DH` : 'WhatsApp';
  }

  /* ---------- Carte complète ---------- */
  const menuEl = document.getElementById('menu');
  if (menuEl) {
    menuEl.innerHTML = `
      <nav class="catnav" aria-label="Catégories"><div class="wrap catnav__in">${MENU.map((c, i) => `<a href="#cat-${c.id}"${i ? '' : ' class="on"'}>${c.title}</a>`).join('')}</div></nav>
      <div class="wrap">${MENU.map(c => `
        <section class="menu-cat" id="cat-${c.id}">
          <div class="menu-cat__title"><h3>${c.title}</h3>${c.note ? `<span class="script">${c.note}</span>` : ''}</div>
          <div class="dishes">${c.items.map(dish).join('')}</div>
        </section>`).join('')}
        <p style="font-size:.84rem;opacity:.7">Prix en dirhams, prix carte (commande directe, sur place, à emporter). Les prix sur Glovo peuvent différer. Photos d'illustration. Allergènes (arachides, crustacés, gluten, soja) : précise-le dans ta commande.</p>
      </div>`;

    menuEl.addEventListener('click', e => {
      const o = e.target.closest('.opt');
      if (o) {
        const d = o.closest('.dish');
        d.querySelectorAll('.opt').forEach(x => x.setAttribute('aria-pressed', x === o));
        d.querySelector('.dish__price').innerHTML = `${o.dataset.p}<small>DH</small>`;
        return;
      }
      const a = e.target.closest('[data-add]');
      if (a) {
        const d = a.closest('.dish');
        const sel = d.querySelector('.opt[aria-pressed="true"]');
        add(d.dataset.n, sel ? sel.dataset.o : '', +(sel ? sel.dataset.p : d.dataset.p));
        a.classList.remove('added'); void a.offsetWidth; a.classList.add('added');
      }
    });

    // Catégorie active pendant le scroll
    const links = menuEl.querySelectorAll('.catnav a');
    const io = new IntersectionObserver(es => es.forEach(en => {
      if (en.isIntersecting) links.forEach(l => {
        const on = l.getAttribute('href') === '#' + en.target.id;
        l.classList.toggle('on', on);
        if (on) l.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
      });
    }), { rootMargin: '-45% 0px -50% 0px' });
    menuEl.querySelectorAll('.menu-cat').forEach(s => io.observe(s));
  }

  function dish(it) {
    const first = it.opts ? it.opts[0][1] : it.p;
    const from = it.opts && new Set(it.opts.map(o => o[1])).size > 1;
    return `
      <article class="dish${it.img ? '' : ' dish--noimg'}" data-n="${esc(it.n)}" data-p="${first}">
        ${it.img ? `<img class="dish__img" loading="lazy" src="${img(it.img, 240)}" alt="${esc(it.n)}" width="112" height="112">` : ''}
        <div class="dish__body">
          <div class="dish__top">
            <div><h4>${esc(it.n)}</h4>${it.badge ? `<span class="dish__badge">${it.badge}</span>` : ''}</div>
            <span class="dish__price" aria-live="polite">${first}<small>DH</small></span>
          </div>
          ${it.d ? `<p>${esc(it.d)}</p>` : ''}
          ${it.opts ? `<div class="opts" role="group" aria-label="Choix">${it.opts.map((o, i) => `<button type="button" class="opt" data-o="${esc(o[0])}" data-p="${o[1]}" aria-pressed="${!i}">${esc(o[0])}${from ? ' · ' + o[1] : ''}</button>`).join('')}</div>` : ''}
          <div class="dish__actions">
            <button type="button" class="btn btn--wa btn--sm" data-add>${icon.plus}Ajouter</button>
            <a class="btn btn--glovo btn--sm" href="${GLOVO}" target="_blank" rel="noopener" aria-label="Commander ${esc(it.n)} sur Glovo">Glovo</a>
          </div>
        </div>
      </article>`;
  }

  /* ---------- Composeur de wok ---------- */
  const b = document.getElementById('builder');
  if (b) {
    const BASES = [['Nouilles sautées', '1585032226651-759b368d7246'], ['Riz sauté', '1512058564366-18510be2db19'], ['Wok saté', '1574484284002-952d92456975'], ['Pad Thaï', '1559314809-0d155014e29e']];
    b.innerHTML = `
      <div class="builder__visual reveal"><img id="bimg" src="${img(BASES[0][1], 900)}" alt="" width="900" height="900"><div class="tag"><b id="bname">Nouilles sautées</b><small id="bprot">Végé</small></div></div>
      <div class="builder__panel reveal">
        <div class="step"><h3><i>1</i>Ta base</h3><div class="choices">${BASES.map((x, i) => `<div class="choice"><input type="radio" name="base" id="b${i}" value="${i}"${i ? '' : ' checked'}><label for="b${i}">${x[0]}</label></div>`).join('')}</div></div>
        <div class="step"><h3><i>2</i>Ta protéine</h3><div class="choices">${PROT.map((x, i) => `<div class="choice"><input type="radio" name="prot" id="p${i}" value="${i}"${i ? '' : ' checked'}><label for="p${i}">${x[0]}<small>${x[1]} DH</small></label></div>`).join('')}</div></div>
        <div class="builder__total">
          <div><span class="eyebrow" style="color:var(--orange-deep)">Ton wok</span><div class="price" id="bprice">59<small>DH</small></div></div>
          <div class="builder__btns"><button class="btn btn--wa" id="badd">${icon.plus}Ajouter</button><a class="btn btn--glovo" href="${GLOVO}" target="_blank" rel="noopener">Glovo</a></div>
        </div>
      </div>`;
    const upd = () => {
      const bi = +b.querySelector('input[name=base]:checked').value, pi = +b.querySelector('input[name=prot]:checked').value;
      const im = b.querySelector('#bimg');
      if (!im.src.includes(BASES[bi][1])) { im.style.opacity = 0; setTimeout(() => { im.src = img(BASES[bi][1], 900); im.onload = () => im.style.opacity = 1; }, 180); }
      b.querySelector('#bname').textContent = BASES[bi][0];
      b.querySelector('#bprot').textContent = PROT[pi][0];
      b.querySelector('#bprice').innerHTML = `${PROT[pi][1]}<small>DH</small>`;
      return [BASES[bi][0], PROT[pi][0], PROT[pi][1]];
    };
    b.addEventListener('change', upd);
    b.querySelector('#badd').addEventListener('click', () => { const [n, o, p] = upd(); add(n, o, p); });
  }

  renderCart();
})();
