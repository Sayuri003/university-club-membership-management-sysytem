import { useEffect, useState, type FormEvent } from 'react';
import { Mail, User, Building2, FileText, Save, X, Loader2 } from 'lucide-react';
import { Input } from './Input';
import { clubsApi, type Club, type ClubDTO } from '../api/clubs';
import { ApiError } from '../api/client';
import { ErrorBanner } from './Feedback';

interface ClubFormProps {
  initial?: Club | null;
  onSaved: (club: Club) => void;
  onCancel: () => void;
}

const empty: ClubDTO = { clubName: '', description: '', advisor: '', email: '' };
const mono = { fontFamily: "'IBM Plex Mono', ui-monospace, monospace" };

export function ClubForm({ initial, onSaved, onCancel }: ClubFormProps) {
  const [form, setForm] = useState<ClubDTO>(initial ?? empty);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(initial ?? empty);
  }, [initial]);

  const set = (key: keyof ClubDTO, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.clubName.trim()) {
      setError('Club name is required.');
      return;
    }
    setSaving(true);
    try {
      const saved = initial
        ? await clubsApi.update(initial.id, form)
        : await clubsApi.create(form);
      onSaved(saved);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to save club.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {error && <ErrorBanner>{error}</ErrorBanner>}

      <Input
        label="Club name"
        placeholder="e.g. Computer Science Society"
        icon={<Building2 className="h-4 w-4" />}
        value={form.clubName}
        onChange={(e) => set('clubName', e.target.value)}
        required
      />

      <div className="space-y-1.5">
        <label style={mono} className="block text-[11px] font-medium uppercase tracking-[0.12em] text-[#14213D]/70">
          Description
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-0 top-3 text-[#14213D]/40">
            <FileText className="h-4 w-4" />
          </span>
          <textarea
            rows={3}
            placeholder="What is this club about?"
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            className="w-full resize-none border-0 border-b-2 border-[#14213D]/15 bg-transparent py-2.5 pl-6 text-[15px] text-[#14213D] placeholder:text-[#14213D]/30 focus:border-[#B8863B] focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          label="Advisor"
          placeholder="Faculty advisor name"
          icon={<User className="h-4 w-4" />}
          value={form.advisor}
          onChange={(e) => set('advisor', e.target.value)}
        />
        <Input
          label="Contact email"
          type="email"
          placeholder="club@university.edu"
          icon={<Mail className="h-4 w-4" />}
          value={form.email}
          onChange={(e) => set('email', e.target.value)}
        />
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
          {initial ? 'Save changes' : 'Create club'}
        </button>
      </div>
    </form>
  );
}