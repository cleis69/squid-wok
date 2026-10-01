// Squid Wok — interactions
(() => {
  const root = document.documentElement;
  const header = document.querySelector('.header');
  const burger = document.querySelector('.burger');

  // Burger / fullscreen nav
  if (burger) {
    const toggle = (open) => {
      root.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', () => toggle(!root.classList.contains('menu-open')));
    document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => toggle(false)));
    document.addEventListener('keydown', e => e.key === 'Escape' && toggle(false));
  }

  // Header shrink on scroll
  const onScroll = () => header && header.classList.toggle('is-scrolled', scrollY > 40);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Menu tabs
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => t.setAttribute('aria-selected', t === tab));
    document.querySelectorAll('.panel').forEach(p => p.hidden = p.id !== tab.getAttribute('aria-controls'));
  }));

  // Deep-link from category cards to a menu tab
  document.querySelectorAll('[data-tab]').forEach(link => link.addEventListener('click', () => {
    const t = document.querySelector(`.tab[aria-controls="${link.dataset.tab}"]`);
    if (t) t.click();
  }));

  // Duplicate marquee content for a seamless loop
  document.querySelectorAll('.marquee__track').forEach(track => { track.innerHTML += track.innerHTML; });
})();
