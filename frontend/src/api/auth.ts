import { request } from './client';

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

export const authApi = {
  register: (data: RegisterRequest) =>
    request<JwtResponse>('/auth/register', { method: 'POST', body: data, auth: false }),

  login: (data: LoginRequest) =>
    request<JwtResponse>('/auth/login', { method: 'POST', body: data, auth: false }),
};
