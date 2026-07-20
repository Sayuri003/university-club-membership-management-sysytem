import { useCallback, useEffect, useMemo, useState } from 'react';
import { DashboardShell } from '../../components/DashboardShell';
import { LayoutDashboard, Building2 } from 'lucide-react';
import { clubsApi, type Club, type ClubDTO } from '../../api/clubs';
import {
  ClubCard,
  ClubsHeader,
  SearchBar,
  ClubsLoading,
  ClubsError,
  ClubsEmpty,
} from '../../components/ClubCard';
import { ClubForm } from '../../components/ClubForm';
import { Modal, ConfirmDialog } from '../../components/Modal';
import { ApiError } from '../../api/client';

const navItems = [
  { to: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/admin/clubs', label: 'Clubs', icon: Building2 },
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

  return (
    <DashboardShell navItems={navItems} badge="Admin">
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
        <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {formError}
        </div>
      )}

      <div className="mt-8">
        {loading ? (
          <ClubsLoading />
        ) : error ? (
          <ClubsError message={error} />
        ) : filtered.length === 0 ? (
          <ClubsEmpty message={query ? 'No clubs match your search.' : 'No clubs yet. Create the first one.'} />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((club) => (
              <ClubCard
                key={club.id}
                club={club}
                onEdit={(c) => setEditing(c)}
                onDelete={(c) => setDeleting(c)}
              />
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
