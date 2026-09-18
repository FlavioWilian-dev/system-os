import { Request, Response, NextFunction } from 'express';

import * as serviceOrderItemsService from '../../services/movimentitems.service';

export const criarMovimentoItemOS = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const item = await serviceOrderItemsService.criarMovimentoItemOS( req.body );

        res.status(201).json(item);
    } catch (error) {
        next(error);
    }
};

export const obterMovimentosItensOS = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const codigoMovimentoOS = Number(req.params.codigoMovimentoOS);

        const itens = await serviceOrderItemsService.obterMovimentosItensOS( codigoMovimentoOS );

        res.status(200).json(itens);
    } catch (error) {
        next(error);
    }
};

export const obterMovimentoItemOSPorCodigo = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const codigoItemOS = Number(req.params.codigoItemOS);

        const item = await serviceOrderItemsService.obterMovimentoItemOSPorCodigo( codigoItemOS );

        res.status(200).json(item);
    } catch (error) {
        next(error);
    }
};

export const atualizarMovimentoItemOS = async ( req: Request, res: Response, next: NextFunction
) => {
    try {
        const codigoItemOS = Number(req.params.codigoItemOS);

        const item = await serviceOrderItemsService.atualizarMovimentoItemOS( codigoItemOS, req.body );

        res.status(200).json(item);
    } catch (error) {
        next(error);
    }
};

export const excluirMovimentoItemOS = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const codigoItemOS = Number(req.params.codigoItemOS);

        await serviceOrderItemsService.excluirMovimentoItemOS( codigoItemOS );

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

