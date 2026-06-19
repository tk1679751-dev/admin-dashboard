/**
 * Add Product Page
 */

import { categories } from '../data.js';
import { validateForm, generateId } from '../utils.js';
import { showToast, initDragDrop } from '../ui.js';

let uploadedImages = [];
let draftKey = 'product-draft';

export function renderAddProduct() {
  const draft = JSON.parse(localStorage.getItem(draftKey) || 'null');

  const html = `
    <div class="page-header">
      <div class="page-header-info"><h1>Add Product</h1><p>Create a new product listing</p></div>
      <div class="page-header-actions">
        <button class="btn btn-outline btn-sm" id="save-draft"><i class="fas fa-save"></i> Save Draft</button>
        <button class="btn btn-primary btn-sm" id="publish-product"><i class="fas fa-check"></i> Publish Product</button>
      </div>
    </div>

    <form id="add-product-form" novalidate>
      <div class="grid grid-2">
        <div>
          <div class="card" style="margin-bottom:1.25rem">
            <div class="card-header"><h3>Basic Information</h3></div>
            <div class="card-body">
              <div class="form-group">
                <label class="form-label">Product Name <span class="required">*</span></label>
                <input class="form-control" id="product-name" name="name" value="${draft?.name || ''}" placeholder="Enter product name" required>
                <div class="form-error">Product name is required (min 3 characters)</div>
              </div>
              <div class="form-group">
                <label class="form-label">Description</label>
                <textarea class="form-control" id="product-desc" name="description" placeholder="Describe your product..." rows="4">${draft?.description || ''}</textarea>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Category <span class="required">*</span></label>
                  <select class="form-control" id="product-category" required>
                    <option value="">Select category</option>
                    ${categories.map(c => `<option value="${c}" ${draft?.category === c ? 'selected' : ''}>${c}</option>`).join('')}
                  </select>
                  <div class="form-error">Please select a category</div>
                </div>
                <div class="form-group">
                  <label class="form-label">SKU Code <span class="required">*</span></label>
                  <input class="form-control" id="product-sku" value="${draft?.sku || generateId('SKU')}" placeholder="SKU-001">
                  <div class="form-error">SKU code is required</div>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Product Tags</label>
                <input class="form-control" id="product-tags" value="${draft?.tags || ''}" placeholder="wireless, audio, premium (comma separated)">
                <div class="form-hint">Separate tags with commas</div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header"><h3>Product Images</h3></div>
            <div class="card-body">
              <div class="dropzone" id="image-dropzone">
                <i class="fas fa-cloud-upload-alt"></i>
                <p>Drag & drop images here, or <span class="highlight">browse</span></p>
                <p style="font-size:0.75rem;margin-top:0.5rem">PNG, JPG up to 5MB each</p>
                <input type="file" multiple accept="image/*" hidden>
              </div>
              <div class="image-preview-grid" id="image-preview-grid"></div>
            </div>
          </div>
        </div>

        <div>
          <div class="card" style="margin-bottom:1.25rem">
            <div class="card-header"><h3>Pricing & Inventory</h3></div>
            <div class="card-body">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Price ($) <span class="required">*</span></label>
                  <input class="form-control" id="product-price" type="number" step="0.01" min="0" value="${draft?.price || ''}" placeholder="0.00">
                  <div class="form-error">Valid price is required</div>
                </div>
                <div class="form-group">
                  <label class="form-label">Discount (%)</label>
                  <input class="form-control" id="product-discount" type="number" min="0" max="100" value="${draft?.discount || 0}" placeholder="0">
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Quantity <span class="required">*</span></label>
                <input class="form-control" id="product-quantity" type="number" min="0" value="${draft?.quantity || ''}" placeholder="0">
                <div class="form-error">Quantity is required</div>
              </div>
              <div id="price-preview" style="padding:1rem;background:var(--bg-alt);border-radius:var(--radius);margin-top:0.5rem;display:none">
                <div style="font-size:0.8125rem;color:var(--text-muted)">Final Price</div>
                <div style="font-size:1.5rem;font-weight:700;color:var(--primary)" id="final-price">$0.00</div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header"><h3>Publish Settings</h3></div>
            <div class="card-body">
              <div class="setting-row">
                <div class="setting-info"><h4>Featured Product</h4><p>Display on homepage</p></div>
                <label class="toggle"><input type="checkbox" id="featured"><span class="toggle-slider"></span></label>
              </div>
              <div class="setting-row">
                <div class="setting-info"><h4>Enable Reviews</h4><p>Allow customer reviews</p></div>
                <label class="toggle"><input type="checkbox" id="reviews" checked><span class="toggle-slider"></span></label>
              </div>
              <div class="setting-row">
                <div class="setting-info"><h4>Track Inventory</h4><p>Auto-update stock levels</p></div>
                <label class="toggle"><input type="checkbox" id="track-inventory" checked><span class="toggle-slider"></span></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  `;

  requestAnimationFrame(() => bindAddProductEvents());
  return html;
}

function bindAddProductEvents() {
  const dropzone = document.getElementById('image-dropzone');
  if (dropzone) {
    initDragDrop(dropzone, handleImages);
  }

  document.getElementById('product-price')?.addEventListener('input', updatePricePreview);
  document.getElementById('product-discount')?.addEventListener('input', updatePricePreview);

  document.getElementById('save-draft')?.addEventListener('click', () => {
    const data = collectFormData();
    localStorage.setItem(draftKey, JSON.stringify(data));
    showToast('Draft saved successfully', 'success');
  });

  document.getElementById('publish-product')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (!validateProductForm()) return;
    localStorage.removeItem(draftKey);
    showToast('Product published successfully!', 'success');
    setTimeout(() => import('../router.js').then(({ navigateTo }) => navigateTo('products')), 1000);
  });
}

function handleImages(files) {
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImages.push(e.target.result);
      renderImagePreviews();
    };
    reader.readAsDataURL(file);
  });
}

function renderImagePreviews() {
  const grid = document.getElementById('image-preview-grid');
  if (!grid) return;
  grid.innerHTML = uploadedImages.map((src, i) => `
    <div class="image-preview-item">
      <img src="${src}" alt="Preview ${i + 1}">
      <button type="button" class="image-preview-remove" data-index="${i}"><i class="fas fa-times"></i></button>
    </div>
  `).join('');

  grid.querySelectorAll('.image-preview-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      uploadedImages.splice(parseInt(btn.dataset.index), 1);
      renderImagePreviews();
    });
  });
}

function updatePricePreview() {
  const price = parseFloat(document.getElementById('product-price')?.value) || 0;
  const discount = parseFloat(document.getElementById('product-discount')?.value) || 0;
  const final = price * (1 - discount / 100);
  const preview = document.getElementById('price-preview');
  const finalEl = document.getElementById('final-price');
  if (price > 0 && preview && finalEl) {
    preview.style.display = 'block';
    finalEl.textContent = '$' + final.toFixed(2);
    if (discount > 0) finalEl.innerHTML = `$${final.toFixed(2)} <span style="font-size:0.875rem;color:var(--text-muted);text-decoration:line-through">$${price.toFixed(2)}</span>`;
  }
}

function validateProductForm() {
  return validateForm([
    { el: document.getElementById('product-name'), rules: [{ test: v => v.trim().length >= 3, message: 'Product name is required (min 3 characters)' }] },
    { el: document.getElementById('product-category'), rules: [{ test: v => v !== '', message: 'Please select a category' }] },
    { el: document.getElementById('product-sku'), rules: [{ test: v => v.trim().length > 0, message: 'SKU code is required' }] },
    { el: document.getElementById('product-price'), rules: [{ test: v => parseFloat(v) > 0, message: 'Valid price is required' }] },
    { el: document.getElementById('product-quantity'), rules: [{ test: v => v !== '' && parseInt(v) >= 0, message: 'Quantity is required' }] },
  ]);
}

function collectFormData() {
  return {
    name: document.getElementById('product-name')?.value,
    description: document.getElementById('product-desc')?.value,
    category: document.getElementById('product-category')?.value,
    sku: document.getElementById('product-sku')?.value,
    tags: document.getElementById('product-tags')?.value,
    price: document.getElementById('product-price')?.value,
    discount: document.getElementById('product-discount')?.value,
    quantity: document.getElementById('product-quantity')?.value,
  };
}
