// iaService.ts - criado automaticamente
import axios from 'axios';
import { Produto } from '../types/produto';

const API_URL = 'https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta';
const HUGGINGFACE_API_KEY = 'TOKEN AQUI';

export async function gerarDicaIA(produtos: Produto[], nome: string): Promise<string> {
  const prompt = `Você é um especialista em vendas. Dê uma dica personalizada de compra para o cliente ${nome}, com base nos seguintes produtos: ${produtos.map(p => p.nome).join(', ')}.`;

  try {
    const response = await axios.post(
      API_URL,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 80000,
      }
    );

    const output = response.data?.[0]?.generated_text || response.data?.generated_text || 'Aqui vai uma dica personalizada para você!';
    return output;
  } catch (error: any) {
    //console.error('Erro na IA:', error.response?.data || error.message);
    return 'Não foi possível gerar uma dica agora. Tente novamente mais tarde.';
  }
}