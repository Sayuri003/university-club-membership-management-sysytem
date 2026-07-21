import { store, uid, type SeedNotice } from './db';

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

function toNotice(n: SeedNotice): Notice {
  return {
    id: n.id,
    clubId: n.clubId,
    title: n.title,
    content: n.content,
    attachmentUrl: n.attachmentUrl || undefined,
    publishedBy: n.publishedBy,
    publishedAt: n.publishedAt,
    status: n.status as NoticeStatus,
  };
}

export const noticesApi = {
  active: async (): Promise<Notice[]> =>
    store.notices.list().filter((n) => n.status === 'ACTIVE').map(toNotice),

  list: async (): Promise<Notice[]> => store.notices.list().map(toNotice),

  get: async (id: string): Promise<Notice> => {
    const n = store.notices.list().find((x) => x.id === id);
    if (!n) throw new Error('Notice not found');
    return toNotice(n);
  },

  forClub: async (clubId: string): Promise<Notice[]> =>
    store.notices.list().filter((n) => n.clubId === clubId).map(toNotice),

  create: async (dto: NoticeDTO): Promise<Notice> => {
    const n: SeedNotice = {
      id: uid(),
      clubId: dto.clubId,
      title: dto.title,
      content: dto.content,
      attachmentUrl: dto.attachmentUrl ?? '',
      publishedBy: dto.publishedBy ?? '',
      publishedAt: new Date().toISOString(),
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    };
    store.notices.save([n, ...store.notices.list()]);
    return toNotice(n);
  },

  update: async (id: string, dto: NoticeDTO): Promise<Notice> => {
    const list = store.notices.list();
    const idx = list.findIndex((x) => x.id === id);
    if (idx === -1) throw new Error('Notice not found');
    list[idx].title = dto.title;
    list[idx].content = dto.content;
    list[idx].attachmentUrl = dto.attachmentUrl ?? '';
    if (dto.status) list[idx].status = dto.status;
    store.notices.save(list);
    return toNotice(list[idx]);
  },

  remove: async (id: string): Promise<string> => {
    store.notices.save(store.notices.list().filter((x) => x.id !== id));
    return 'Notice deleted.';
  },
};

export const NOTICE_STATUS_META: Record<NoticeStatus, { label: string; classes: string; dot: string }> = {
  ACTIVE: { label: 'Active', classes: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
  EXPIRED: { label: 'Expired', classes: 'bg-slate-200 text-slate-600', dot: 'bg-slate-400' },
};
