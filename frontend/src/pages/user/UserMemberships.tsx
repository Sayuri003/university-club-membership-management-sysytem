import { useCallback, useEffect, useMemo, useState } from 'react';
import { DashboardShell } from '../../components/DashboardShell';
import { LayoutDashboard, Building2, CalendarDays, BadgeCheck, Megaphone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { membershipsApi, type Membership, type MembershipStatus } from '../../api/memberships';
import { clubsApi, type Club } from '../../api/clubs';
import { MembershipCard, MembershipsHeader } from '../../components/MembershipCard';
import { ApplyMembershipForm } from '../../components/MembershipForm';
import { Modal } from '../../components/Modal';
import {
  ClubsLoading as MembershipsLoading,
  ClubsError as MembershipsError,
  ClubsEmpty as MembershipsEmpty,
} from '../../components/ClubCard';

const navItems = [
  { to: '/user/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/user/clubs', label: 'Clubs', icon: Building2 },
  { to: '/user/events', label: 'Events', icon: CalendarDays },
  { to: '/user/memberships', label: 'Memberships', icon: BadgeCheck },
  { to: '/user/notices', label: 'Notices', icon: Megaphone },
];

type Filter = 'ALL' | MembershipStatus;
const FILTERS: { key: Filter; label: string }[] = [
  { key: 'ALL', label: 'All' },
  { key: 'PENDING', label: 'Pending' },
  { key: 'APPROVED', label: 'Approved' },
  { key: 'REJECTED', label: 'Rejected' },
];

const mono = { fontFamily: "'IBM Plex Mono', ui-monospace, monospace" };

export default function UserMemberships() {
  const { user } = useAuth();
  const userId = user?.userId ?? '';
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('ALL');
  const [applyOpen, setApplyOpen] = useState(false);

  const load = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const [ms, cl] = await Promise.all([
        membershipsApi.forUser(userId),
        clubsApi.list(),
      ]);
      setMemberships(ms);
      setClubs(cl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load memberships.');
    } finally {
      setLoading(false);
    }
  }, [userId]);

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
        return name.includes(q) || m.position.toLowerCase().includes(q);
      });
  }, [memberships, filter, query, clubNameById]);

  const counts = useMemo(() => {
    const c: Record<Filter, number> = { ALL: memberships.length, PENDING: 0, APPROVED: 0, REJECTED: 0 };
    memberships.forEach((m) => {
      c[m.status] = (c[m.status] ?? 0) + 1;
    });
    return c;
  }, [memberships]);

  const existingClubIds = useMemo(
    () => memberships.map((m) => m.clubId),
    [memberships],
  );

  return (
    <DashboardShell navItems={navItems}>
      <MembershipsHeader
        title="My memberships"
        subtitle="Track your club applications and membership status."
        count={filtered.length}
        onApply={() => setApplyOpen(true)}
      />

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
          placeholder="Search memberships..."
          className="max-w-xs border-0 border-b-2 border-[#14213D]/15 bg-transparent py-2.5 text-[15px] text-[#14213D] placeholder:text-[#14213D]/30 focus:border-[#B8863B] focus:outline-none focus:ring-0"
        />
      </div>

      <div className="mt-8">
        {loading ? (
          <MembershipsLoading label="Loading memberships..." />
        ) : error ? (
          <MembershipsError message={error} />
        ) : filtered.length === 0 ? (
          <MembershipsEmpty
            message={
              query
                ? 'No memberships match your search.'
                : 'You have not joined any clubs yet. Apply to get started.'
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((m) => (
              <MembershipCard
                key={m.id}
                membership={m}
                clubName={clubNameById.get(m.clubId)}
              />
            ))}
          </div>
        )}
      </div>

      <Modal
        open={applyOpen}
        onClose={() => setApplyOpen(false)}
        title="Apply for membership"
        description="Request to join a club. An admin will review your application."
      >
        <ApplyMembershipForm
          userId={userId}
          existingClubIds={existingClubIds}
          onApplied={() => {
            setApplyOpen(false);
            load();
          }}
          onCancel={() => setApplyOpen(false)}
        />
      </Modal>
    </DashboardShell>
  );
}