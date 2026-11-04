import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { getCurrentUser, login as loginService } from '../services/auth';
import type { LoginCredentials, User } from '../types';
import { traduzirErro } from '../utils/erros';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('accessToken'));
  const [isLoading, setIsLoading] = useState(true);

  function logout() {
    localStorage.removeItem('accessToken');
    setToken(null);
    setUser(null);
  }

  useEffect(() => {
    function handleUnauthorized() {
      logout();
    }

    window.addEventListener('auth:logout', handleUnauthorized);

    async function restoreSession() {
      const savedToken = localStorage.getItem('accessToken');

      if (!savedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        setToken(savedToken);
      } catch {
        localStorage.removeItem('accessToken');
        setUser(null);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    }

    void restoreSession();

    return () => {
      window.removeEventListener('auth:logout', handleUnauthorized);
    };
  }, []);

  async function login(credentials: LoginCredentials): Promise<void> {
    const response = await loginService(credentials);
    localStorage.setItem('accessToken', response.accessToken);
    setToken(response.accessToken);
    setUser(response);
  }

  const value = useMemo(
    () => ({ user, token, isLoading, login, logout }),
    [user, token, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  }

  return context;
}

export { traduzirErro };
