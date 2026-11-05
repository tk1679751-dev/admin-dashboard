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
    container.classList.add('route-changing');
    setTimeout(async () => {
      container.innerHTML = await pages[page]();
      container.classList.remove('route-changing');
      window.location.hash = page;
    }, 80);
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
