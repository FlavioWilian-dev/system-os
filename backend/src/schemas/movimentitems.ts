import { z } from 'zod';

export const movimentoItemOSSchema = z.object({
    codigoItemOS: z
        .number()
        .int()
        .positive()
        .optional(),

    codigoMovimentoOS: z
        .number()
        .int()
        .positive('O código da OS deve ser válido'),

    codigoProduto: z
        .number()
        .int()
        .positive('O código do produto deve ser válido'),

    descricao: z
        .string()
        .min(1, 'A descrição é obrigatória')
        .max(500, 'A descrição deve possuir no máximo 500 caracteres'),

    quantidade: z
        .number()
        .positive('A quantidade deve ser maior que zero'),

    valorUnitario: z
        .number()
        .nonnegative('O valor unitário não pode ser negativo'),

    valorTotal: z
        .number()
        .nonnegative('O valor total não pode ser negativo')
});

