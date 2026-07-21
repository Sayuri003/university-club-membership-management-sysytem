import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Eye, EyeOff, User, CreditCard, Building2, Check } from 'lucide-react';
import { AuthLayout } from '../components/AuthLayout';
import { Input } from '../components/Input';
import { Spinner, ErrorBanner } from '../components/Feedback';
import { useAuth } from '../context/AuthContext';
import { ApiError } from '../api/client';

const DEPARTMENTS = [
  'Computer Science',
  'Engineering',
  'Business',
  'Science',
  'Arts & Humanities',
  'Medicine',
  'Law',
  'Other',
];

export default function RegisterPage() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    studentId: '',
    department: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const set = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const markTouched = (key: string) => setTouched((t) => ({ ...t, [key]: true }));

  const errors = {
    fullName: form.fullName.trim().length < 2 ? 'Enter your full name.' : undefined,
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? 'Enter a valid email address.' : undefined,
    password: form.password.length < 6 ? 'Password must be at least 6 characters.' : undefined,
    studentId: form.studentId.trim().length < 2 ? 'Enter your student ID.' : undefined,
    department: !form.department ? 'Select a department.' : undefined,
  };

  const visibleError = (key: keyof typeof errors) =>
    touched[key] && errors[key] ? errors[key] : undefined;

  const isValid = Object.values(errors).every((e) => !e);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched(Object.fromEntries(Object.keys(form).map((k) => [k, true])));
    setError(null);
    if (!isValid) return;

    try {
      await register(form);
      navigate('/user/dashboard', { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Unable to register. Please try again.');
    }
  }

  const passwordChecks = [
    { label: 'At least 6 characters', ok: form.password.length >= 6 },
    { label: 'Has a number', ok: /\d/.test(form.password) },
    { label: 'Has a letter', ok: /[a-zA-Z]/.test(form.password) },
  ];

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join your university club in just a minute."
      footer={
        <>
          Already a member?{' '}
          <Link
            to="/login"
            className="font-semibold text-[#14213D] underline decoration-[#B8863B] decoration-2 underline-offset-4 hover:text-[#B8863B]"
          >
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {error && <ErrorBanner>{error}</ErrorBanner>}

        <Input
          label="Full name"
          placeholder="Jane Doe"
          icon={<User className="h-4 w-4" />}
          value={form.fullName}
          onChange={(e) => set('fullName', e.target.value)}
          onBlur={() => markTouched('fullName')}
          error={visibleError('fullName')}
          required
        />

        <Input
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="you@university.edu"
          icon={<Mail className="h-4 w-4" />}
          value={form.email}
          onChange={(e) => set('email', e.target.value)}
          onBlur={() => markTouched('email')}
          error={visibleError('email')}
          required
        />

        <div className="space-y-1.5">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="••••••••"
            icon={<Lock className="h-4 w-4" />}
            value={form.password}
            onChange={(e) => set('password', e.target.value)}
            onBlur={() => markTouched('password')}
            error={visibleError('password')}
            required
          />
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#14213D]/50 hover:text-[#14213D]"
            >
              {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              {showPassword ? 'Hide' : 'Show'} password
            </button>
            <div className="flex gap-3">
              {passwordChecks.map((c) => (
                <span
                  key={c.label}
                  className={`inline-flex items-center gap-1 text-[11px] ${
                    c.ok ? 'text-[#5C7A6B]' : 'text-[#14213D]/30'
                  }`}
                >
                  <Check className="h-3 w-3" /> {c.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Input
            label="Student ID"
            placeholder="IT21012345"
            icon={<CreditCard className="h-4 w-4" />}
            value={form.studentId}
            onChange={(e) => set('studentId', e.target.value)}
            onBlur={() => markTouched('studentId')}
            error={visibleError('studentId')}
            required
          />

          <div className="space-y-1.5">
            <label
              htmlFor="department"
              style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}
              className="block text-[11px] font-medium uppercase tracking-[0.12em] text-[#14213D]/70"
            >
              Department
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-[#14213D]/40">
                <Building2 className="h-4 w-4" />
              </span>
              <select
                id="department"
                value={form.department}
                onChange={(e) => set('department', e.target.value)}
                onBlur={() => markTouched('department')}
                className={`w-full border-0 border-b-2 bg-transparent py-2.5 pl-6 text-[15px] text-[#14213D] focus:outline-none focus:ring-0 ${
                  visibleError('department') ? 'border-[#B3413A]' : 'border-[#14213D]/15 focus:border-[#B8863B]'
                }`}
                required
              >
                <option value="">Select...</option>
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            {visibleError('department') && (
              <p className="text-xs font-medium text-[#B3413A]">{visibleError('department')}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#14213D] py-3 text-sm font-semibold text-[#F7F3E8] transition hover:bg-[#B8863B] hover:text-[#14213D] disabled:opacity-60"
        >
          {loading ? <Spinner /> : <>Create account <ArrowRight className="h-4 w-4" /></>}
        </button>

        <p className="text-center text-xs text-[#14213D]/40">
          By creating an account you agree to the club's code of conduct.
        </p>
      </form>
    </AuthLayout>
  );
}