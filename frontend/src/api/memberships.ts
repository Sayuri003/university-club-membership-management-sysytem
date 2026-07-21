import { store, uid, type SeedMembership } from './db';

export type MemberPosition = 'PRESIDENT' | 'VICE_PRESIDENT' | 'SECRETARY' | 'TREASURER' | 'MEMBER';
export type MembershipStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Membership {
  id: string;
  userId: string;
  clubId: string;
  position: MemberPosition;
  status: MembershipStatus;
  approvedBy?: string;
  joinedDate?: string;
}

export interface MembershipDTO {
  userId?: string;
  clubId?: string;
  position?: MemberPosition;
  status?: MembershipStatus;
  approvedBy?: string;
}

function toMembership(m: SeedMembership): Membership {
  return {
    id: m.id,
    userId: m.userId,
    clubId: m.clubId,
    position: m.position as MemberPosition,
    status: m.status as MembershipStatus,
    approvedBy: m.approvedBy ?? undefined,
    joinedDate: m.joinedDate,
  };
}

export const membershipsApi = {
  apply: async (dto: MembershipDTO): Promise<Membership> => {
    if (!dto.userId || !dto.clubId) throw new Error('User and club are required.');
    const list = store.memberships.list();
    if (list.some((m) => m.userId === dto.userId && m.clubId === dto.clubId)) {
      throw new Error('Already applied.');
    }
    const m: SeedMembership = {
      id: uid(),
      userId: dto.userId,
      clubId: dto.clubId,
      position: 'MEMBER',
      status: 'PENDING',
      approvedBy: null,
      joinedDate: new Date().toISOString().slice(0, 10),
      createdAt: new Date().toISOString(),
    };
    store.memberships.save([m, ...list]);
    return toMembership(m);
  },

  get: async (id: string): Promise<Membership> => {
    const m = store.memberships.list().find((x) => x.id === id);
    if (!m) throw new Error('Membership not found');
    return toMembership(m);
  },

  forUser: async (userId: string): Promise<Membership[]> =>
    store.memberships.list().filter((m) => m.userId === userId).map(toMembership),

  list: async (): Promise<Membership[]> => store.memberships.list().map(toMembership),

  update: async (id: string, dto: MembershipDTO): Promise<Membership> => {
    const list = store.memberships.list();
    const idx = list.findIndex((x) => x.id === id);
    if (idx === -1) throw new Error('Membership not found');
    if (dto.position) list[idx].position = dto.position;
    store.memberships.save(list);
    return toMembership(list[idx]);
  },

  approve: async (id: string, adminId: string): Promise<Membership> => {
    const list = store.memberships.list();
    const idx = list.findIndex((x) => x.id === id);
    if (idx === -1) throw new Error('Membership not found');
    list[idx].status = 'APPROVED';
    list[idx].approvedBy = adminId;
    store.memberships.save(list);
    return toMembership(list[idx]);
  },

  reject: async (id: string, adminId: string): Promise<Membership> => {
    const list = store.memberships.list();
    const idx = list.findIndex((x) => x.id === id);
    if (idx === -1) throw new Error('Membership not found');
    list[idx].status = 'REJECTED';
    list[idx].approvedBy = adminId;
    store.memberships.save(list);
    return toMembership(list[idx]);
  },

  remove: async (id: string): Promise<string> => {
    store.memberships.save(store.memberships.list().filter((x) => x.id !== id));
    return 'Membership deleted.';
  },
};

export const POSITION_META: Record<MemberPosition, { label: string; classes: string }> = {
  PRESIDENT: { label: 'President', classes: 'bg-amber-100 text-amber-700' },
  VICE_PRESIDENT: { label: 'Vice President', classes: 'bg-sky-100 text-sky-700' },
  SECRETARY: { label: 'Secretary', classes: 'bg-violet-100 text-violet-700' },
  TREASURER: { label: 'Treasurer', classes: 'bg-teal-100 text-teal-700' },
  MEMBER: { label: 'Member', classes: 'bg-slate-100 text-slate-600' },
};

export const MEMBERSHIP_STATUS_META: Record<
  MembershipStatus,
  { label: string; classes: string; dot: string }
> = {
  PENDING: { label: 'Pending', classes: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
  APPROVED: { label: 'Approved', classes: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
  REJECTED: { label: 'Rejected', classes: 'bg-rose-100 text-rose-700', dot: 'bg-rose-500' },
};

export const POSITIONS: MemberPosition[] = [
  'PRESIDENT',
  'VICE_PRESIDENT',
  'SECRETARY',
  'TREASURER',
  'MEMBER',
];
