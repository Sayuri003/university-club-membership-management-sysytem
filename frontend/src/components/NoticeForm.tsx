import { useEffect, useState, type FormEvent } from 'react';
import { Megaphone, FileText, Paperclip, Save, X, Loader2, Building2 } from 'lucide-react';
import { Input } from './Input';
import { ErrorBanner } from './Feedback';
import { noticesApi, type Notice, type NoticeDTO, type NoticeStatus } from '../api/notices';
import { clubsApi, type Club } from '../api/clubs';
import { ApiError } from '../api/client';

interface NoticeFormProps {
  initial?: Notice | null;
  publishedBy?: string;
  onSaved: (n: Notice) => void;
  onCancel: () => void;
}

const empty: NoticeDTO = {
  clubId: '',
  title: '',
  content: '',
  attachmentUrl: '',
  publishedBy: '',
  status: 'ACTIVE',
};

export function NoticeForm({ initial, publishedBy, onSaved, onCancel }: NoticeFormProps) {
  const [form, setForm] = useState<NoticeDTO>(initial ?? empty);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [clubsLoading, setClubsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(initial ? { ...initial } : { ...empty, publishedBy: publishedBy ?? '' });
  }, [initial, publishedBy]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await clubsApi.list();
        if (active) setClubs(data);
      } catch {
        // ignore
      } finally {
        if (active) setClubsLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const set = <K extends keyof NoticeDTO>(key: K, value: NoticeDTO[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.clubId) {
      setError('Please select a club.');
      return;
    }
    if (form.title.trim().length < 2) {
      setError('Title must be at least 2 characters.');
      return;
    }
    if (form.content.trim().length < 1) {
      setError('Notice content cannot be empty.');
      return;
    }
    setSaving(true);
    try {
      const saved = initial
        ? await noticesApi.update(initial.id, form)
        : await noticesApi.create(form);
      onSaved(saved);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to save notice.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {error && <ErrorBanner>{error}</ErrorBanner>}

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700">Club</label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <Building2 className="h-4 w-4" />
          </span>
          <select
            value={form.clubId}
            onChange={(e) => set('clubId', e.target.value)}
            className="input-field pl-11"
            disabled={clubsLoading}
          >
            <option value="">{clubsLoading ? 'Loading clubs...' : 'Select a club...'}</option>
            {clubs.map((c) => (
              <option key={c.id} value={c.id}>
                {c.clubName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Input
        label="Title"
        placeholder="e.g. General Meeting Announcement"
        icon={<Megaphone className="h-4 w-4" />}
        value={form.title}
        onChange={(e) => set('title', e.target.value)}
        required
      />

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700">Content</label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3.5 top-3.5 text-slate-400">
            <FileText className="h-4 w-4" />
          </span>
          <textarea
            rows={5}
            placeholder="Write the notice content..."
            value={form.content}
            onChange={(e) => set('content', e.target.value)}
            className="input-field pl-11 resize-none"
          />
        </div>
      </div>

      <Input
        label="Attachment URL (optional)"
        placeholder="https://..."
        icon={<Paperclip className="h-4 w-4" />}
        value={form.attachmentUrl ?? ''}
        onChange={(e) => set('attachmentUrl', e.target.value)}
      />

      {initial && (
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">Status</label>
          <div className="flex flex-wrap gap-2">
            {(['ACTIVE', 'EXPIRED'] as NoticeStatus[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => set('status', s)}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  (form.status ?? 'ACTIVE') === s
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-emerald-300'
                }`}
              >
                {s.charAt(0) + s.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-500">Set to "Expired" to archive this notice.</p>
        </div>
      )}

      <div className="flex items-center justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="btn-ghost">
          <X className="h-4 w-4" /> Cancel
        </button>
        <button type="submit" disabled={saving} className="btn-primary sm:w-auto">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {initial ? 'Save changes' : 'Publish notice'}
        </button>
      </div>
    </form>
  );
}
