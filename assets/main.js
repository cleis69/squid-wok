// Squid Wok — navigation, header, apparitions, bandeau
(() => {
  const root = document.documentElement;
  const header = document.querySelector('.header');
  const burger = document.querySelector('.burger');

  // Burger + menu plein écran
  if (burger) {
    const toggle = open => {
      root.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', open);
      root.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', () => toggle(!root.classList.contains('menu-open')));
    document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => toggle(false)));
    document.addEventListener('keydown', e => e.key === 'Escape' && toggle(false));
  }

  // Header crème au scroll
  const onScroll = () => header && header.classList.toggle('is-scrolled', scrollY > 40);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Apparitions au scroll
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Bandeau défilant en boucle
  document.querySelectorAll('.marquee__track').forEach(t => { t.innerHTML += t.innerHTML; });
})();
