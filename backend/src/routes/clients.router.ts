import { Router } from 'express';
import { validar } from '../middlewares/validate.middleware';
import { criarClienteSchema } from '../schemas/clients.schema';
import { criarCliente, obterClientes } from '../modules/clients/clients.controller';

const router = Router();

router.post('/', validar(criarClienteSchema), criarCliente);
router.get('/', obterClientes);

export default router;