/* =========================================================
   Recykal — interactions
   ========================================================= */

// ----- Scroll reveal -----
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach((el) => revealObserver.observe(el));

// ----- Nav background on scroll -----
const nav = document.getElementById('nav');
const onScroll = () => {
  if (window.scrollY > 10) {
    nav.style.background = 'rgba(255,255,255,0.85)';
  } else {
    nav.style.background = 'rgba(255,255,255,0.72)';
  }
};
window.addEventListener('scroll', onScroll, { passive: true });

// ----- Animated counters -----
const formatNumber = (n) => n.toLocaleString('en-IN');

const animateCount = (el) => {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1600;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    // easeOutExpo
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const value = Math.floor(eased * target);
    el.textContent = formatNumber(value) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = formatNumber(target) + suffix;
  };
  requestAnimationFrame(tick);
};

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach((el) => statObserver.observe(el));
