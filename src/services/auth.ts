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
