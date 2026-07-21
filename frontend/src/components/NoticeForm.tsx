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

const mono = { fontFamily: "'IBM Plex Mono', ui-monospace, monospace" };

const STATUS_ACTIVE: Record<string, string> = {
  ACTIVE: 'bg-[#5C7A6B] text-white border-[#5C7A6B]',
  EXPIRED: 'bg-[#14213D] text-white border-[#14213D]',
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
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {error && <ErrorBanner>{error}</ErrorBanner>}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label style={mono} className="block text-[11px] font-medium uppercase tracking-[0.12em] text-[#14213D]/70">
            Club
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-[#14213D]/40">
              <Building2 className="h-4 w-4" />
            </span>
            <select
              value={form.clubId}
              onChange={(e) => set('clubId', e.target.value)}
              disabled={clubsLoading}
              className="w-full border-0 border-b-2 border-[#14213D]/15 bg-transparent py-2.5 pl-6 text-[15px] text-[#14213D] focus:border-[#B8863B] focus:outline-none focus:ring-0"
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
      </div>

      <div className="space-y-1.5">
        <label style={mono} className="block text-[11px] font-medium uppercase tracking-[0.12em] text-[#14213D]/70">
          Content
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-0 top-3 text-[#14213D]/40">
            <FileText className="h-4 w-4" />
          </span>
          <textarea
            rows={4}
            placeholder="Write the notice content..."
            value={form.content}
            onChange={(e) => set('content', e.target.value)}
            className="w-full resize-none border-0 border-b-2 border-[#14213D]/15 bg-transparent py-2.5 pl-6 text-[15px] text-[#14213D] placeholder:text-[#14213D]/30 focus:border-[#B8863B] focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          label="Attachment URL (optional)"
          placeholder="https://..."
          icon={<Paperclip className="h-4 w-4" />}
          value={form.attachmentUrl ?? ''}
          onChange={(e) => set('attachmentUrl', e.target.value)}
        />

        {initial && (
          <div className="space-y-1.5">
            <label style={mono} className="block text-[11px] font-medium uppercase tracking-[0.12em] text-[#14213D]/70">
              Status
            </label>
            <div className="flex flex-wrap gap-2 pt-1">
              {(['ACTIVE', 'EXPIRED'] as NoticeStatus[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => set('status', s)}
                  className={`rounded-sm border px-4 py-2 text-sm font-medium transition ${
                    (form.status ?? 'ACTIVE') === s
                      ? STATUS_ACTIVE[s]
                      : 'border-[#14213D]/20 text-[#14213D]/70 hover:bg-[#14213D]/5'
                  }`}
                >
                  {s.charAt(0) + s.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
            <p className="text-xs text-[#14213D]/50">Set to "Expired" to archive this notice.</p>
          </div>
        )}
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
          {initial ? 'Save changes' : 'Publish notice'}
        </button>
      </div>
    </form>
  );
}