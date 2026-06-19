/**
 * FAQ Page
 */

import { faqItems } from '../data.js';
import { initFAQ } from '../ui.js';

export function renderFAQ() {
  const html = `
    <div class="page-header">
      <div class="page-header-info"><h1>Frequently Asked Questions</h1><p>Find answers to common questions</p></div>
    </div>

    <div class="card" style="margin-bottom:1.5rem;padding:2rem;text-align:center">
      <div class="search-input-wrapper" style="max-width:480px;margin:0 auto">
        <i class="fas fa-search"></i>
        <input type="search" id="faq-search" placeholder="Search FAQ...">
      </div>
    </div>

    <div id="faq-list">
      ${faqItems.map((item, i) => `
        <div class="faq-item" data-faq="${i}">
          <div class="faq-question">
            <span>${item.q}</span>
            <i class="fas fa-chevron-down"></i>
          </div>
          <div class="faq-answer"><p>${item.a}</p></div>
        </div>
      `).join('')}
    </div>

    <div class="card" style="margin-top:2rem;text-align:center;padding:2.5rem">
      <i class="fas fa-headset" style="font-size:2.5rem;color:var(--primary);margin-bottom:1rem"></i>
      <h3>Still have questions?</h3>
      <p class="text-muted" style="margin:0.5rem 0 1.25rem">Our support team is here to help you 24/7</p>
      <a href="#help" class="btn btn-primary" id="go-help"><i class="fas fa-life-ring"></i> Contact Support</a>
    </div>
  `;

  requestAnimationFrame(() => {
    initFAQ();
    document.getElementById('faq-search')?.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll('.faq-item').forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });
    document.getElementById('go-help')?.addEventListener('click', (e) => {
      e.preventDefault();
      import('../router.js').then(({ navigateTo }) => navigateTo('help'));
    });
  });

  return html;
}
