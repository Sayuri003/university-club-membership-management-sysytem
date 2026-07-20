import { Link } from 'react-router-dom';
import { ShieldCheck, Users, GraduationCap, Sparkles } from 'lucide-react';

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <div className="relative">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-600/30 transition-transform group-hover:scale-105">
          <ShieldCheck className="h-5 w-5 text-white" strokeWidth={2.5} />
        </div>
        <span className="absolute -right-1 -top-1 flex h-3 w-3 rounded-full bg-amber-400 ring-2 ring-white" />
      </div>
      {!compact && (
        <div className="leading-tight">
          <p className="font-display text-lg font-bold text-slate-900">UCMS</p>
          <p className="text-[11px] font-medium uppercase tracking-wider text-emerald-600">
            Club Membership
          </p>
        </div>
      )}
    </Link>
  );
}

export function FeaturePill({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 text-xs font-medium text-slate-600 backdrop-blur">
      <Icon className="h-3.5 w-3.5 text-emerald-600" />
      {label}
    </div>
  );
}

export { Users, GraduationCap, Sparkles };
