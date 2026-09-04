import { Router } from 'express';
import { criarCliente } from '../modules/clients/clients.controller';
import { validar } from '../middlewares/validate.middleware';
import { criarClienteSchema } from '../schemas/clients.schema';
import { obterClientes } from '../modules/clients/clients.controller';

const router = Router();

router.post(
  '/',
  validar(criarClienteSchema),
  criarCliente
);

router.get(
  '/',
  obterClientes
);

export default router;