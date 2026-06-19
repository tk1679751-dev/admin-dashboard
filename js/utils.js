/**
 * Utility functions
 */

export function formatCurrency(amount) {
  const num = typeof amount === 'string' ? parseFloat(amount.replace(/[$,]/g, '')) : amount;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export function getStatusBadge(status) {
  const map = {
    active: 'badge-success', inactive: 'badge-neutral', pending: 'badge-warning',
    delivered: 'badge-success', shipped: 'badge-info', processing: 'badge-warning',
    cancelled: 'badge-danger', 'in-stock': 'badge-success', 'out-of-stock': 'badge-danger',
    'low-stock': 'badge-warning',
  };
  const label = status.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return `<span class="badge ${map[status] || 'badge-neutral'}">${label}</span>`;
}

export function paginate(items, page, perPage = 10) {
  const start = (page - 1) * perPage;
  return {
    items: items.slice(start, start + perPage),
    totalPages: Math.ceil(items.length / perPage),
    total: items.length,
    page,
  };
}

export function exportCSV(data, filename) {
  if (!data.length) return;
  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(','),
    ...data.map(row => headers.map(h => `"${row[h]}"`).join(',')),
  ].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateForm(fields) {
  let valid = true;
  fields.forEach(({ el, rules }) => {
    const errorEl = el.parentElement.querySelector('.form-error') || el.closest('.form-group')?.querySelector('.form-error');
    el.classList.remove('error', 'success');
    if (errorEl) errorEl.classList.remove('visible');

    for (const rule of rules) {
      if (!rule.test(el.value)) {
        valid = false;
        el.classList.add('error');
        if (errorEl) {
          errorEl.textContent = rule.message;
          errorEl.classList.add('visible');
        }
        break;
      }
    }
    if (el.value && !el.classList.contains('error')) el.classList.add('success');
  });
  return valid;
}

export function generateId(prefix = 'ID') {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}`;
}

export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export function animateCounters(container) {
  container.querySelectorAll('[data-count]').forEach(el => {
    const target = el.dataset.count;
    if (target.includes('$')) {
      const num = parseFloat(target.replace(/[$,]/g, ''));
      animateValue(el, 0, num, 1200, v => '$' + Math.floor(v).toLocaleString());
    } else {
      animateValue(el, 0, parseInt(target), 1200, v => Math.floor(v).toLocaleString());
    }
  });
}

function animateValue(el, start, end, duration, formatter) {
  const startTime = performance.now();
  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = formatter(start + (end - start) * eased);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

export function downloadText(content, filename, type = 'text/plain') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
