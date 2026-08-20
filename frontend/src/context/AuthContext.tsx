import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authService } from '../services/authService';
import type { AuthUser, LoginDto } from '../types/auth.types';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (dto: LoginDto) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = () => {
      if (authService.isAuthenticated()) {
        setUser(authService.getUser());
      }
      setLoading(false);
    };
    init();
  }, []);

  const login = async (dto: LoginDto) => {
    const res = await authService.login(dto);
    setUser(res.user);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user || authService.isAuthenticated(), // ← important
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}