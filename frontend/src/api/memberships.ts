import { request } from './client';

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

function mapMembership(m: unknown): Membership {
  const o = m as Record<string, unknown>;
  return {
    id: (o.id ?? o._id ?? '') as string,
    userId: (o.userId ?? '') as string,
    clubId: (o.clubId ?? '') as string,
    position: (o.position ?? 'MEMBER') as MemberPosition,
    status: (o.status ?? 'PENDING') as MembershipStatus,
    approvedBy: o.approvedBy as string | undefined,
    joinedDate: o.joinedDate as string | undefined,
  };
}

export const membershipsApi = {
  apply: async (dto: MembershipDTO): Promise<Membership> => {
    const data = await request<unknown>('/memberships', { method: 'POST', body: dto });
    return mapMembership(data);
  },

  get: async (id: string): Promise<Membership> => {
    const data = await request<unknown>(`/memberships/${id}`);
    return mapMembership(data);
  },

  forUser: async (userId: string): Promise<Membership[]> => {
    const data = await request<unknown[]>(`/memberships/user/${userId}`);
    return (data ?? []).map(mapMembership);
  },

  list: async (): Promise<Membership[]> => {
    const data = await request<unknown[]>('/memberships');
    return (data ?? []).map(mapMembership);
  },

  update: async (id: string, dto: MembershipDTO): Promise<Membership> => {
    const data = await request<unknown>(`/memberships/${id}`, { method: 'PUT', body: dto });
    return mapMembership(data);
  },

  approve: async (id: string, adminId: string): Promise<Membership> => {
    const data = await request<unknown>(`/memberships/${id}/approve/${adminId}`, { method: 'PUT' });
    return mapMembership(data);
  },

  reject: async (id: string, adminId: string): Promise<Membership> => {
    const data = await request<unknown>(`/memberships/${id}/reject/${adminId}`, { method: 'PUT' });
    return mapMembership(data);
  },

  remove: async (id: string): Promise<string> => {
    return request<string>(`/memberships/${id}`, { method: 'DELETE' });
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
