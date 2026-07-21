import { useEffect, useMemo, useState } from 'react';
import { DashboardShell } from '../../components/DashboardShell';
import { LayoutDashboard, Building2, CalendarDays, BadgeCheck, Megaphone } from 'lucide-react';
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
  { to: '/user/memberships', label: 'Memberships', icon: BadgeCheck },
  { to: '/user/notices', label: 'Notices', icon: Megaphone },
];

type Filter = 'ALL' | EventStatus;

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'ALL', label: 'All' },
  { key: 'OPEN', label: 'Open' },
  { key: 'CLOSED', label: 'Closed' },
  { key: 'CANCELLED', label: 'Cancelled' },
];

const serif = { fontFamily: "'Newsreader', Georgia, serif" };
const mono = { fontFamily: "'IBM Plex Mono', ui-monospace, monospace" };

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
      <div className="flex flex-col gap-4 border-b-2 border-[#B8863B] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 style={serif} className="text-3xl font-medium text-[#14213D]">Events</h1>
          <p className="mt-2 text-[#14213D]/60">Discover upcoming club events and activities.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`inline-flex items-center gap-2 rounded-sm border px-4 py-2 text-sm font-medium transition ${
                filter === f.key
                  ? 'border-[#14213D] bg-[#14213D] text-[#F7F3E8]'
                  : 'border-[#14213D]/20 text-[#14213D]/70 hover:border-[#B8863B]/50 hover:bg-[#14213D]/5'
              }`}
            >
              {f.label}
              <span
                style={mono}
                className={`rounded-sm px-1.5 text-[10px] font-semibold ${
                  filter === f.key ? 'bg-white/20' : 'bg-[#14213D]/8 text-[#14213D]/50'
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
          className="max-w-xs border-0 border-b-2 border-[#14213D]/15 bg-transparent py-2.5 text-[15px] text-[#14213D] placeholder:text-[#14213D]/30 focus:border-[#B8863B] focus:outline-none focus:ring-0"
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