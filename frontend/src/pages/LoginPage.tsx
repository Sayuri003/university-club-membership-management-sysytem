import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { AuthLayout } from '../components/AuthLayout';
import { Input } from '../components/Input';
import { Spinner, ErrorBanner } from '../components/Feedback';
import { useAuth } from '../context/AuthContext';
import { ApiError } from '../api/client';

function homeForRole(isAdmin: boolean) {
  return isAdmin ? '/admin/dashboard' : '/user/dashboard';
}

interface LocationState {
  from?: string;
}

export default function LoginPage() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LocationState)?.from;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const emailError = touched && !validEmail ? 'Enter a valid email address.' : undefined;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    setError(null);
    if (!validEmail || !password) return;

    try {
      await login({ email, password });
      const isAdmin = email.toLowerCase() === 'admin@ucms.com';
      navigate(from && from !== '/dashboard' ? from : homeForRole(isAdmin), { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Unable to sign in. Please try again.');
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to manage your club membership."
      footer={
        <>
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-semibold text-[#14213D] underline decoration-[#B8863B] decoration-2 underline-offset-4 hover:text-[#B8863B]"
          >
            Create one
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {error && <ErrorBanner>{error}</ErrorBanner>}

        <Input
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="you@university.edu"
          icon={<Mail className="h-4 w-4" />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          required
        />

        <div className="space-y-1.5">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="••••••••"
            icon={<Lock className="h-4 w-4" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#14213D]/50 hover:text-[#14213D]"
            >
              {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              {showPassword ? 'Hide' : 'Show'} password
            </button>
            <span className="text-xs text-[#14213D]/40">Forgot password?</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#14213D] py-3 text-sm font-semibold text-[#F7F3E8] transition hover:bg-[#B8863B] hover:text-[#14213D] disabled:opacity-60"
        >
          {loading ? <Spinner /> : <>Sign in <ArrowRight className="h-4 w-4" /></>}
        </button>

        <div className="rounded-sm border border-[#B8863B]/30 bg-[#B8863B]/[0.08] px-4 py-3 text-xs text-[#14213D]/80">
          <p
            style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}
            className="font-semibold uppercase tracking-wider text-[#B8863B]"
          >
            Demo admin credentials
          </p>
          <p style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }} className="mt-1 text-[#14213D]/70">
            admin@ucms.com · Admin@123
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}