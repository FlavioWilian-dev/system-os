import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = ( error: Error, res: Response, next: NextFunction ): void => {
  console.error(error);

  res.status(500).json({
    erro: 'Erro interno do servidor',
  });
};