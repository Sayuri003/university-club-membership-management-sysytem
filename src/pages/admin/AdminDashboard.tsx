import { DashboardShell } from '../../components/DashboardShell';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  ArrowRight,
  Users,
  ShieldCheck,
  Settings,
} from 'lucide-react';

const navItems = [
  { to: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/admin/clubs', label: 'Clubs', icon: Building2 },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const firstName = user?.email?.split('@')[0] ?? 'admin';

  const stats = [
    { label: 'Access', value: 'Administrator', icon: ShieldCheck, tone: 'emerald' },
    { label: 'Management', value: 'Clubs & Members', icon: Settings, tone: 'sky' },
    { label: 'Members', value: 'Coming soon', icon: Users, tone: 'amber' },
  ];

  return (
    <DashboardShell navItems={navItems} badge="Admin">
      <div className="mb-8">
        <p className="text-sm font-medium text-emerald-600">Admin console</p>
        <h1 className="mt-1 font-display text-3xl font-bold text-slate-900">
          Welcome, {firstName} 👋
        </h1>
        <p className="mt-2 text-slate-500">
          Manage clubs, members and platform settings from one place.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  {s.label}
                </p>
                <p className="text-lg font-bold text-slate-900">{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 shadow-sm lg:col-span-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
            <Building2 className="h-5 w-5" />
          </div>
          <h2 className="mt-4 font-display text-xl font-bold text-slate-900">
            Manage clubs
          </h2>
          <p className="mt-2 max-w-md text-sm text-slate-600">
            Create new clubs, update details, or remove clubs that are no longer active.
          </p>
          <Link
            to="/admin/clubs"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
          >
            Go to clubs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="font-display text-base font-bold text-slate-900">Quick links</h3>
          <div className="mt-4 space-y-2">
            <Link
              to="/admin/clubs"
              className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Manage clubs <ArrowRight className="h-4 w-4 text-emerald-600" />
            </Link>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
