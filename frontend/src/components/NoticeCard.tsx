import {
  Megaphone,
  Pencil,
  Trash2,
  Paperclip,
  Clock,
  Building2,
} from "lucide-react";
import { NOTICE_STATUS_META, type Notice } from "../api/notices";

interface NoticeCardProps {
  notice: Notice;
  clubName?: string;
  canManage?: boolean;
  onEdit?: (notice: Notice) => void;
  onDelete?: (notice: Notice) => void;
}

const serifStyle = {
  fontFamily: "'Newsreader', Georgia, serif",
};

const monoStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
};

const STATUS_STYLE: Record<string, string> = {
  ACTIVE: "bg-[#5C7A6B]/10 text-[#5C7A6B] border border-[#5C7A6B]/30",
  EXPIRED: "bg-[#14213D]/5 text-[#14213D]/50 border border-[#14213D]/15",
};

const STATUS_DOT: Record<string, string> = {
  ACTIVE: "bg-[#5C7A6B]",
  EXPIRED: "bg-[#14213D]/40",
};

export function NoticeCard({
  notice,
  clubName,
  canManage = false,
  onEdit,
  onDelete,
}: NoticeCardProps) {
  const status =
    NOTICE_STATUS_META[notice.status] ?? NOTICE_STATUS_META.ACTIVE;

  const published = notice.publishedAt
    ? new Date(notice.publishedAt).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#14213D]/10 bg-[#F7F3E8] p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#B8863B]/40 hover:shadow-lg">
      {/* Gold accent bar */}
      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#B8863B] to-[#14213D]" />

      <div className="flex gap-4 pl-2">
        {/* Icon */}
        <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#14213D] text-[#F7F3E8] shadow-sm ring-1 ring-[#B8863B]/30 sm:flex">
          <Megaphone className="h-5 w-5" />
        </div>

        <div className="flex-1">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              {clubName && (
                <p
                  style={monoStyle}
                  className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B8863B]"
                >
                  {clubName}
                </p>
              )}

              <h3
                style={serifStyle}
                className="mt-1 text-xl font-semibold text-[#14213D]"
              >
                {notice.title}
              </h3>
            </div>

            <span
              style={monoStyle}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase ${
                STATUS_STYLE[notice.status] ?? STATUS_STYLE.ACTIVE
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  STATUS_DOT[notice.status] ?? STATUS_DOT.ACTIVE
                }`}
              />
              {status.label}
            </span>
          </div>

          {/* Content */}
          <p className="mt-4 whitespace-pre-line text-sm leading-7 text-[#14213D]/70">
            {notice.content}
          </p>

          {/* Footer */}
          <div className="mt-5 flex flex-wrap gap-4 border-t border-[#14213D]/10 pt-4 text-xs text-[#14213D]/50">
            {published && (
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-[#B8863B]" />
                {published}
              </span>
            )}

            {clubName && (
              <span className="inline-flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5 text-[#B8863B]" />
                {clubName}
              </span>
            )}

            {notice.attachmentUrl && (
              <a
                href={notice.attachmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#14213D] underline decoration-[#B8863B]/50 decoration-2 underline-offset-2 transition hover:text-[#B8863B]"
              >
                <Paperclip className="h-3.5 w-3.5" />
                Attachment
              </a>
            )}
          </div>
        </div>
      </div>

      {canManage && (
        <div className="absolute right-4 top-4 flex gap-2 opacity-0 transition group-hover:opacity-100">
          {onEdit && (
            <button
              onClick={() => onEdit(notice)}
              className="rounded-lg border border-[#14213D]/15 bg-[#F7F3E8] p-2 text-[#14213D]/70 transition hover:border-[#B8863B]/40 hover:text-[#B8863B]"
            >
              <Pencil className="h-4 w-4" />
            </button>
          )}

          {onDelete && (
            <button
              onClick={() => onDelete(notice)}
              className="rounded-lg border border-[#B3413A]/25 bg-[#F7F3E8] p-2 text-[#B3413A] transition hover:bg-[#B3413A]/10"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

interface NoticesHeaderProps {
  title: string;
  subtitle: string;
  count: number;
  onAdd?: () => void;
  addLabel?: string;
}

export function NoticesHeader({
  title,
  subtitle,
  count,
  onAdd,
  addLabel = "New Notice",
}: NoticesHeaderProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-[#14213D]/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1
          style={serifStyle}
          className="text-3xl font-bold text-[#14213D]"
        >
          {title}
        </h1>

        <p className="mt-2 text-[#14213D]/60">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        <span
          style={monoStyle}
          className="rounded-full bg-[#14213D]/5 px-3 py-1 text-xs font-semibold uppercase text-[#14213D]/70"
        >
          {count} {count === 1 ? "Notice" : "Notices"}
        </span>

        {onAdd && (
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-2 rounded-sm bg-[#14213D] px-5 py-2.5 text-sm font-semibold text-[#F7F3E8] transition hover:bg-[#B8863B] hover:text-[#14213D]"
          >
            <Megaphone className="h-4 w-4" />
            {addLabel}
          </button>
        )}
      </div>
    </div>
  );
}