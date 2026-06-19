/**
 * Analytics Page
 */

import { initAnalyticsCharts } from '../charts.js';
import { exportCSV } from '../utils.js';
import { showToast } from '../ui.js';

export function renderAnalytics() {
  const html = `
    <div class="page-header">
      <div class="page-header-info"><h1>Analytics</h1><p>Track performance and growth metrics</p></div>
      <div class="page-header-actions">
        <button class="btn btn-outline btn-sm" id="export-analytics"><i class="fas fa-file-csv"></i> Export CSV</button>
      </div>
    </div>

    <div class="analytics-summary">
      <div class="analytics-metric"><div class="analytics-metric-value">$128K</div><div class="analytics-metric-label">Total Revenue</div></div>
      <div class="analytics-metric"><div class="analytics-metric-value">2,847</div><div class="analytics-metric-label">Total Orders</div></div>
      <div class="analytics-metric"><div class="analytics-metric-value">3,642</div><div class="analytics-metric-label">Customers</div></div>
      <div class="analytics-metric"><div class="analytics-metric-value">4.8%</div><div class="analytics-metric-label">Conversion Rate</div></div>
    </div>

    <div class="grid grid-2" style="margin-bottom:1.25rem">
      <div class="card">
        <div class="card-header"><h3><i class="fas fa-chart-line text-primary"></i> Revenue Trend</h3></div>
        <div class="card-body"><div class="chart-container"><canvas id="lineChart"></canvas></div></div>
      </div>
      <div class="card">
        <div class="card-header"><h3><i class="fas fa-chart-bar text-primary"></i> Sales by Category</h3></div>
        <div class="card-body"><div class="chart-container"><canvas id="barChart"></canvas></div></div>
      </div>
    </div>

    <div class="grid grid-2">
      <div class="card">
        <div class="card-header"><h3><i class="fas fa-chart-pie text-primary"></i> Category Distribution</h3></div>
        <div class="card-body"><div class="chart-container"><canvas id="pieChart"></canvas></div></div>
      </div>
      <div class="card">
        <div class="card-header"><h3><i class="fas fa-user-plus text-primary"></i> Customer Growth</h3></div>
        <div class="card-body"><div class="chart-container"><canvas id="growthChart"></canvas></div></div>
      </div>
    </div>

    <div class="grid grid-2" style="margin-top:1.25rem">
      <div class="card">
        <div class="card-header"><h3>Revenue Report</h3></div>
        <div class="card-body">
          <div class="table-wrapper">
            <table class="table">
              <thead><tr><th>Month</th><th>Revenue</th><th>Orders</th><th>Growth</th></tr></thead>
              <tbody>
                ${['Jan','Feb','Mar','Apr','May','Jun'].map((m, i) => `
                  <tr><td>${m} 2025</td><td>$${(8000 + i * 1200).toLocaleString()}</td><td>${120 + i * 15}</td>
                  <td><span class="badge badge-success">+${(5 + i * 1.2).toFixed(1)}%</span></td></tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><h3>Sales Report</h3></div>
        <div class="card-body">
          <div class="table-wrapper">
            <table class="table">
              <thead><tr><th>Category</th><th>Units Sold</th><th>Revenue</th><th>Share</th></tr></thead>
              <tbody>
                ${[['Electronics',450,'$45,000','35%'],['Fashion',280,'$28,000','22%'],['Sports',220,'$22,000','18%'],['Home',180,'$18,000','14%'],['Food',150,'$15,000','11%']].map(r => `
                  <tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;

  requestAnimationFrame(() => {
    initAnalyticsCharts();
    document.getElementById('export-analytics')?.addEventListener('click', () => {
      exportCSV([
        { month: 'Jan', revenue: 8000, orders: 120 },
        { month: 'Feb', revenue: 9200, orders: 135 },
        { month: 'Mar', revenue: 10400, orders: 150 },
        { month: 'Apr', revenue: 11600, orders: 165 },
        { month: 'May', revenue: 12800, orders: 180 },
        { month: 'Jun', revenue: 14000, orders: 195 },
      ], 'analytics-report.csv');
      showToast('Analytics exported to CSV', 'success');
    });
  });

  return html;
}
