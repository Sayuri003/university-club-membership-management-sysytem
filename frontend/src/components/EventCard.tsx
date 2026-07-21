import {
  CalendarDays,
  MapPin,
  Clock,
  Users,
  Pencil,
  Trash2,
  ImageIcon,
} from 'lucide-react';
import { EVENT_STATUS_META, type EventItem } from '../api/events';

interface EventCardProps {
  event: EventItem;
  clubName?: string;
  onEdit?: (event: EventItem) => void;
  onDelete?: (event: EventItem) => void;
}

const serif = { fontFamily: "'Newsreader', Georgia, serif" };
const mono = { fontFamily: "'IBM Plex Mono', ui-monospace, monospace" };

const STATUS_STYLES: Record<string, string> = {
  OPEN: 'bg-[#5C7A6B]/15 text-[#3E5449] border border-[#5C7A6B]/30',
  CLOSED: 'bg-[#14213D]/10 text-[#14213D]/70 border border-[#14213D]/20',
  CANCELLED: 'bg-[#B3413A]/10 text-[#B3413A] border border-[#B3413A]/30',
};
const STATUS_DOT: Record<string, string> = {
  OPEN: 'bg-[#5C7A6B]',
  CLOSED: 'bg-[#14213D]/50',
  CANCELLED: 'bg-[#B3413A]',
};

export function EventCard({ event, clubName, onEdit, onDelete }: EventCardProps) {
  const status = EVENT_STATUS_META[event.status] ?? EVENT_STATUS_META.OPEN;
  const statusKey = event.status ?? 'OPEN';
  const canManage = !!onEdit || !!onDelete;
  const full = event.capacity > 0 && event.registeredCount >= event.capacity;
  const pct = event.capacity > 0 ? Math.min(100, Math.round((event.registeredCount / event.capacity) * 100)) : 0;

  let formattedDate = 'TBA';
  let weekday = '';
  let dayNum = '';
  let month = '';
  if (event.eventDate) {
    const d = new Date(event.eventDate + 'T00:00:00');
    if (!isNaN(d.getTime())) {
      formattedDate = d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
      weekday = d.toLocaleDateString(undefined, { weekday: 'short' });
      dayNum = String(d.getDate());
      month = d.toLocaleDateString(undefined, { month: 'short' });
    }
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-sm border border-[#14213D]/12 bg-white/60 transition hover:-translate-y-0.5 hover:border-[#B8863B]/50 hover:shadow-lg hover:shadow-[#14213D]/5">
      {/* Cover */}
      <div className="relative h-36 overflow-hidden bg-[#14213D]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:radial-gradient(circle,rgba(247,243,232,0.5)_1px,transparent_1px)] [background-size:18px_18px]" />
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="relative flex h-full w-full items-center justify-center text-[#F7F3E8]/40">
            <ImageIcon className="h-8 w-8" />
          </div>
        )}

        {/* Date chip */}
        {dayNum && (
          <div className="absolute left-3 top-3 rounded-sm border border-[#B8863B]/40 bg-[#F7F3E8]/95 px-2.5 py-1.5 text-center shadow-md backdrop-blur">
            <p style={mono} className="text-[9px] font-bold uppercase tracking-wide text-[#B8863B]">{weekday}</p>
            <p style={serif} className="text-lg font-medium leading-none text-[#14213D]">{dayNum}</p>
            <p style={mono} className="text-[9px] font-medium text-[#14213D]/60">{month}</p>
          </div>
        )}

        {/* Status badge */}
        <span
          style={mono}
          className={`absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${STATUS_STYLES[statusKey] ?? STATUS_STYLES.OPEN}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[statusKey] ?? STATUS_DOT.OPEN}`} />
          {status.label}
        </span>

        {/* Admin actions */}
        {canManage && (
          <div className="absolute bottom-3 right-3 flex gap-1 opacity-0 transition group-hover:opacity-100">
            {onEdit && (
              <button
                onClick={() => onEdit(event)}
                className="rounded-sm bg-[#F7F3E8]/95 p-2 text-[#14213D]/70 shadow-sm transition hover:bg-[#F7F3E8] hover:text-[#B8863B]"
                aria-label="Edit"
              >
                <Pencil className="h-4 w-4" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(event)}
                className="rounded-sm bg-[#F7F3E8]/95 p-2 text-[#14213D]/70 shadow-sm transition hover:bg-[#F7F3E8] hover:text-[#B3413A]"
                aria-label="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        {clubName && (
          <p style={mono} className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#B8863B]">
            {clubName}
          </p>
        )}
        <h3 style={serif} className="mt-1 text-lg font-medium leading-snug text-[#14213D]">{event.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-[#14213D]/60">
          {event.description || 'No description provided.'}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-y-2.5 text-sm">
          <div className="flex items-center gap-2 text-[#14213D]/70">
            <CalendarDays className="h-3.5 w-3.5 text-[#14213D]/35" />
            <span className="truncate">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-[#14213D]/70">
            <Clock className="h-3.5 w-3.5 text-[#14213D]/35" />
            <span>{event.eventTime || 'TBA'}</span>
          </div>
          <div className="col-span-2 flex items-center gap-2 text-[#14213D]/70">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-[#14213D]/35" />
            <span className="truncate">{event.venue || 'Venue TBA'}</span>
          </div>
        </div>

        {/* Capacity bar */}
        {event.capacity > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-[#14213D]/55">
                <Users className="h-3.5 w-3.5" />
                {event.registeredCount}/{event.capacity} registered
              </span>
              <span className={full ? 'font-semibold text-[#B3413A]' : 'font-medium text-[#14213D]/55'}>
                {full ? 'Full' : `${pct}%`}
              </span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#14213D]/10">
              <div
                className={`h-full rounded-full transition-all ${full ? 'bg-[#B3413A]' : 'bg-[#B8863B]'}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}