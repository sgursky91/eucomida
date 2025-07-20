import AsyncStorage from '@react-native-async-storage/async-storage';
import { Usuario } from '../types/usuario';

const STORAGE_KEY = '@CatalogoDigitalApp:usuarios';

export async function listarUsuarios(): Promise<Usuario[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export async function salvarUsuario(usuario: Usuario): Promise<void> {
  const usuarios = await listarUsuarios();
  const index = usuarios.findIndex(u => u.id === usuario.id);
  if (index !== -1) {
    usuarios[index] = usuario;
  } else {
    usuarios.push(usuario);
  }
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
}

export async function buscarUsuarioPorEmail(email: string): Promise<Usuario | undefined> {
  const usuarios = await listarUsuarios();
  return usuarios.find(u => u.email.toLowerCase() === email.toLowerCase());
}