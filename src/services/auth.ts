import { http } from './http';
import type { LoginCredentials, LoginResponse, User } from '../types';

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await http.post<LoginResponse>('/auth/login', credentials);
  return response.data;
}

export async function getCurrentUser(): Promise<User> {
  const response = await http.get<User>('/auth/me');
  return response.data;
}
