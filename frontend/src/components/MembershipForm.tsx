import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Building2, BadgeCheck, Loader2, Save, X } from 'lucide-react';
import { ErrorBanner } from './Feedback';
import { membershipsApi, type Membership } from '../api/memberships';
import { clubsApi, type Club } from '../api/clubs';
import { ApiError } from '../api/client';

interface ApplyMembershipFormProps {
  userId: string;
  existingClubIds: string[];
  onApplied: () => void;
  onCancel: () => void;
}

export function ApplyMembershipForm({
  userId,
  existingClubIds,
  onApplied,
  onCancel,
}: ApplyMembershipFormProps) {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loadingClubs, setLoadingClubs] = useState(true);
  const [clubId, setClubId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await clubsApi.list();
        if (active) setClubs(data);
      } catch {
        // ignore
      } finally {
        if (active) setLoadingClubs(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const available = useMemo(
    () => clubs.filter((c) => !existingClubIds.includes(c.id)),
    [clubs, existingClubIds],
  );

  const selectedClub = clubs.find((c) => c.id === clubId);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!clubId) {
      setError('Please choose a club to join.');
      return;
    }
    setSaving(true);
    try {
      await membershipsApi.apply({ userId, clubId });
      onApplied();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to submit application.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {error && <ErrorBanner>{error}</ErrorBanner>}

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700">Select a club</label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <Building2 className="h-4 w-4" />
          </span>
          <select
            value={clubId}
            onChange={(e) => setClubId(e.target.value)}
            className="input-field pl-11"
            disabled={loadingClubs}
          >
            <option value="">{loadingClubs ? 'Loading clubs...' : 'Choose a club...'}</option>
            {available.map((c) => (
              <option key={c.id} value={c.id}>
                {c.clubName}
              </option>
            ))}
          </select>
        </div>
        {selectedClub?.description && (
          <p className="mt-1 text-xs text-slate-500">{selectedClub.description}</p>
        )}
        {!loadingClubs && available.length === 0 && (
          <p className="mt-1 text-xs text-amber-600">
            You've already applied to every registered club.
          </p>
        )}
      </div>

      <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
        <BadgeCheck className="mr-1.5 inline h-4 w-4 text-emerald-600" />
        Your application starts as <strong>Pending</strong> until an admin approves it.
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="btn-ghost">
          <X className="h-4 w-4" /> Cancel
        </button>
        <button type="submit" disabled={saving || !clubId} className="btn-primary sm:w-auto">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Submit application
        </button>
      </div>
    </form>
  );
}

interface PositionFormProps {
  membership: Membership;
  onSaved: (m: Membership) => void;
  onCancel: () => void;
}

export function PositionForm({ membership, onSaved, onCancel }: PositionFormProps) {
  const [position, setPosition] = useState(membership.position);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const updated = await membershipsApi.update(membership.id, { position });
      onSaved(updated);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to update position.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {error && <ErrorBanner>{error}</ErrorBanner>}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700">Member position</label>
        <div className="flex flex-wrap gap-2">
          {(['PRESIDENT', 'VICE_PRESIDENT', 'SECRETARY', 'TREASURER', 'MEMBER'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPosition(p)}
              className={`rounded-xl px-3.5 py-2 text-sm font-medium transition ${
                position === p
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-emerald-300'
              }`}
            >
              {p.charAt(0) + p.slice(1).toLowerCase().replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="btn-ghost">
          <X className="h-4 w-4" /> Cancel
        </button>
        <button type="submit" disabled={saving} className="btn-primary sm:w-auto">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save position
        </button>
      </div>
    </form>
  );
}
