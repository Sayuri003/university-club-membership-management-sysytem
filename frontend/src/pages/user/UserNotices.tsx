import { useCallback, useEffect, useMemo, useState } from 'react';
import { DashboardShell } from '../../components/DashboardShell';
import { LayoutDashboard, Building2, CalendarDays, BadgeCheck, Megaphone } from 'lucide-react';
import { noticesApi, type Notice } from '../../api/notices';
import { clubsApi, type Club } from '../../api/clubs';
import { NoticeCard, NoticesHeader } from '../../components/NoticeCard';
import {
  ClubsLoading as NoticesLoading,
  ClubsError as NoticesError,
  ClubsEmpty as NoticesEmpty,
} from '../../components/ClubCard';

const navItems = [
  { to: '/user/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/user/clubs', label: 'Clubs', icon: Building2 },
  { to: '/user/events', label: 'Events', icon: CalendarDays },
  { to: '/user/memberships', label: 'Memberships', icon: BadgeCheck },
  { to: '/user/notices', label: 'Notices', icon: Megaphone },
];

export default function UserNotices() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [n, cl] = await Promise.all([noticesApi.active(), clubsApi.list()]);
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
    const list = notices
      .filter((n) => n.status === 'ACTIVE')
      .filter((n) => {
        if (!q) return true;
        const name = (clubNameById.get(n.clubId) ?? '').toLowerCase();
        return (
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q) ||
          name.includes(q)
        );
      });
    return list.sort((a, b) =>
      (b.publishedAt ?? '') > (a.publishedAt ?? '') ? 1 : -1,
    );
  }, [notices, query, clubNameById]);

  return (
    <DashboardShell navItems={navItems}>
      <NoticesHeader
        title="Notices"
        subtitle="Latest announcements from your clubs."
        count={filtered.length}
      />

      <div className="mt-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search notices..."
          className="input-field max-w-md"
        />
      </div>

      <div className="mt-8 space-y-4">
        {loading ? (
          <NoticesLoading label="Loading notices..." />
        ) : error ? (
          <NoticesError message={error} />
        ) : filtered.length === 0 ? (
          <NoticesEmpty message={query ? 'No notices match your search.' : 'No active notices right now.'} />
        ) : (
          filtered.map((n) => (
            <NoticeCard key={n.id} notice={n} clubName={clubNameById.get(n.clubId)} />
          ))
        )}
      </div>
    </DashboardShell>
  );
}
