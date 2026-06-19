/**
 * Authentication logic for login.html
 */

import { setTheme, initTheme } from './theme.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();

  if (localStorage.getItem('dashboard-user')) {
    window.location.href = 'index.html';
    return;
  }

  initAuthTabs();
  initLoginForm();
  initRegisterForm();
  initForgotForm();
  initPasswordToggles();
});

function initAuthTabs() {
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`${target}-form`)?.classList.add('active');
    });
  });

  document.querySelectorAll('[data-switch-tab]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(`.auth-tab[data-tab="${link.dataset.switchTab}"]`)?.click();
    });
  });
}

function initLoginForm() {
  document.getElementById('login-form-el')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email');
    const password = document.getElementById('login-password');
    let valid = true;

    if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showFieldError(email, 'Please enter a valid email');
      valid = false;
    } else clearFieldError(email);

    if (!password.value || password.value.length < 4) {
      showFieldError(password, 'Password is required');
      valid = false;
    } else clearFieldError(password);

    if (!valid) return;

    const remember = document.getElementById('remember-me')?.checked;
    const user = {
      name: email.value.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      email: email.value,
      avatar: email.value.substring(0, 2).toUpperCase(),
      role: 'Administrator',
    };

    localStorage.setItem('dashboard-user', JSON.stringify(user));
    if (remember) localStorage.setItem('dashboard-remember', 'true');

    window.location.href = 'index.html';
  });
}

function initRegisterForm() {
  document.getElementById('register-form-el')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('register-name');
    const email = document.getElementById('register-email');
    const password = document.getElementById('register-password');
    const confirm = document.getElementById('register-confirm');
    let valid = true;

    if (!name.value || name.value.length < 2) { showFieldError(name, 'Name is required'); valid = false; } else clearFieldError(name);
    if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { showFieldError(email, 'Valid email required'); valid = false; } else clearFieldError(email);
    if (!password.value || password.value.length < 6) { showFieldError(password, 'Password must be 6+ characters'); valid = false; } else clearFieldError(password);
    if (password.value !== confirm.value) { showFieldError(confirm, 'Passwords do not match'); valid = false; } else clearFieldError(confirm);

    if (!valid) return;

    const user = { name: name.value, email: email.value, avatar: name.value.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2), role: 'Administrator' };
    localStorage.setItem('dashboard-user', JSON.stringify(user));
    window.location.href = 'index.html';
  });

  document.getElementById('register-password')?.addEventListener('input', (e) => {
    const bar = document.getElementById('register-pw-strength');
    if (!bar) return;
    const len = e.target.value.length;
    bar.className = 'password-strength-bar ' + (len >= 12 ? 'strong' : len >= 6 ? 'medium' : len > 0 ? 'weak' : '');
  });
}

function initForgotForm() {
  document.getElementById('forgot-form-el')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('forgot-email');
    if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showFieldError(email, 'Please enter a valid email');
      return;
    }
    clearFieldError(email);
    document.getElementById('forgot-form')?.classList.remove('active');
    document.getElementById('forgot-success')?.classList.add('active');
  });
}

function initPasswordToggles() {
  document.querySelectorAll('.password-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const input = toggle.parentElement.querySelector('input');
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      toggle.querySelector('i').className = isPassword ? 'fas fa-eye-slash' : 'fas fa-eye';
    });
  });
}

function showFieldError(input, message) {
  input.classList.add('error');
  const error = input.closest('.form-group')?.querySelector('.form-error');
  if (error) { error.textContent = message; error.classList.add('visible'); }
}

function clearFieldError(input) {
  input.classList.remove('error');
  input.closest('.form-group')?.querySelector('.form-error')?.classList.remove('visible');
}
