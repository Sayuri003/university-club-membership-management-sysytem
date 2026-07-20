import { Link } from 'react-router-dom';
import { Brand, FeaturePill } from '../components/Brand';
import { useAuth } from '../context/AuthContext';
import {
  ArrowRight,
  Users,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  CalendarDays,
  LayoutDashboard,
} from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Member management',
    desc: 'Register, track and organize club members in one secure place.',
  },
  {
    icon: ShieldCheck,
    title: 'Role-based access',
    desc: 'Separate admin and member experiences with JWT-secured routes.',
  },
  {
    icon: CalendarDays,
    title: 'Club activities',
    desc: 'Stay on top of events, meetings and announcements. (Coming soon)',
  },
  {
    icon: GraduationCap,
    title: 'Student verified',
    desc: 'Every member is tied to a student ID and department.',
  },
];

export default function GuestPage() {
  const { isAuthenticated, isAdmin } = useAuth();

  const primaryTo = isAuthenticated ? (isAdmin ? '/admin' : '/dashboard') : '/login';
  const primaryLabel = isAuthenticated ? 'Go to dashboard' : 'Get started';

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-emerald-300/30 blur-3xl animate-blob" />
        <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-teal-300/20 blur-3xl animate-blob [animation-delay:3s]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-amber-200/20 blur-3xl animate-blob [animation-delay:6s]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-slate-200/60 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Brand />
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link to="/login" className="btn-ghost">
              Sign in
            </Link>
            <Link to="/register" className="btn-ghost">
              Register
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center animate-fade-in">
          <div className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700">
              <Sparkles className="h-3.5 w-3.5" />
              University Club Membership System
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight text-slate-900 sm:text-6xl">
            Run your university club
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              like a pro.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-slate-500 sm:text-lg">
            Manage members, track roles, and keep your club organized — all in one
            secure, modern platform built for students.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to={primaryTo} className="btn-primary sm:w-auto">
              {primaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/login" className="btn-ghost sm:w-auto">
              <LayoutDashboard className="h-4 w-4" />
              Explore demo
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <FeaturePill icon={Users} label="Member management" />
            <FeaturePill icon={GraduationCap} label="Student verified" />
            <FeaturePill icon={ShieldCheck} label="Role-based access" />
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-slate-900">
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 p-10 text-center text-white sm:p-16">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Ready to join the club?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-emerald-100/80">
            Create your account in under a minute and start managing your membership today.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-emerald-700 shadow-lg transition hover:bg-emerald-50 sm:w-auto"
            >
              Create account
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/login"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
            >
              Sign in
            </Link>
          </div>
          <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200/60 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-slate-500 sm:flex-row">
          <Brand compact />
          <p>© {new Date().getFullYear()} UCMS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
