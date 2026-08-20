import api from './api';
import type { LoginDto, LoginResponse, AuthUser } from '../types/auth.types';

const TOKEN_KEY = 'book_library_token';
const USER_KEY = 'book_library_user';

export const authService = {
  login: async (dto: LoginDto): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>('/auth/login', dto);
    
    // Save first
    localStorage.setItem(TOKEN_KEY, data.access_token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    
    return data;
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getToken: (): string | null => localStorage.getItem(TOKEN_KEY),

  getUser: (): AuthUser | null => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  me: async () => {
    const { data } = await api.get('/auth/me');
    return data;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(TOKEN_KEY);
  },
};