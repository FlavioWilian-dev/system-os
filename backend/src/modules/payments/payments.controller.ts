import { Request, Response, NextFunction } from 'express';

import * as pagamentosService from '../../services/payments.service';

export const criarPagamento = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
  try {
    const postPagamento = await pagamentosService.criarPagamento(req.body);
    res.status(201).json(postPagamento);
    
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar pagamento' });
    next(error);
  }
};

export const obterPagamentos = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
    try {
        const getPagamentos = await pagamentosService.obterPagamentos(req.body);
        res.status(200).json(getPagamentos);
    } catch (error) {   
        res.status(500).json({ message: 'Erro ao obter pagamentos' });
        next(error);
    }
}