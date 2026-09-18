import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = ( error: Error, req: Request, res: Response, next: NextFunction ): void => {
  console.error(error);

  if (error.message === 'CPF/CNPJ já cadastrado') {
    res.status(409).json({
      erro: error.message,
    });

    return;
  }
  if (error.message === 'Forma de pagamento já cadastrada') {
    res.status(409).json({
      erro: error.message,
    }); 
    return
  }
  if (error.message === 'Código do produto já cadastrado') {
    res.status(409).json({
      erro: error.message,
    }); 
    return
  }
  if (error.message === 'Nome de usuário já cadastrado') {
    res.status(409).json({
      erro: error.message,
    }); 
    return
  }
  if (error.message === 'Número da OS já cadastrado') {
    res.status(409).json({
      erro: error.message,
    });
    return;
  }
  if (error.message === 'OS não encontrada') {
    res.status(404).json({
      erro: error.message,
    });
    return;
  }
  if (error.message === 'Cliente não encontrado') {
    res.status(404).json({
      erro: error.message,
    });
    return;
  }

  res.status(500).json({
    erro: 'Erro interno do servidor',
  });
};