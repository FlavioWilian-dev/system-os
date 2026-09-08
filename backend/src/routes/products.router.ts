import { Router } from 'express';
import { criarProduto, obterProdutos } from '../modules/products/products.controller';
import { validar } from '../middlewares/validate.middleware';
import { criarProdutoSchema } from '../schemas/products.schema';

const router = Router();

router.post(
    '/',
    validar(criarProdutoSchema),
    criarProduto
);

router.get(
    '/',
    obterProdutos
)

export default router;