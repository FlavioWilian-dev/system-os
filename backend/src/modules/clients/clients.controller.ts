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

export const obterClientes = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
  try {
    const clientes = await clientesService.obterClientes(req.body);  
    console.log('Clientes encontrados:', clientes);

    res.status(200).json(clientes);
  } catch (error) {
    next(error);
  }
};