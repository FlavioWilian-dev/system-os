import { z } from 'zod';

export const criarPagamentoSchema = z.object({
    descricao: z
    .string()
    .min(3, 'A descrição da forma de pagamento deve ter pelo menos 3 caracteres'),
    status: z
    .string()
    .min(1, 'O status da forma de pagamento deve ter pelo menos 1 caractere'),
});