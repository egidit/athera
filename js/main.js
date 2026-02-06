(function () {
  'use strict';

  var nav       = document.getElementById('nav');
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('navLinks');
  var bgShift   = document.getElementById('bgShift');

  /* ── Scroll-reactive background + nav ──────────────
     bgShift moves vertically as you scroll, creating
     a subtle parallax between the ambient gradient mesh
     and the foreground content surfaces.
     ──────────────────────────────────────────────────── */
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(function () {
      var scrollY = window.scrollY;
      var docH = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docH > 0 ? scrollY / docH : 0;

      // Background parallax: mesh drifts up 80px total
      bgShift.style.transform = 'translateY(' + (progress * -80) + 'px)';

      // Nav solid on scroll
      nav.classList.toggle('scrolled', scrollY > 40);

      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile menu ───────────────────────────────────── */
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ── Smooth scroll ─────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ── Reveal on scroll ──────────────────────────────── */
  var reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── Active nav link ───────────────────────────────── */
  var sections  = document.querySelectorAll('section[id]');
  var navAnchors = document.querySelectorAll('.nav__link');

  function highlightNav() {
    var y = window.scrollY + 160;
    sections.forEach(function (s) {
      var top = s.offsetTop;
      var id  = s.getAttribute('id');
      if (y >= top && y < top + s.offsetHeight) {
        navAnchors.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

  /* ── Fullpage section scroll ────────────────────────
     Detects scroll/wheel direction and smoothly
     animates to the next or previous section.
     ──────────────────────────────────────────────────── */
  var fpSections = Array.prototype.slice.call(
    document.querySelectorAll('.hero, .services, .careers, .contact-footer')
  );
  var fpAnimating = false;
  var fpCooldown  = 600;   // ms to lock between jumps
  var fpThreshold = 30;    // min deltaY to trigger a jump
  var fpMinWidth  = 1024;  // disable fullpage snap below this width

  function fpEnabled() {
    return window.innerWidth >= fpMinWidth;
  }

  function fpGetCurrent() {
    var scrollY = window.scrollY;
    var best = 0;
    for (var i = 0; i < fpSections.length; i++) {
      if (scrollY >= fpSections[i].offsetTop - window.innerHeight * 0.45) {
        best = i;
      }
    }
    return best;
  }

  function fpScrollTo(index) {
    if (index < 0 || index >= fpSections.length) return;
    fpAnimating = true;
    fpSections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(function () { fpAnimating = false; }, fpCooldown);
  }

  // Wheel event — main scroll hijack
  window.addEventListener('wheel', function (e) {
    if (!fpEnabled()) return;
    if (fpAnimating) { e.preventDefault(); return; }
    if (Math.abs(e.deltaY) < fpThreshold) return;

    var current = fpGetCurrent();
    if (e.deltaY > 0 && current < fpSections.length - 1) {
      e.preventDefault();
      fpScrollTo(current + 1);
    } else if (e.deltaY < 0 && current > 0) {
      e.preventDefault();
      fpScrollTo(current - 1);
    }
  }, { passive: false });

  // Keyboard — arrow keys & space/pagedown
  window.addEventListener('keydown', function (e) {
    if (!fpEnabled()) return;
    if (fpAnimating) return;
    var current = fpGetCurrent();
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
      if (current < fpSections.length - 1) {
        e.preventDefault();
        fpScrollTo(current + 1);
      }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      if (current > 0) {
        e.preventDefault();
        fpScrollTo(current - 1);
      }
    }
  });

  // Touch — swipe up/down on mobile
  var fpTouchStartY = 0;
  window.addEventListener('touchstart', function (e) {
    fpTouchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', function (e) {
    if (!fpEnabled()) return;
    if (fpAnimating) return;
    var diff = fpTouchStartY - e.changedTouches[0].clientY;
    if (Math.abs(diff) < 50) return; // minimum swipe distance
    var current = fpGetCurrent();
    if (diff > 0 && current < fpSections.length - 1) {
      fpScrollTo(current + 1);
    } else if (diff < 0 && current > 0) {
      fpScrollTo(current - 1);
    }
  }, { passive: true });

})();
