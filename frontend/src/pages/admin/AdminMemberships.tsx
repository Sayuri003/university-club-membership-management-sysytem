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
  ClubsError as MembershipsError,
  ClubsEmpty as MembershipsEmpty,
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

type Filter = 'ALL' | MembershipStatus;
const FILTERS: { key: Filter; label: string }[] = [
  { key: 'ALL', label: 'All' },
  { key: 'PENDING', label: 'Pending' },
  { key: 'APPROVED', label: 'Approved' },
  { key: 'REJECTED', label: 'Rejected' },
];

const serif = { fontFamily: "'Newsreader', Georgia, serif" };
const mono = { fontFamily: "'IBM Plex Mono', ui-monospace, monospace" };

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

  // Full-page loader while memberships + clubs are being fetched together.
  if (loading) {
    return <PageLoader />;
  }

  return (
    <DashboardShell navItems={navItems} badge="Admin">
      <div className="flex flex-col gap-4 border-b-2 border-[#B8863B] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 style={serif} className="text-3xl font-medium text-[#14213D]">Manage memberships</h1>
          <p className="mt-2 text-[#14213D]/60">Review applications, assign positions and remove members.</p>
        </div>
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
          placeholder="Search by club, position or user..."
          className="max-w-xs border-0 border-b-2 border-[#14213D]/15 bg-transparent py-2.5 text-[15px] text-[#14213D] placeholder:text-[#14213D]/30 focus:border-[#B8863B] focus:outline-none focus:ring-0"
        />
      </div>

      {actionError && (
        <div className="mt-4 flex items-start gap-3 rounded-sm border-l-4 border-[#B3413A] bg-[#B3413A]/[0.06] px-4 py-3 text-sm text-[#7A2C26]">
          {actionError}
        </div>
      )}

      <div className="mt-8">
        {error ? (
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