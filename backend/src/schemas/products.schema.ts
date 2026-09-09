import { z } from 'zod';

export const criarProdutoSchema = z.object({
  codigoProduto: z
    .string()
    .min(1, 'O código do produto deve ter pelo menos 1 caractere'),
    nomeProduto: z          
    .string()
    .min(3, 'O nome do produto deve ter pelo menos 3 caracteres'),
    preco: z
    .string()
    .min(0, 'O preço do produto deve ser um número válido'),
  estoque: z
    .string()
    .min(0, 'O estoque não pode ser negativo'),
  unidade: z
    .string()
    .min(1, 'A unidade do produto deve ter pelo menos 1 caractere'),
});