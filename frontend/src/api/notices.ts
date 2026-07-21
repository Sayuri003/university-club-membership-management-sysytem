import { request } from './client';

export type NoticeStatus = 'ACTIVE' | 'EXPIRED';

export interface Notice {
  id: string;
  clubId: string;
  title: string;
  content: string;
  attachmentUrl?: string;
  publishedBy?: string;
  publishedAt?: string;
  status: NoticeStatus;
}

export interface NoticeDTO {
  clubId: string;
  title: string;
  content: string;
  attachmentUrl?: string;
  publishedBy?: string;
  status?: NoticeStatus;
}

function mapNotice(n: unknown): Notice {
  const o = n as Record<string, unknown>;
  return {
    id: (o.id ?? o._id ?? '') as string,
    clubId: (o.clubId ?? '') as string,
    title: (o.title ?? '') as string,
    content: (o.content ?? '') as string,
    attachmentUrl: o.attachmentUrl as string | undefined,
    publishedBy: o.publishedBy as string | undefined,
    publishedAt: o.publishedAt as string | undefined,
    status: (o.status ?? 'ACTIVE') as NoticeStatus,
  };
}

export const noticesApi = {
  active: async (): Promise<Notice[]> => {
    const data = await request<unknown[]>('/notices');
    return (data ?? []).map(mapNotice);
  },

  list: async (): Promise<Notice[]> => {
    // The backend's GET /api/notices returns only ACTIVE ones for users.
    // Admins need all notices; the same endpoint is the closest available.
    const data = await request<unknown[]>('/notices');
    return (data ?? []).map(mapNotice);
  },

  get: async (id: string): Promise<Notice> => {
    const data = await request<unknown>(`/notices/${id}`);
    return mapNotice(data);
  },

  forClub: async (clubId: string): Promise<Notice[]> => {
    const data = await request<unknown[]>(`/notices/club/${clubId}`);
    return (data ?? []).map(mapNotice);
  },

  create: async (dto: NoticeDTO): Promise<Notice> => {
    const data = await request<unknown>('/notices', { method: 'POST', body: dto });
    return mapNotice(data);
  },

  update: async (id: string, dto: NoticeDTO): Promise<Notice> => {
    const data = await request<unknown>(`/notices/${id}`, { method: 'PUT', body: dto });
    return mapNotice(data);
  },

  remove: async (id: string): Promise<string> => {
    return request<string>(`/notices/${id}`, { method: 'DELETE' });
  },
};

export const NOTICE_STATUS_META: Record<NoticeStatus, { label: string; classes: string; dot: string }> = {
  ACTIVE: { label: 'Active', classes: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
  EXPIRED: { label: 'Expired', classes: 'bg-slate-200 text-slate-600', dot: 'bg-slate-400' },
};
