/**
 * Settings Page
 */

import { setTheme } from '../theme.js';
import { showToast } from '../ui.js';
import { validateEmail, validateForm } from '../utils.js';

export function renderSettings() {
  const user = JSON.parse(localStorage.getItem('dashboard-user') || '{}');
  const theme = localStorage.getItem('dashboard-theme') || 'light';

  const html = `
    <div class="page-header">
      <div class="page-header-info"><h1>Settings</h1><p>Manage your account and preferences</p></div>
    </div>

    <div class="settings-layout">
      <nav class="settings-nav" id="settings-nav">
        <button class="settings-nav-item active" data-section="profile"><i class="fas fa-user"></i> Profile</button>
        <button class="settings-nav-item" data-section="security"><i class="fas fa-lock"></i> Security</button>
        <button class="settings-nav-item" data-section="email"><i class="fas fa-envelope"></i> Email</button>
        <button class="settings-nav-item" data-section="notifications"><i class="fas fa-bell"></i> Notifications</button>
        <button class="settings-nav-item" data-section="appearance"><i class="fas fa-palette"></i> Appearance</button>
        <button class="settings-nav-item" data-section="language"><i class="fas fa-globe"></i> Language</button>
      </nav>

      <div class="settings-panel">
        <div class="settings-section active" id="section-profile">
          <h3>Profile Settings</h3>
          <p>Update your personal information</p>
          <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem">
            <div class="profile-avatar-lg">${user.avatar || 'AD'}</div>
            <div><button class="btn btn-outline btn-sm"><i class="fas fa-camera"></i> Change Photo</button></div>
          </div>
          <div class="form-row">
            <div class="form-group"><label class="form-label">First Name</label><input class="form-control" id="first-name" value="${user.name?.split(' ')[0] || 'Admin'}"></div>
            <div class="form-group"><label class="form-label">Last Name</label><input class="form-control" id="last-name" value="${user.name?.split(' ')[1] || 'User'}"></div>
          </div>
          <div class="form-group"><label class="form-label">Email</label><input class="form-control" id="profile-email" type="email" value="${user.email || 'admin@nexus.com'}"></div>
          <div class="form-group"><label class="form-label">Phone</label><input class="form-control" value="+1 555-0199"></div>
          <div class="form-group"><label class="form-label">Bio</label><textarea class="form-control" rows="3">Administrator at NexusAdmin dashboard platform.</textarea></div>
          <button class="btn btn-primary" id="save-profile"><i class="fas fa-save"></i> Save Profile</button>
        </div>

        <div class="settings-section" id="section-security">
          <h3>Change Password</h3>
          <p>Ensure your account stays secure</p>
          <div class="form-group"><label class="form-label">Current Password</label><input class="form-control" type="password" id="current-password"></div>
          <div class="form-group"><label class="form-label">New Password</label><input class="form-control" type="password" id="new-password">
            <div class="password-strength"><div class="password-strength-bar" id="pw-strength"></div></div>
          </div>
          <div class="form-group"><label class="form-label">Confirm Password</label><input class="form-control" type="password" id="confirm-password"></div>
          <button class="btn btn-primary" id="change-password"><i class="fas fa-key"></i> Update Password</button>
        </div>

        <div class="settings-section" id="section-email">
          <h3>Email Preferences</h3>
          <p>Manage your email notification preferences</p>
          ${emailSetting('Order Updates', 'Receive emails when orders are placed or updated', true)}
          ${emailSetting('Marketing Emails', 'Promotional offers and product updates', false)}
          ${emailSetting('Weekly Digest', 'Summary of your store performance', true)}
          ${emailSetting('Security Alerts', 'Login attempts and security notifications', true)}
        </div>

        <div class="settings-section" id="section-notifications">
          <h3>Notification Settings</h3>
          <p>Choose what notifications you receive</p>
          ${toggleSetting('New Orders', 'Get notified when a new order is placed', true)}
          ${toggleSetting('Low Stock Alerts', 'Alert when products are running low', true)}
          ${toggleSetting('Customer Messages', 'Notify on new customer messages', true)}
          ${toggleSetting('System Updates', 'Platform updates and maintenance notices', false)}
          ${toggleSetting('Sound Notifications', 'Play sound for new notifications', false)}
        </div>

        <div class="settings-section" id="section-appearance">
          <h3>Appearance Settings</h3>
          <p>Customize the look and feel of your dashboard</p>
          ${toggleSetting('Dark Mode', 'Switch between light and dark themes', theme === 'dark', 'dark-mode-toggle')}
          <div class="setting-row">
            <div class="setting-info"><h4>Compact Sidebar</h4><p>Start with collapsed sidebar</p></div>
            <label class="toggle"><input type="checkbox" id="compact-sidebar"><span class="toggle-slider"></span></label>
          </div>
          <div class="setting-row">
            <div class="setting-info"><h4>Animations</h4><p>Enable smooth transitions and animations</p></div>
            <label class="toggle"><input type="checkbox" checked><span class="toggle-slider"></span></label>
          </div>
        </div>

        <div class="settings-section" id="section-language">
          <h3>Language Selection</h3>
          <p>Choose your preferred language</p>
          <div class="form-group">
            <label class="form-label">Language</label>
            <select class="form-control" id="language-select">
              <option value="en" selected>English (US)</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="ja">日本語</option>
              <option value="zh">中文</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Timezone</label>
            <select class="form-control">
              <option selected>UTC-05:00 Eastern Time</option>
              <option>UTC-08:00 Pacific Time</option>
              <option>UTC+00:00 GMT</option>
              <option>UTC+01:00 Central European</option>
            </select>
          </div>
          <button class="btn btn-primary" id="save-language"><i class="fas fa-save"></i> Save Preferences</button>
        </div>
      </div>
    </div>
  `;

  requestAnimationFrame(() => bindSettingsEvents());
  return html;
}

function emailSetting(title, desc, checked) {
  return `<div class="setting-row"><div class="setting-info"><h4>${title}</h4><p>${desc}</p></div>
    <label class="toggle"><input type="checkbox" ${checked ? 'checked' : ''}><span class="toggle-slider"></span></label></div>`;
}

function toggleSetting(title, desc, checked, id = '') {
  return `<div class="setting-row"><div class="setting-info"><h4>${title}</h4><p>${desc}</p></div>
    <label class="toggle"><input type="checkbox" ${id ? `id="${id}"` : ''} ${checked ? 'checked' : ''}><span class="toggle-slider"></span></label></div>`;
}

function bindSettingsEvents() {
  document.querySelectorAll('.settings-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.settings-nav-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      document.querySelectorAll('.settings-section').forEach(s => s.classList.remove('active'));
      document.getElementById(`section-${item.dataset.section}`)?.classList.add('active');
    });
  });

  document.getElementById('save-profile')?.addEventListener('click', () => {
    const user = JSON.parse(localStorage.getItem('dashboard-user') || '{}');
    user.name = `${document.getElementById('first-name')?.value} ${document.getElementById('last-name')?.value}`;
    user.email = document.getElementById('profile-email')?.value;
    localStorage.setItem('dashboard-user', JSON.stringify(user));
    showToast('Profile updated successfully', 'success');
  });

  document.getElementById('new-password')?.addEventListener('input', (e) => {
    const bar = document.getElementById('pw-strength');
    if (!bar) return;
    const len = e.target.value.length;
    bar.className = 'password-strength-bar ' + (len >= 12 ? 'strong' : len >= 6 ? 'medium' : len > 0 ? 'weak' : '');
  });

  document.getElementById('change-password')?.addEventListener('click', () => {
    const current = document.getElementById('current-password');
    const newPw = document.getElementById('new-password');
    const confirm = document.getElementById('confirm-password');
    if (!current?.value || !newPw?.value) { showToast('Please fill in all password fields', 'error'); return; }
    if (newPw.value !== confirm?.value) { showToast('Passwords do not match', 'error'); return; }
    if (newPw.value.length < 6) { showToast('Password must be at least 6 characters', 'error'); return; }
    showToast('Password updated successfully', 'success');
  });

  document.getElementById('dark-mode-toggle')?.addEventListener('change', (e) => {
    setTheme(e.target.checked ? 'dark' : 'light');
    showToast(`Switched to ${e.target.checked ? 'dark' : 'light'} mode`, 'success');
  });

  document.getElementById('save-language')?.addEventListener('click', () => {
    showToast('Language preferences saved', 'success');
  });
}
