import { Router } from 'express';
import { validar } from '../middlewares/validate.middleware';
import { criarProdutoSchema } from '../schemas/products.schema';
import { criarProduto, obterProdutos } from '../modules/products/products.controller';

const router = Router();

router.post('/',validar(criarProdutoSchema),criarProduto);
router.get('/',obterProdutos)

export default router;