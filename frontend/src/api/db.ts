// localStorage-backed data store so the UCMS app works without a live backend.
// Seeded on first load with sample clubs, events, memberships and notices.
// All API clients import from here and share one in-memory + persisted store.

const PREFIX = 'ucms:';

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw == null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // ignore quota errors
  }
}

export function uid(): string {
  return crypto.randomUUID
    ? crypto.randomUUID()
    : 'id-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

interface SeedClub {
  id: string;
  clubName: string;
  description: string;
  advisor: string;
  email: string;
  createdAt: string;
}

interface SeedEvent {
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
  status: string;
  createdBy: string;
  createdAt: string;
}

interface SeedMembership {
  id: string;
  userId: string;
  clubId: string;
  position: string;
  status: string;
  approvedBy: string | null;
  joinedDate: string;
  createdAt: string;
}

interface SeedNotice {
  id: string;
  clubId: string;
  title: string;
  content: string;
  attachmentUrl: string;
  publishedBy: string;
  publishedAt: string;
  status: string;
  createdAt: string;
}

const SEED_VERSION = 'v1';

function seedIfEmpty(): void {
  if (read<string>('seed_version', '') === SEED_VERSION) return;

  const c1 = uid();
  const c2 = uid();
  const c3 = uid();

  const clubs: SeedClub[] = [
    {
      id: c1,
      clubName: 'Computer Science Society',
      description:
        'A community for tech enthusiasts to explore programming, hackathons and innovation.',
      advisor: 'Dr. Alan Turing',
      email: 'css@university.edu',
      createdAt: new Date().toISOString(),
    },
    {
      id: c2,
      clubName: 'Debate Club',
      description:
        'Sharpen your public speaking and argumentation skills in weekly debates.',
      advisor: 'Prof. Eleanor Vance',
      email: 'debate@university.edu',
      createdAt: new Date().toISOString(),
    },
    {
      id: c3,
      clubName: 'Photography Club',
      description:
        'Capture moments, learn techniques and showcase your visual storytelling.',
      advisor: 'Mr. James Wilson',
      email: 'photo@university.edu',
      createdAt: new Date().toISOString(),
    },
  ];

  const today = new Date();
  const future = (days: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  };

  const events: SeedEvent[] = [
    {
      id: uid(),
      clubId: c1,
      title: 'Spring Hackathon 2026',
      description:
        'A 24-hour coding marathon. Form teams, build projects, win prizes.',
      venue: 'Engineering Hall A',
      eventDate: future(20),
      eventTime: '09:00',
      capacity: 80,
      registeredCount: 34,
      imageUrl: '',
      status: 'OPEN',
      createdBy: 'admin@ucms.com',
      createdAt: new Date().toISOString(),
    },
    {
      id: uid(),
      clubId: c2,
      title: 'Inter-University Debate Finals',
      description: 'The championship round of our annual debate tournament.',
      venue: 'Main Auditorium',
      eventDate: future(10),
      eventTime: '14:00',
      capacity: 200,
      registeredCount: 156,
      imageUrl: '',
      status: 'OPEN',
      createdBy: 'admin@ucms.com',
      createdAt: new Date().toISOString(),
    },
    {
      id: uid(),
      clubId: c3,
      title: 'Sunset Photo Walk',
      description: 'A guided evening walk through the old town. Bring your camera.',
      venue: 'Old Town Square',
      eventDate: future(5),
      eventTime: '17:30',
      capacity: 30,
      registeredCount: 30,
      imageUrl: '',
      status: 'CLOSED',
      createdBy: 'admin@ucms.com',
      createdAt: new Date().toISOString(),
    },
  ];

  const memberships: SeedMembership[] = [
    {
      id: uid(),
      userId: 'admin@ucms.com',
      clubId: c1,
      position: 'PRESIDENT',
      status: 'APPROVED',
      approvedBy: 'admin@ucms.com',
      joinedDate: future(-30),
      createdAt: new Date().toISOString(),
    },
    {
      id: uid(),
      userId: 'admin@ucms.com',
      clubId: c2,
      position: 'MEMBER',
      status: 'PENDING',
      approvedBy: null,
      joinedDate: future(-2),
      createdAt: new Date().toISOString(),
    },
  ];

  const notices: SeedNotice[] = [
    {
      id: uid(),
      clubId: c1,
      title: 'Welcome to the new semester!',
      content:
        'Kickoff meeting this Friday at 5 PM in Room 204. Pizza will be served. New members welcome!',
      attachmentUrl: '',
      publishedBy: 'admin@ucms.com',
      publishedAt: new Date().toISOString(),
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    },
    {
      id: uid(),
      clubId: c2,
      title: 'Debate tryouts open',
      content:
        'Sign up for tryouts by sending an email to debate@university.edu. Slots are limited.',
      attachmentUrl: '',
      publishedBy: 'admin@ucms.com',
      publishedAt: new Date().toISOString(),
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    },
    {
      id: uid(),
      clubId: c3,
      title: 'Exhibition submissions',
      content:
        'Submit your best three shots for the end-of-semester exhibition by next Monday.',
      attachmentUrl: '',
      publishedBy: 'admin@ucms.com',
      publishedAt: new Date().toISOString(),
      status: 'EXPIRED',
      createdAt: new Date().toISOString(),
    },
  ];

  write('clubs', clubs);
  write('events', events);
  write('memberships', memberships);
  write('notices', notices);
  write('seed_version', SEED_VERSION);
}

seedIfEmpty();

export const store = {
  clubs: {
    list: (): SeedClub[] => read<SeedClub[]>('clubs', []),
    save: (v: SeedClub[]) => write('clubs', v),
  },
  events: {
    list: (): SeedEvent[] => read<SeedEvent[]>('events', []),
    save: (v: SeedEvent[]) => write('events', v),
  },
  memberships: {
    list: (): SeedMembership[] => read<SeedMembership[]>('memberships', []),
    save: (v: SeedMembership[]) => write('memberships', v),
  },
  notices: {
    list: (): SeedNotice[] => read<SeedNotice[]>('notices', []),
    save: (v: SeedNotice[]) => write('notices', v),
  },
};

export type { SeedClub, SeedEvent, SeedMembership, SeedNotice };
