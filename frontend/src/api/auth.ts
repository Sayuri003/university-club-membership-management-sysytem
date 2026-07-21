// Local auth — no backend required.
// Registers and logs in users against a localStorage user table.
// The seeded admin account is admin@ucms.com / Admin@123.

export type Role = 'USER' | 'ADMIN';

export interface JwtResponse {
  token: string;
  type: string;
  email: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  studentId: string;
  department: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

const ADMIN_EMAIL = 'admin@ucms.com';
const ADMIN_PASSWORD = 'Admin@123';
const USERS_KEY = 'ucms:users';

interface StoredUser {
  fullName: string;
  email: string;
  password: string;
  studentId: string;
  department: string;
}

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function makeToken(email: string): string {
  return btoa(`${email}:${Date.now()}`);
}

export const authApi = {
  register: async (data: RegisterRequest): Promise<JwtResponse> => {
    const email = data.email.toLowerCase();
    const users = readUsers();
    if (email === ADMIN_EMAIL) {
      throw new Error('That email is reserved.');
    }
    if (users.some((u) => u.email === email)) {
      throw new Error('That email is already registered.');
    }
    const user: StoredUser = {
      fullName: data.fullName,
      email,
      password: data.password,
      studentId: data.studentId,
      department: data.department,
    };
    writeUsers([...users, user]);
    return { token: makeToken(email), type: 'Bearer', email };
  },

  login: async (data: LoginRequest): Promise<JwtResponse> => {
    const email = data.email.toLowerCase();
    if (email === ADMIN_EMAIL) {
      if (data.password !== ADMIN_PASSWORD) {
        throw new Error('Invalid email or password.');
      }
      return { token: makeToken(email), type: 'Bearer', email };
    }
    const user = readUsers().find((u) => u.email === email);
    if (!user || user.password !== data.password) {
      throw new Error('Invalid email or password.');
    }
    return { token: makeToken(email), type: 'Bearer', email };
  },
};
