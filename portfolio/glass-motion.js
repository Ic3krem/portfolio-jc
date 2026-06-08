const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.body.classList.add('glass-enhanced');

const revealSelectors = [
  '.hero-copy',
  '.hero > div',
  '.metrics',
  '.about',
  '.about-photo',
  '.intro',
  '.projects h2',
  '.projects-lede',
  '.project-card',
  '.role-list li',
  '.quote-card',
  '.footer-col',
  '.socials',
  'header:not(.hero)',
  '.project-section',
  '.work-card',
  '.featured-card',
  '.section-head',
  '.toolbar',
  '.overview-strip',
  '.overview-tile'
];

const splitSelectors = [
  '.hero-title',
  'h1',
  '.featured-copy h2',
  '.projects h2',
  '.project-section h2',
  '.section-head h2'
];

function toArray(targets) {
  if (!targets) return [];
  if (targets instanceof Element) return [targets];
  return Array.from(targets);
}

function random(min, max, decimals = 0) {
  const value = Math.random() * (max - min) + min;
  return Number(value.toFixed(decimals));
}

function stagger(step = 50) {
  return (_target, index) => index * step;
}

function splitText(element) {
  if (!element || element.dataset.splitReady === 'true') return { words: [] };

  const text = element.textContent;
  const parts = text.split(/(\s+)/);
  const words = [];

  element.textContent = '';
  parts.forEach(part => {
    if (!part) return;
    if (/^\s+$/.test(part)) {
      element.appendChild(document.createTextNode(part));
      return;
    }

    const span = document.createElement('span');
    span.className = 'split-word';
    span.textContent = part;
    element.appendChild(span);
    words.push(span);
  });

  element.dataset.splitReady = 'true';
  return { words };
}

function nativeAnimate(targets, options = {}) {
  const nodes = toArray(targets);
  const total = nodes.length;

  nodes.forEach((node, index) => {
    const delay = typeof options.delay === 'function'
      ? options.delay(node, index, total)
      : Number(options.delay || 0);
    const opacity = typeof options.opacity === 'function'
      ? options.opacity(node, index, total)
      : 1;

    node.animate([
      {
        opacity: 0,
        filter: 'blur(8px)',
        transform: 'translate3d(0, 0.68em, 0) rotateX(34deg)'
      },
      {
        opacity,
        filter: 'blur(0)',
        transform: 'translate3d(0, 0, 0) rotateX(0deg)'
      }
    ], {
      duration: options.duration || 760,
      delay,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      fill: 'forwards'
    });
  });
}

function prepareRevealTargets() {
  const seen = new Set();

  revealSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((element, index) => {
      if (seen.has(element)) return;
      seen.add(element);
      element.dataset.reveal = element.dataset.reveal || '';
      element.style.setProperty('--reveal-delay', `${Math.min(index % 5, 4) * 60}ms`);
    });
  });
}

function revealOnScroll() {
  const revealTargets = document.querySelectorAll('[data-reveal]');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach(element => element.classList.add('is-visible'));
    return;
  }

  document.body.classList.add('motion-ready');

  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      instance.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' });

  revealTargets.forEach(element => observer.observe(element));
}

function animateSplitText() {
  if (prefersReducedMotion) return;

  const splitTargets = splitSelectors
    .flatMap(selector => Array.from(document.querySelectorAll(selector)))
    .filter((element, index, list) => list.indexOf(element) === index);

  splitTargets.forEach((element, blockIndex) => {
    const split = splitText(element);
    nativeAnimate(split.words, {
      opacity: () => random(0.78, 1, 2),
      delay: (_word, index) => blockIndex * 95 + stagger(34)(_word, index),
      duration: 780
    });
  });
}

function animateNumbers() {
  const numbers = document.querySelectorAll('[data-count-to]');
  if (!numbers.length) return;

  const run = element => {
    const target = Number(element.dataset.countTo || 0);
    const suffix = element.dataset.countSuffix || '';
    const padded = element.dataset.pad === 'true';
    const duration = prefersReducedMotion ? 1 : Number(element.dataset.countDuration || 1100);
    const started = performance.now();

    const tick = now => {
      const progress = Math.min(1, (now - started) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      element.textContent = `${padded ? String(value).padStart(2, '0') : value}${suffix}`;

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    numbers.forEach(run);
    return;
  }

  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      run(entry.target);
      instance.unobserve(entry.target);
    });
  }, { threshold: 0.35 });

  numbers.forEach(number => observer.observe(number));
}

function attachSpotlights() {
  const targets = document.querySelectorAll('[data-spotlight], .project-card, .work-card, .overview-tile, .featured-card, .quote-card, .metrics');

  targets.forEach(target => {
    target.addEventListener('pointermove', event => {
      const rect = target.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      target.style.setProperty('--mx', `${x}%`);
      target.style.setProperty('--my', `${y}%`);
    });
  });
}

function enhanceFilterTransitions() {
  const buttons = Array.from(document.querySelectorAll('[data-filter]'));
  const cards = Array.from(document.querySelectorAll('.project-card[data-tags]'));

  if (!buttons.length || !cards.length || prefersReducedMotion) return;

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      window.setTimeout(() => {
        cards
          .filter(card => !card.classList.contains('is-hidden'))
          .forEach((card, index) => {
            card.animate([
              { opacity: 0, transform: 'translate3d(0, 16px, 0) scale(0.98)' },
              { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' }
            ], {
              duration: 420,
              delay: index * 45,
              easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
              fill: 'both'
            });
          });
      }, 0);
    });
  });
}

prepareRevealTargets();
revealOnScroll();
animateSplitText();
animateNumbers();
attachSpotlights();
enhanceFilterTransitions();
