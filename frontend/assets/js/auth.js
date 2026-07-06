// ===== AUTH JS =====
const API_BASE = 'http://localhost:5000/api';

// Check if logged in
function checkAuth() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return { token, user };
}

// Logout
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Update Nav for Auth
function updateAuthNav() {
    const { user } = checkAuth();
    const navLinks = document.getElementById('navLinks');
    if (!navLinks || !user.name) return;

    const loginLink = navLinks.querySelector('.btn-login');
    if (loginLink) {
        loginLink.outerHTML = `
            <div style="display:flex;align-items:center;gap:10px;">
                <a href="dashboard/${user.role}.html" style="font-size:13px;font-weight:600;color:var(--primary);">
                    <i class="fas fa-user-circle"></i> ${user.name}
                </a>
                <a href="#" onclick="logout();return false;" style="font-size:13px;color:var(--danger);">
                    <i class="fas fa-sign-out-alt"></i>
                </a>
            </div>
        `;
    }
}

// Register
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(registerForm));
            if (data.password !== data.confirmPassword) {
                showToast('Passwords do not match!', 'error');
                return;
            }
            // Simulate API call
            localStorage.setItem('token', 'demo-token-' + Date.now());
            localStorage.setItem('user', JSON.stringify({
                id: 'u' + Date.now(),
                name: data.fullName,
                email: data.email,
                role: data.role || 'client'
            }));
            showToast('Registration successful! Redirecting...');
            setTimeout(() => window.location.href = 'dashboard/' + (data.role || 'client') + '.html', 1500);
        });
    }

    // Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(loginForm));
            // Simulate login
            const role = data.email.includes('admin') ? 'admin' : data.email.includes('tech') ? 'technician' : 'client';
            localStorage.setItem('token', 'demo-token-' + Date.now());
            localStorage.setItem('user', JSON.stringify({
                id: 'u' + Date.now(),
                name: data.email.split('@')[0],
                email: data.email,
                role: role
            }));
            showToast('Login successful! Redirecting...');
            setTimeout(() => window.location.href = 'dashboard/' + role + '.html', 1500);
        });
    }

    updateAuthNav();
});
