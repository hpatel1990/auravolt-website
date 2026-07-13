/* ============================================================
   AURAVOLT — script.js
   ------------------------------------------------------------
   Shared behavior for every page:
   - sticky nav shadow on scroll
   - mobile hamburger menu
   - highlighting the current page in the nav
   - scroll-reveal animations
   - Resources page filter tabs
   - demo contact form handler
   You rarely need to edit this file. If you add a page, just
   set <body data-page="your-page"> and (if it belongs to a
   dropdown) add it to NAV_GROUPS below.
   ============================================================ */

/* ---------- Sticky nav shadow ---------- */
const bar = document.getElementById('topbar');
addEventListener('scroll', () => bar.classList.toggle('scrolled', scrollY > 8), {passive:true});

/* ---------- Mobile menu ---------- */
const menuBtn = document.getElementById('menuBtn'), navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});

/* ---------- Highlight current page in the nav ---------- */
const NAV_GROUPS = {
  'product-manufacturers': 'solutions',
  'battery-producers': 'solutions',
  'critical-power': 'industries',
  'defense': 'industries',
  'commercial': 'industries',
  'about': 'company',
  'careers': 'company'
};
const page = document.body.dataset.page;
document.querySelectorAll('[data-nav]').forEach(a =>
  a.classList.toggle('active', a.dataset.nav === page));
document.querySelectorAll('[data-nav-group]').forEach(a =>
  a.classList.toggle('active', a.dataset.navGroup === NAV_GROUPS[page]));

/* ---------- Scroll reveal ---------- */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), {threshold:.1});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ---------- Resources filter (only runs on resources.html) ---------- */
const tabs = document.querySelectorAll('.res-tab');
tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  const f = tab.dataset.filter;
  document.querySelectorAll('#resGrid .res-card').forEach(card => {
    card.style.display = (f === 'all' || card.dataset.cat === f) ? '' : 'none';
  });
}));

/* ---------- Contact form (demo — wire to a real handler before launch) ---------- */
const cform = document.getElementById('contactForm');
if (cform) cform.addEventListener('submit', e => {
  e.preventDefault();
  cform.querySelector('button[type=submit]').textContent = 'Message sent \u2713 (demo)';
});
