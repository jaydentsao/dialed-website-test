// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Staggered reveal for stat bar items
const statsBar = document.querySelector('.stats-bar');
if (statsBar) {
  const statsObserver = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      document.querySelectorAll('.stat').forEach((s, i) => {
        setTimeout(() => s.style.opacity = '1', i * 100);
      });
      statsObserver.disconnect();
    }
  }, { threshold: 0.3 });
  statsObserver.observe(statsBar);
}

// Animate stat numbers counting up
function animateCount(el, end, suffix = '') {
  const duration = 1200;
  const start = performance.now();
  const startVal = 0;
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(startVal + eased * (end - startVal)) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const statsObserver2 = new IntersectionObserver(([e]) => {
  if (e.isIntersecting) {
    const nums = [
      { el: null, val: 0, suffix: 'g' },
      { el: null, val: 100, suffix: 'mg' },
      { el: null, val: 8, suffix: '' },
      { el: null, val: 15, suffix: '' },
    ];
    document.querySelectorAll('.stat-num').forEach((el, i) => {
      if (nums[i]) animateCount(el, nums[i].val, nums[i].suffix);
    });
    statsObserver2.disconnect();
  }
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-bar');
if (statsSection) statsObserver2.observe(statsSection);
