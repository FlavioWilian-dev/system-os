import { Request, Response, NextFunction } from 'express';

import * as produtosService from '../../services/products.service';

export const criarProduto = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
  try {
    const produto = await produtosService.criarProduto(req.body);

    res.status(201).json({ message: 'Produto criado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar produto' });
    next(error);
  }
};

export const obterProdutos = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
  try {
    const produtos = await produtosService.obterProdutos(req.body);     

    res.status(200).json({ message: 'Produtos obtidos com sucesso' });
    } catch (error) {
    res.status(500).json({ message: 'Erro ao obter produtos' });
    next(error);
    }
};