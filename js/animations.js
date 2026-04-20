// ANIMATIONS

const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
  progressBar.style.width = Math.min(pct, 100) + '%';
}, { passive: true });

const CHART_SECTIONS = [
  { blockId: 'viz1-block', render: () => renderV1('All'),       rendered: false },
  { blockId: 'viz2-block', render: () => renderV2('All'),       rendered: false },
  { blockId: 'viz3-block', render: () => renderV3('Marketing'), rendered: false },
  { blockId: 'viz4-block', render: () => renderV4('All'),       rendered: false },
  { blockId: 'viz5-block', render: () => renderV5(),            rendered: false }
];


const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('revealed');
    cardObserver.unobserve(entry.target);
  });
}, {
  threshold: 0.02,
  rootMargin: '0px 0px -30px 0px'
});

document.querySelectorAll('.chapter-card').forEach(el => cardObserver.observe(el));


document.querySelectorAll('.hero .pop').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  setTimeout(() => {
    el.style.transition = 'opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)';
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, 60 + i * 120);
});

//  chart rendering
const chartObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const section = CHART_SECTIONS.find(s => s.blockId === entry.target.id);
    if (section && !section.rendered) {
      section.rendered = true;
      setTimeout(() => section.render(), 80);
      chartObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05, rootMargin: '200px 0px 0px 0px' });

CHART_SECTIONS.forEach(s => {
  const el = document.getElementById(s.blockId);
  if (el) chartObserver.observe(el);
});
