import { api } from './api';

interface TokenResponse {
  access: string;
  refresh: string;
}

export async function login(username: string, password: string) {
  const { data } = await api.post<TokenResponse>('/api/auth/token/', {
    username,
    password,
  });

  localStorage.setItem('access_token', data.access);
  localStorage.setItem('refresh_token', data.refresh);

  return data;
}

export function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean(localStorage.getItem('access_token'));
}
