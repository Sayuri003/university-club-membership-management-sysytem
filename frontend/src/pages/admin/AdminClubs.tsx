import { useCallback, useEffect, useMemo, useState } from 'react';
import { DashboardShell } from '../../components/DashboardShell';
import { LayoutDashboard, Building2, CalendarDays, BadgeCheck, Megaphone } from 'lucide-react';
import { clubsApi, type Club } from '../../api/clubs';
import {
  ClubCard,
  ClubsHeader,
  SearchBar,
  ClubsError,
  ClubsEmpty,
} from '../../components/ClubCard';
import { ClubForm } from '../../components/ClubForm';
import { Modal, ConfirmDialog } from '../../components/Modal';
import { ApiError } from '../../api/client';
import { PageLoader } from '../../components/PageLoader';

const navItems = [
  { to: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/admin/clubs', label: 'Clubs', icon: Building2 },
  { to: '/admin/events', label: 'Events', icon: CalendarDays },
  { to: '/admin/memberships', label: 'Memberships', icon: BadgeCheck },
  { to: '/admin/notices', label: 'Notices', icon: Megaphone },
];

export default function AdminClubs() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<Club | null>(null);
  const [deleting, setDeleting] = useState<Club | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await clubsApi.list();
      setClubs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load clubs.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

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

  const handleSaved = (club: Club) => {
    setClubs((prev) => {
      const exists = prev.some((c) => c.id === club.id);
      return exists ? prev.map((c) => (c.id === club.id ? club : c)) : [club, ...prev];
    });
    setCreateOpen(false);
    setEditing(null);
    setFormError(null);
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setDeleteLoading(true);
    try {
      await clubsApi.remove(deleting.id);
      setClubs((prev) => prev.filter((c) => c.id !== deleting.id));
      setDeleting(null);
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : 'Failed to delete club.');
    } finally {
      setDeleteLoading(false);
    }
  };

  // Full-page loader while the initial clubs fetch is in flight.
  if (loading) {
    return <PageLoader />;
  }

  return (
    <DashboardShell navItems={navItems} badge="Admin">
      {/* Hero banner */}
      <div className="relative mb-8 overflow-hidden rounded-3xl bg-[#14213D] px-6 py-10 shadow-lg sm:px-10">
        <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-[#B8863B]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-[#B8863B]/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:18px_18px]" />

        <span
          style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}
          className="relative text-xs font-semibold uppercase tracking-[0.15em] text-[#B8863B]"
        >
          Admin panel
        </span>
        <h1 className="relative mt-3 font-display text-3xl font-bold text-[#F7F3E8] sm:text-4xl">
          Manage Clubs
        </h1>
        <p className="relative mt-2 max-w-xl text-[#F7F3E8]/70">
          Create, update and remove university clubs.
        </p>
      </div>

      <ClubsHeader
        title="Manage clubs"
        subtitle="Create, update and remove university clubs."
        count={filtered.length}
        onAdd={() => setCreateOpen(true)}
        addLabel="New club"
      />

      <div className="mt-6">
        <SearchBar value={query} onChange={setQuery} placeholder="Search by name, advisor or description..." />
      </div>

      {formError && (
        <div className="mt-4 flex items-start gap-3 rounded-sm border-l-4 border-[#B3413A] bg-[#B3413A]/[0.06] px-4 py-3 text-sm text-[#7A2C26]">
          {formError}
        </div>
      )}

      <div className="mt-8">
        {error ? (
          <ClubsError message={error} />
        ) : filtered.length === 0 ? (
          <ClubsEmpty message={query ? 'No clubs match your search.' : 'No clubs yet. Create the first one.'} />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((club, i) => (
              <div
                key={club.id}
                className="animate-in fade-in slide-in-from-bottom-2 duration-500"
                style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'backwards' }}
              >
                <ClubCard
                  club={club}
                  onEdit={(c) => setEditing(c)}
                  onDelete={(c) => setDeleting(c)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create modal */}
      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create a new club"
        description="Register a new university club."
      >
        <ClubForm onSaved={handleSaved} onCancel={() => setCreateOpen(false)} />
      </Modal>

      {/* Edit modal */}
      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title="Edit club"
        description={editing?.clubName}
      >
        {editing && (
          <ClubForm
            initial={editing}
            onSaved={handleSaved}
            onCancel={() => setEditing(null)}
          />
        )}
      </Modal>

      {/* Delete confirmation */}
      <ConfirmDialog
        open={!!deleting}
        title="Delete club"
        message={`Are you sure you want to delete "${deleting?.clubName}"? This cannot be undone.`}
        confirmLabel="Delete"
        loading={deleteLoading}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </DashboardShell>
  );
}