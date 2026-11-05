/**
 * Help Center Page
 */

import { showToast } from '../ui.js';

export function renderHelp() {
  const html = `
    <div class="page-header">
      <div class="page-header-info"><h1>Help Center</h1><p>Get help and support for your dashboard</p></div>
    </div>

    <div class="card" style="margin-bottom:2rem;padding:2.5rem;text-align:center;background:var(--raised)">
      <h2 style="margin-bottom:0.5rem">How can we help you?</h2>
      <p class="text-muted" style="margin-bottom:1.25rem">Search our knowledge base or browse categories below</p>
      <div class="search-input-wrapper" style="max-width:520px;margin:0 auto">
        <i class="fas fa-search"></i>
        <input type="search" id="help-search" placeholder="Search for help articles...">
      </div>
    </div>

    <div class="help-categories">
      ${helpCategory('Getting Started', 'Learn the basics of JazzyAdmin', 'fa-rocket')}
      ${helpCategory('Products & Orders', 'Manage your store inventory', 'fa-box')}
      ${helpCategory('Account & Billing', 'Profile, plans, and payments', 'fa-credit-card')}
      ${helpCategory('Analytics & Reports', 'Understanding your data', 'fa-chart-bar')}
      ${helpCategory('Integrations', 'Connect third-party services', 'fa-plug')}
      ${helpCategory('Troubleshooting', 'Fix common issues', 'fa-wrench')}
    </div>

    <div class="grid grid-2">
      <div class="card">
        <div class="card-header"><h3><i class="fas fa-book text-primary"></i> Popular Articles</h3></div>
        <div class="card-body">
          ${popularArticle('How to set up your first product')}
          ${popularArticle('Understanding dashboard analytics')}
          ${popularArticle('Managing customer orders efficiently')}
          ${popularArticle('Setting up email notifications')}
          ${popularArticle('Exporting reports and data')}
        </div>
      </div>
      <div class="card">
        <div class="card-header"><h3><i class="fas fa-envelope text-primary"></i> Contact Support</h3></div>
        <div class="card-body">
          <form id="support-form">
            <div class="form-group">
              <label class="form-label">Subject</label>
              <select class="form-control" id="support-subject">
                <option>General Inquiry</option>
                <option>Technical Issue</option>
                <option>Billing Question</option>
                <option>Feature Request</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Message</label>
              <textarea class="form-control" id="support-message" rows="4" placeholder="Describe your issue..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary"><i class="fas fa-paper-plane"></i> Send Message</button>
          </form>
          <div style="margin-top:1.5rem;padding-top:1.5rem;border-top:1px solid var(--border)">
            <div class="setting-row" style="padding:0.5rem 0">
              <div class="setting-info"><h4><i class="fas fa-envelope text-primary"></i> Email</h4><p>support@nexusadmin.com</p></div>
            </div>
            <div class="setting-row" style="padding:0.5rem 0">
              <div class="setting-info"><h4><i class="fas fa-phone text-primary"></i> Phone</h4><p>+1 (555) 123-4567</p></div>
            </div>
            <div class="setting-row" style="padding:0.5rem 0;border:none">
              <div class="setting-info"><h4><i class="fas fa-clock text-primary"></i> Hours</h4><p>Mon-Fri 9AM-6PM EST</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  requestAnimationFrame(() => bindHelpEvents());
  return html;
}

function helpCategory(title, desc, icon) {
  return `
    <div class="help-category-card">
      <div class="help-category-icon"><i class="fas ${icon}"></i></div>
      <h4>${title}</h4>
      <p>${desc}</p>
    </div>
  `;
}

function popularArticle(title) {
  return `
    <div style="display:flex;align-items:center;gap:0.75rem;padding:0.75rem 0;border-bottom:1px solid var(--border);cursor:pointer" class="help-article">
      <i class="fas fa-file-alt text-muted"></i>
      <span style="font-size:0.875rem">${title}</span>
      <i class="fas fa-chevron-right text-muted" style="margin-left:auto;font-size:0.75rem"></i>
    </div>
  `;
}

function bindHelpEvents() {
  document.querySelectorAll('.help-category-card').forEach(card => {
    card.addEventListener('click', () => {
      showToast(`Opening ${card.querySelector('h4')?.textContent} articles...`, 'info');
    });
  });

  document.querySelectorAll('.help-article').forEach(article => {
    article.addEventListener('click', () => {
      showToast(`Opening: ${article.querySelector('span')?.textContent}`, 'info');
    });
  });

  document.getElementById('support-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = document.getElementById('support-message')?.value;
    if (!msg?.trim()) { showToast('Please enter a message', 'error'); return; }
    showToast('Support ticket submitted! We\'ll respond within 24 hours.', 'success');
    e.target.reset();
  });

  document.getElementById('help-search')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') showToast(`Searching for "${e.target.value}"...`, 'info');
  });
}
