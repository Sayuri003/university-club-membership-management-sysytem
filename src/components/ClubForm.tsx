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
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
        <label className="block text-sm font-medium text-slate-700">Description</label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3.5 top-3.5 text-slate-400">
            <FileText className="h-4 w-4" />
          </span>
          <textarea
            rows={3}
            placeholder="What is this club about?"
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            className="input-field pl-11 resize-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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

      <div className="flex items-center justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="btn-ghost">
          <X className="h-4 w-4" /> Cancel
        </button>
        <button type="submit" disabled={saving} className="btn-primary sm:w-auto">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {initial ? 'Save changes' : 'Create club'}
        </button>
      </div>
    </form>
  );
}
