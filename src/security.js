const API_BASE = import.meta.env?.VITE_API_URL || 'http://localhost:3001/api';
const AUTH_TOKEN_KEY = 'mg_admin_token_v1';

export async function loginAdmin(password) {
  try {
    const response = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    const data = await response.json();
    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export function logoutAdmin() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function getAdminToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function isAdminAuthed() {
  const token = getAdminToken();
  if (!token) return false;

  try {
    // Basic check - in production you'd verify the token
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Date.now() / 1000;
    return payload.exp > now;
  } catch {
    return false;
  }
}

