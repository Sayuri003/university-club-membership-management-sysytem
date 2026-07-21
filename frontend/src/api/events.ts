import { request } from './client';

export type EventStatus = 'OPEN' | 'CLOSED' | 'CANCELLED';

export interface EventItem {
  id: string;
  clubId: string;
  title: string;
  description: string;
  venue: string;
  eventDate: string; // ISO date yyyy-mm-dd
  eventTime: string; // HH:mm
  capacity: number;
  registeredCount: number;
  imageUrl: string;
  status: EventStatus;
  createdBy?: string;
}

export interface EventDTO {
  clubId: string;
  title: string;
  description: string;
  venue: string;
  eventDate: string;
  eventTime: string;
  capacity: number;
  imageUrl: string;
  status: EventStatus;
}

function mapEvent(e: unknown): EventItem {
  const o = e as Record<string, unknown>;
  const dateVal = o.eventDate;
  let eventDate = '';
  if (dateVal) {
    eventDate = typeof dateVal === 'string' ? dateVal.slice(0, 10) : String(dateVal).slice(0, 10);
  }
  const timeVal = o.eventTime;
  let eventTime = '';
  if (timeVal) {
    eventTime = typeof timeVal === 'string' ? timeVal.slice(0, 5) : String(timeVal).slice(0, 5);
  }
  return {
    id: (o.id ?? o._id ?? '') as string,
    clubId: (o.clubId ?? '') as string,
    title: (o.title ?? '') as string,
    description: (o.description ?? '') as string,
    venue: (o.venue ?? '') as string,
    eventDate,
    eventTime,
    capacity: Number(o.capacity ?? 0),
    registeredCount: Number(o.registeredCount ?? 0),
    imageUrl: (o.imageUrl ?? '') as string,
    status: (o.status ?? 'OPEN') as EventStatus,
    createdBy: o.createdBy as string | undefined,
  };
}

export const eventsApi = {
  list: async (): Promise<EventItem[]> => {
    const data = await request<unknown[]>('/events');
    return (data ?? []).map(mapEvent);
  },

  open: async (): Promise<EventItem[]> => {
    const data = await request<unknown[]>('/events/open');
    return (data ?? []).map(mapEvent);
  },

  byClub: async (clubId: string): Promise<EventItem[]> => {
    const data = await request<unknown[]>(`/events/club/${clubId}`);
    return (data ?? []).map(mapEvent);
  },

  get: async (id: string): Promise<EventItem> => {
    const data = await request<unknown>(`/events/${id}`);
    return mapEvent(data);
  },

  create: async (dto: EventDTO): Promise<EventItem> => {
    const data = await request<unknown>('/events', { method: 'POST', body: dto });
    return mapEvent(data);
  },

  update: async (id: string, dto: EventDTO): Promise<EventItem> => {
    const data = await request<unknown>(`/events/${id}`, { method: 'PUT', body: dto });
    return mapEvent(data);
  },

  remove: async (id: string): Promise<string> => {
    return request<string>(`/events/${id}`, { method: 'DELETE' });
  },
};

export const EVENT_STATUS_META: Record<EventStatus, { label: string; classes: string; dot: string }> = {
  OPEN: { label: 'Open', classes: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
  CLOSED: { label: 'Closed', classes: 'bg-slate-200 text-slate-600', dot: 'bg-slate-400' },
  CANCELLED: { label: 'Cancelled', classes: 'bg-rose-100 text-rose-700', dot: 'bg-rose-500' },
};
