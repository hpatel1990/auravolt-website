/* ============================================================
   AURAVOLT — script.js
   ------------------------------------------------------------
   Shared behavior for every page:
   - sticky nav shadow on scroll
   - mobile hamburger menu
   - highlighting the current page in the nav
   - scroll-reveal animations
   - Resources page filter tabs
   - "Get in touch" and contact-page form submission (Web3Forms)
   You rarely need to edit this file. If you add a page, just
   set <body data-page="your-page"> and (if it belongs to a
   dropdown) add it to NAV_GROUPS below.
   ============================================================ */

/* ---------- Form submission (Web3Forms) ----------
   Submissions are emailed to connect@auravolt.ai via Web3Forms
   (https://web3forms.com — no backend needed). To rotate the key,
   generate a new one at web3forms.com and swap it in below. */
const WEB3FORMS_ACCESS_KEY = '5310c06e-d1ee-44fa-b5ef-ce22429a5578';

async function submitToWeb3Forms(form, subject) {
  const btn = form.querySelector('button[type=submit]');
  const statusEl = form.querySelector('.form-status');
  const originalLabel = btn.textContent;
  const setStatus = (msg, isError) => {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.classList.toggle('error', !!isError);
  };

  // Honeypot: bots fill every field, including hidden ones. Real visitors never touch this.
  const honeypot = form.querySelector('input[name="botcheck"]');
  if (honeypot && honeypot.checked) return;

  const data = new FormData(form);
  data.append('access_key', WEB3FORMS_ACCESS_KEY);
  data.append('subject', subject);
  data.append('from_name', 'Auravolt website');
  data.delete('botcheck');

  btn.disabled = true;
  btn.textContent = 'Sending…';
  setStatus('');

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: data
    });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.message || 'Submission failed');
    btn.textContent = 'Message sent ✓';
    setStatus("Thanks — we'll get back to you within two business days.");
    form.reset();
    setTimeout(() => { btn.disabled = false; btn.textContent = originalLabel; }, 4000);
  } catch (err) {
    btn.disabled = false;
    btn.textContent = originalLabel;
    setStatus('Something went wrong sending that — please email connect@auravolt.ai directly.', true);
  }
}

/* ---------- Sticky nav shadow ---------- */
const bar = document.getElementById('topbar');
addEventListener('scroll', () => bar.classList.toggle('scrolled', scrollY > 8), {passive:true});

/* ---------- Mobile menu ---------- */
const menuBtn = document.getElementById('menuBtn'), navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});

/* ---------- Get in touch overlay ---------- */
const ctaTrigger = document.getElementById('ctaTrigger');
const ctaOverlay = document.getElementById('ctaOverlay');
if (ctaTrigger && ctaOverlay) {
  const ctaForm = document.getElementById('ctaForm');
  const openCta = () => {
    ctaOverlay.classList.add('open');
    ctaOverlay.setAttribute('aria-hidden', 'false');
    ctaTrigger.setAttribute('aria-expanded', 'true');
    ctaTrigger.setAttribute('aria-label', 'Close');
    ctaTrigger.classList.add('is-open');
    document.body.classList.add('cta-open');
    document.body.style.overflow = 'hidden';
  };
  const closeCta = () => {
    ctaOverlay.classList.remove('open');
    ctaOverlay.setAttribute('aria-hidden', 'true');
    ctaTrigger.setAttribute('aria-expanded', 'false');
    ctaTrigger.removeAttribute('aria-label');
    ctaTrigger.classList.remove('is-open');
    document.body.classList.remove('cta-open');
    document.body.style.overflow = '';
  };
  ctaTrigger.addEventListener('click', () => {
    ctaOverlay.classList.contains('open') ? closeCta() : openCta();
  });
  ctaOverlay.addEventListener('click', e => { if (e.target === ctaOverlay) closeCta(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && ctaOverlay.classList.contains('open')) closeCta(); });
  ctaForm.addEventListener('submit', e => {
    e.preventDefault();
    submitToWeb3Forms(ctaForm, 'New inquiry — Auravolt "Get in touch" overlay');
  });
}

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

/* ---------- Job apply fallback (copy email + toast, in case no mail client is configured) ---------- */
const applyLinks = document.querySelectorAll('.job, .apply-fallback');
if (applyLinks.length) {
  let toast, toastTimer;
  const showToast = msg => {
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'apply-toast';
      toast.setAttribute('role', 'status');
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    requestAnimationFrame(() => toast.classList.add('show'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 6000);
  };
  applyLinks.forEach(link => link.addEventListener('click', () => {
    const email = link.getAttribute('href').replace('mailto:', '').split('?')[0];
    if (navigator.clipboard) navigator.clipboard.writeText(email).catch(() => {});
    showToast(`Opening your email app — if nothing happens, email ${email} directly (address copied to your clipboard).`);
  }));
}

/* ---------- Contact page form ---------- */
const cform = document.getElementById('contactForm');
if (cform) cform.addEventListener('submit', e => {
  e.preventDefault();
  submitToWeb3Forms(cform, 'New inquiry — Auravolt contact page');
});
