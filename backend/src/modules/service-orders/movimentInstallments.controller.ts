import { Request, Response, NextFunction } from 'express';
import * as serviceOrderInstallmentsService from '../../services/movimentInstallments.service';

export const criarMovimentoParcelaOS = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const parcela = await serviceOrderInstallmentsService.criarMovimentoParcelaOS( req.body );

        res.status(201).json(parcela);
    } catch (error) {
        next(error);
    }
};

export const obterMovimentosParcelasOS = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const codigoMovimentoOS =
            Number(req.params.codigoMovimentoOS);

        const parcelas = await serviceOrderInstallmentsService.obterMovimentosParcelasOS( codigoMovimentoOS );

        res.status(200).json(parcelas);
    } catch (error) {
        next(error);
    }
};

export const obterMovimentoParcelaOSPorCodigo = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const codigoParcelaOS =
            Number(req.params.codigoParcelaOS);

        const parcela = await serviceOrderInstallmentsService.obterMovimentoParcelaOSPorCodigo( codigoParcelaOS );

        res.status(200).json(parcela);
    } catch (error) {
        next(error);
    }
};

export const atualizarMovimentoParcelaOS = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const codigoParcelaOS =
            Number(req.params.codigoParcelaOS);

        const parcela = await serviceOrderInstallmentsService.atualizarMovimentoParcelaOS( codigoParcelaOS, req.body );

        res.status(200).json(parcela);
    } catch (error) {
        next(error);
    }
};

export const excluirMovimentoParcelaOS = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const codigoParcelaOS =
            Number(req.params.codigoParcelaOS);

        await serviceOrderInstallmentsService.excluirMovimentoParcelaOS( codigoParcelaOS );

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
