/* ─────────────────────────────────────────────────────
   Lifeline Pharmacy — Brand Guidelines
   Main JavaScript
───────────────────────────────────────────────────── */

(() => {
  'use strict';

  /* ── Mobile Nav ──────────────────────────────────── */

  const toggle  = document.getElementById('navToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  function openNav() {
    sidebar.classList.add('open');
    overlay.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeNav() {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeNav() : openNav();
  });

  overlay.addEventListener('click', closeNav);

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) closeNav();
    });
  });

  /* ── Scroll Spy ──────────────────────────────────── */

  const sections  = document.querySelectorAll('[data-section]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -50% 0px',
    threshold: 0,
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.dataset.section;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === id);
      });
    });
  }, observerOptions);

  sections.forEach(s => sectionObserver.observe(s));

  /* ── Scroll Reveal ───────────────────────────────── */

  const revealEls = document.querySelectorAll(
    '.about__content, .about__image-panel, ' +
    '.vm-card, .logo-variant, .dont-card, ' +
    '.swatch, .voice-card, .photo-grid__item, ' +
    '.dd-col, .legal-item, .app-card, ' +
    '.type-row, .logo-clearspace, .combo'
  );

  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    const delay = (i % 4);
    if (delay > 0) el.classList.add(`reveal-delay-${delay}`);
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ── Copy Hex to Clipboard ───────────────────────── */

  const toast = document.getElementById('copyToast');
  let toastTimer;

  function showToast(hex) {
    clearTimeout(toastTimer);
    toast.textContent = `${hex} copied!`;
    toast.classList.add('show');
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
  }

  document.querySelectorAll('.swatch__copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const swatch  = btn.closest('.swatch');
      const hex     = swatch.dataset.hex;
      const name    = swatch.dataset.name;
      navigator.clipboard.writeText(hex).then(() => {
        showToast(`${name} — ${hex}`);
      }).catch(() => {
        showToast(hex);
      });
    });
  });

  document.querySelectorAll('.swatch__hex[data-copy]').forEach(el => {
    el.style.cursor = 'pointer';
    el.title = 'Click to copy';
    el.addEventListener('click', () => {
      const hex = el.dataset.copy;
      navigator.clipboard.writeText(hex).then(() => showToast(hex));
    });
  });

  /* ── Smooth Anchor Scroll ────────────────────────── */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── Active nav on page load ─────────────────────── */

  window.addEventListener('load', () => {
    if (window.scrollY < 100) {
      const first = document.querySelector('.nav-link[data-section="hero"]');
      if (first) first.classList.add('active');
    }
  });

})();
