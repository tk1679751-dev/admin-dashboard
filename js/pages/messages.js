/**
 * Messages Page
 */

import { conversations } from '../data.js';
import { showToast } from '../ui.js';

let activeConversation = conversations[0];

export function renderMessage() {
  const html = `
    <div class="page-header">
      <div class="page-header-info"><h1>Messages</h1><p>Communicate with customers and team</p></div>
    </div>

    <div class="messages-layout">
      <div class="messages-sidebar">
        <div class="messages-sidebar-header">
          <div class="search-input-wrapper" style="max-width:100%">
            <i class="fas fa-search"></i>
            <input type="search" id="conversation-search" placeholder="Search conversations...">
          </div>
        </div>
        <div class="conversation-list" id="conversation-list">
          ${conversations.map(c => `
            <div class="conversation-item ${c.id === activeConversation.id ? 'active' : ''} ${c.unread ? 'unread' : ''}" data-conv-id="${c.id}">
              <div class="conversation-avatar">
                ${c.avatar}
                ${c.unread ? '<span class="conversation-unread-dot"></span>' : ''}
              </div>
              <div class="conversation-info">
                <div class="conversation-name">${c.name}</div>
                <div class="conversation-preview">${c.preview}</div>
              </div>
              <div class="conversation-meta">
                <div class="conversation-time">${c.time}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="messages-main">
        <div class="messages-header">
          <div class="conversation-avatar" style="width:36px;height:36px;font-size:0.8125rem">${activeConversation.avatar}</div>
          <div><div style="font-weight:600">${activeConversation.name}</div><div class="text-muted" style="font-size:0.75rem">Online</div></div>
        </div>
        <div class="messages-body" id="messages-body">
          ${renderMessage(activeConversation)}
        </div>
        <div class="messages-compose">
          <textarea id="message-input" placeholder="Type your message..." rows="1"></textarea>
          <button class="btn btn-primary" id="send-message"><i class="fas fa-paper-plane"></i></button>
        </div>
      </div>
    </div>
  `;

  requestAnimationFrame(() => bindMessageEvents());
  return html;
}

function renderMessages(conv) {
  return conv.messages.map(m => `
    <div class="message-bubble ${m.sent ? 'sent' : 'received'}">
      ${m.text}
      <div class="message-time">${m.time}</div>
    </div>
  `).join('');
}

function bindMessageEvents() {
  document.querySelectorAll('.conversation-item').forEach(item => {
    item.addEventListener('click', () => {
      const conv = conversations.find(c => c.id === parseInt(item.dataset.convId));
      if (!conv) return;
      activeConversation = conv;
      conv.unread = false;
      item.classList.remove('unread');
      item.querySelector('.conversation-unread-dot')?.remove();
      document.querySelectorAll('.conversation-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const header = document.querySelector('.messages-header');
      if (header) {
        header.innerHTML = `
          <div class="conversation-avatar" style="width:36px;height:36px;font-size:0.8125rem">${conv.avatar}</div>
          <div><div style="font-weight:600">${conv.name}</div><div class="text-muted" style="font-size:0.75rem">Online</div></div>
        `;
      }

      const body = document.getElementById('messages-body');
      if (body) {
        body.innerHTML = renderMessages(conv);
        body.scrollTop = body.scrollHeight;
      }
    });
  });

  document.getElementById('send-message')?.addEventListener('click', sendMessage);
  document.getElementById('message-input')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });

  document.getElementById('conversation-search')?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('.conversation-item').forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });

  const body = document.getElementById('messages-body');
  if (body) body.scrollTop = body.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById('message-input');
  if (!input?.value.trim()) return;

  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  activeConversation.messages.push({ text: input.value, sent: true, time });

  const body = document.getElementById('messages-body');
  body?.insertAdjacentHTML('beforeend', `
    <div class="message-bubble sent">${input.value}<div class="message-time">${time}</div></div>
  `);
  body.scrollTop = body.scrollHeight;
  input.value = '';
  showToast('Message sent', 'success');
}
