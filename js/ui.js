/**
 * UI Components — Toast, Modal, Confirm Dialog
 */

let toastContainer;
let activeCharts = [];

export function initUI() {
  toastContainer = document.getElementById('toast-root');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-root';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown-menu.active').forEach(m => m.classList.remove('active'));
    }
  });
}

export function showToast(message, type = 'success', duration = 3500) {
  const icons = { success: 'fa-check-circle', error: 'fa-times-circle', warning: 'fa-exclamation-circle', info: 'fa-info-circle' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fas ${icons[type]} toast-icon"></i>
    <span class="toast-message">${message}</span>
    <button class="toast-close" aria-label="Close"><i class="fas fa-times"></i></button>
  `;
  toastContainer.appendChild(toast);

  toast.querySelector('.toast-close').addEventListener('click', () => removeToast(toast));
  setTimeout(() => removeToast(toast), duration);
}

function removeToast(toast) {
  toast.classList.add('removing');
  setTimeout(() => toast.remove(), 300);
}

export function openModal(options) {
  const { title, content, footer, size = '', onClose } = options;
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal ${size}" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="modal-header">
        <h3 id="modal-title">${title}</h3>
        <button class="modal-close" aria-label="Close modal"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">${content}</div>
      ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
    </div>
  `;

  document.getElementById('modal-root')?.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('active'));

  const close = () => {
    overlay.classList.remove('active');
    setTimeout(() => { overlay.remove(); onClose?.(); }, 250);
  };

  overlay.querySelector('.modal-close').addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

  const escHandler = (e) => {
    if (e.key === 'Escape') { close(); document.removeEventListener('keydown', escHandler); }
  };
  document.addEventListener('keydown', escHandler);

  return { close, overlay };
}

export function confirmDialog(message, onConfirm) {
  openModal({
    title: 'Confirm Action',
    content: `
      <div class="confirm-dialog">
        <div class="confirm-icon"><i class="fas fa-exclamation-triangle"></i></div>
        <p>${message}</p>
      </div>
    `,
    footer: `
      <button class="btn btn-outline" data-action="cancel">Cancel</button>
      <button class="btn btn-danger" data-action="confirm">Confirm</button>
    `,
    size: 'confirm-dialog',
  });

  const overlay = document.querySelector('.modal-overlay.active');
  overlay?.querySelector('[data-action="cancel"]')?.addEventListener('click', () => {
    overlay.querySelector('.modal-close')?.click();
  });
  overlay?.querySelector('[data-action="confirm"]')?.addEventListener('click', () => {
    onConfirm?.();
    overlay.querySelector('.modal-close')?.click();
  });
}

export function toggleDropdown(btn) {
  const menu = btn.nextElementSibling || btn.parentElement.querySelector('.dropdown-menu');
  const isActive = menu.classList.contains('active');
  document.querySelectorAll('.dropdown-menu.active').forEach(m => m.classList.remove('active'));
  if (!isActive) menu.classList.add('active');
}

export function destroyCharts() {
  activeCharts.forEach(c => c.destroy());
  activeCharts = [];
}

export function registerChart(chart) {
  activeCharts.push(chart);
}

export function showSkeleton(container, count = 4) {
  container.innerHTML = Array(count).fill('').map(() =>
    `<div class="skeleton skeleton-card" style="margin-bottom:1rem"></div>`
  ).join('');
}

export function initDropdowns(container = document) {
  container.querySelectorAll('[data-dropdown]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown(btn);
    });
  });
}

export function initTabs(container = document) {
  container.querySelectorAll('.tabs').forEach(tabGroup => {
    tabGroup.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const parent = tabGroup.closest('.card, .settings-panel, .auth-card') || tabGroup.parentElement;
        parent.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        parent.querySelector(`[data-tab-content="${target}"]`)?.classList.add('active');
      });
    });
  });
}

export function initFAQ(container = document) {
  container.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      container.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
}

export function initDragDrop(dropzone, onFiles) {
  ['dragenter', 'dragover'].forEach(evt => {
    dropzone.addEventListener(evt, (e) => { e.preventDefault(); dropzone.classList.add('dragover'); });
  });
  ['dragleave', 'drop'].forEach(evt => {
    dropzone.addEventListener(evt, (e) => { e.preventDefault(); dropzone.classList.remove('dragover'); });
  });
  dropzone.addEventListener('drop', (e) => {
    onFiles(Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/')));
  });
  dropzone.addEventListener('click', () => {
    const input = dropzone.querySelector('input[type="file"]') || document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*';
    input.onchange = () => onFiles(Array.from(input.files));
    input.click();
  });
}
