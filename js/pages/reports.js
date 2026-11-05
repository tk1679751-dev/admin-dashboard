/**
 * Reports Page
 */

import { initReportChart } from '../charts.js';
import { showToast, destroyCharts } from '../ui.js';
import { downloadText } from '../utils.js';

let activePeriod = 'daily';

export function renderReports() {
  const html = `
    <div class="page-header">
      <div class="page-header-info"><h1>Reports</h1><p>Generate and export business reports</p></div>
      <div class="page-header-actions">
        <button class="btn btn-outline btn-sm" id="export-pdf"><i class="fas fa-file-pdf"></i> Export PDF</button>
        <button class="btn btn-primary btn-sm" id="export-excel"><i class="fas fa-file-excel"></i> Export Excel</button>
      </div>
    </div>

    <div class="tabs" id="report-tabs">
      <button class="tab-btn active" data-tab="daily">Daily</button>
      <button class="tab-btn" data-tab="weekly">Weekly</button>
      <button class="tab-btn" data-tab="monthly">Monthly</button>
      <button class="tab-btn" data-tab="custom">Custom Range</button>
    </div>

    <div class="tab-content active" data-tab-content="daily">
      ${renderReportContent('Daily Report', 'Today\'s performance summary')}
    </div>
    <div class="tab-content" data-tab-content="weekly">
      ${renderReportContent('Weekly Report', 'This week\'s performance summary')}
    </div>
    <div class="tab-content" data-tab-content="monthly">
      ${renderReportContent('Monthly Report', 'This month\'s performance summary')}
    </div>
    <div class="tab-content" data-tab-content="custom">
      <div class="card" style="margin-bottom:1.25rem">
        <div class="card-body">
          <div class="date-range-picker">
            <label class="form-label">From</label>
            <input type="date" id="date-from" value="2025-06-01">
            <label class="form-label">To</label>
            <input type="date" id="date-to" value="2025-06-18">
            <button class="btn btn-primary btn-sm" id="apply-date-range">Apply</button>
          </div>
        </div>
      </div>
      ${renderReportContent('Custom Report', 'Selected date range performance')}
    </div>

    <div class="grid grid-3" style="margin-top:1.5rem">
      ${reportCard('Sales Report', 'Detailed sales breakdown', 'fa-shopping-cart', 'primary')}
      ${reportCard('Revenue Report', 'Revenue and profit analysis', 'fa-dollar-sign', 'success')}
      ${reportCard('Customer Report', 'Customer acquisition & retention', 'fa-users', 'secondary')}
      ${reportCard('Inventory Report', 'Stock levels and movement', 'fa-boxes', 'warning')}
      ${reportCard('Tax Report', 'Tax calculations and summaries', 'fa-calculator', 'info')}
      ${reportCard('Performance Report', 'KPI and goal tracking', 'fa-tachometer-alt', 'danger')}
    </div>
  `;

  requestAnimationFrame(() => bindReportEvents());
  return html;
}

function renderReportContent(title, desc) {
  return `
    <div class="grid grid-4" style="margin-bottom:1.25rem">
      <div class="stat-card" style="opacity:1;animation:none">
        <div class="stat-card-info"><div class="stat-card-label">Revenue</div><div class="stat-card-value">$5,230</div></div>
        <div class="stat-card-icon primary"><i class="fas fa-dollar-sign"></i></div>
      </div>
      <div class="stat-card" style="opacity:1;animation:none">
        <div class="stat-card-info"><div class="stat-card-label">Orders</div><div class="stat-card-value">142</div></div>
        <div class="stat-card-icon secondary"><i class="fas fa-shopping-cart"></i></div>
      </div>
      <div class="stat-card" style="opacity:1;animation:none">
        <div class="stat-card-info"><div class="stat-card-label">New Customers</div><div class="stat-card-value">38</div></div>
        <div class="stat-card-icon success"><i class="fas fa-user-plus"></i></div>
      </div>
      <div class="stat-card" style="opacity:1;animation:none">
        <div class="stat-card-info"><div class="stat-card-label">Avg. Order</div><div class="stat-card-value">$36.83</div></div>
        <div class="stat-card-icon info"><i class="fas fa-chart-line"></i></div>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><h3>${title}</h3><p class="text-muted" style="font-size:0.8125rem">${desc}</p></div>
      <div class="card-body"><div class="chart-container" id="reportChart" role="img" aria-label="Report revenue by month"></div></div>
    </div>
  `;
}

function reportCard(title, desc, icon, color) {
  return `
    <div class="report-card">
      <div class="report-icon" style="background:var(--${color}-light);color:var(--${color})"><i class="fas ${icon}"></i></div>
      <div class="report-info"><h4>${title}</h4><p>${desc}</p></div>
      <i class="fas fa-chevron-right text-muted"></i>
    </div>
  `;
}

function bindReportEvents() {
  initReportChart('reportChart');

  document.querySelectorAll('#report-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#report-tabs .tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activePeriod = btn.dataset.tab;
      document.querySelectorAll('[data-tab-content]').forEach(c => c.classList.remove('active'));
      document.querySelector(`[data-tab-content="${activePeriod}"]`)?.classList.add('active');
      destroyCharts();
      setTimeout(() => initReportChart('reportChart'), 100);
    });
  });

  document.getElementById('apply-date-range')?.addEventListener('click', () => {
    showToast('Custom date range applied', 'success');
  });

  document.getElementById('export-pdf')?.addEventListener('click', () => {
    const content = generateReportHTML(activePeriod);
    downloadText(content, `report-${activePeriod}.html`, 'text/html');
    showToast('Report exported as PDF (HTML)', 'success');
  });

  document.getElementById('export-excel')?.addEventListener('click', () => {
    import('../utils.js').then(({ exportCSV }) => {
      exportCSV([
        { metric: 'Revenue', value: '$5,230' },
        { metric: 'Orders', value: '142' },
        { metric: 'New Customers', value: '38' },
        { metric: 'Avg Order Value', value: '$36.83' },
      ], `report-${activePeriod}.csv`);
      showToast('Report exported to Excel (CSV)', 'success');
    });
  });

  document.querySelectorAll('.report-card').forEach(card => {
    card.addEventListener('click', () => {
      showToast(`Generating ${card.querySelector('h4')?.textContent}...`, 'info');
    });
  });
}

function generateReportHTML(period) {
  return `<!DOCTYPE html><html><head><title>${period} Report</title>
    <style>body{font-family:Arial;padding:40px}h1{color:#4F46E5}table{width:100%;border-collapse:collapse}td,th{padding:8px;border:1px solid #ddd}</style></head>
    <body><h1>JazzyAdmin ${period.charAt(0).toUpperCase() + period.slice(1)} Report</h1>
    <p>Generated: ${new Date().toLocaleDateString()}</p>
    <table><tr><th>Metric</th><th>Value</th></tr>
    <tr><td>Revenue</td><td>$5,230</td></tr><tr><td>Orders</td><td>142</td></tr>
    <tr><td>New Customers</td><td>38</td></tr><tr><td>Avg Order</td><td>$36.83</td></tr></table></body></html>`;
}
