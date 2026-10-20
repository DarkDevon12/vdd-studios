const WHATSAPP = '5517981117587';

// Menu mobile
const toggle = document.getElementById('nav-toggle');
const nav = document.getElementById('nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
});

nav.addEventListener('click', (e) => {
  if (e.target.matches('a')) {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', false);
  }
});

// Sombra no header ao rolar
const header = document.getElementById('header');
addEventListener('scroll', () => header.classList.toggle('is-scrolled', scrollY > 10), { passive: true });

// Animação de entrada + link ativo no menu
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const navLinks = [...nav.querySelectorAll('a')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((a) => a.classList.toggle('is-active', a.hash === '#' + entry.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach((s) => sectionObserver.observe(s));

// Formulário -> WhatsApp
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const { nome, servico, mensagem } = e.target.elements;
  const text = `Olá! Sou ${nome.value.trim()} e tenho interesse em: ${servico.value}.` +
    (mensagem.value.trim() ? `\n\n${mensagem.value.trim()}` : '');
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});

document.getElementById('year').textContent = new Date().getFullYear();
