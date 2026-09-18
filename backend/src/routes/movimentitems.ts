import { Router } from 'express';

import {
    criarMovimentoItemOS,
    obterMovimentosItensOS,
    obterMovimentoItemOSPorCodigo,
    atualizarMovimentoItemOS,
    excluirMovimentoItemOS
} from '../modules/service-orders/movimentitems.controller';
import { validar } from '../middlewares/validate.middleware';
import { movimentoItemOSSchema } from '../schemas/movimentitems';

const router = Router();

router.post('/', validar(movimentoItemOSSchema), criarMovimentoItemOS);
router.get('/os/:codigoMovimentoOS', obterMovimentosItensOS);
router.get('/:codigoItemOS', obterMovimentoItemOSPorCodigo);
router.put('/:codigoItemOS', validar(movimentoItemOSSchema), atualizarMovimentoItemOS);
router.delete('/:codigoItemOS', excluirMovimentoItemOS);

export default router;

