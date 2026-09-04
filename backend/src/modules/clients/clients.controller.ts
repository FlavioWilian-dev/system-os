import { Request, Response, NextFunction } from 'express';

import * as clientesService from '../../services/clients.service';

export const criarCliente = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
  try {
    const cliente = await clientesService.criarCliente(req.body);

    res.status(201).json(cliente);
  } catch (error) {
    next(error);
  }
};