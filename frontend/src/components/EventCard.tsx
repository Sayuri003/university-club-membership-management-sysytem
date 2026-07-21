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

export function EventCard({ event, clubName, onEdit, onDelete }: EventCardProps) {
  const status = EVENT_STATUS_META[event.status] ?? EVENT_STATUS_META.OPEN;
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
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      {/* Cover */}
      <div className="relative h-36 overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600">
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
          <div className="flex h-full w-full items-center justify-center text-white/70">
            <ImageIcon className="h-8 w-8" />
          </div>
        )}

        {/* Date chip */}
        {dayNum && (
          <div className="absolute left-3 top-3 rounded-xl bg-white/95 px-2.5 py-1.5 text-center shadow-md backdrop-blur">
            <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-600">{weekday}</p>
            <p className="font-display text-lg font-bold leading-none text-slate-900">{dayNum}</p>
            <p className="text-[10px] font-medium text-slate-500">{month}</p>
          </div>
        )}

        {/* Status badge */}
        <span
          className={`absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${status.classes}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>

        {/* Admin actions */}
        {canManage && (
          <div className="absolute bottom-3 right-3 flex gap-1 opacity-0 transition group-hover:opacity-100">
            {onEdit && (
              <button
                onClick={() => onEdit(event)}
                className="rounded-lg bg-white/90 p-2 text-slate-600 shadow-sm transition hover:bg-white hover:text-emerald-600"
                aria-label="Edit"
              >
                <Pencil className="h-4 w-4" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(event)}
                className="rounded-lg bg-white/90 p-2 text-slate-600 shadow-sm transition hover:bg-white hover:text-rose-600"
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
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">{clubName}</p>
        )}
        <h3 className="mt-1 font-display text-lg font-bold leading-snug text-slate-900">{event.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-slate-500">
          {event.description || 'No description provided.'}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-y-2.5 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
            <span className="truncate">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <span>{event.eventTime || 'TBA'}</span>
          </div>
          <div className="col-span-2 flex items-center gap-2 text-slate-600">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span className="truncate">{event.venue || 'Venue TBA'}</span>
          </div>
        </div>

        {/* Capacity bar */}
        {event.capacity > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-slate-500">
                <Users className="h-3.5 w-3.5" />
                {event.registeredCount}/{event.capacity} registered
              </span>
              <span className={full ? 'font-semibold text-rose-600' : 'font-medium text-slate-500'}>
                {full ? 'Full' : `${pct}%`}
              </span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full transition-all ${full ? 'bg-rose-500' : 'bg-emerald-500'}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
