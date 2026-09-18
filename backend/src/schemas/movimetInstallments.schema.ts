import { z } from 'zod';

export const movimentoParcelaOSSchema = z.object({
    codigoParcelaOS: z
        .number()
        .int()
        .positive()
        .optional(),

    codigoMovimentoOS: z
        .number()
        .int()
        .positive('O código da OS deve ser válido'),

    codigoFormaPagamento: z
        .number()
        .int()
        .positive('O código da forma de pagamento deve ser válido'),

    numeroParcela: z
        .number()
        .int()
        .positive('O número da parcela deve ser maior que zero'),

    valor: z
        .number()
        .positive('O valor da parcela deve ser maior que zero'),

    dataVencimento: z
        .coerce
        .date(),

    dataPagamento: z
        .coerce
        .date()
        .nullable()
        .optional(),

    status: z
        .enum([
            'PENDENTE',
            'PAGO',
            'ATRASADO',
            'CANCELADO'
        ]),

    observacao: z
        .string()
        .max(500, 'A observação deve possuir no máximo 500 caracteres')
        .nullable()
        .optional()
});
