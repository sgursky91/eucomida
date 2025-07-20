import { endereco } from '../types/endereco';

export async function buscarEnderecoPorCep(cep: string): Promise<endereco | null> {
  try {
    const cepResponse = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const cepData = await cepResponse.json();

    if (cepData.erro) return null;

    return {
      cep: cepData.cep,
      logradouro: cepData.logradouro,
      bairro: cepData.bairro,
      localidade: cepData.localidade,
      uf: cepData.uf,
    };
  } catch (error) {
    return null;
  }
}