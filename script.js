const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('is-open');
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const counters = document.querySelectorAll('[data-counter]');

const animateCounter = (entry) => {
  const el = entry.target;
  const target = Number(el.dataset.counter);
  const duration = 1400;
  const startTime = performance.now();

  const formatValue = (value) => {
    if (target >= 1000) return Math.round(value).toLocaleString('it-IT');
    return Math.round(value).toString();
  };

  const tick = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = formatValue(target * eased);
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = formatValue(target);
      if (target === 83) el.textContent += '%';
    }
  };

  requestAnimationFrame(tick);
};

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry);
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.35 });

counters.forEach(counter => observer.observe(counter));
