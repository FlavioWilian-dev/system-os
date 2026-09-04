import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = ( error: Error, req: Request, res: Response, next: NextFunction ): void => {
  console.error(error);

  if (error.message === 'CPF/CNPJ já cadastrado') {
    res.status(409).json({
      erro: error.message,
    });

    return;
  }

  res.status(500).json({
    erro: 'Erro interno do servidor',
  });
};