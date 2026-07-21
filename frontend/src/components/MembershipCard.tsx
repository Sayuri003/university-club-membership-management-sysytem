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

const serif = { fontFamily: "'Newsreader', Georgia, serif" };
const mono = { fontFamily: "'IBM Plex Mono', ui-monospace, monospace" };

const STATUS_STYLES: Record<string, string> = {
  PENDING: 'bg-[#B8863B]/15 text-[#8C6423] border border-[#B8863B]/30',
  APPROVED: 'bg-[#5C7A6B]/15 text-[#3E5449] border border-[#5C7A6B]/30',
  REJECTED: 'bg-[#B3413A]/10 text-[#B3413A] border border-[#B3413A]/30',
};
const STATUS_DOT: Record<string, string> = {
  PENDING: 'bg-[#B8863B]',
  APPROVED: 'bg-[#5C7A6B]',
  REJECTED: 'bg-[#B3413A]',
};

const POSITION_STYLES: Record<string, string> = {
  PRESIDENT: 'bg-[#14213D] text-[#F7F3E8]',
  VICE_PRESIDENT: 'bg-[#14213D]/85 text-[#F7F3E8]',
  SECRETARY: 'bg-[#14213D]/10 text-[#14213D]/75 border border-[#14213D]/20',
  TREASURER: 'bg-[#B8863B]/15 text-[#8C6423] border border-[#B8863B]/30',
  MEMBER: 'bg-[#14213D]/8 text-[#14213D]/60 border border-[#14213D]/15',
};

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
    <div className="group flex flex-col rounded-sm border border-[#14213D]/12 bg-white/60 p-5 transition hover:-translate-y-0.5 hover:border-[#B8863B]/50 hover:shadow-lg hover:shadow-[#14213D]/5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-[#14213D] text-[#F7F3E8]">
            <BadgeCheck className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h3 style={serif} className="truncate text-base font-medium text-[#14213D]">
              {clubName ?? 'Club'}
            </h3>
            {userName && <p className="truncate text-xs text-[#14213D]/50">{userName}</p>}
          </div>
        </div>
        <span
          style={mono}
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${STATUS_STYLES[membership.status] ?? STATUS_STYLES.PENDING}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[membership.status] ?? STATUS_DOT.PENDING}`} />
          {status.label}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        <span
          style={mono}
          className={`rounded-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${POSITION_STYLES[membership.position] ?? POSITION_STYLES.MEMBER}`}
        >
          {position.label}
        </span>
        {joined && (
          <span className="inline-flex items-center gap-1.5 text-[#14213D]/50">
            <CalendarDays className="h-3.5 w-3.5" />
            Joined {joined}
          </span>
        )}
      </div>

      {canManage && membership.status === 'PENDING' && (
        <div className="mt-4 flex gap-2 border-t border-[#14213D]/10 pt-4">
          <button
            onClick={() => onApprove?.(membership)}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-sm bg-[#5C7A6B] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#3E5449]"
          >
            <Check className="h-4 w-4" /> Approve
          </button>
          <button
            onClick={() => onReject?.(membership)}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-sm border border-[#B3413A]/30 bg-white px-3 py-2 text-sm font-semibold text-[#B3413A] transition hover:bg-[#B3413A]/10"
          >
            <X className="h-4 w-4" /> Reject
          </button>
        </div>
      )}

      {canManage && membership.status === 'APPROVED' && (
        <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#14213D]/10 pt-4">
          <button
            onClick={() => onEditPosition?.(membership)}
            className="inline-flex items-center gap-1.5 rounded-sm px-3 py-2 text-sm font-medium text-[#14213D]/70 transition hover:bg-[#14213D]/5 hover:text-[#B8863B]"
          >
            <Pencil className="h-4 w-4" /> Position
          </button>
          <button
            onClick={() => onDelete?.(membership)}
            className="inline-flex items-center gap-1.5 rounded-sm px-3 py-2 text-sm font-medium text-[#14213D]/70 transition hover:bg-[#B3413A]/10 hover:text-[#B3413A]"
          >
            <Trash2 className="h-4 w-4" /> Remove
          </button>
        </div>
      )}

      {canManage && membership.status === 'REJECTED' && (
        <div className="mt-4 flex items-center justify-end gap-2 border-t border-[#14213D]/10 pt-4">
          <button
            onClick={() => onDelete?.(membership)}
            className="inline-flex items-center gap-1.5 rounded-sm px-3 py-2 text-sm font-medium text-[#14213D]/70 transition hover:bg-[#B3413A]/10 hover:text-[#B3413A]"
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
    <div className="flex flex-col gap-4 border-b-2 border-[#B8863B] pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 style={serif} className="text-3xl font-medium text-[#14213D]">{title}</h1>
        <p className="mt-2 text-[#14213D]/60">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        <span
          style={mono}
          className="rounded-sm bg-[#14213D]/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#14213D]/60"
        >
          {count} {count === 1 ? 'membership' : 'memberships'}
        </span>
        {onApply && (
          <button
            onClick={onApply}
            className="inline-flex items-center gap-2 rounded-sm bg-[#14213D] px-5 py-2.5 text-sm font-semibold text-[#F7F3E8] transition hover:bg-[#B8863B] hover:text-[#14213D] sm:w-auto"
          >
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
            className={`rounded-sm border px-3.5 py-2 text-sm font-medium transition ${
              active
                ? 'border-[#14213D] bg-[#14213D] text-[#F7F3E8]'
                : `border-[#14213D]/20 ${POSITION_STYLES[p] ?? ''} hover:border-[#B8863B]/50`
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
    <span
      style={mono}
      className={`inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${STATUS_STYLES[status] ?? STATUS_STYLES.PENDING}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[status] ?? STATUS_DOT.PENDING}`} />
      {meta.label}
    </span>
  );
}

export { Clock, Building2 };