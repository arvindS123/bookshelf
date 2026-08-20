import api from './api';

export const adminService = {
  login: async (username: string, password: string) => {
    const { data } = await api.post('/auth/login', { username, password });
    return data;
  },
  me: async () => {
    const { data } = await api.get('/auth/me');
    return data;
  },
};
