import { Usuario } from '../types/usuario';

export const isAdmin = (user?: Usuario): boolean => {
  return user?.tipo === 'admin';
};