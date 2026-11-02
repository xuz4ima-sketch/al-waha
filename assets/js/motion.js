// Al-Waha Center: motion. GSAP, ScrollTrigger, ScrollToPlugin and ScrollSmoother are served from assets/vendor.
// Everything here runs inside gsap.matchMedia: with reduced motion nothing is hidden and nothing moves,
// and the page never depends on this file to show its content.
(() => {
  'use strict';

  const gsap = window.gsap;
  const root = document.documentElement;
  if (!gsap || !window.ScrollTrigger) return;
  const { ScrollTrigger, ScrollToPlugin, ScrollSmoother } = window;
  gsap.registerPlugin(...[ScrollTrigger, ScrollToPlugin, ScrollSmoother].filter(Boolean));

  const EASE = 'expo.out';
  const HEADER_OFFSET = 96;
  const isRtl = () => root.dir === 'rtl';
  let smoother = null;
  let moving = false;

  /* Split headings into words. Never into letters: Arabic letters join, and splitting them breaks the script. */
  function split(el) {
    const text = el.textContent;
    el.setAttribute('aria-label', text.trim());
    el.replaceChildren();
    text.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) { el.append(document.createTextNode(' ')); return; }
      const outer = document.createElement('span');
      const inner = document.createElement('span');
      outer.className = 'w';
      outer.setAttribute('aria-hidden', 'true');
      inner.className = 'w__i';
      inner.textContent = part;
      outer.append(inner);
      el.append(outer);
    });
  }
  const splitTargets = () => Array.from(document.querySelectorAll('[data-split]')).filter((el) => !el.closest('.hero'));

  function scrollToTarget(target) {
    if (!target) return;
    if (smoother) { smoother.scrollTo(target, true, 'top ' + HEADER_OFFSET + 'px'); return; }
    if (ScrollToPlugin && moving) gsap.to(window, { duration: 1.1, ease: 'power3.inOut', scrollTo: { y: target, offsetY: HEADER_OFFSET, autoKill: true } });
    else target.scrollIntoView({ block: 'start' });
  }

  const mm = gsap.matchMedia();

  // Smooth scroll on desktop pointers only; touch keeps the platform's own scrolling.
  mm.add('(prefers-reduced-motion: no-preference) and (pointer: fine) and (min-width: 1024px)', () => {
    if (!ScrollSmoother) return undefined;
    smoother = ScrollSmoother.create({ wrapper: '#smooth-wrapper', content: '#smooth-content', smooth: 1.1, effects: false, smoothTouch: false });
    return () => { smoother = null; };
  });

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    moving = true;

    // Hero: the library sinks and the seal and words lift away as the window scrolls off.
    gsap.to('[data-hero-photo]', { yPercent: 16, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero__body', { y: -80, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: '.hero', start: '30% top', end: 'bottom top', scrub: true } });

    // Section heads: words rise from under their own line, once.
    splitTargets().forEach((el) => {
      split(el);
      gsap.set(el.querySelectorAll('.w__i'), { yPercent: 115, opacity: 0 });
      ScrollTrigger.create({
        trigger: el, start: 'top 86%', once: true,
        onEnter: () => {
          el.dataset.revealed = '1';
          gsap.to(el.querySelectorAll('.w__i'), { yPercent: 0, opacity: 1, duration: 1.1, ease: EASE, stagger: 0.06, overwrite: true });
        }
      });
    });

    // The three stars under the doors' head light one after another.
    gsap.from('[data-stars] svg', { scale: 0, rotation: -90, opacity: 0, duration: 0.9, ease: EASE, stagger: 0.14, scrollTrigger: { trigger: '[data-stars]', start: 'top 88%', once: true } });

    // Doors, teachers and clips arrive in a short stagger.
    [['[data-door]', 90, 0.14], ['[data-person]', 70, 0.16], ['[data-clip]', 50, 0.1]].forEach(([sel, y, stagger]) => {
      const items = gsap.utils.toArray(sel);
      if (!items.length) return;
      gsap.from(items, { y, opacity: 0, duration: 1.1, ease: EASE, stagger, scrollTrigger: { trigger: items[0], start: 'top 85%', once: true } });
    });

    // The manuscript and the spring drift behind their sections.
    gsap.utils.toArray('[data-parallax-bg]').forEach((img) => {
      const section = img.closest('section');
      gsap.fromTo(img, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    // The application card rises out of the water.
    gsap.from('.apply', { y: 80, opacity: 0, duration: 1.2, ease: EASE, scrollTrigger: { trigger: '.enrol', start: 'top 70%', once: true } });

    // The name in the colophon climbs into place as the page ends.
    gsap.fromTo('.colophon__mark', { yPercent: 45 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: '.colophon__mark', start: 'top bottom', end: 'bottom bottom', scrub: true } });

    return () => {
      moving = false;
      splitTargets().forEach((el) => { el.textContent = el.textContent; el.removeAttribute('aria-label'); delete el.dataset.revealed; });
    };
  });

  // Magnetic actions: the button leans toward the pointer and its label leans further.
  mm.add('(prefers-reduced-motion: no-preference) and (pointer: fine)', () => {
    const cleanups = gsap.utils.toArray('[data-magnetic]').map((btn) => {
      const label = btn.querySelector('.btn__label');
      const bx = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' });
      const by = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' });
      const lx = label ? gsap.quickTo(label, 'x', { duration: 0.5, ease: 'power3.out' }) : null;
      const ly = label ? gsap.quickTo(label, 'y', { duration: 0.5, ease: 'power3.out' }) : null;
      const move = (e) => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        bx(dx * 0.28); by(dy * 0.38);
        if (lx) { lx(dx * 0.12); ly(dy * 0.16); }
      };
      const leave = () => { bx(0); by(0); if (lx) { lx(0); ly(0); } };
      btn.addEventListener('pointermove', move);
      btn.addEventListener('pointerleave', leave);
      return () => { btn.removeEventListener('pointermove', move); btn.removeEventListener('pointerleave', leave); gsap.set([btn, label].filter(Boolean), { clearProps: 'transform' }); };
    });
    return () => cleanups.forEach((fn) => fn());
  });

  // Same-page links travel with an eased scroll and hand focus to where they land.
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const id = link.getAttribute('href').slice(1);
    const target = id ? document.getElementById(id) : null;
    if (!target || (!smoother && !moving)) return;
    e.preventDefault();
    scrollToTarget(target);
    const focusEl = target.matches('main, [tabindex]') ? target : target.querySelector('h2, h1');
    if (focusEl) {
      if (!focusEl.hasAttribute('tabindex')) focusEl.setAttribute('tabindex', '-1');
      focusEl.focus({ preventScroll: true });
    }
  });

  // After a language swap the heads are split again; a head already shown stays shown.
  document.addEventListener('alwaha:lang', () => {
    if (!moving) return;
    splitTargets().forEach((el) => {
      split(el);
      if (!el.dataset.revealed) gsap.set(el.querySelectorAll('.w__i'), { yPercent: 115, opacity: 0 });
    });
    requestAnimationFrame(() => ScrollTrigger.refresh());
  });

  const refreshSoon = () => requestAnimationFrame(() => ScrollTrigger.refresh());

  window.AlWahaMotion = {
    scrollTo: scrollToTarget,
    stepIn(el, dir) {
      refreshSoon();
      if (!moving) return;
      const sign = (isRtl() ? -1 : 1) * dir;
      gsap.fromTo(el, { x: 48 * sign, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: EASE, clearProps: 'transform,opacity' });
    },
    done(el) {
      refreshSoon();
      if (!moving) return;
      gsap.from(el.children, { y: 24, opacity: 0, duration: 0.8, ease: EASE, stagger: 0.09, clearProps: 'transform,opacity' });
    },
    curtain(swap) {
      const curtain = document.querySelector('.curtain');
      if (!curtain || !moving) { swap(); return; }
      gsap.timeline()
        .fromTo(curtain, { autoAlpha: 1, yPercent: 100 }, { yPercent: 0, duration: 0.45, ease: 'power3.in' })
        .add(swap)
        .to(curtain, { yPercent: -100, duration: 0.55, ease: 'power3.out' })
        .set(curtain, { autoAlpha: 0 });
    }
  };

  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
