import { Router } from 'express';

import {
    criarMovimentoOS,
    obterMovimentosOS,
    obterMovimentoOSPorCodigo,
    atualizarMovimentoOS,
    excluirMovimentoOS
} from '../modules/service-orders/moviment.controller';

import { validar } from '../middlewares/validate.middleware';
import { movimentoOSSchema } from '../schemas/moviment';

const router = Router();

router.post('/', validar(movimentoOSSchema), criarMovimentoOS);
router.get('/', obterMovimentosOS );
router.get('/:codigoMovimentoOS', obterMovimentoOSPorCodigo);
router.put('/:codigoMovimentoOS', validar(movimentoOSSchema), atualizarMovimentoOS);
router.delete('/:codigoMovimentoOS', excluirMovimentoOS);

export default router;