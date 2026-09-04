import { Router } from 'express';

import { criarCliente } from '../modules/clients/clients.controller';
import { validar } from '../middlewares/validate.middleware';
import { criarClienteSchema } from '../schemas/clients.schema';

const router = Router();

router.post(
  '/',
  validar(criarClienteSchema),
  criarCliente
);

export default router;