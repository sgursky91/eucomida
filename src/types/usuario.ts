// user.ts - criado automaticamente
export interface Usuario {
  id: string;
  email: string;
  senha: string;
  nome: string;
  tipo: 'admin' | 'cliente';
}