import type { UserRole } from '@/types/database';

export interface User {
  id?: string;
  name: string;
  email: string;
  crp: string;
  role?: UserRole;
  isLoggedIn: boolean;
  isAdmin: boolean;
}

export const EMPTY_USER: User = {
  name: '',
  email: '',
  crp: '',
  isLoggedIn: false,
  isAdmin: false,
};
