/* ── TYPING ANIMATION ── */
const titles = [
  'Backend & Cloud Engineer',
  'Go Developer',
  'DevOps Practitioner',
  'API Architect',
];
let ti = 0, ci = 0, deleting = false;
const el = document.getElementById('typing-text');

function type() {
  const full = titles[ti];
  if (deleting) {
    el.textContent = full.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      ti = (ti + 1) % titles.length;
      setTimeout(type, 450);
      return;
    }
    setTimeout(type, 55);
  } else {
    el.textContent = full.slice(0, ++ci);
    if (ci === full.length) {
      setTimeout(() => { deleting = true; type(); }, 2200);
      return;
    }
    setTimeout(type, 95);
  }
}
type();

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = (idx * 0.05) + 's';
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObs.observe(el));

/* ── ACTIVE NAV ── */
const sections = document.querySelectorAll('section[id]');
const navBtns  = document.querySelectorAll('.nav-btn[data-section]');

const activeObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navBtns.forEach(b => b.classList.remove('active'));
      const active = document.querySelector(`.nav-btn[data-section="${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => activeObs.observe(s));

/* ── SMOOTH SCROLL FOR NAV LINKS ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
