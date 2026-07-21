import { Link } from 'react-router-dom';
import { Brand, FeaturePill } from '../components/Brand';
import { useAuth } from '../context/AuthContext';
import {
  ArrowRight,
  Users,
  GraduationCap,
  ShieldCheck,
  CalendarDays,
  LayoutDashboard,
} from 'lucide-react';

const features = [
  { icon: Users, title: 'Member management', desc: 'Register, track and organize club members in one secure place.' },
  { icon: ShieldCheck, title: 'Role-based access', desc: 'Separate admin and member experiences with JWT-secured routes.' },
  { icon: CalendarDays, title: 'Club activities', desc: 'Stay on top of events, meetings and announcements. (Coming soon)' },
  { icon: GraduationCap, title: 'Student verified', desc: 'Every member is tied to a student ID and department.' },
];

const serif = { fontFamily: "'Newsreader', Georgia, serif" };
const mono = { fontFamily: "'IBM Plex Mono', ui-monospace, monospace" };

export default function GuestPage() {
  const { isAuthenticated, isAdmin } = useAuth();

  const primaryTo = isAuthenticated ? (isAdmin ? '/admin' : '/dashboard') : '/login';
  const primaryLabel = isAuthenticated ? 'Go to dashboard' : 'Get started';

  return (
    <div className="min-h-screen bg-[#F7F3E8]">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-[#14213D]/10 bg-[#F7F3E8]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Brand />
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/login"
              className="rounded-sm px-4 py-2 text-sm font-medium text-[#14213D] transition hover:bg-[#14213D]/5"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="rounded-sm border border-[#14213D]/20 px-4 py-2 text-sm font-medium text-[#14213D] transition hover:border-[#14213D]"
            >
              Register
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle,#14213D_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="relative mx-auto max-w-2xl border-y-2 border-[#B8863B] py-12 text-center">
          <p style={mono} className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#B8863B]">
            University Club Membership System
          </p>
          <h1 style={serif} className="text-4xl font-medium leading-[1.1] text-[#14213D] sm:text-6xl">
            Run your university club
            <br />
            <span className="italic text-[#B8863B]">like a registrar.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-[#14213D]/60 sm:text-lg">
            Manage members, track roles, and keep your club organized — all in one
            secure, modern platform built for students.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to={primaryTo}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#14213D] px-6 py-3 text-sm font-semibold text-[#F7F3E8] transition hover:bg-[#B8863B] hover:text-[#14213D] sm:w-auto"
            >
              {primaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-[#14213D]/20 px-6 py-3 text-sm font-semibold text-[#14213D] transition hover:border-[#14213D] sm:w-auto"
            >
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
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-sm border border-[#14213D]/12 bg-white/60 p-6 transition hover:-translate-y-1 hover:border-[#B8863B]/50 hover:shadow-lg hover:shadow-[#14213D]/5"
            >
              <div
                className="absolute right-0 top-0 h-6 w-6 bg-[#F7F3E8] transition group-hover:bg-[#B8863B]/20"
                style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
              />
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#14213D]/5 text-[#14213D] transition group-hover:bg-[#14213D] group-hover:text-[#F7F3E8]">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 style={serif} className="mt-4 text-lg font-medium text-[#14213D]">
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm text-[#14213D]/60">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-md bg-[#14213D] p-10 text-center text-[#F7F3E8] sm:p-16">
          <div className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:radial-gradient(circle,rgba(247,243,232,0.5)_1px,transparent_1px)] [background-size:22px_22px]" />
          <h2 style={serif} className="relative text-3xl font-medium sm:text-4xl">
            Ready to join the club?
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-[#F7F3E8]/70">
            Create your account in under a minute and start managing your membership today.
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#B8863B] px-6 py-3 text-sm font-semibold text-[#14213D] transition hover:bg-[#F7F3E8] sm:w-auto"
            >
              Create account
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/login"
              className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-[#F7F3E8]/30 px-6 py-3 text-sm font-semibold text-[#F7F3E8] transition hover:bg-white/10 sm:w-auto"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#14213D]/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-[#14213D]/50 sm:flex-row">
          <Brand compact />
          <p style={mono} className="text-xs">
            © {new Date().getFullYear()} UCMS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}