import { Brand } from '../components/Brand';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, ShieldCheck, Users, LayoutDashboard } from 'lucide-react';

export default function AdminPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Brand />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              <ShieldCheck className="h-3.5 w-3.5" /> Admin
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-ghost"
            >
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </button>
            <button
              onClick={() => { logout(); navigate('/login', { replace: true }); }}
              className="btn-ghost"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10 animate-fade-in">
        <h1 className="font-display text-3xl font-bold text-slate-900">Admin console</h1>
        <p className="mt-2 text-slate-500">
          Signed in as <span className="font-medium text-slate-700">{user?.email}</span>. Member management tools will appear here.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <Users className="h-5 w-5" />
            </div>
            <h2 className="mt-4 font-display text-lg font-bold text-slate-900">Members</h2>
            <p className="mt-1 text-sm text-slate-500">
              View, search and manage club members. Coming in the next step.
            </p>
          </div>
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white/50 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h2 className="mt-4 font-display text-lg font-bold text-slate-900">Roles & permissions</h2>
            <p className="mt-1 text-sm text-slate-500">
              Assign admin privileges and manage access. Coming soon.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
