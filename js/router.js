/**
 * Client-side router
 */

import { updateActiveNav } from './layout.js';
import { closeMobileSidebar } from './theme.js';
import { destroyCharts } from './ui.js';
import { refreshChartsOnThemeChange } from './charts.js';

const pages = {};

export function registerPage(name, renderFn) {
  pages[name] = renderFn;
}

export function navigateTo(page) {
  if (!pages[page]) {
    page = 'dashboard';
  }

  closeMobileSidebar();
  updateActiveNav(page);
  destroyCharts();

  const container = document.getElementById('main-content');
  if (container) {
    container.style.opacity = '0';
    container.style.transform = 'translateY(8px)';
    container.style.transition = 'opacity 0.2s, transform 0.2s';

    setTimeout(async () => {
      container.innerHTML = await pages[page]();
      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';
      window.location.hash = page;
    }, 150);
  }
}

export function initRouter() {
  const hash = window.location.hash.slice(1) || 'dashboard';
  navigateTo(pages[hash] ? hash : 'dashboard');

  window.addEventListener('hashchange', () => {
    const page = window.location.hash.slice(1) || 'dashboard';
    if (pages[page]) navigateTo(page);
  });

  document.addEventListener('themeChanged', () => refreshChartsOnThemeChange());
}
