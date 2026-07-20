import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { authApi, type LoginRequest, type RegisterRequest, type Role } from '../api/auth';
import { ApiError } from '../api/client';

// The backend's JwtResponse currently returns only token + email (no role claim).
// The seeded admin account is admin@ucms.com — we treat that email as ADMIN until
// the backend exposes a /me endpoint or a role claim in the JWT.
const ADMIN_EMAIL = 'admin@ucms.com';

interface AuthUser {
  email: string;
  role: Role;
}

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = 'ucms_token';
const EMAIL_KEY = 'ucms_email';

function deriveRole(email: string): Role {
  return email.toLowerCase() === ADMIN_EMAIL ? 'ADMIN' : 'USER';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);

  // Rehydrate user from stored token/email on mount.
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedEmail = localStorage.getItem(EMAIL_KEY);
    if (storedToken && storedEmail) {
      setToken(storedToken);
      setUser({ email: storedEmail, role: deriveRole(storedEmail) });
    }
  }, []);

  const persist = (t: string, email: string) => {
    localStorage.setItem(TOKEN_KEY, t);
    localStorage.setItem(EMAIL_KEY, email);
    setToken(t);
    setUser({ email, role: deriveRole(email) });
  };

  const login = useCallback(async (data: LoginRequest) => {
    setLoading(true);
    try {
      const res = await authApi.login(data);
      persist(res.token, res.email);
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterRequest) => {
    setLoading(true);
    try {
      const res = await authApi.register(data);
      persist(res.token, res.email);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EMAIL_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      loading,
      login,
      register,
      logout,
      isAuthenticated: !!token && !!user,
      isAdmin: user?.role === 'ADMIN',
    }),
    [user, token, loading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}

export { ApiError };
