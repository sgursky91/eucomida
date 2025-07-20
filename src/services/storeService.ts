import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loja } from '../types/loja';

const STORAGE_KEY = '@CatalogoDigitalApp:lojas';

export async function listarLojas(): Promise<Loja[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export async function salvarLoja(loja: Loja): Promise<void> {
  const lojas = await listarLojas();
  const index = lojas.findIndex(l => l.id === loja.id);
  if (index !== -1) {
    lojas[index] = loja;
  } else {
    lojas.push(loja);
  }
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lojas));
}

export async function excluirLojaPorId(id: string): Promise<void> {
  const lojas = await listarLojas();
  const atualizadas = lojas.filter(l => l.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(atualizadas));
}

export async function buscarLojaPorId(id: string): Promise<Loja | undefined> {
  const lojas = await listarLojas();
  return lojas.find(l => l.id === id);
}