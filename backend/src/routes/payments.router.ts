import { Router } from 'express';
import { validar } from '../middlewares/validate.middleware';
import { criarPagamentoSchema } from '../schemas/payments.schema';
import { criarPagamento, obterPagamentos } from '../modules/payments/payments.controller';

const router = Router();

router.post(
    '/', 
    validar(criarPagamentoSchema), criarPagamento);

    router.get(
    '/', 
    obterPagamentos);

export default router;