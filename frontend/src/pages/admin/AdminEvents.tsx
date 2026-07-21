import { useCallback, useEffect, useMemo, useState } from 'react';
import { DashboardShell } from '../../components/DashboardShell';
import { LayoutDashboard, Building2, CalendarDays, BadgeCheck, Megaphone, Plus } from 'lucide-react';
import { eventsApi, type EventItem, type EventStatus } from '../../api/events';
import { clubsApi, type Club } from '../../api/clubs';
import { EventCard } from '../../components/EventCard';
import { EventForm } from '../../components/EventForm';
import { Modal, ConfirmDialog } from '../../components/Modal';
import {
  ClubsError as EventsError,
  ClubsEmpty as EventsEmpty,
} from '../../components/ClubCard';
import { ApiError } from '../../api/client';
import { PageLoader } from '../../components/PageLoader';

const navItems = [
  { to: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/admin/clubs', label: 'Clubs', icon: Building2 },
  { to: '/admin/events', label: 'Events', icon: CalendarDays },
  { to: '/admin/memberships', label: 'Memberships', icon: BadgeCheck },
  { to: '/admin/notices', label: 'Notices', icon: Megaphone },
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

export default function AdminEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('ALL');

  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [deleting, setDeleting] = useState<EventItem | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [ev, cl] = await Promise.all([eventsApi.list(), clubsApi.list()]);
      setEvents(ev);
      setClubs(cl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load events.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

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

  const handleSaved = (event: EventItem) => {
    setEvents((prev) => {
      const exists = prev.some((e) => e.id === event.id);
      return exists ? prev.map((e) => (e.id === event.id ? event : e)) : [event, ...prev];
    });
    setCreateOpen(false);
    setEditing(null);
    setFormError(null);
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setDeleteLoading(true);
    try {
      await eventsApi.remove(deleting.id);
      setEvents((prev) => prev.filter((e) => e.id !== deleting.id));
      setDeleting(null);
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : 'Failed to delete event.');
    } finally {
      setDeleteLoading(false);
    }
  };

  // Full-page loader while events + clubs are being fetched together.
  if (loading) {
    return <PageLoader />;
  }

  return (
    <DashboardShell navItems={navItems} badge="Admin">
      <div className="flex flex-col gap-4 border-b-2 border-[#B8863B] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 style={serif} className="text-3xl font-medium text-[#14213D]">Manage events</h1>
          <p className="mt-2 text-[#14213D]/60">Create, update and remove club events.</p>
        </div>
        <button
          onClick={() => setCreateOpen(true)}
          className="inline-flex items-center gap-2 rounded-sm bg-[#14213D] px-5 py-2.5 text-sm font-semibold text-[#F7F3E8] transition hover:bg-[#B8863B] hover:text-[#14213D] sm:w-auto"
        >
          <Plus className="h-4 w-4" /> New event
        </button>
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

      {formError && (
        <div className="mt-4 flex items-start gap-3 rounded-sm border-l-4 border-[#B3413A] bg-[#B3413A]/[0.06] px-4 py-3 text-sm text-[#7A2C26]">
          {formError}
        </div>
      )}

      <div className="mt-8">
        {error ? (
          <EventsError message={error} />
        ) : filtered.length === 0 ? (
          <EventsEmpty message={query ? 'No events match your search.' : 'No events yet. Create the first one.'} />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                clubName={clubNameById.get(event.clubId)}
                onEdit={(e) => setEditing(e)}
                onDelete={(e) => setDeleting(e)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create modal */}
      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create a new event"
        description="Schedule a new club event."
      >
        <EventForm onSaved={handleSaved} onCancel={() => setCreateOpen(false)} />
      </Modal>

      {/* Edit modal */}
      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title="Edit event"
        description={editing?.title}
      >
        {editing && (
          <EventForm initial={editing} onSaved={handleSaved} onCancel={() => setEditing(null)} />
        )}
      </Modal>

      {/* Delete confirmation */}
      <ConfirmDialog
        open={!!deleting}
        title="Delete event"
        message={`Are you sure you want to delete "${deleting?.title}"? This cannot be undone.`}
        confirmLabel="Delete"
        loading={deleteLoading}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </DashboardShell>
  );
}