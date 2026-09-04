import { Request, Response, NextFunction } from 'express';

export const autenticar = ( req: Request, res: Response, next: NextFunction ): void => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    res.status(401).json({
      erro: 'Token de autenticação não informado',
    });

    return;
  }

  const [tipo, token] = authorization.split(' ');

  if (tipo !== 'Bearer' || !token) {
    res.status(401).json({
      erro: 'Token de autenticação inválido',
    });

    return;
  }

  // A validação do JWT será implementada aqui.

  next();
};