import {
  Megaphone,
  Pencil,
  Trash2,
  Paperclip,
  Clock,
  Building2,
} from 'lucide-react';
import { NOTICE_STATUS_META, type Notice } from '../api/notices';

interface NoticeCardProps {
  notice: Notice;
  clubName?: string;
  canManage?: boolean;
  onEdit?: (n: Notice) => void;
  onDelete?: (n: Notice) => void;
}

export function NoticeCard({ notice, clubName, canManage, onEdit, onDelete }: NoticeCardProps) {
  const status = NOTICE_STATUS_META[notice.status] ?? NOTICE_STATUS_META.ACTIVE;
  const published = notice.publishedAt
    ? new Date(notice.publishedAt).toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  return (
    <div className="group relative flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="hidden sm:flex">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-sm">
          <Megaphone className="h-5 w-5" />
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            {clubName && (
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">
                {clubName}
              </p>
            )}
            <h3 className="mt-0.5 font-display text-lg font-bold leading-snug text-slate-900">
              {notice.title}
            </h3>
          </div>
          <span
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${status.classes}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </span>
        </div>

        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-600">
          {notice.content}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
          {published && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {published}
            </span>
          )}
          {clubName && (
            <span className="inline-flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5" /> {clubName}
            </span>
          )}
          {notice.attachmentUrl && (
            <a
              href={notice.attachmentUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-emerald-600 hover:text-emerald-700"
            >
              <Paperclip className="h-3.5 w-3.5" /> Attachment
            </a>
          )}
        </div>
      </div>

      {canManage && (
        <div className="absolute right-4 top-4 flex gap-1 opacity-0 transition group-hover:opacity-100">
          {onEdit && (
            <button
              onClick={() => onEdit(notice)}
              className="rounded-lg bg-white/90 p-2 text-slate-500 shadow-sm transition hover:bg-white hover:text-emerald-600"
              aria-label="Edit"
            >
              <Pencil className="h-4 w-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(notice)}
              className="rounded-lg bg-white/90 p-2 text-slate-500 shadow-sm transition hover:bg-white hover:text-rose-600"
              aria-label="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function NoticesHeader({
  title,
  subtitle,
  count,
  onAdd,
  addLabel = 'New notice',
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
          {count} {count === 1 ? 'notice' : 'notices'}
        </span>
        {onAdd && (
          <button onClick={onAdd} className="btn-primary sm:w-auto">
            <Megaphone className="h-4 w-4" /> {addLabel}
          </button>
        )}
      </div>
    </div>
  );
}
