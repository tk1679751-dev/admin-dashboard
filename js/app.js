/**
 * Main Application Entry Point
 */

import { checkAuth, initTheme, initSidebar } from './theme.js';
import { initUI } from './ui.js';
import { renderLayout } from './layout.js';
import { registerPage, initRouter } from './router.js';

import { renderDashboard } from './pages/dashboard.js';
import { renderCustomers } from './pages/customers.js';
import { renderProducts } from './pages/products.js';
import { renderAddProduct } from './pages/add-product.js';
import { renderOrders } from './pages/orders.js';
import { renderMessage } from './pages/messages.js';
import { renderAnalytics } from './pages/analytics.js';
import { renderReports } from './pages/reports.js';
import { renderSettings } from './pages/settings.js';
import { renderFAQ } from './pages/faq.js';
import { renderHelp } from './pages/help.js';

document.addEventListener('DOMContentLoaded', () => {
  const user = checkAuth();
  if (!user) return;

  initTheme();
  initUI();
  renderLayout(user);
  initSidebar();

  registerPage('dashboard', renderDashboard);
  registerPage('customers', renderCustomers);
  registerPage('products', renderProducts);
  registerPage('add-product', renderAddProduct);
  registerPage('orders', renderOrders);
  registerPage('messages', renderMessage);
  registerPage('analytics', renderAnalytics);
  registerPage('reports', renderReports);
  registerPage('settings', renderSettings);
  registerPage('faq', renderFAQ);
  registerPage('help', renderHelp);

  initRouter();
});
