/**
 * Customers Page
 */

import { customers as allCustomers } from '../data.js';
import { getStatusBadge, paginate, formatDate } from '../utils.js';
import { openModal, confirmDialog, showToast, initDropdowns } from '../ui.js';

let state = { search: '', status: 'all', page: 1 };

export function renderCustomers() {
  const filtered = filterCustomers();
  const { items, totalPages, total, page } = paginate(filtered, state.page, 8);

  const html = `
    <div class="page-header">
      <div class="page-header-info"><h1>Customers</h1><p>Manage your customer base (${total} total)</p></div>
      <div class="page-header-actions">
        <button class="btn btn-primary btn-sm"><i class="fas fa-user-plus"></i> Add Customer</button>
      </div>
    </div>

    <div class="filter-bar">
      <div class="search-input-wrapper">
        <i class="fas fa-search"></i>
        <input type="search" id="customer-search" placeholder="Search customers..." value="${state.search}">
      </div>
      <select class="form-control" id="customer-status-filter">
        <option value="all" ${state.status === 'all' ? 'selected' : ''}>All Status</option>
        <option value="active" ${state.status === 'active' ? 'selected' : ''}>Active</option>
        <option value="inactive" ${state.status === 'inactive' ? 'selected' : ''}>Inactive</option>
        <option value="pending" ${state.status === 'pending' ? 'selected' : ''}>Pending</option>
      </select>
    </div>

    <div class="card">
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr><th>Customer</th><th>Phone</th><th>Status</th><th>Orders</th><th>Total Spent</th><th>Joined</th><th>Actions</th></tr>
          </thead>
          <tbody id="customers-tbody">
            ${items.length ? items.map(c => customerRow(c)).join('') : '<tr><td colspan="7"><div class="empty-state"><i class="fas fa-users"></i><h3>No customers found</h3></div></td></tr>'}
          </tbody>
        </table>
      </div>
      ${renderPagination(page, totalPages, total)}
    </div>
  `;

  requestAnimationFrame(() => bindCustomerEvents());
  return html;
}

function filterCustomers() {
  return allCustomers.filter(c => {
    const matchSearch = !state.search || c.name.toLowerCase().includes(state.search.toLowerCase()) || c.email.toLowerCase().includes(state.search.toLowerCase());
    const matchStatus = state.status === 'all' || c.status === state.status;
    return matchSearch && matchStatus;
  });
}

function customerRow(c) {
  return `
    <tr data-customer-id="${c.id}">
      <td>
        <div class="table-user">
          <div class="table-avatar">${c.avatar}</div>
          <div><div style="font-weight:500">${c.name}</div><div class="text-muted" style="font-size:0.8125rem">${c.email}</div></div>
        </div>
      </td>
      <td class="text-muted">${c.phone}</td>
      <td>${getStatusBadge(c.status)}</td>
      <td>${c.orders}</td>
      <td style="font-weight:600">${c.spent}</td>
      <td class="text-muted">${formatDate(c.joined)}</td>
      <td>
        <div class="table-actions">
          <button class="btn btn-icon btn-ghost btn-sm" data-action="view" data-id="${c.id}" title="View"><i class="fas fa-eye"></i></button>
          <button class="btn btn-icon btn-ghost btn-sm" data-action="edit" data-id="${c.id}" title="Edit"><i class="fas fa-edit"></i></button>
          <button class="btn btn-icon btn-ghost btn-sm" data-action="delete" data-id="${c.id}" title="Delete"><i class="fas fa-trash text-danger"></i></button>
        </div>
      </td>
    </tr>
  `;
}

function renderPagination(page, totalPages, total) {
  if (totalPages <= 1) return '';
  let btns = '';
  for (let i = 1; i <= totalPages; i++) {
    btns += `<button class="pagination-btn ${i === page ? 'active' : ''}" data-page="${i}">${i}</button>`;
  }
  return `
    <div class="card-footer">
      <span class="pagination-info">Showing page ${page} of ${totalPages} (${total} customers)</span>
      <div class="pagination">
        <button class="pagination-btn" data-page="${page - 1}" ${page <= 1 ? 'disabled' : ''}><i class="fas fa-chevron-left"></i></button>
        ${btns}
        <button class="pagination-btn" data-page="${page + 1}" ${page >= totalPages ? 'disabled' : ''}><i class="fas fa-chevron-right"></i></button>
      </div>
    </div>
  `;
}

function bindCustomerEvents() {
  document.getElementById('customer-search')?.addEventListener('input', (e) => {
    state.search = e.target.value;
    state.page = 1;
    refreshTable();
  });

  document.getElementById('customer-status-filter')?.addEventListener('change', (e) => {
    state.status = e.target.value;
    state.page = 1;
    refreshTable();
  });

  document.querySelectorAll('.pagination-btn[data-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = parseInt(btn.dataset.page);
      if (p >= 1) { state.page = p; refreshTable(); }
    });
  });

  document.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const customer = allCustomers.find(c => c.id === parseInt(btn.dataset.id));
      if (!customer) return;
      if (btn.dataset.action === 'view') showProfileModal(customer);
      else if (btn.dataset.action === 'edit') showEditModal(customer);
      else if (btn.dataset.action === 'delete') {
        confirmDialog(`Delete ${customer.name}? This action cannot be undone.`, () => {
          showToast(`${customer.name} has been deleted`, 'success');
        });
      }
    });
  });
}

function refreshTable() {
  import('../router.js').then(({ navigateTo }) => navigateTo('customers'));
}

function showProfileModal(c) {
  openModal({
    title: 'Customer Profile',
    content: `
      <div class="profile-header">
        <div class="profile-avatar-lg">${c.avatar}</div>
        <div>
          <h3>${c.name}</h3>
          <p class="text-muted">${c.email}</p>
          ${getStatusBadge(c.status)}
        </div>
      </div>
      <div class="form-row">
        <div><strong>Phone:</strong> ${c.phone}</div>
        <div><strong>Location:</strong> ${c.location}</div>
        <div><strong>Joined:</strong> ${formatDate(c.joined)}</div>
        <div><strong>Customer ID:</strong> #${c.id}</div>
      </div>
      <div class="profile-stats-row">
        <div class="profile-stat"><div class="profile-stat-value">${c.orders}</div><div class="profile-stat-label">Orders</div></div>
        <div class="profile-stat"><div class="profile-stat-value">${c.spent}</div><div class="profile-stat-label">Total Spent</div></div>
        <div class="profile-stat"><div class="profile-stat-value">${Math.floor(Math.random() * 5) + 1}</div><div class="profile-stat-label">Reviews</div></div>
      </div>
    `,
    footer: `<button class="btn btn-outline modal-close-btn">Close</button><button class="btn btn-primary">Send Message</button>`,
  });
  document.querySelector('.modal-close-btn')?.addEventListener('click', () => {
    document.querySelector('.modal-overlay.active .modal-close')?.click();
  });
}

function showEditModal(c) {
  openModal({
    title: 'Edit Customer',
    content: `
      <div class="form-group"><label class="form-label">Name</label><input class="form-control" value="${c.name}"></div>
      <div class="form-group"><label class="form-label">Email</label><input class="form-control" type="email" value="${c.email}"></div>
      <div class="form-group"><label class="form-label">Phone</label><input class="form-control" value="${c.phone}"></div>
      <div class="form-group"><label class="form-label">Status</label>
        <select class="form-control"><option ${c.status==='active'?'selected':''}>active</option><option ${c.status==='inactive'?'selected':''}>inactive</option><option ${c.status==='pending'?'selected':''}>pending</option></select>
      </div>
    `,
    footer: `<button class="btn btn-outline modal-close-btn">Cancel</button><button class="btn btn-primary" id="save-customer">Save Changes</button>`,
  });
  document.getElementById('save-customer')?.addEventListener('click', () => {
    showToast('Customer updated successfully', 'success');
    document.querySelector('.modal-overlay.active .modal-close')?.click();
  });
  document.querySelector('.modal-close-btn')?.addEventListener('click', () => {
    document.querySelector('.modal-overlay.active .modal-close')?.click();
  });
}
