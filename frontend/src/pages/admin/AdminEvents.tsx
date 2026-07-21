import { useCallback, useEffect, useMemo, useState } from 'react';
import { DashboardShell } from '../../components/DashboardShell';
import { LayoutDashboard, Building2, CalendarDays, Plus } from 'lucide-react';
import { eventsApi, type EventItem, type EventStatus } from '../../api/events';
import { clubsApi, type Club } from '../../api/clubs';
import { EventCard } from '../../components/EventCard';
import { EventForm } from '../../components/EventForm';
import { Modal, ConfirmDialog } from '../../components/Modal';
import {
  ClubsLoading as EventsLoading,
  ClubsError as EventsError,
  ClubsEmpty as EventsEmpty,
} from '../../components/ClubCard';
import { ApiError } from '../../api/client';

const navItems = [
  { to: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/admin/clubs', label: 'Clubs', icon: Building2 },
  { to: '/admin/events', label: 'Events', icon: CalendarDays },
];

type Filter = 'ALL' | EventStatus;

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'ALL', label: 'All' },
  { key: 'OPEN', label: 'Open' },
  { key: 'CLOSED', label: 'Closed' },
  { key: 'CANCELLED', label: 'Cancelled' },
];

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

  return (
    <DashboardShell navItems={navItems} badge="Admin">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900">Manage events</h1>
          <p className="mt-2 text-slate-500">Create, update and remove club events.</p>
        </div>
        <button onClick={() => setCreateOpen(true)} className="btn-primary sm:w-auto">
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

      {formError && (
        <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {formError}
        </div>
      )}

      <div className="mt-8">
        {loading ? (
          <EventsLoading label="Loading events..." />
        ) : error ? (
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
