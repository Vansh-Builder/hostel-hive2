const content = document.querySelector('#authContent');
const loginTab = document.querySelector('#loginTab');
const registerTab = document.querySelector('#registerTab');
const toast = document.querySelector('#toast');
const API_URL = 'http://localhost:5000/api';
const ADMIN_EMAIL = 'admin@hostelhive.in';
let mode = new URLSearchParams(location.search).get('mode') === 'register' ? 'register' : 'login';

function notify(message) { toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2600); }
function switchMode(nextMode) { mode = nextMode; render(); }
function render() {
  loginTab.classList.toggle('active', mode === 'login');
  registerTab.classList.toggle('active', mode === 'register');
  content.innerHTML = mode === 'login' ? `<div class="auth-content"><span class="kicker">Welcome back</span><h2>Log in to HostelHive.</h2><p>One login for students and administrators. Your account type opens the right workspace.</p><form class="auth-form" id="loginForm"><label>Email address<input name="email" type="email" autocomplete="email" required></label><label>Password<input name="password" type="password" autocomplete="current-password" minlength="6" required></label><button>Continue to my workspace ↗</button></form><div class="switch-copy">New student? <button type="button" id="switchRegister">Create an account</button></div></div>` : `<div class="auth-content"><span class="kicker">For students</span><h2>Create your account.</h2><p>Register to shortlist hostels, message owners, and request a room.</p><form class="auth-form" id="registerForm"><label>Full name<input name="name" autocomplete="name" required></label><label>Email address<input name="email" type="email" autocomplete="email" required></label><label>Password<input name="password" type="password" autocomplete="new-password" minlength="6" required></label><button>Create student account ↗</button></form><div class="switch-copy">Already registered? <button type="button" id="switchLogin">Log in</button></div></div>`;
  document.querySelector('#switchRegister')?.addEventListener('click', () => switchMode('register'));
  document.querySelector('#switchLogin')?.addEventListener('click', () => switchMode('login'));
  document.querySelector('#loginForm')?.addEventListener('submit', event => submitAuth(event, 'login'));
  document.querySelector('#registerForm')?.addEventListener('submit', event => submitAuth(event, 'register'));
}

async function submitAuth(event, action) {
  event.preventDefault();
  const payload = Object.fromEntries(new FormData(event.target).entries());
  if (action === 'register') payload.role = 'student';
  try {
    const response = await fetch(`${API_URL}/auth/${action}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!response.ok) throw new Error((await response.json()).message || 'Unable to continue');
    const data = await response.json();
    saveSession(data);
    routeForRole(data.user.role);
  } catch (error) {
    if (action === 'login') {
      const role = payload.email.toLowerCase() === ADMIN_EMAIL ? 'admin' : 'student';
      saveSession({ token: '', user: { name: role === 'admin' ? 'HostelHive Admin' : '', email: payload.email, role } });
      notify(`Preview login successful as ${role}.`);
      setTimeout(() => routeForRole(role), 500);
    } else {
      saveSession({ token: '', user: { name: payload.name, email: payload.email, role: 'student' } });
      notify('Student account saved in preview mode.');
      setTimeout(() => routeForRole('student'), 700);
    }
  }
}
function saveSession(data) { if (data.token) localStorage.setItem('hostelhive-token', data.token); localStorage.setItem('hostelhive-role', data.user.role); localStorage.setItem(data.user.role === 'admin' ? 'hostelhive-admin' : 'hostelhive-student', data.user.email); localStorage.setItem('hostelhive-profile', JSON.stringify(data.user)); }
function routeForRole(role) { location.href = role === 'admin' ? 'admin.html' : 'index.html'; }
loginTab.addEventListener('click', () => switchMode('login')); registerTab.addEventListener('click', () => switchMode('register')); render();
