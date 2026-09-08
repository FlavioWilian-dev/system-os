import { z } from 'zod';

export const criarProdutoSchema = z.object({
  codigoProduto: z
    .string()
    .min(1, 'O código do produto deve ter pelo menos 1 caractere'),
    nomeProduto: z          
    .string()
    .min(3, 'O nome do produto deve ter pelo menos 3 caracteres'),
  descricao: z
    .string()
    .optional(),
    preco: z
    .number()
    .optional(),
  estoque: z
    .number()
    .min(0, 'O estoque não pode ser negativo'),
});