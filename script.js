/* ─────────────────────────────────────────────────────────────
   Kyle J. Fairbanks — Engineering Portfolio
   script.js  — lightbox + nav active state
   ───────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  // ── LIGHTBOX ──────────────────────────────────────────────────
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightbox-img');
  const lightboxCap   = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  function openLightbox(src, alt, caption) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightboxCap.textContent = caption || '';
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  // Attach to all trigger images
  document.querySelectorAll('.lightbox-trigger').forEach(function (img) {
    img.addEventListener('click', function () {
      openLightbox(
        img.src,
        img.alt,
        img.dataset.caption || ''
      );
    });
  });

  // Close button
  lightboxClose.addEventListener('click', closeLightbox);

  // Click backdrop to close
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  // Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });

  // ── NAV SCROLL HIGHLIGHT ──────────────────────────────────────
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a[href^="#"]');

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (link) {
              link.classList.remove('active');
              if (link.getAttribute('href') === '#' + entry.target.id) {
                link.classList.add('active');
              }
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach(function (s) { observer.observe(s); });
  }

  // ── NAV SHADOW ON SCROLL ──────────────────────────────────────
  var nav = document.getElementById('site-nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        nav.style.boxShadow = '0 2px 8px rgba(0,0,0,.12)';
      } else {
        nav.style.boxShadow = '';
      }
    }, { passive: true });
  }

}());
