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

const mono = { fontFamily: "'IBM Plex Mono', ui-monospace, monospace" };

const STATUSES: { value: EventStatus; label: string }[] = [
  { value: 'OPEN', label: 'Open' },
  { value: 'CLOSED', label: 'Closed' },
  { value: 'CANCELLED', label: 'Cancelled' },
];

const STATUS_ACTIVE: Record<EventStatus, string> = {
  OPEN: 'bg-[#5C7A6B] text-white border-[#5C7A6B]',
  CLOSED: 'bg-[#14213D] text-white border-[#14213D]',
  CANCELLED: 'bg-[#B3413A] text-white border-[#B3413A]',
};

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
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {error && <ErrorBanner>{error}</ErrorBanner>}

      {/* Club + Title */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label style={mono} className="block text-[11px] font-medium uppercase tracking-[0.12em] text-[#14213D]/70">
            Club
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-[#14213D]/40">
              <Tag className="h-4 w-4" />
            </span>
            <select
              value={form.clubId}
              onChange={(e) => set('clubId', e.target.value)}
              disabled={clubsLoading}
              className={`w-full border-0 border-b-2 bg-transparent py-2.5 pl-6 text-[15px] text-[#14213D] focus:outline-none focus:ring-0 ${
                errors.clubId ? 'border-[#B3413A]' : 'border-[#14213D]/15 focus:border-[#B8863B]'
              }`}
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
          placeholder="e.g. Hackathon 2026"
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
          error={errors.title}
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <label style={mono} className="block text-[11px] font-medium uppercase tracking-[0.12em] text-[#14213D]/70">
          Description
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-0 top-3 text-[#14213D]/40">
            <FileText className="h-4 w-4" />
          </span>
          <textarea
            rows={2}
            placeholder="What is this event about?"
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            className="w-full resize-none border-0 border-b-2 border-[#14213D]/15 bg-transparent py-2.5 pl-6 text-[15px] text-[#14213D] placeholder:text-[#14213D]/30 focus:border-[#B8863B] focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      {/* Date, Time, Venue, Capacity */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Image + Status */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          label="Cover image URL (optional)"
          placeholder="https://images..."
          icon={<ImageIcon className="h-4 w-4" />}
          value={form.imageUrl}
          onChange={(e) => set('imageUrl', e.target.value)}
        />

        <div className="space-y-1.5">
          <label style={mono} className="block text-[11px] font-medium uppercase tracking-[0.12em] text-[#14213D]/70">
            Status
          </label>
          <div className="flex flex-wrap gap-2 pt-1">
            {STATUSES.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => set('status', s.value)}
                className={`rounded-sm border px-4 py-2 text-sm font-medium transition ${
                  form.status === s.value
                    ? STATUS_ACTIVE[s.value]
                    : 'border-[#14213D]/20 text-[#14213D]/70 hover:bg-[#14213D]/5'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live cover preview */}
      {form.imageUrl && (
        <div className="overflow-hidden rounded-sm border border-[#14213D]/12">
          <img
            src={form.imageUrl}
            alt="Cover preview"
            className="h-28 w-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}

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
          {initial ? 'Save changes' : 'Create event'}
        </button>
      </div>
    </form>
  );
}