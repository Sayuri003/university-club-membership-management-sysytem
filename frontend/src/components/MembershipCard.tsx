import {
  CalendarDays,
  Check,
  X,
  Trash2,
  Pencil,
  Clock,
  BadgeCheck,
  Building2,
} from 'lucide-react';
import {
  type Membership,
  type MemberPosition,
  POSITION_META,
  MEMBERSHIP_STATUS_META,
} from '../api/memberships';

interface MembershipCardProps {
  membership: Membership;
  clubName?: string;
  userName?: string;
  canManage?: boolean;
  onApprove?: (m: Membership) => void;
  onReject?: (m: Membership) => void;
  onEditPosition?: (m: Membership) => void;
  onDelete?: (m: Membership) => void;
}

export function MembershipCard({
  membership,
  clubName,
  userName,
  canManage,
  onApprove,
  onReject,
  onEditPosition,
  onDelete,
}: MembershipCardProps) {
  const status = MEMBERSHIP_STATUS_META[membership.status] ?? MEMBERSHIP_STATUS_META.PENDING;
  const position = POSITION_META[membership.position] ?? POSITION_META.MEMBER;
  const joined = membership.joinedDate
    ? new Date(membership.joinedDate + 'T00:00:00').toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <div className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-sm">
            <BadgeCheck className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h3 className="truncate font-display text-base font-bold text-slate-900">
              {clubName ?? 'Club'}
            </h3>
            {userName && <p className="truncate text-xs text-slate-500">{userName}</p>}
          </div>
        </div>
        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${status.classes}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        <span className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${position.classes}`}>
          {position.label}
        </span>
        {joined && (
          <span className="inline-flex items-center gap-1.5 text-slate-500">
            <CalendarDays className="h-3.5 w-3.5" />
            Joined {joined}
          </span>
        )}
      </div>

      {canManage && membership.status === 'PENDING' && (
        <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4">
          <button
            onClick={() => onApprove?.(membership)}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            <Check className="h-4 w-4" /> Approve
          </button>
          <button
            onClick={() => onReject?.(membership)}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-rose-200 bg-white px-3 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
          >
            <X className="h-4 w-4" /> Reject
          </button>
        </div>
      )}

      {canManage && membership.status === 'APPROVED' && (
        <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-4">
          <button
            onClick={() => onEditPosition?.(membership)}
            className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-emerald-600"
          >
            <Pencil className="h-4 w-4" /> Position
          </button>
          <button
            onClick={() => onDelete?.(membership)}
            className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-rose-50 hover:text-rose-600"
          >
            <Trash2 className="h-4 w-4" /> Remove
          </button>
        </div>
      )}

      {canManage && membership.status === 'REJECTED' && (
        <div className="mt-4 flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
          <button
            onClick={() => onDelete?.(membership)}
            className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-rose-50 hover:text-rose-600"
          >
            <Trash2 className="h-4 w-4" /> Remove
          </button>
        </div>
      )}
    </div>
  );
}

export function MembershipsHeader({
  title,
  subtitle,
  count,
  onApply,
}: {
  title: string;
  subtitle: string;
  count: number;
  onApply?: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-3xl font-bold text-slate-900">{title}</h1>
        <p className="mt-2 text-slate-500">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {count} {count === 1 ? 'membership' : 'memberships'}
        </span>
        {onApply && (
          <button onClick={onApply} className="btn-primary sm:w-auto">
            <BadgeCheck className="h-4 w-4" /> Apply
          </button>
        )}
      </div>
    </div>
  );
}

export const POSITION_BADGE = POSITION_META;

interface PositionPickerProps {
  value: MemberPosition;
  onChange: (p: MemberPosition) => void;
}

export function PositionPicker({ value, onChange }: PositionPickerProps) {
  const positions: MemberPosition[] = ['PRESIDENT', 'VICE_PRESIDENT', 'SECRETARY', 'TREASURER', 'MEMBER'];
  return (
    <div className="flex flex-wrap gap-2">
      {positions.map((p) => {
        const meta = POSITION_META[p];
        const active = value === p;
        return (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={`rounded-xl px-3.5 py-2 text-sm font-medium transition ${
              active ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20' : meta.classes + ' hover:opacity-80'
            }`}
          >
            {meta.label}
          </button>
        );
      })}
    </div>
  );
}

export function StatusBadge({ status }: { status: Membership['status'] }) {
  const meta = MEMBERSHIP_STATUS_META[status] ?? MEMBERSHIP_STATUS_META.PENDING;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${meta.classes}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  );
}

export { Clock, Building2 };
