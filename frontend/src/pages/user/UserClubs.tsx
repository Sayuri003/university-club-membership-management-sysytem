import { useEffect, useMemo, useState } from 'react';
import { DashboardShell } from '../../components/DashboardShell';
import { LayoutDashboard, Building2 } from 'lucide-react';
import { clubsApi, type Club } from '../../api/clubs';
import {
  ClubCard,
  ClubsHeader,
  SearchBar,
  ClubsLoading,
  ClubsError,
  ClubsEmpty,
} from '../../components/ClubCard';

const navItems = [
  { to: '/user/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/user/clubs', label: 'Clubs', icon: Building2 },
];

export default function UserClubs() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await clubsApi.list();
        if (active) setClubs(data);
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : 'Failed to load clubs.');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return clubs;
    return clubs.filter(
      (c) =>
        c.clubName.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.advisor.toLowerCase().includes(q),
    );
  }, [clubs, query]);

  return (
    <DashboardShell navItems={navItems}>
      <ClubsHeader
        title="Clubs"
        subtitle="Browse all university clubs registered on UCMS."
        count={filtered.length}
      />

      <div className="mt-6">
        <SearchBar value={query} onChange={setQuery} placeholder="Search by name, advisor or description..." />
      </div>

      <div className="mt-8">
        {loading ? (
          <ClubsLoading />
        ) : error ? (
          <ClubsError message={error} />
        ) : filtered.length === 0 ? (
          <ClubsEmpty message={query ? 'No clubs match your search.' : 'No clubs have been registered yet.'} />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
