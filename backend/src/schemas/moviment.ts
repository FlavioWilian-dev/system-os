import { z } from 'zod';

export const movimentoOSSchema = z.object({
    codigoMovimentoOS: z
        .number()
        .int()
        .positive()
        .optional(),

    ordemMovimentoOS: z
        .string()
        .min(1, 'O número da OS é obrigatório')
        .max(20, 'O número da OS deve possuir no máximo 20 caracteres'),

    codigoCliente: z
        .number()
        .int()
        .positive('O código do cliente deve ser válido'),

    dataAbertura: z
        .coerce
        .date()
        .optional(),

    dataFechamento: z
        .coerce
        .date()
        .nullable()
        .optional(),

    status: z
        .enum([
            'ABERTA',
            'EM_ANDAMENTO',
            'AGUARDANDO_PECAS',
            'AGUARDANDO_CLIENTE',
            'FINALIZADA',
            'CANCELADA'
        ]),

    observacao: z
        .string()
        .max(1000, 'A observação deve possuir no máximo 1000 caracteres')
        .nullable()
        .optional(),

    total: z
        .number()
        .nonnegative('O total não pode ser negativo')
        .optional()
});