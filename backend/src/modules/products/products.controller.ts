import { Request, Response, NextFunction } from 'express';

import * as produtosService from '../../services/products.service';

export const criarProduto = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
  try {
    const postProduto = await produtosService.criarProduto(req.body);

    res.status(201).json({ message: 'Produto criado com sucesso', data: postProduto });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar produto', data: error });
    next(error);
  }
};

export const obterProdutos = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
  try {
    const getProdutos = await produtosService.obterProdutos(req.body);     

    res.status(200).json({ data: getProdutos });
    } catch (error) {
    res.status(500).json({ message: 'Erro ao obter produtos', data: error });
    next(error);
    }
};