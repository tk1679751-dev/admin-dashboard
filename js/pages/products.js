/**
 * Products Page
 */

import { products as allProducts, categories } from '../data.js';
import { getStatusBadge, paginate } from '../utils.js';
import { confirmDialog, showToast } from '../ui.js';

let state = { search: '', category: 'all', stock: 'all', sort: 'date-desc', view: 'grid', page: 1, selected: new Set() };

export function renderProducts() {
  const filtered = filterProducts();
  const { items, totalPages, total, page } = paginate(filtered, state.page, 9);

  const html = `
    <div class="page-header">
      <div class="page-header-info"><h1>Products</h1><p>Manage your product catalog (${total} products)</p></div>
      <div class="page-header-actions">
        <div class="view-toggle">
          <button class="view-toggle-btn ${state.view === 'grid' ? 'active' : ''}" data-view="grid"><i class="fas fa-th"></i></button>
          <button class="view-toggle-btn ${state.view === 'table' ? 'active' : ''}" data-view="table"><i class="fas fa-list"></i></button>
        </div>
        <a href="#add-product" class="btn btn-primary btn-sm" id="go-add-product"><i class="fas fa-plus"></i> Add Product</a>
      </div>
    </div>

    <div class="filter-bar">
      <div class="search-input-wrapper">
        <i class="fas fa-search"></i>
        <input type="search" id="product-search" placeholder="Search products..." value="${state.search}">
      </div>
      <select class="form-control" id="product-category">
        <option value="all">All Categories</option>
        ${categories.map(c => `<option value="${c}" ${state.category === c ? 'selected' : ''}>${c}</option>`).join('')}
      </select>
      <select class="form-control" id="product-stock">
        <option value="all">All Stock</option>
        <option value="in-stock" ${state.stock === 'in-stock' ? 'selected' : ''}>In Stock</option>
        <option value="low-stock" ${state.stock === 'low-stock' ? 'selected' : ''}>Low Stock</option>
        <option value="out-of-stock" ${state.stock === 'out-of-stock' ? 'selected' : ''}>Out of Stock</option>
      </select>
      <select class="form-control" id="product-sort">
        <option value="date-desc" ${state.sort === 'date-desc' ? 'selected' : ''}>Newest First</option>
        <option value="date-asc" ${state.sort === 'date-asc' ? 'selected' : ''}>Oldest First</option>
        <option value="price-asc" ${state.sort === 'price-asc' ? 'selected' : ''}>Price: Low to High</option>
        <option value="price-desc" ${state.sort === 'price-desc' ? 'selected' : ''}>Price: High to Low</option>
      </select>
      ${state.selected.size ? `<button class="btn btn-danger btn-sm" id="bulk-delete"><i class="fas fa-trash"></i> Delete (${state.selected.size})</button>` : ''}
    </div>

    ${state.view === 'grid' ? renderGrid(items) : renderTable(items)}
    ${renderPagination(page, totalPages, total)}
  `;

  requestAnimationFrame(() => bindProductsEvents());
  return html;
}

function filterProducts() {
  let result = allProducts.filter(p => {
    const matchSearch = !state.search || p.name.toLowerCase().includes(state.search.toLowerCase()) || p.sku.toLowerCase().includes(state.search.toLowerCase());
    const matchCat = state.category === 'all' || p.category === state.category;
    const matchStock = state.stock === 'all' || p.status === state.stock;
    return matchSearch && matchCat && matchStock;
  });

  result.sort((a, b) => {
    if (state.sort === 'price-asc') return a.price - b.price;
    if (state.sort === 'price-desc') return b.price - a.price;
    if (state.sort === 'date-asc') return new Date(a.created) - new Date(b.created);
    return new Date(b.created) - new Date(a.created);
  });

  return result;
}

function renderGrid(items) {
  if (!items.length) return emptyState();
  return `<div class="grid grid-auto">${items.map((p, i) => {
    const discounted = p.discount ? (p.price * (1 - p.discount / 100)).toFixed(2) : null;
    return `
      <div class="product-card stagger-${(i % 6) + 1}">
        <div class="product-card-image">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          <div class="product-card-badge">${getStatusBadge(p.status)}</div>
          <div class="product-card-actions">
            <button class="btn btn-icon btn-sm" style="background:var(--card);box-shadow:var(--shadow)" data-edit="${p.id}"><i class="fas fa-edit"></i></button>
            <button class="btn btn-icon btn-sm" style="background:var(--card);box-shadow:var(--shadow)" data-delete="${p.id}"><i class="fas fa-trash text-danger"></i></button>
          </div>
        </div>
        <div class="product-card-body">
          <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem">
            <input type="checkbox" data-select="${p.id}" ${state.selected.has(p.id) ? 'checked' : ''}>
            <div class="product-card-title">${p.name}</div>
          </div>
          <div class="product-card-category">${p.category} · SKU: ${p.sku}</div>
          <div class="product-card-footer">
            <div class="product-card-price">
              $${discounted || p.price.toFixed(2)}
              ${p.discount ? `<span class="original">$${p.price.toFixed(2)}</span>` : ''}
            </div>
            <div class="product-card-stock text-muted">${p.stock} in stock</div>
          </div>
        </div>
      </div>
    `;
  }).join('')}</div>`;
}

function renderTable(items) {
  if (!items.length) return emptyState();
  return `
    <div class="card">
      <div class="table-wrapper">
        <table class="table">
          <thead><tr>
            <th><input type="checkbox" id="select-all"></th>
            <th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th>
          </tr></thead>
          <tbody>${items.map(p => `
            <tr>
              <td><input type="checkbox" data-select="${p.id}" ${state.selected.has(p.id) ? 'checked' : ''}></td>
              <td><div class="table-user"><img class="table-product-img" src="${p.image}" alt="${p.name}"><div><div style="font-weight:500">${p.name}</div><div class="text-muted" style="font-size:0.75rem">${p.sku}</div></div></div></td>
              <td>${p.category}</td>
              <td style="font-weight:600">$${p.price.toFixed(2)}</td>
              <td>${p.stock}</td>
              <td>${getStatusBadge(p.status)}</td>
              <td><div class="table-actions">
                <button class="btn btn-icon btn-ghost btn-sm" data-edit="${p.id}"><i class="fas fa-edit"></i></button>
                <button class="btn btn-icon btn-ghost btn-sm" data-delete="${p.id}"><i class="fas fa-trash text-danger"></i></button>
              </div></td>
            </tr>
          `).join('')}</tbody>
        </table>
      </div>
    </div>
  `;
}

function emptyState() {
  return `<div class="card"><div class="empty-state"><i class="fas fa-box-open"></i><h3>No products found</h3><p>Try adjusting your filters</p></div></div>`;
}

function renderPagination(page, totalPages, total) {
  if (totalPages <= 1) return '';
  return `
    <div class="pagination" style="margin-top:1.5rem">
      <button class="pagination-btn" data-page="${page - 1}" ${page <= 1 ? 'disabled' : ''}><i class="fas fa-chevron-left"></i></button>
      ${Array.from({ length: totalPages }, (_, i) => `<button class="pagination-btn ${i + 1 === page ? 'active' : ''}" data-page="${i + 1}">${i + 1}</button>`).join('')}
      <button class="pagination-btn" data-page="${page + 1}" ${page >= totalPages ? 'disabled' : ''}><i class="fas fa-chevron-right"></i></button>
      <span class="pagination-info">${total} products</span>
    </div>
  `;
}

function bindProductsEvents() {
  const refresh = () => import('../router.js').then(({ navigateTo }) => navigateTo('products'));

  document.getElementById('product-search')?.addEventListener('input', (e) => { state.search = e.target.value; state.page = 1; refresh(); });
  document.getElementById('product-category')?.addEventListener('change', (e) => { state.category = e.target.value; state.page = 1; refresh(); });
  document.getElementById('product-stock')?.addEventListener('change', (e) => { state.stock = e.target.value; state.page = 1; refresh(); });
  document.getElementById('product-sort')?.addEventListener('change', (e) => { state.sort = e.target.value; refresh(); });

  document.querySelectorAll('[data-view]').forEach(btn => {
    btn.addEventListener('click', () => { state.view = btn.dataset.view; refresh(); });
  });

  document.getElementById('go-add-product')?.addEventListener('click', (e) => {
    e.preventDefault();
    import('../router.js').then(({ navigateTo }) => navigateTo('add-product'));
  });

  document.querySelectorAll('[data-select]').forEach(cb => {
    cb.addEventListener('change', () => {
      const id = parseInt(cb.dataset.select);
      cb.checked ? state.selected.add(id) : state.selected.delete(id);
      refresh();
    });
  });

  document.getElementById('select-all')?.addEventListener('change', (e) => {
    const filtered = filterProducts();
    filtered.forEach(p => e.target.checked ? state.selected.add(p.id) : state.selected.delete(p.id));
    refresh();
  });

  document.getElementById('bulk-delete')?.addEventListener('click', () => {
    confirmDialog(`Delete ${state.selected.size} selected products?`, () => {
      state.selected.clear();
      showToast('Products deleted successfully', 'success');
      refresh();
    });
  });

  document.querySelectorAll('[data-delete]').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = allProducts.find(x => x.id === parseInt(btn.dataset.delete));
      confirmDialog(`Delete "${p?.name}"?`, () => showToast('Product deleted', 'success'));
    });
  });

  document.querySelectorAll('.pagination-btn[data-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = parseInt(btn.dataset.page);
      if (p >= 1) { state.page = p; refresh(); }
    });
  });
}
