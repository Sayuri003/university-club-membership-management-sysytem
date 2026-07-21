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

const mono = { fontFamily: "'IBM Plex Mono', ui-monospace, monospace" };

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
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {error && <ErrorBanner>{error}</ErrorBanner>}

      <div className="space-y-1.5">
        <label style={mono} className="block text-[11px] font-medium uppercase tracking-[0.12em] text-[#14213D]/70">
          Select a club
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-[#14213D]/40">
            <Building2 className="h-4 w-4" />
          </span>
          <select
            value={clubId}
            onChange={(e) => setClubId(e.target.value)}
            disabled={loadingClubs}
            className="w-full border-0 border-b-2 border-[#14213D]/15 bg-transparent py-2.5 pl-6 text-[15px] text-[#14213D] focus:border-[#B8863B] focus:outline-none focus:ring-0"
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
          <p className="mt-1 text-xs text-[#14213D]/50">{selectedClub.description}</p>
        )}
        {!loadingClubs && available.length === 0 && (
          <p className="mt-1 text-xs text-[#B8863B]">
            You've already applied to every registered club.
          </p>
        )}
      </div>

      <div className="flex items-start gap-2.5 rounded-sm border border-[#B8863B]/30 bg-[#B8863B]/10 px-4 py-3 text-sm text-[#14213D]/70">
        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#B8863B]" />
        <span>
          Your application starts as <strong>Pending</strong> until an admin approves it.
        </span>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-[#14213D]/10 pt-5">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-2 rounded-sm border border-[#14213D]/20 px-5 py-2.5 text-sm font-semibold text-[#14213D] transition hover:border-[#14213D] hover:bg-[#14213D]/5"
        >
          <X className="h-4 w-4" /> Cancel
        </button>
        <button
          type="submit"
          disabled={saving || !clubId}
          className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#14213D] px-5 py-2.5 text-sm font-semibold text-[#F7F3E8] transition hover:bg-[#B8863B] hover:text-[#14213D] disabled:opacity-60"
        >
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

const POSITION_ACTIVE: Record<string, string> = {
  PRESIDENT: 'bg-[#14213D] text-[#F7F3E8] border-[#14213D]',
  VICE_PRESIDENT: 'bg-[#14213D] text-[#F7F3E8] border-[#14213D]',
  SECRETARY: 'bg-[#14213D] text-[#F7F3E8] border-[#14213D]',
  TREASURER: 'bg-[#B8863B] text-[#14213D] border-[#B8863B]',
  MEMBER: 'bg-[#14213D] text-[#F7F3E8] border-[#14213D]',
};

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
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {error && <ErrorBanner>{error}</ErrorBanner>}
      <div className="space-y-1.5">
        <label style={mono} className="block text-[11px] font-medium uppercase tracking-[0.12em] text-[#14213D]/70">
          Member position
        </label>
        <div className="flex flex-wrap gap-2 pt-1">
          {(['PRESIDENT', 'VICE_PRESIDENT', 'SECRETARY', 'TREASURER', 'MEMBER'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPosition(p)}
              className={`rounded-sm border px-3.5 py-2 text-sm font-medium transition ${
                position === p
                  ? POSITION_ACTIVE[p]
                  : 'border-[#14213D]/20 text-[#14213D]/70 hover:bg-[#14213D]/5'
              }`}
            >
              {p.charAt(0) + p.slice(1).toLowerCase().replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-end gap-3 border-t border-[#14213D]/10 pt-5">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-2 rounded-sm border border-[#14213D]/20 px-5 py-2.5 text-sm font-semibold text-[#14213D] transition hover:border-[#14213D] hover:bg-[#14213D]/5"
        >
          <X className="h-4 w-4" /> Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#14213D] px-5 py-2.5 text-sm font-semibold text-[#F7F3E8] transition hover:bg-[#B8863B] hover:text-[#14213D] disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save position
        </button>
      </div>
    </form>
  );
}