/**
 * Theme management with localStorage persistence
 */

const THEME_KEY = 'dashboard-theme';
const SIDEBAR_KEY = 'dashboard-sidebar-collapsed';
const SIDEBAR_MEDIA = '(max-width: 1100px)';

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
  const hamburger = document.getElementById('hamburger');
  const collapsed = localStorage.getItem(SIDEBAR_KEY) === 'true';

  if (collapsed && sidebar) {
    sidebar.classList.add('collapsed');
    document.querySelector('.app')?.classList.add('sidebar-collapsed');
  }

  const isMobileNav = () => window.matchMedia(SIDEBAR_MEDIA).matches;

  const closeMobileSidebar = () => {
    sidebar?.classList.remove('mobile-open');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
    syncMobileState();
  };

  const syncMobileState = () => {
    const open = isMobileNav() && sidebar?.classList.contains('mobile-open');
    if (!isMobileNav()) {
      sidebar?.classList.remove('mobile-open');
      overlay?.classList.remove('active');
      document.body.style.overflow = '';
      return;
    }
    if (hamburger) {
      hamburger.setAttribute('aria-expanded', String(!!open));
      const icon = hamburger.querySelector('i');
      if (icon) icon.className = open ? 'fas fa-xmark' : 'fas fa-bars';
    }
  };

  document.getElementById('sidebar-toggle')?.addEventListener('click', () => {
    sidebar?.classList.toggle('collapsed');
    document.querySelector('.app')?.classList.toggle('sidebar-collapsed');
    localStorage.setItem(SIDEBAR_KEY, sidebar?.classList.contains('collapsed'));
  });

  hamburger?.addEventListener('click', () => {
    if (!isMobileNav()) return;
    const willOpen = !sidebar?.classList.contains('mobile-open');
    sidebar?.classList.toggle('mobile-open', willOpen);
    overlay?.classList.toggle('active', willOpen);
    document.body.style.overflow = willOpen ? 'hidden' : '';
    if (hamburger) {
      hamburger.setAttribute('aria-expanded', String(willOpen));
      const icon = hamburger.querySelector('i');
      if (icon) icon.className = willOpen ? 'fas fa-xmark' : 'fas fa-bars';
    }
  });

  overlay?.addEventListener('click', closeMobileSidebar);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileSidebar();
  });

  window.addEventListener('resize', () => {
    if (!isMobileNav() || !sidebar?.classList.contains('mobile-open')) return;
    closeMobileSidebar();
  });

  syncMobileState();
}

export function closeMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  sidebar?.classList.remove('mobile-open');
  overlay?.classList.remove('active');
  document.body.style.overflow = '';
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
