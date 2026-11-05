/**
 * Dashboard Page
 */

import { stats, recentOrders, topProducts, activities, tasks, notes } from '../data.js';
import { getStatusBadge, animateCounters } from '../utils.js';
import { initDashboardCharts } from '../charts.js';

export function renderDashboard() {
  const user = JSON.parse(localStorage.getItem('dashboard-user') || '{}');
  const html = `
    <div class="page-header">
      <div class="page-header-info"><h1>Dashboard</h1><p>What needs attention before the next shipment window? Sample data.</p></div>
      <div class="page-header-actions"><a class="btn btn-primary" href="#orders?status=pending" data-nav-link="orders">Review pending orders</a></div>
    </div>

    <div class="grid grid-5" style="margin-bottom:1.5rem">
      ${statCard('Total Revenue', stats.revenue.value, stats.revenue.change, stats.revenue.up, 'fa-dollar-sign', 'primary', '0')}
      ${statCard('Total Orders', stats.orders.value, stats.orders.change, stats.orders.up, 'fa-shopping-cart', 'secondary', '1')}
      ${statCard('Total Customers', stats.customers.value, stats.customers.change, stats.customers.up, 'fa-users', 'success', '2')}
      ${statCard('Products', stats.products.value, stats.products.change, stats.products.up, 'fa-box', 'info', '3')}
      ${statCard('Pending Orders', stats.pending.value, stats.pending.change, stats.pending.up, 'fa-clock', 'warning', '4')}
    </div>

    <div class="grid grid-2" style="margin-bottom:1.5rem">
      <div class="card">
        <div class="card-header">
          <h3><i class="fas fa-chart-area text-primary"></i> Sales overview</h3>
          <div class="chart-tabs" role="tablist" aria-label="Sales metric">
            <button class="chart-tab active" type="button" data-chart-metric="revenue" aria-selected="true">Revenue <span>$80,200</span></button>
            <button class="chart-tab" type="button" data-chart-metric="orders" aria-selected="false">Orders <span>2,165</span></button>
          </div>
        </div>
        <div class="card-body"><div class="chart-container" id="salesChart" role="img" aria-label="Monthly revenue and order movement"></div></div>
      </div>
      <div class="card">
        <div class="card-header">
          <h3><i class="fas fa-chart-bar text-primary"></i> Revenue Analytics</h3>
          <select class="form-control" style="width:auto;padding:0.375rem 0.75rem;font-size:0.8125rem">
            <option>This Week</option><option>Last Week</option>
          </select>
        </div>
        <div class="card-body"><div class="chart-container" id="revenueChart" role="img" aria-label="Daily revenue for the current week"></div></div>
      </div>
    </div>

    <div class="grid grid-3" style="margin-bottom:1.5rem">
      <div class="card col-span-2">
        <div class="card-header">
          <h3><i class="fas fa-receipt text-primary"></i> Recent Orders</h3>
          <a href="#orders" class="btn btn-sm btn-outline" data-nav-link="orders">View All</a>
        </div>
        <div class="card-body compact">
          <div class="table-wrapper">
            <table class="table">
              <thead><tr><th>Order ID</th><th>Customer</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>${recentOrders.map(o => `
                <tr>
                  <td><strong>${o.id}</strong></td>
                  <td>${o.customer}</td>
                  <td>${o.total}</td>
                  <td>${getStatusBadge(o.status)}</td>
                  <td class="text-muted">${o.date}</td>
                </tr>
              `).join('')}</tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><h3><i class="fas fa-fire text-primary"></i> Top Products</h3></div>
        <div class="card-body compact">
          ${topProducts.map(p => `
            <div class="product-list-item">
              <div class="product-list-rank ${p.rank <= 3 ? 'top' : ''}">${p.rank}</div>
              <img class="product-list-img" src="${p.image}" alt="${p.name}" loading="lazy">
              <div class="product-list-info">
                <div class="product-list-name">${p.name}</div>
                <div class="product-list-category">${p.category}</div>
              </div>
              <div class="product-list-sales">
                <div class="product-list-revenue">${p.revenue}</div>
                <div class="product-list-units">${p.units} sold</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div class="grid grid-3">
      <div class="card">
        <div class="card-header"><h3><i class="fas fa-history text-primary"></i> Activity Timeline</h3></div>
        <div class="card-body">
          <div class="timeline">
            ${activities.map((a, i) => `
              <div class="timeline-item stagger-${i + 1}">
                <div class="timeline-dot ${a.type === 'success' ? 'success' : a.type === 'warning' ? 'warning' : a.type === 'danger' ? 'danger' : ''}"></div>
                <div class="timeline-content">
                  <div class="timeline-title">${a.title}</div>
                  <div class="timeline-desc">${a.desc}</div>
                  <div class="timeline-time">${a.time}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      ${renderCalendarWidget()}
      ${renderTaskWidget()}
    </div>

    <div class="widget-grid">
      ${renderNotesWidget()}
      ${renderWeatherWidget()}
      <div class="card widget">
        <div class="card-header"><h3><i class="fas fa-bolt text-primary"></i> Quick Actions</h3></div>
        <div class="card-body">
          <div style="display:grid;gap:0.5rem">
            <a href="#add-product" class="btn btn-primary btn-sm" data-nav-link="add-product"><i class="fas fa-plus"></i> Add Product</a>
            <a href="#orders" class="btn btn-outline btn-sm" data-nav-link="orders"><i class="fas fa-shopping-bag"></i> View Orders</a>
            <a href="#reports" class="btn btn-outline btn-sm" data-nav-link="reports"><i class="fas fa-file-export"></i> Export Report</a>
            <a href="#analytics" class="btn btn-outline btn-sm" data-nav-link="analytics"><i class="fas fa-chart-pie"></i> View Analytics</a>
          </div>
        </div>
      </div>
    </div>
  `;

  requestAnimationFrame(() => {
    initDashboardCharts();
    animateCounters(document.getElementById('main-content'));
    bindDashboardEvents();
  });

  return html;
}

function statCard(label, value, change, up, icon, color, stagger) {
  return `
    <div class="stat-card stagger-${stagger}">
      <div class="stat-card-info">
        <div class="stat-card-label">${label}</div>
        <div class="stat-card-value" data-count="${value}">${value}</div>
        <div class="stat-card-change ${up ? 'up' : 'down'}">
          <i class="fas fa-arrow-${up ? 'up' : 'down'}"></i> ${change}%
        </div>
      </div>
      <div class="stat-card-icon ${color}"><i class="fas ${icon}"></i></div>
    </div>
  `;
}

function renderCalendarWidget() {
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
  const monthName = now.toLocaleString('default', { month: 'long', year: 'numeric' });
  const eventDays = [5, 12, 18, 25];

  let days = '';
  for (let i = 0; i < firstDay; i++) days += '<div class="calendar-day empty"></div>';
  for (let d = 1; d <= daysInMonth; d++) {
    const cls = [d === now.getDate() ? 'today' : '', eventDays.includes(d) ? 'has-event' : ''].filter(Boolean).join(' ');
    days += `<div class="calendar-day ${cls}">${d}</div>`;
  }

  return `
    <div class="card widget">
      <div class="card-header"><h3><i class="fas fa-calendar text-primary"></i> Calendar</h3></div>
      <div class="card-body">
        <div class="calendar-header">
          <span style="font-weight:600;font-size:0.9375rem">${monthName}</span>
          <div class="calendar-nav">
            <button class="btn btn-icon btn-ghost btn-sm"><i class="fas fa-chevron-left"></i></button>
            <button class="btn btn-icon btn-ghost btn-sm"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
        <div class="calendar-grid">
          ${['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => `<div class="calendar-day-name">${d}</div>`).join('')}
          ${days}
        </div>
      </div>
    </div>
  `;
}

function renderTaskWidget() {
  return `
    <div class="card widget">
      <div class="card-header"><h3><i class="fas fa-tasks text-primary"></i> Tasks</h3></div>
      <div class="card-body">
        <div id="task-list">
          ${tasks.map(t => `
            <div class="task-item ${t.completed ? 'completed' : ''}" data-task="${t.id}">
              <input type="checkbox" class="task-checkbox" ${t.completed ? 'checked' : ''}>
              <span class="task-text">${t.text}</span>
              <span class="task-priority ${t.priority}"></span>
            </div>
          `).join('')}
        </div>
        <div class="task-add">
          <input type="text" placeholder="Add new task..." id="new-task-input">
          <button class="btn btn-primary btn-sm" id="add-task-btn"><i class="fas fa-plus"></i></button>
        </div>
      </div>
    </div>
  `;
}

function renderNotesWidget() {
  const colors = { primary: '', yellow: 'yellow', green: 'green', purple: 'purple' };
  return `
    <div class="card widget">
      <div class="card-header"><h3><i class="fas fa-sticky-note text-primary"></i> Notes</h3></div>
      <div class="card-body">
        ${notes.map(n => `<div class="note-item ${colors[n.color]}">${n.text}</div>`).join('')}
        <div class="task-add" style="margin-top:0.75rem">
          <input type="text" placeholder="Quick note..." id="new-note-input">
          <button class="btn btn-primary btn-sm" id="add-note-btn"><i class="fas fa-plus"></i></button>
        </div>
      </div>
    </div>
  `;
}

function renderWeatherWidget() {
  return `
    <div class="card widget">
      <div class="card-header"><h3><i class="fas fa-cloud-sun text-primary"></i> Weather</h3></div>
      <div class="card-body">
        <div class="weather-display">
          <div class="weather-icon">⛅</div>
          <div class="weather-temp">72°F</div>
          <div class="weather-desc">Partly Cloudy — New York</div>
          <div class="weather-details">
            <div class="weather-detail-item"><div class="weather-detail-value">65%</div><div class="weather-detail-label">Humidity</div></div>
            <div class="weather-detail-item"><div class="weather-detail-value">12 mph</div><div class="weather-detail-label">Wind</div></div>
            <div class="weather-detail-item"><div class="weather-detail-value">UV 6</div><div class="weather-detail-label">Index</div></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function bindDashboardEvents() {
  document.querySelectorAll('[data-nav-link]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      import('../router.js').then(({ navigateTo }) => navigateTo(link.dataset.navLink));
    });
  });

  document.querySelectorAll('.task-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      cb.closest('.task-item')?.classList.toggle('completed', cb.checked);
    });
  });

  document.getElementById('add-task-btn')?.addEventListener('click', () => {
    const input = document.getElementById('new-task-input');
    if (!input?.value.trim()) return;
    const list = document.getElementById('task-list');
    list?.insertAdjacentHTML('beforeend', `
      <div class="task-item">
        <input type="checkbox" class="task-checkbox">
        <span class="task-text">${input.value}</span>
        <span class="task-priority low"></span>
      </div>
    `);
    input.value = '';
  });
}
