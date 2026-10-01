// Squid Wok — navigation, apparitions, bandeau
(() => {
  const root = document.documentElement;
  const burger = document.querySelector('.burger');
  if (burger) {
    const toggle = open => {
      root.classList.toggle('nav-open', open);
      burger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', () => toggle(!root.classList.contains('nav-open')));
    document.querySelectorAll('.mnav a').forEach(a => a.addEventListener('click', () => toggle(false)));
    document.addEventListener('keydown', e => e.key === 'Escape' && toggle(false));
    matchMedia('(min-width:1101px)').addEventListener('change', e => e.matches && toggle(false));
  }

  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  document.querySelectorAll('.marquee__track').forEach(t => { t.innerHTML += t.innerHTML; });
})();
