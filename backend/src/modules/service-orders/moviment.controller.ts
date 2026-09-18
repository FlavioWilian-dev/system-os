import { Request, Response, NextFunction } from 'express';
import * as serviceOrdersService from '../../services/moviment.service';

export const criarMovimentoOS = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const movimentoOS = await serviceOrdersService.criarMovimentoOS( req.body );

        res.status(201).json(movimentoOS);
    } catch (error) {
        next(error);
    }
};

export const obterMovimentosOS = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const movimentosOS = await serviceOrdersService.obterMovimentosOS();

        res.status(200).json(movimentosOS);
    } catch (error) {
        next(error);
    }
};

export const obterMovimentoOSPorCodigo = async ( req: Request, res: Response, next: NextFunction
) => {
    try {
        const codigoMovimentoOS = Number(req.params.codigoMovimentoOS);

        const movimentoOS = await serviceOrdersService.obterMovimentoOSPorCodigo( codigoMovimentoOS );

        res.status(200).json(movimentoOS);
    } catch (error) {
        next(error);
    }
};

export const atualizarMovimentoOS = async ( req: Request, res: Response, next: NextFunction
) => {
    try {
        const codigoMovimentoOS = Number(req.params.codigoMovimentoOS);

        const movimentoOS = await serviceOrdersService.atualizarMovimentoOS( codigoMovimentoOS, req.body );

        res.status(200).json(movimentoOS);
    } catch (error) {
        next(error);
    }
};

export const excluirMovimentoOS = async ( req: Request, res: Response, next: NextFunction) => {
    try {
        const codigoMovimentoOS = Number(req.params.codigoMovimentoOS);

        await serviceOrdersService.excluirMovimentoOS( codigoMovimentoOS );

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};