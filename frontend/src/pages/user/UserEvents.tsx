import { useEffect, useMemo, useState } from 'react';
import { DashboardShell } from '../../components/DashboardShell';
import { LayoutDashboard, Building2, CalendarDays } from 'lucide-react';
import { eventsApi, type EventItem, type EventStatus } from '../../api/events';
import { clubsApi, type Club } from '../../api/clubs';
import { EventCard } from '../../components/EventCard';
import {
  ClubsLoading as EventsLoading,
  ClubsError as EventsError,
  ClubsEmpty as EventsEmpty,
} from '../../components/ClubCard';

const navItems = [
  { to: '/user/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/user/clubs', label: 'Clubs', icon: Building2 },
  { to: '/user/events', label: 'Events', icon: CalendarDays },
];

type Filter = 'ALL' | EventStatus;

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'ALL', label: 'All' },
  { key: 'OPEN', label: 'Open' },
  { key: 'CLOSED', label: 'Closed' },
  { key: 'CANCELLED', label: 'Cancelled' },
];

export default function UserEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('ALL');

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const [ev, cl] = await Promise.all([eventsApi.list(), clubsApi.list()]);
        if (active) {
          setEvents(ev);
          setClubs(cl);
        }
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : 'Failed to load events.');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const clubNameById = useMemo(() => {
    const map = new Map<string, string>();
    clubs.forEach((c) => map.set(c.id, c.clubName));
    return map;
  }, [clubs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events
      .filter((e) => (filter === 'ALL' ? true : e.status === filter))
      .filter((e) =>
        !q
          ? true
          : e.title.toLowerCase().includes(q) ||
            e.description.toLowerCase().includes(q) ||
            e.venue.toLowerCase().includes(q) ||
            (clubNameById.get(e.clubId) ?? '').toLowerCase().includes(q),
      )
      .sort((a, b) => (a.eventDate < b.eventDate ? -1 : 1));
  }, [events, filter, query, clubNameById]);

  const counts = useMemo(() => {
    const c: Record<Filter, number> = { ALL: events.length, OPEN: 0, CLOSED: 0, CANCELLED: 0 };
    events.forEach((e) => {
      c[e.status] = (c[e.status] ?? 0) + 1;
    });
    return c;
  }, [events]);

  return (
    <DashboardShell navItems={navItems}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900">Events</h1>
          <p className="mt-2 text-slate-500">Discover upcoming club events and activities.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                filter === f.key
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-emerald-300'
              }`}
            >
              {f.label}
              <span
                className={`rounded-full px-1.5 text-[11px] font-semibold ${
                  filter === f.key ? 'bg-white/20' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {counts[f.key] ?? 0}
              </span>
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search events..."
          className="input-field max-w-xs"
        />
      </div>

      <div className="mt-8">
        {loading ? (
          <EventsLoading label="Loading events..." />
        ) : error ? (
          <EventsError message={error} />
        ) : filtered.length === 0 ? (
          <EventsEmpty message={query ? 'No events match your search.' : 'No events scheduled yet.'} />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} clubName={clubNameById.get(event.clubId)} />
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
