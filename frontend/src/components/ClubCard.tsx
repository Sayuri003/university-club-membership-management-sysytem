import { Building2, Mail, User, Pencil, Trash2, Plus, Search, Loader2, AlertCircle } from 'lucide-react';
import type { Club } from '../api/clubs';

const mono = { fontFamily: "'IBM Plex Mono', ui-monospace, monospace" };

interface ClubCardProps {
  club: Club;
  onEdit?: (club: Club) => void;
  onDelete?: (club: Club) => void;
}

export function ClubCard({ club, onEdit, onDelete }: ClubCardProps) {
  const canManage = !!onEdit || !!onDelete;
  return (
    <div className="group flex flex-col rounded-2xl border border-[#14213D]/10 bg-[#F7F3E8] p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#B8863B]/40 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#14213D] text-[#F7F3E8] shadow-sm ring-1 ring-[#B8863B]/30">
          <Building2 className="h-5 w-5" />
        </div>
        {canManage && (
          <div className="flex gap-1 opacity-0 transition group-hover:opacity-100">
            {onEdit && (
              <button
                onClick={() => onEdit(club)}
                className="rounded-lg p-2 text-[#14213D]/60 transition hover:bg-[#14213D]/5 hover:text-[#B8863B]"
                aria-label="Edit"
              >
                <Pencil className="h-4 w-4" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(club)}
                className="rounded-lg p-2 text-[#14213D]/60 transition hover:bg-[#B3413A]/10 hover:text-[#B3413A]"
                aria-label="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>

      <h3 className="mt-4 font-display text-lg font-bold text-[#14213D]">{club.clubName}</h3>
      <p className="mt-1.5 line-clamp-3 text-sm text-[#14213D]/60">
        {club.description || 'No description provided.'}
      </p>

      <div className="mt-4 space-y-2 border-t border-[#14213D]/10 pt-4 text-sm">
        {club.advisor && (
          <div className="flex items-center gap-2 text-[#14213D]/70">
            <User className="h-3.5 w-3.5 text-[#B8863B]" />
            <span className="truncate">{club.advisor}</span>
          </div>
        )}
        {club.email && (
          <div className="flex items-center gap-2 text-[#14213D]/70">
            <Mail className="h-3.5 w-3.5 text-[#B8863B]" />
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
        <h1 className="font-display text-3xl font-bold text-[#14213D]">{title}</h1>
        <p className="mt-2 text-[#14213D]/60">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        <span
          style={mono}
          className="rounded-full bg-[#14213D]/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#14213D]/70"
        >
          {count} {count === 1 ? 'club' : 'clubs'}
        </span>
        {onAdd && (
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-2 rounded-sm bg-[#14213D] px-4 py-2.5 text-sm font-semibold text-[#F7F3E8] transition hover:bg-[#B8863B] hover:text-[#14213D] sm:w-auto"
          >
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
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#14213D]/40" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-sm border-0 border-b-2 border-[#14213D]/15 bg-transparent py-2.5 pl-11 text-[15px] text-[#14213D] placeholder:text-[#14213D]/30 focus:border-[#B8863B] focus:outline-none focus:ring-0"
      />
    </div>
  );
}

export function ClubsLoading({ label = 'Loading clubs...' }: { label?: string } = {}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-[#14213D]/50">
      <Loader2 className="h-6 w-6 animate-spin text-[#B8863B]" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export function ClubsError({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-[#B3413A]">
      <AlertCircle className="h-8 w-8" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}

export function ClubsEmpty({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[#14213D]/20 bg-[#F7F3E8]/60 py-20 text-center">
      <Building2 className="h-10 w-10 text-[#14213D]/25" />
      <p className="text-sm text-[#14213D]/50">{message}</p>
    </div>
  );
}