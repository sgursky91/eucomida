import { User } from '../types/user';

export const isAdmin = (user?: User): boolean => {
  return user?.tipo === 'admin';
};