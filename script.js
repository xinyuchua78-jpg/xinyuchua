document.documentElement.classList.add('js');

const domainTabs = [...document.querySelectorAll('.domain-tab')];
const domainPanels = [...document.querySelectorAll('.domain-panel')];

function activateDomain(domainId, focusTab = false) {
  domainTabs.forEach((tab) => {
    const active = tab.dataset.domain === domainId;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    if (active && focusTab) tab.focus();
  });

  domainPanels.forEach((panel) => {
    const active = panel.dataset.panel === domainId;
    panel.hidden = !active;
    panel.classList.toggle('is-active', active);
  });
}

domainTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateDomain(tab.dataset.domain));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % domainTabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + domainTabs.length) % domainTabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = domainTabs.length - 1;
    activateDomain(domainTabs[next].dataset.domain, true);
  });
});

const menuToggle = document.querySelector('#menuToggle');
const mainNav = document.querySelector('#mainNav');
function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', '打开菜单');
  mainNav.classList.remove('open');
  document.body.classList.remove('menu-open');
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
  mainNav.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
});
mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
const mobileViewport = window.matchMedia('(max-width: 900px)');
mobileViewport.addEventListener('change', closeMenu);

const header = document.querySelector('#siteHeader');
function updateHeader() { header.classList.toggle('scrolled', window.scrollY > 24); }
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('[data-reveal]');
if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.14 });
  revealItems.forEach((item) => observer.observe(item));
}

activateDomain('ai');
