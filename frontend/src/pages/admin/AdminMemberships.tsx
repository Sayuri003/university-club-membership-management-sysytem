import { useCallback, useEffect, useMemo, useState } from 'react';
import { DashboardShell } from '../../components/DashboardShell';
import { LayoutDashboard, Building2, CalendarDays, BadgeCheck, Megaphone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { membershipsApi, type Membership, type MembershipStatus } from '../../api/memberships';
import { clubsApi, type Club } from '../../api/clubs';
import { MembershipCard } from '../../components/MembershipCard';
import { PositionForm } from '../../components/MembershipForm';
import { Modal, ConfirmDialog } from '../../components/Modal';
import {
  ClubsLoading as MembershipsLoading,
  ClubsError as MembershipsError,
  ClubsEmpty as MembershipsEmpty,
} from '../../components/ClubCard';
import { ApiError } from '../../api/client';

const navItems = [
  { to: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/admin/clubs', label: 'Clubs', icon: Building2 },
  { to: '/admin/events', label: 'Events', icon: CalendarDays },
  { to: '/admin/memberships', label: 'Memberships', icon: BadgeCheck },
  { to: '/admin/notices', label: 'Notices', icon: Megaphone },
];

type Filter = 'ALL' | MembershipStatus;
const FILTERS: { key: Filter; label: string }[] = [
  { key: 'ALL', label: 'All' },
  { key: 'PENDING', label: 'Pending' },
  { key: 'APPROVED', label: 'Approved' },
  { key: 'REJECTED', label: 'Rejected' },
];

export default function AdminMemberships() {
  const { user } = useAuth();
  const adminId = user?.userId ?? '';
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('ALL');

  const [editing, setEditing] = useState<Membership | null>(null);
  const [deleting, setDeleting] = useState<Membership | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [ms, cl] = await Promise.all([membershipsApi.list(), clubsApi.list()]);
      setMemberships(ms);
      setClubs(cl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load memberships.');
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
    return memberships
      .filter((m) => (filter === 'ALL' ? true : m.status === filter))
      .filter((m) => {
        if (!q) return true;
        const name = (clubNameById.get(m.clubId) ?? '').toLowerCase();
        return (
          name.includes(q) ||
          m.position.toLowerCase().includes(q) ||
          m.userId.toLowerCase().includes(q)
        );
      });
  }, [memberships, filter, query, clubNameById]);

  const counts = useMemo(() => {
    const c: Record<Filter, number> = { ALL: memberships.length, PENDING: 0, APPROVED: 0, REJECTED: 0 };
    memberships.forEach((m) => {
      c[m.status] = (c[m.status] ?? 0) + 1;
    });
    return c;
  }, [memberships]);

  const patch = (updated: Membership) =>
    setMemberships((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));

  const handleApprove = async (m: Membership) => {
    setActionError(null);
    try {
      const updated = await membershipsApi.approve(m.id, adminId);
      patch(updated);
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : 'Failed to approve.');
    }
  };

  const handleReject = async (m: Membership) => {
    setActionError(null);
    try {
      const updated = await membershipsApi.reject(m.id, adminId);
      patch(updated);
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : 'Failed to reject.');
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setDeleteLoading(true);
    try {
      await membershipsApi.remove(deleting.id);
      setMemberships((prev) => prev.filter((m) => m.id !== deleting.id));
      setDeleting(null);
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : 'Failed to delete membership.');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <DashboardShell navItems={navItems} badge="Admin">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900">Manage memberships</h1>
          <p className="mt-2 text-slate-500">Review applications, assign positions and remove members.</p>
        </div>
      </div>

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
          placeholder="Search by club, position or user..."
          className="input-field max-w-xs"
        />
      </div>

      {actionError && (
        <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {actionError}
        </div>
      )}

      <div className="mt-8">
        {loading ? (
          <MembershipsLoading label="Loading memberships..." />
        ) : error ? (
          <MembershipsError message={error} />
        ) : filtered.length === 0 ? (
          <MembershipsEmpty message={query ? 'No memberships match your search.' : 'No memberships yet.'} />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((m) => (
              <MembershipCard
                key={m.id}
                membership={m}
                clubName={clubNameById.get(m.clubId)}
                userName={m.userId}
                canManage
                onApprove={handleApprove}
                onReject={handleReject}
                onEditPosition={(mm) => setEditing(mm)}
                onDelete={(mm) => setDeleting(mm)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Edit position */}
      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title="Update member position"
        description={editing ? clubNameById.get(editing.clubId) : undefined}
      >
        {editing && (
          <PositionForm
            membership={editing}
            onSaved={(updated) => {
              patch(updated);
              setEditing(null);
            }}
            onCancel={() => setEditing(null)}
          />
        )}
      </Modal>

      {/* Delete confirmation */}
      <ConfirmDialog
        open={!!deleting}
        title="Remove membership"
        message={`Remove this member from "${deleting ? clubNameById.get(deleting.clubId) : ''}"? This cannot be undone.`}
        confirmLabel="Remove"
        loading={deleteLoading}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </DashboardShell>
  );
}
