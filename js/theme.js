/**
 * Theme management with localStorage persistence
 */

const THEME_KEY = 'dashboard-theme';
const SIDEBAR_KEY = 'dashboard-sidebar-collapsed';

export function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || 'dark';
  setTheme(saved, false);

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-theme-toggle]')) {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
      document.dispatchEvent(new Event('themeChanged'));
    }
  });
}

export function setTheme(theme, save = true) {
  document.documentElement.setAttribute('data-theme', theme);
  if (save) localStorage.setItem(THEME_KEY, theme);
  updateThemeIcons(theme);
}

export function updateThemeIcons(theme) {
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    const icon = btn.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  });
}

export function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const collapsed = localStorage.getItem(SIDEBAR_KEY) === 'true';

  if (collapsed && sidebar) {
    sidebar.classList.add('collapsed');
    document.querySelector('.app')?.classList.add('sidebar-collapsed');
  }

  document.getElementById('sidebar-toggle')?.addEventListener('click', () => {
    sidebar?.classList.toggle('collapsed');
    document.querySelector('.app')?.classList.toggle('sidebar-collapsed');
    localStorage.setItem(SIDEBAR_KEY, sidebar?.classList.contains('collapsed'));
  });

  document.getElementById('hamburger')?.addEventListener('click', () => {
    sidebar?.classList.add('mobile-open');
    overlay?.classList.add('active');
  });

  overlay?.addEventListener('click', closeMobileSidebar);
}

export function closeMobileSidebar() {
  document.getElementById('sidebar')?.classList.remove('mobile-open');
  document.getElementById('sidebar-overlay')?.classList.remove('active');
}

export function checkAuth() {
  const user = localStorage.getItem('dashboard-user');
  if (!user && !window.location.pathname.includes('login.html')) {
    window.location.href = 'login.html';
    return null;
  }
  return user ? JSON.parse(user) : null;
}

export function logout() {
  localStorage.removeItem('dashboard-user');
  window.location.href = 'login.html';
}
