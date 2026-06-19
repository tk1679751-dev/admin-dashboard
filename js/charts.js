/**
 * Chart.js wrapper and chart builders
 */

import { registerChart, destroyCharts } from './ui.js';
import { chartData } from './data.js';

const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
};

function getColors() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  return {
    primary: isDark ? '#6366F1' : '#4F46E5',
    secondary: isDark ? '#8B5CF6' : '#7C3AED',
    grid: isDark ? 'rgba(148,163,184,0.1)' : 'rgba(0,0,0,0.05)',
    text: isDark ? '#94A3B8' : '#6B7280',
  };
}

export function initDashboardCharts() {
  destroyCharts();
  const colors = getColors();

  createChart('salesChart', {
    type: 'line',
    data: {
      labels: chartData.salesOverview.labels,
      datasets: [{
        label: 'Sales',
        data: chartData.salesOverview.sales,
        borderColor: colors.primary,
        backgroundColor: colors.primary + '20',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
      }],
    },
    options: {
      ...chartDefaults,
      scales: {
        x: { grid: { display: false }, ticks: { color: colors.text } },
        y: { grid: { color: colors.grid }, ticks: { color: colors.text, callback: v => '$' + v.toLocaleString() } },
      },
      plugins: { ...chartDefaults.plugins, tooltip: { mode: 'index', intersect: false } },
    },
  });

  createChart('revenueChart', {
    type: 'bar',
    data: {
      labels: chartData.revenue.labels,
      datasets: [{
        label: 'Revenue',
        data: chartData.revenue.data,
        backgroundColor: colors.primary + 'CC',
        borderRadius: 6,
        borderSkipped: false,
      }],
    },
    options: {
      ...chartDefaults,
      scales: {
        x: { grid: { display: false }, ticks: { color: colors.text } },
        y: { grid: { color: colors.grid }, ticks: { color: colors.text, callback: v => '$' + v.toLocaleString() } },
      },
    },
  });
}

export function initAnalyticsCharts() {
  destroyCharts();
  const colors = getColors();
  const pieColors = [colors.primary, colors.secondary, '#10B981', '#F59E0B', '#3B82F6'];

  createChart('lineChart', {
    type: 'line',
    data: {
      labels: chartData.analytics.line.labels,
      datasets: [{
        data: chartData.analytics.line.data,
        borderColor: colors.primary,
        backgroundColor: colors.primary + '15',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: colors.primary,
      }],
    },
    options: {
      ...chartDefaults,
      plugins: { legend: { display: true, labels: { color: colors.text } } },
      scales: {
        x: { grid: { display: false }, ticks: { color: colors.text } },
        y: { grid: { color: colors.grid }, ticks: { color: colors.text } },
      },
    },
  });

  createChart('barChart', {
    type: 'bar',
    data: {
      labels: chartData.analytics.bar.labels,
      datasets: [{
        data: chartData.analytics.bar.data,
        backgroundColor: pieColors,
        borderRadius: 6,
      }],
    },
    options: {
      ...chartDefaults,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { color: colors.text } },
        y: { grid: { color: colors.grid }, ticks: { color: colors.text, callback: v => '$' + (v/1000) + 'k' } },
      },
    },
  });

  createChart('pieChart', {
    type: 'doughnut',
    data: {
      labels: chartData.analytics.pie.labels,
      datasets: [{
        data: chartData.analytics.pie.data,
        backgroundColor: pieColors,
        borderWidth: 0,
        hoverOffset: 8,
      }],
    },
    options: {
      ...chartDefaults,
      cutout: '65%',
      plugins: {
        legend: { display: true, position: 'bottom', labels: { color: colors.text, padding: 16, usePointStyle: true } },
      },
    },
  });

  createChart('growthChart', {
    type: 'line',
    data: {
      labels: chartData.salesOverview.labels,
      datasets: [{
        label: 'Customers',
        data: chartData.customerGrowth,
        borderColor: colors.secondary,
        backgroundColor: colors.secondary + '15',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
      }],
    },
    options: {
      ...chartDefaults,
      plugins: { legend: { display: true, labels: { color: colors.text } } },
      scales: {
        x: { grid: { display: false }, ticks: { color: colors.text } },
        y: { grid: { color: colors.grid }, ticks: { color: colors.text } },
      },
    },
  });
}

export function initReportChart(canvasId, type = 'bar') {
  const colors = getColors();
  createChart(canvasId, {
    type,
    data: {
      labels: chartData.salesOverview.labels.slice(0, 6),
      datasets: [{
        data: chartData.salesOverview.sales.slice(0, 6),
        backgroundColor: type === 'line' ? colors.primary + '20' : colors.primary + 'CC',
        borderColor: colors.primary,
        borderWidth: type === 'line' ? 2 : 0,
        fill: type === 'line',
        tension: 0.4,
        borderRadius: 6,
      }],
    },
    options: {
      ...chartDefaults,
      scales: {
        x: { grid: { display: false }, ticks: { color: colors.text } },
        y: { grid: { color: colors.grid }, ticks: { color: colors.text } },
      },
    },
  });
}

function createChart(canvasId, config) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || typeof Chart === 'undefined') return;
  const chart = new Chart(canvas, config);
  registerChart(chart);
}

export function refreshChartsOnThemeChange() {
  const page = document.querySelector('[data-current-page]')?.dataset.currentPage;
  if (page === 'dashboard') initDashboardCharts();
  else if (page === 'analytics') initAnalyticsCharts();
}
