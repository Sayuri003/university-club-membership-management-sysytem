import { useAuth } from '../context/AuthContext';
import { Brand } from '../components/Brand';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, ShieldCheck, User as UserIcon, Mail, CreditCard, Building2, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  if (!user) return null;

  const stats = [
    { label: 'Membership', value: 'Active', tone: 'emerald' },
    { label: 'Role', value: isAdmin ? 'Administrator' : 'Member', tone: 'sky' },
    { label: 'Club', value: 'UCMS Club', tone: 'amber' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Brand />
          <button
            onClick={handleLogout}
            className="btn-ghost"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10 animate-fade-in">
        <div className="mb-8">
          <p className="text-sm font-medium text-emerald-600">Signed in as {user.email}</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-slate-900">
            Welcome back{user.email ? ', ' + user.email.split('@')[0] : ''} 👋
          </h1>
          <p className="mt-2 text-slate-500">
            This is your club membership dashboard. More features coming soon.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                {s.label}
              </p>
              <p className="mt-1 text-xl font-bold text-slate-900">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="font-display text-lg font-bold text-slate-900">Your profile</h2>
            <p className="mt-1 text-sm text-slate-500">Information from your account.</p>
            <dl className="mt-5 space-y-4">
              <Row icon={<Mail className="h-4 w-4" />} label="Email" value={user.email} />
              <Row
                icon={isAdmin ? <ShieldCheck className="h-4 w-4" /> : <UserIcon className="h-4 w-4" />}
                label="Role"
                value={isAdmin ? 'Administrator' : 'Member'}
              />
              <Row icon={<CreditCard className="h-4 w-4" />} label="Student ID" value="—" />
              <Row icon={<Building2 className="h-4 w-4" />} label="Department" value="—" />
            </dl>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 shadow-sm">
            <h2 className="font-display text-lg font-bold text-slate-900">Quick actions</h2>
            <p className="mt-1 text-sm text-slate-500">Jump to what you need.</p>
            <div className="mt-5 space-y-3">
              {isAdmin ? (
                <Link
                  to="/admin"
                  className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:shadow-md"
                >
                  Open admin console
                  <ArrowRight className="h-4 w-4 text-emerald-600" />
                </Link>
              ) : (
                <div className="rounded-xl bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
                  Member features are on the way.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0">
      <dt className="flex items-center gap-2.5 text-sm text-slate-500">
        <span className="text-slate-400">{icon}</span>
        {label}
      </dt>
      <dd className="text-sm font-medium text-slate-900">{value}</dd>
    </div>
  );
}
