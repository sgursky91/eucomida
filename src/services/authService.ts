// authService.ts - criado automaticamente
import { buscarUsuarioPorEmail } from './userService';
import { User } from '../types/user';

export async function autenticarUsuario(email: string, senha: string): Promise<User | null> {
  const usuario = await buscarUsuarioPorEmail(email);
  if (usuario && usuario.senha === senha) {
    return usuario;
  }
  return null;
}