/**
 * Orders Page
 */

import { orders as allOrders } from '../data.js';
import { getStatusBadge } from '../utils.js';
import { openModal, showToast } from '../ui.js';

export function renderOrders() {
  const html = `
    <div class="page-header">
      <div class="page-header-info"><h1>Orders</h1><p>Manage and track all customer orders</p></div>
      <div class="page-header-actions">
        <button class="btn btn-outline btn-sm" id="export-orders"><i class="fas fa-download"></i> Export</button>
      </div>
    </div>

    <div class="filter-bar">
      <div class="search-input-wrapper">
        <i class="fas fa-search"></i>
        <input type="search" id="order-search" placeholder="Search orders...">
      </div>
      <select class="form-control" id="order-status-filter">
        <option value="all">All Status</option>
        <option value="pending">Pending</option>
        <option value="processing">Processing</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>

    <div class="card">
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th><th>Actions</th></tr>
          </thead>
          <tbody id="orders-tbody">
            ${allOrders.map(o => orderRow(o)).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  requestAnimationFrame(() => bindOrderEvents());
  return html;
}

function orderRow(o) {
  return `
    <tr data-order-id="${o.id}" data-status="${o.status}">
      <td><strong>${o.id}</strong></td>
      <td><div><div style="font-weight:500">${o.customer}</div><div class="text-muted" style="font-size:0.8125rem">${o.email}</div></div></td>
      <td>${o.products} items</td>
      <td style="font-weight:600">${o.total}</td>
      <td>${getStatusBadge(o.status)}</td>
      <td class="text-muted">${o.date}</td>
      <td>
        <div class="table-actions">
          <button class="btn btn-icon btn-ghost btn-sm" data-view-order="${o.id}" title="View"><i class="fas fa-eye"></i></button>
          <button class="btn btn-icon btn-ghost btn-sm" data-print-order="${o.id}" title="Print"><i class="fas fa-print"></i></button>
          <button class="btn btn-icon btn-ghost btn-sm" data-download-order="${o.id}" title="Download PDF"><i class="fas fa-file-pdf"></i></button>
        </div>
      </td>
    </tr>
  `;
}

function bindOrderEvents() {
  document.getElementById('order-search')?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('#orders-tbody tr').forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });

  document.getElementById('order-status-filter')?.addEventListener('change', (e) => {
    const status = e.target.value;
    document.querySelectorAll('#orders-tbody tr').forEach(row => {
      row.style.display = status === 'all' || row.dataset.status === status ? '' : 'none';
    });
  });

  document.querySelectorAll('[data-view-order]').forEach(btn => {
    btn.addEventListener('click', () => {
      const order = allOrders.find(o => o.id === btn.dataset.viewOrder);
      if (order) showOrderModal(order);
    });
  });

  document.querySelectorAll('[data-print-order]').forEach(btn => {
    btn.addEventListener('click', () => {
      const order = allOrders.find(o => o.id === btn.dataset.printOrder);
      if (order) printInvoice(order);
    });
  });

  document.querySelectorAll('[data-download-order]').forEach(btn => {
    btn.addEventListener('click', () => {
      const order = allOrders.find(o => o.id === btn.dataset.downloadOrder);
      if (order) downloadInvoicePDF(order);
    });
  });

  document.getElementById('export-orders')?.addEventListener('click', () => {
    import('../utils.js').then(({ exportCSV }) => {
      exportCSV(allOrders, 'orders-export.csv');
      showToast('Orders exported to CSV', 'success');
    });
  });
}

function showOrderModal(order) {
  const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  openModal({
    title: `Order ${order.id}`,
    size: 'modal-lg',
    content: `
      <div class="order-detail-grid">
        <div class="order-detail-section">
          <h4>Customer Information</h4>
          <div class="order-detail-row"><span>Name</span><span>${order.customer}</span></div>
          <div class="order-detail-row"><span>Email</span><span>${order.email}</span></div>
          <div class="order-detail-row"><span>Address</span><span>${order.address}</span></div>
          <div class="order-detail-row"><span>Payment</span><span>${order.payment}</span></div>
        </div>
        <div class="order-detail-section">
          <h4>Order Details</h4>
          <div class="order-detail-row"><span>Order ID</span><span>${order.id}</span></div>
          <div class="order-detail-row"><span>Date</span><span>${order.date}</span></div>
          <div class="order-detail-row"><span>Items</span><span>${order.products}</span></div>
          <div class="order-detail-row"><span>Status</span><span>${getStatusBadge(order.status)}</span></div>
          <div class="order-detail-row total"><span>Total</span><span>${order.total}</span></div>
        </div>
      </div>
      <div class="form-group" style="margin-top:1.5rem">
        <label class="form-label">Update Status</label>
        <select class="form-control" id="order-status-update">
          ${statuses.map(s => `<option value="${s}" ${s === order.status ? 'selected' : ''}>${s.charAt(0).toUpperCase() + s.slice(1)}</option>`).join('')}
        </select>
      </div>
    `,
    footer: `
      <button class="btn btn-outline" id="print-invoice-btn"><i class="fas fa-print"></i> Print</button>
      <button class="btn btn-outline" id="download-pdf-btn"><i class="fas fa-file-pdf"></i> Download PDF</button>
      <button class="btn btn-primary" id="update-status-btn">Update Status</button>
    `,
  });

  document.getElementById('update-status-btn')?.addEventListener('click', () => {
    const newStatus = document.getElementById('order-status-update')?.value;
    showToast(`Order ${order.id} status updated to ${newStatus}`, 'success');
    document.querySelector('.modal-overlay.active .modal-close')?.click();
  });

  document.getElementById('print-invoice-btn')?.addEventListener('click', () => printInvoice(order));
  document.getElementById('download-pdf-btn')?.addEventListener('click', () => downloadInvoicePDF(order));
}

function printInvoice(order) {
  const win = window.open('', '_blank');
  win.document.write(generateInvoiceHTML(order));
  win.document.close();
  win.print();
  showToast('Invoice sent to printer', 'info');
}

function downloadInvoicePDF(order) {
  const content = generateInvoiceHTML(order);
  import('../utils.js').then(({ downloadText }) => {
    downloadText(content, `invoice-${order.id}.html`, 'text/html');
    showToast('Invoice downloaded', 'success');
  });
}

function generateInvoiceHTML(order) {
  return `<!DOCTYPE html><html><head><title>Invoice ${order.id}</title>
    <style>body{font-family:Arial,sans-serif;padding:40px;max-width:800px;margin:0 auto}
    h1{color:#4F46E5}table{width:100%;border-collapse:collapse;margin:20px 0}
    td,th{padding:10px;border-bottom:1px solid #eee;text-align:left}
    .total{font-size:1.25rem;font-weight:bold;color:#4F46E5}</style></head><body>
    <h1>INVOICE</h1><p><strong>Order:</strong> ${order.id}<br><strong>Date:</strong> ${order.date}</p>
    <h3>Bill To</h3><p>${order.customer}<br>${order.email}<br>${order.address}</p>
    <table><tr><th>Description</th><th>Qty</th><th>Amount</th></tr>
    <tr><td>Order Items (${order.products} products)</td><td>${order.products}</td><td>${order.total}</td></tr></table>
    <p class="total">Total: ${order.total}</p>
    <p style="color:#666;margin-top:40px">Payment Method: ${order.payment} | Status: ${order.status}</p>
    </body></html>`;
}
