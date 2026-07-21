import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Tag,
  FileText,
  Image as ImageIcon,
  Save,
  X,
  Loader2,
} from 'lucide-react';
import { Input } from './Input';
import { ErrorBanner } from './Feedback';
import { eventsApi, type EventItem, type EventDTO, type EventStatus } from '../api/events';
import { clubsApi, type Club } from '../api/clubs';
import { ApiError } from '../api/client';

interface EventFormProps {
  initial?: EventItem | null;
  onSaved: (event: EventItem) => void;
  onCancel: () => void;
}

const empty: EventDTO = {
  clubId: '',
  title: '',
  description: '',
  venue: '',
  eventDate: '',
  eventTime: '',
  capacity: 0,
  imageUrl: '',
  status: 'OPEN',
};

const STATUSES: EventStatus[] = ['OPEN', 'CLOSED', 'CANCELLED'];

export function EventForm({ initial, onSaved, onCancel }: EventFormProps) {
  const [form, setForm] = useState<EventDTO>(initial ?? empty);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [clubsLoading, setClubsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(initial ?? empty);
  }, [initial]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await clubsApi.list();
        if (active) setClubs(data);
      } catch {
        // ignore — club selector will just be empty
      } finally {
        if (active) setClubsLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const set = <K extends keyof EventDTO>(key: K, value: EventDTO[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const errors = useMemo(
    () => ({
      clubId: !form.clubId ? 'Select a club.' : undefined,
      title: form.title.trim().length < 2 ? 'Enter a title.' : undefined,
      eventDate: !form.eventDate ? 'Pick a date.' : undefined,
      eventTime: !form.eventTime ? 'Pick a time.' : undefined,
      capacity: form.capacity < 0 ? 'Cannot be negative.' : undefined,
    }),
    [form],
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const invalid = Object.values(errors).some(Boolean);
    if (invalid) {
      setError('Please complete the required fields.');
      return;
    }
    setSaving(true);
    try {
      const saved = initial
        ? await eventsApi.update(initial.id, form)
        : await eventsApi.create(form);
      onSaved(saved);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to save event.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {error && <ErrorBanner>{error}</ErrorBanner>}

      {/* Club + title */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700">Club</label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <Tag className="h-4 w-4" />
          </span>
          <select
            value={form.clubId}
            onChange={(e) => set('clubId', e.target.value)}
            className={`input-field pl-11 ${errors.clubId ? 'border-rose-400' : ''}`}
            disabled={clubsLoading}
          >
            <option value="">{clubsLoading ? 'Loading clubs...' : 'Select a club...'}</option>
            {clubs.map((c) => (
              <option key={c.id} value={c.id}>{c.clubName}</option>
            ))}
          </select>
        </div>
      </div>

      <Input
        label="Title"
        placeholder="e.g. Hackathon 2025"
        value={form.title}
        onChange={(e) => set('title', e.target.value)}
        error={errors.title}
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
            placeholder="What is this event about?"
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            className="input-field pl-11 resize-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Date"
          type="date"
          icon={<CalendarDays className="h-4 w-4" />}
          value={form.eventDate}
          onChange={(e) => set('eventDate', e.target.value)}
          error={errors.eventDate}
          required
        />
        <Input
          label="Time"
          type="time"
          icon={<Clock className="h-4 w-4" />}
          value={form.eventTime}
          onChange={(e) => set('eventTime', e.target.value)}
          error={errors.eventTime}
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Venue"
          placeholder="Main hall, Block A"
          icon={<MapPin className="h-4 w-4" />}
          value={form.venue}
          onChange={(e) => set('venue', e.target.value)}
        />
        <Input
          label="Capacity"
          type="number"
          min={0}
          placeholder="0 = unlimited"
          icon={<Users className="h-4 w-4" />}
          value={form.capacity === 0 ? '' : form.capacity}
          onChange={(e) => set('capacity', Number(e.target.value) || 0)}
          error={errors.capacity}
        />
      </div>

      <Input
        label="Cover image URL (optional)"
        placeholder="https://images..."
        icon={<ImageIcon className="h-4 w-4" />}
        value={form.imageUrl}
        onChange={(e) => set('imageUrl', e.target.value)}
      />

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700">Status</label>
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => set('status', s)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                form.status === s
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-emerald-300'
              }`}
            >
              {s.charAt(0) + s.slice(1).toLowerCase()}
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
          {initial ? 'Save changes' : 'Create event'}
        </button>
      </div>
    </form>
  );
}
