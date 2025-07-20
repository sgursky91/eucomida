// authService.ts - criado automaticamente
import { buscarUsuarioPorEmail } from './userService';
import { Usuario } from '../types/usuario';

export async function autenticarUsuario(email: string, senha: string): Promise<Usuario | null> {
  const usuario = await buscarUsuarioPorEmail(email);
  if (usuario && usuario.senha === senha) {
    return usuario;
  }
  return null;
}