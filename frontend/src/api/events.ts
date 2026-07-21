import { store, uid, type SeedEvent } from './db';

export type EventStatus = 'OPEN' | 'CLOSED' | 'CANCELLED';

export interface EventItem {
  id: string;
  clubId: string;
  title: string;
  description: string;
  venue: string;
  eventDate: string;
  eventTime: string;
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

function toEvent(e: SeedEvent): EventItem {
  return {
    id: e.id,
    clubId: e.clubId,
    title: e.title,
    description: e.description,
    venue: e.venue,
    eventDate: e.eventDate,
    eventTime: e.eventTime,
    capacity: e.capacity,
    registeredCount: e.registeredCount,
    imageUrl: e.imageUrl,
    status: e.status as EventStatus,
    createdBy: e.createdBy,
  };
}

export const eventsApi = {
  list: async (): Promise<EventItem[]> => store.events.list().map(toEvent),

  open: async (): Promise<EventItem[]> =>
    store.events.list().filter((e) => e.status === 'OPEN').map(toEvent),

  byClub: async (clubId: string): Promise<EventItem[]> =>
    store.events.list().filter((e) => e.clubId === clubId).map(toEvent),

  get: async (id: string): Promise<EventItem> => {
    const e = store.events.list().find((x) => x.id === id);
    if (!e) throw new Error('Event not found');
    return toEvent(e);
  },

  create: async (dto: EventDTO): Promise<EventItem> => {
    const e: SeedEvent = {
      id: uid(),
      clubId: dto.clubId,
      title: dto.title,
      description: dto.description,
      venue: dto.venue,
      eventDate: dto.eventDate,
      eventTime: dto.eventTime,
      capacity: dto.capacity,
      registeredCount: 0,
      imageUrl: dto.imageUrl,
      status: dto.status,
      createdBy: dto.clubId,
      createdAt: new Date().toISOString(),
    };
    store.events.save([e, ...store.events.list()]);
    return toEvent(e);
  },

  update: async (id: string, dto: EventDTO): Promise<EventItem> => {
    const list = store.events.list();
    const idx = list.findIndex((x) => x.id === id);
    if (idx === -1) throw new Error('Event not found');
    const updated: SeedEvent = {
      ...list[idx],
      clubId: dto.clubId,
      title: dto.title,
      description: dto.description,
      venue: dto.venue,
      eventDate: dto.eventDate,
      eventTime: dto.eventTime,
      capacity: dto.capacity,
      imageUrl: dto.imageUrl,
      status: dto.status,
    };
    list[idx] = updated;
    store.events.save(list);
    return toEvent(updated);
  },

  remove: async (id: string): Promise<string> => {
    store.events.save(store.events.list().filter((x) => x.id !== id));
    return 'Event deleted.';
  },
};

export const EVENT_STATUS_META: Record<EventStatus, { label: string; classes: string; dot: string }> = {
  OPEN: { label: 'Open', classes: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
  CLOSED: { label: 'Closed', classes: 'bg-slate-200 text-slate-600', dot: 'bg-slate-400' },
  CANCELLED: { label: 'Cancelled', classes: 'bg-rose-100 text-rose-700', dot: 'bg-rose-500' },
};
