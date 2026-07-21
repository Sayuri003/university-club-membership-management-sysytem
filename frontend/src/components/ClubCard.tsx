import { Building2, Mail, User, Pencil, Trash2, Plus, Search, Loader2, AlertCircle } from 'lucide-react';
import type { Club } from '../api/clubs';

interface ClubCardProps {
  club: Club;
  onEdit?: (club: Club) => void;
  onDelete?: (club: Club) => void;
}

export function ClubCard({ club, onEdit, onDelete }: ClubCardProps) {
  const canManage = !!onEdit || !!onDelete;
  return (
    <div className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm">
          <Building2 className="h-5 w-5" />
        </div>
        {canManage && (
          <div className="flex gap-1 opacity-0 transition group-hover:opacity-100">
            {onEdit && (
              <button
                onClick={() => onEdit(club)}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-emerald-600"
                aria-label="Edit"
              >
                <Pencil className="h-4 w-4" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(club)}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
                aria-label="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>

      <h3 className="mt-4 font-display text-lg font-bold text-slate-900">{club.clubName}</h3>
      <p className="mt-1.5 line-clamp-3 text-sm text-slate-500">
        {club.description || 'No description provided.'}
      </p>

      <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm">
        {club.advisor && (
          <div className="flex items-center gap-2 text-slate-600">
            <User className="h-3.5 w-3.5 text-slate-400" />
            <span className="truncate">{club.advisor}</span>
          </div>
        )}
        {club.email && (
          <div className="flex items-center gap-2 text-slate-600">
            <Mail className="h-3.5 w-3.5 text-slate-400" />
            <span className="truncate">{club.email}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function ClubsHeader({
  title,
  subtitle,
  count,
  onAdd,
  addLabel,
}: {
  title: string;
  subtitle: string;
  count: number;
  onAdd?: () => void;
  addLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-3xl font-bold text-slate-900">{title}</h1>
        <p className="mt-2 text-slate-500">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {count} {count === 1 ? 'club' : 'clubs'}
        </span>
        {onAdd && (
          <button onClick={onAdd} className="btn-primary sm:w-auto">
            <Plus className="h-4 w-4" /> {addLabel ?? 'Add club'}
          </button>
        )}
      </div>
    </div>
  );
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search clubs...',
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative max-w-md">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-field pl-11"
      />
    </div>
  );
}

export function ClubsLoading({ label = 'Loading clubs...' }: { label?: string } = {}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-slate-500">
      <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export function ClubsError({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-rose-600">
      <AlertCircle className="h-8 w-8" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}

export function ClubsEmpty({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-white/50 py-20 text-center">
      <Building2 className="h-10 w-10 text-slate-300" />
      <p className="text-sm text-slate-500">{message}</p>
    </div>
  );
}
