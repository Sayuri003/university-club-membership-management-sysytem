import { store, uid, type SeedClub } from './db';

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

function toClub(c: SeedClub): Club {
  return { id: c.id, clubName: c.clubName, description: c.description, advisor: c.advisor, email: c.email };
}

export const clubsApi = {
  list: async (): Promise<Club[]> => store.clubs.list().map(toClub),

  get: async (id: string): Promise<Club> => {
    const c = store.clubs.list().find((x) => x.id === id);
    if (!c) throw new Error('Club not found');
    return toClub(c);
  },

  create: async (dto: ClubDTO): Promise<Club> => {
    const c: SeedClub = {
      id: uid(),
      clubName: dto.clubName,
      description: dto.description,
      advisor: dto.advisor,
      email: dto.email,
      createdAt: new Date().toISOString(),
    };
    const next = [c, ...store.clubs.list()];
    store.clubs.save(next);
    return toClub(c);
  },

  update: async (id: string, dto: ClubDTO): Promise<Club> => {
    const list = store.clubs.list();
    const idx = list.findIndex((x) => x.id === id);
    if (idx === -1) throw new Error('Club not found');
    const updated: SeedClub = {
      ...list[idx],
      clubName: dto.clubName,
      description: dto.description,
      advisor: dto.advisor,
      email: dto.email,
    };
    list[idx] = updated;
    store.clubs.save(list);
    return toClub(updated);
  },

  remove: async (id: string): Promise<string> => {
    store.clubs.save(store.clubs.list().filter((x) => x.id !== id));
    return 'Club deleted.';
  },
};
