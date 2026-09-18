import { Router } from 'express';
import {
    criarMovimentoParcelaOS,
    obterMovimentosParcelasOS,
    obterMovimentoParcelaOSPorCodigo,
    atualizarMovimentoParcelaOS,
    excluirMovimentoParcelaOS
} from '../modules/service-orders/movimentInstallments.controller';
import { validar } from '../middlewares/validate.middleware';
import { movimentoParcelaOSSchema } from '../schemas/movimetInstallments.schema';

const router = Router();

router.post('/', validar(movimentoParcelaOSSchema), criarMovimentoParcelaOS);
router.get('/os/:codigoMovimentoOS', obterMovimentosParcelasOS);
router.get('/:codigoParcelaOS', obterMovimentoParcelaOSPorCodigo);
router.put('/:codigoParcelaOS', validar(movimentoParcelaOSSchema), atualizarMovimentoParcelaOS );
router.delete('/:codigoParcelaOS', excluirMovimentoParcelaOS);

export default router;

