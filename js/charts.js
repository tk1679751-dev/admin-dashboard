/**
 * JazzyAdmin chart adapters. The copied TasteSkill chart kit draws the SVGs.
 */

import './app-kit-charts.js';
import { chartData } from './data.js';

const money = Charts.fmt.money('USD', 0);
const integer = Charts.fmt.int;

function mount(id, draw) {
  const el = document.getElementById(id);
  if (!el) return;
  draw(el);
}

export function initDashboardCharts() {
  const metric = document.querySelector('[data-chart-metric][aria-selected="true"]')?.dataset.chartMetric || 'revenue';
  const isOrders = metric === 'orders';
  mount('salesChart', (el) => Charts.line(el, {
    labels: chartData.salesOverview.labels,
    series: [{ name: isOrders ? 'Orders' : 'Revenue', values: isOrders ? chartData.salesOverview.orders : chartData.salesOverview.sales, colour: 'var(--chart-3)' }],
    format: isOrders ? integer : money,
    height: 220,
    xAt: [0, 3, 6, 9, 11],
  }));
  mount('revenueChart', (el) => Charts.bars(el, {
    labels: chartData.revenue.labels,
    values: chartData.revenue.data,
    format: money,
    tickFormat: money,
    height: 200,
    colour: 'var(--chart-3)',
    xAt: [0, 1, 2, 3, 4, 5, 6],
  }));
  document.querySelectorAll('[data-chart-metric]').forEach((button) => {
    if (button.dataset.bound === 'true') return;
    button.dataset.bound = 'true';
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-chart-metric]').forEach((item) => {
        const selected = item === button;
        item.classList.toggle('active', selected);
        item.setAttribute('aria-selected', String(selected));
      });
      initDashboardCharts();
    });
  });
}

export function initAnalyticsCharts() {
  mount('lineChart', (el) => Charts.line(el, {
    labels: chartData.analytics.line.labels,
    series: [{ name: 'Revenue', values: chartData.analytics.line.data, colour: 'var(--chart-3)' }],
    format: money,
    height: 220,
  }));
  mount('barChart', (el) => Charts.barList(el, chartData.analytics.bar.labels.map((label, i) => ({ label, value: chartData.analytics.bar.data[i] })), { format: money, colour: 'var(--chart-3)', thin: true }));
  mount('pieChart', (el) => Charts.ring(el, { value: 1, label: '100%', sub: 'sample mix', size: 132, stroke: 6, colour: 'var(--chart-3)' }));
  mount('growthChart', (el) => Charts.line(el, {
    labels: chartData.salesOverview.labels,
    series: [{ name: 'Customers', values: chartData.customerGrowth, colour: 'var(--chart-3)' }],
    format: integer,
    height: 200,
    xAt: [0, 3, 6, 9, 11],
  }));
}

export function initReportChart(id = 'reportChart') {
  mount(id, (el) => Charts.bars(el, {
    labels: chartData.salesOverview.labels.slice(0, 6),
    values: chartData.salesOverview.sales.slice(0, 6),
    format: money,
    tickFormat: money,
    height: 220,
    colour: 'var(--chart-3)',
  }));
}

export function refreshChartsOnThemeChange() {
  const page = document.getElementById('main-content')?.dataset.currentPage;
  if (page === 'dashboard') initDashboardCharts();
  if (page === 'analytics') initAnalyticsCharts();
  if (page === 'reports') initReportChart();
}
