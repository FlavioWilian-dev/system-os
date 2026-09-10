import { Request, Response, NextFunction } from 'express';

import * as usersService from '../../services/users.service';

export const criarUsuario = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
  try {
    const postUsuario = await usersService.criarUsuario(req.body);

    res.status(201).json({ message: 'Usuário criado com sucesso', data: postUsuario });
    } catch (error) {
    next(error);
    }
};

export const obterUsuarios = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
  try {
    const getUsuarios = await usersService.obterUsuarios(req.body);

    res.status(200).json({ data: getUsuarios });
    } catch (error) {
    res.status(500).json({ message: 'Erro ao obter usuários', data: error });
    next(error);
    }
};