import { useEffect, useMemo, useState } from 'react';
import { DashboardShell } from '../../components/DashboardShell';
import { LayoutDashboard, Building2, CalendarDays, BadgeCheck, Megaphone, Sparkles } from 'lucide-react';
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
  { to: '/user/events', label: 'Events', icon: CalendarDays },
  { to: '/user/memberships', label: 'Memberships', icon: BadgeCheck },
  { to: '/user/notices', label: 'Notices', icon: Megaphone },
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
      {/* Hero banner */}
      <div className="relative mb-8 overflow-hidden rounded-3xl bg-[#14213D] px-6 py-10 shadow-lg sm:px-10">
        <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-[#B8863B]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-[#B8863B]/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:18px_18px]" />

        <div className="relative flex items-center gap-2 text-[#B8863B]">
          <Sparkles className="h-4 w-4" />
          <span
            style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}
            className="text-xs font-semibold uppercase tracking-[0.15em]"
          >
            Discover & connect
          </span>
        </div>
        <h1 className="relative mt-3 font-display text-3xl font-bold text-[#F7F3E8] sm:text-4xl">
          University Clubs
        </h1>
        <p className="relative mt-2 max-w-xl text-[#F7F3E8]/70">
          Browse all university clubs registered on UCMS and find your community.
        </p>
      </div>

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
            {filtered.map((club, i) => (
              <div
                key={club.id}
                className="animate-in fade-in slide-in-from-bottom-2 duration-500"
                style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'backwards' }}
              >
                <ClubCard club={club} />
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}