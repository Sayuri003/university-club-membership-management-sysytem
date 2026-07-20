import { request } from './client';

export interface Club {
  id: string;
  clubName: string;
  description: string;
  advisor: string;
  email: string;
}

export interface ClubDTO {
  clubName: string;
  description: string;
  advisor: string;
  email: string;
}

function mapClub(c: unknown): Club {
  const o = c as Record<string, unknown>;
  return {
    id: (o.id ?? o._id ?? '') as string,
    clubName: (o.clubName ?? '') as string,
    description: (o.description ?? '') as string,
    advisor: (o.advisor ?? '') as string,
    email: (o.email ?? '') as string,
  };
}

export const clubsApi = {
  list: async (): Promise<Club[]> => {
    const data = await request<unknown[]>('/clubs');
    return (data ?? []).map(mapClub);
  },

  get: async (id: string): Promise<Club> => {
    const data = await request<unknown>(`/clubs/${id}`);
    return mapClub(data);
  },

  create: async (dto: ClubDTO): Promise<Club> => {
    const data = await request<unknown>('/clubs', { method: 'POST', body: dto });
    return mapClub(data);
  },

  update: async (id: string, dto: ClubDTO): Promise<Club> => {
    const data = await request<unknown>(`/clubs/${id}`, { method: 'PUT', body: dto });
    return mapClub(data);
  },

  remove: async (id: string): Promise<string> => {
    const data = await request<string>(`/clubs/${id}`, { method: 'DELETE' });
    return data;
  },
};
