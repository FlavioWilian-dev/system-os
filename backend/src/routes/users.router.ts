import { Router } from 'express';
import { validar } from '../middlewares/validate.middleware';
import { criarUsuarioSchema } from '../schemas/users.schema';
import { criarUsuario, obterUsuarios } from '../modules/users/users.controller';

const router = Router();

router.post('/usuarios', validar(criarUsuarioSchema), criarUsuario);
router.get('/usuarios', obterUsuarios);