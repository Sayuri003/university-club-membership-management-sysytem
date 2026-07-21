import { useCallback, useEffect, useMemo, useState } from 'react';
import { DashboardShell } from '../../components/DashboardShell';
import { LayoutDashboard, Building2, CalendarDays, BadgeCheck, Megaphone, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { noticesApi, type Notice, type NoticeStatus } from '../../api/notices';
import { clubsApi, type Club } from '../../api/clubs';
import { NoticeCard } from '../../components/NoticeCard';
import { NoticeForm } from '../../components/NoticeForm';
import { Modal, ConfirmDialog } from '../../components/Modal';
import {
  ClubsError as NoticesError,
  ClubsEmpty as NoticesEmpty,
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

type Filter = 'ALL' | NoticeStatus;
const FILTERS: { key: Filter; label: string }[] = [
  { key: 'ALL', label: 'All' },
  { key: 'ACTIVE', label: 'Active' },
  { key: 'EXPIRED', label: 'Expired' },
];

const serif = { fontFamily: "'Newsreader', Georgia, serif" };
const mono = { fontFamily: "'IBM Plex Mono', ui-monospace, monospace" };

export default function AdminNotices() {
  const { user } = useAuth();
  const publisherId = user?.userId ?? '';
  const [notices, setNotices] = useState<Notice[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('ALL');

  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<Notice | null>(null);
  const [deleting, setDeleting] = useState<Notice | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [n, cl] = await Promise.all([noticesApi.list(), clubsApi.list()]);
      setNotices(n);
      setClubs(cl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load notices.');
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
    return notices
      .filter((n) => (filter === 'ALL' ? true : n.status === filter))
      .filter((n) => {
        if (!q) return true;
        const name = (clubNameById.get(n.clubId) ?? '').toLowerCase();
        return (
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q) ||
          name.includes(q)
        );
      })
      .sort((a, b) => ((b.publishedAt ?? '') > (a.publishedAt ?? '') ? 1 : -1));
  }, [notices, filter, query, clubNameById]);

  const counts = useMemo(() => {
    const c: Record<Filter, number> = { ALL: notices.length, ACTIVE: 0, EXPIRED: 0 };
    notices.forEach((n) => {
      c[n.status] = (c[n.status] ?? 0) + 1;
    });
    return c;
  }, [notices]);

  const handleSaved = (n: Notice) => {
    setNotices((prev) => {
      const exists = prev.some((x) => x.id === n.id);
      return exists ? prev.map((x) => (x.id === n.id ? n : x)) : [n, ...prev];
    });
    setCreateOpen(false);
    setEditing(null);
    setActionError(null);
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setDeleteLoading(true);
    try {
      await noticesApi.remove(deleting.id);
      setNotices((prev) => prev.filter((n) => n.id !== deleting.id));
      setDeleting(null);
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : 'Failed to delete notice.');
    } finally {
      setDeleteLoading(false);
    }
  };

  // Full-page loader while notices + clubs are being fetched together.
  if (loading) {
    return <PageLoader />;
  }

  return (
    <DashboardShell navItems={navItems} badge="Admin">
      <div className="flex flex-col gap-4 border-b-2 border-[#B8863B] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 style={serif} className="text-3xl font-medium text-[#14213D]">Manage notices</h1>
          <p className="mt-2 text-[#14213D]/60">Publish, edit and expire club announcements.</p>
        </div>
        <button
          onClick={() => setCreateOpen(true)}
          className="inline-flex items-center gap-2 rounded-sm bg-[#14213D] px-5 py-2.5 text-sm font-semibold text-[#F7F3E8] transition hover:bg-[#B8863B] hover:text-[#14213D] sm:w-auto"
        >
          <Plus className="h-4 w-4" /> New notice
        </button>
      </div>

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
          placeholder="Search notices..."
          className="max-w-xs border-0 border-b-2 border-[#14213D]/15 bg-transparent py-2.5 text-[15px] text-[#14213D] placeholder:text-[#14213D]/30 focus:border-[#B8863B] focus:outline-none focus:ring-0"
        />
      </div>

      {actionError && (
        <div className="mt-4 flex items-start gap-3 rounded-sm border-l-4 border-[#B3413A] bg-[#B3413A]/[0.06] px-4 py-3 text-sm text-[#7A2C26]">
          {actionError}
        </div>
      )}

      <div className="mt-8 space-y-4">
        {error ? (
          <NoticesError message={error} />
        ) : filtered.length === 0 ? (
          <NoticesEmpty message={query ? 'No notices match your search.' : 'No notices yet. Publish the first one.'} />
        ) : (
          filtered.map((n) => (
            <NoticeCard
              key={n.id}
              notice={n}
              clubName={clubNameById.get(n.clubId)}
              canManage
              onEdit={(nn) => setEditing(nn)}
              onDelete={(nn) => setDeleting(nn)}
            />
          ))
        )}
      </div>

      {/* Create modal */}
      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Publish a new notice"
        description="Announce something to club members."
      >
        <NoticeForm
          publishedBy={publisherId}
          onSaved={handleSaved}
          onCancel={() => setCreateOpen(false)}
        />
      </Modal>

      {/* Edit modal */}
      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title="Edit notice"
        description={editing?.title}
      >
        {editing && (
          <NoticeForm
            initial={editing}
            publishedBy={publisherId}
            onSaved={handleSaved}
            onCancel={() => setEditing(null)}
          />
        )}
      </Modal>

      {/* Delete confirmation */}
      <ConfirmDialog
        open={!!deleting}
        title="Delete notice"
        message={`Delete "${deleting?.title}"? This cannot be undone.`}
        confirmLabel="Delete"
        loading={deleteLoading}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </DashboardShell>
  );
}