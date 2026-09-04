import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validar = (schema: ZodSchema) => {
  return ( req: Request, res: Response, next: NextFunction ): void => {

    const resultado = schema.safeParse(req.body);

    if (!resultado.success) {
      res.status(400).json({
        erro: 'Dados inválidos',
        detalhes: resultado.error.issues,
      });

      return;
    }

    next();
  };
};