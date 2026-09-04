import { z } from 'zod';

export const criarClienteSchema = z.object({
  nomeCliente: z
    .string()
    .min(3, 'O nome deve ter pelo menos 3 caracteres'),

  cpfCnpj: z
    .string()
    .min(11, 'CPF/CNPJ inválido'),

  fone: z
    .string()
    .optional(),

  email: z
    .string()
    .email('E-mail inválido')
    .optional(),

  endereco: z
    .string()
    .optional(),

  bairro: z
    .string()
    .optional(),

  numero: z
    .string()
    .optional(),

  cep: z
    .string()
    .optional(),

  cidade: z
    .string()
    .optional(),

  estado: z
    .string()
    .length(2, 'O estado deve possuir 2 caracteres')
    .optional(),
});
