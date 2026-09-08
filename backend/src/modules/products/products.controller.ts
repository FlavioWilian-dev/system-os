import { Request, Response, NextFunction } from 'express';

import * as produtosService from '../../services/products.service';

export const criarProduto = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
  try {
    const produto = await produtosService.criarProduto(req.body);

    console.log('Produto criado com sucesso:', produto);
    res.status(201).json(produto);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar produto' });
    next(error);
  }
};

export const obterProdutos = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
  try {
    const produtos = await produtosService.obterProdutos(req.body);     

    console.log('Produtos obtidos com sucesso:', produtos);
    res.status(200).json(produtos);
    } catch (error) {
    res.status(500).json({ message: 'Erro ao obter produtos' });
    next(error);
    }
};