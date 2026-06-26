/**
 * Layout — Sidebar, Header, Navigation
 */

import { navItems, notifications, pageTitles } from './data.js';
import { logout } from './theme.js';
import { toggleDropdown, showToast } from './ui.js';
import { navigateTo } from './router.js';

export function renderLayout(user) {
  const app = document.querySelector('.app');
  if (!app) return;

  app.innerHTML = `
    <aside class="sidebar" id="sidebar" aria-label="Main navigation">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <div class="sidebar-logo-icon">J</div>
          <span class="sidebar-logo-text">JazzyAdmin</span>
        </div>
        <button class="sidebar-toggle" id="sidebar-toggle" aria-label="Toggle sidebar">
          <i class="fas fa-angles-left"></i>
        </button>
      </div>
      <nav class="sidebar-nav" id="sidebar-nav">
        ${navItems.map(section => `
          <div class="nav-section">
            <div class="nav-section-title">${section.section}</div>
            ${section.items.map(item => `
              <a href="#${item.id}" class="nav-link" data-page="${item.id}" aria-label="${item.label}">
                <i class="fas ${item.icon}"></i>
                <span>${item.label}</span>
                ${item.badge ? `<span class="badge">${item.badge}</span>` : ''}
              </a>
            `).join('')}
          </div>
        `).join('')}
      </nav>
      <div class="sidebar-footer">
        <div class="sidebar-user">
          <div class="sidebar-user-avatar">${user?.avatar || 'AD'}</div>
          <div class="sidebar-user-info">
            <div class="sidebar-user-name">${user?.name || 'Admin User'}</div>
            <div class="sidebar-user-role">${user?.role || 'Administrator'}</div>
          </div>
        </div>
      </div>
    </aside>
    <div class="sidebar-overlay" id="sidebar-overlay"></div>
    <div class="main-wrapper">
      <header class="header">
        <div class="header-left">
          <button class="hamburger" id="hamburger" aria-label="Open menu">
            <i class="fas fa-bars"></i>
          </button>
          <nav class="breadcrumb" id="breadcrumb" aria-label="Breadcrumb">
            <span class="breadcrumb-item">Home</span>
            <span class="breadcrumb-separator"><i class="fas fa-chevron-right"></i></span>
            <span class="breadcrumb-item active" id="breadcrumb-current">Dashboard</span>
          </nav>
        </div>
        <div class="header-search">
          <i class="fas fa-search"></i>
          <input type="search" placeholder="Search anything..." id="global-search" aria-label="Global search">
        </div>
        <div class="header-right">
          <button class="header-action" data-theme-toggle aria-label="Toggle theme">
            <i class="fas fa-moon"></i>
          </button>
          <div class="dropdown">
            <button class="header-action" data-dropdown aria-label="Notifications">
              <i class="fas fa-bell"></i>
              <span class="notification-count">3</span>
            </button>
            <div class="dropdown-menu notification-dropdown">
              <div class="dropdown-header">Notifications</div>
              ${notifications.map(n => `
                <div class="notification-item ${n.unread ? 'unread' : ''}" data-notification="${n.id}">
                  <div class="notification-icon" style="background:var(--${n.type}-light);color:var(--${n.type})">
                    <i class="fas ${n.icon}"></i>
                  </div>
                  <div class="notification-content">
                    <div class="notification-title">${n.title}</div>
                    <div class="notification-text">${n.text}</div>
                    <div class="notification-time">${n.time}</div>
                  </div>
                </div>
              `).join('')}
              <div class="dropdown-divider"></div>
              <button class="dropdown-item" id="mark-all-read"><i class="fas fa-check-double"></i> Mark all as read</button>
            </div>
          </div>
          <div class="dropdown">
            <button class="header-avatar" data-dropdown aria-label="User menu">${user?.avatar || 'AD'}</button>
            <div class="dropdown-menu">
              <div class="dropdown-header">${user?.name || 'Admin User'}</div>
              <button class="dropdown-item" data-nav="settings"><i class="fas fa-cog"></i> Settings</button>
              <button class="dropdown-item" data-nav="help"><i class="fas fa-life-ring"></i> Help Center</button>
              <div class="dropdown-divider"></div>
              <button class="dropdown-item danger" id="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</button>
            </div>
          </div>
        </div>
      </header>
      <main class="main-content" id="main-content" data-current-page="dashboard"></main>
    </div>
  `;

  bindLayoutEvents();
}

function bindLayoutEvents() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(link.dataset.page);
    });
  });

  document.querySelectorAll('[data-dropdown]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown(btn);
    });
  });

  document.getElementById('logout-btn')?.addEventListener('click', logout);

  document.querySelectorAll('[data-nav]').forEach(btn => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.nav));
  });

  document.getElementById('mark-all-read')?.addEventListener('click', () => {
    document.querySelectorAll('.notification-item.unread').forEach(n => n.classList.remove('unread'));
    document.querySelector('.notification-count')?.remove();
    showToast('All notifications marked as read', 'success');
  });

  document.getElementById('global-search')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      showToast(`Searching for "${e.target.value}"...`, 'info');
    }
  });
}

export function updateActiveNav(page) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.page === page);
  });

  const info = pageTitles[page];
  if (info) {
    const bc = document.getElementById('breadcrumb-current');
    if (bc) bc.textContent = info.breadcrumb;
    document.getElementById('main-content')?.setAttribute('data-current-page', page);
  }
}

export function updateBreadcrumb(items) {
  const bc = document.getElementById('breadcrumb');
  if (!bc) return;
  bc.innerHTML = items.map((item, i) => {
    const isLast = i === items.length - 1;
    return `${i > 0 ? '<span class="breadcrumb-separator"><i class="fas fa-chevron-right"></i></span>' : ''}
      <span class="breadcrumb-item ${isLast ? 'active' : ''}">${item}</span>`;
  }).join('');
}
