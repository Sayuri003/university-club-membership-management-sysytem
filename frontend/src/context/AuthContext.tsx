import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { authApi, type LoginRequest, type RegisterRequest, type Role } from '../api/auth';
import { PageLoader } from '../components/PageLoader';

// Minimal error shape so login/register pages can read .message.
class AuthError extends Error {
  constructor(message: string) {
    super(message);
  }
}
const ApiError = AuthError;

const ADMIN_EMAIL = 'admin@ucms.com';

interface AuthUser {
  email: string;
  role: Role;
  userId: string;
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

function deriveUserId(email: string): string {
  return email.toLowerCase();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);
  // NEW: tracks whether the initial rehydration-from-localStorage pass has finished.
  const [initializing, setInitializing] = useState(true);

  // Rehydrate user from stored token/email on mount.
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedEmail = localStorage.getItem(EMAIL_KEY);
    if (storedToken && storedEmail) {
      setToken(storedToken);
      setUser({ email: storedEmail, role: deriveRole(storedEmail), userId: deriveUserId(storedEmail) });
    }
    setInitializing(false); // NEW
  }, []);

  const persist = (t: string, email: string) => {
    localStorage.setItem(TOKEN_KEY, t);
    localStorage.setItem(EMAIL_KEY, email);
    setToken(t);
    setUser({ email, role: deriveRole(email), userId: deriveUserId(email) });
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

  // NEW: block rendering (and thus all routes) until rehydration is done,
  // so ProtectedRoute/AdminRoute never see a stale isAuthenticated=false.
  if (initializing) {
    return <PageLoader />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}

export { ApiError };