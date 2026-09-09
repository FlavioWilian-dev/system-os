import { Request, Response, NextFunction } from 'express';

import * as clientesService from '../../services/clients.service';

export const criarCliente = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
  try {
    const postCliente = await clientesService.criarCliente(req.body);

    res.status(201).json({ message: 'Cliente criado com sucesso', data: postCliente });
  } catch (error) {
    next(error);
  }
};

export const obterClientes = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
  try {
    const getClientes = await clientesService.obterClientes(req.body);  

    res.status(200).json({ message: 'Clientes obtidos com sucesso', data: getClientes });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter clientes' });
    next(error);
  }
};