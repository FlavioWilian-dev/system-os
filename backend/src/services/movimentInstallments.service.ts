import pool from '../config/database';

import { MovimentoParcelaOS } from '../types/movimentoInstallments';

export const criarMovimentoParcelaOS = async ( dados: MovimentoParcelaOS ) => {

    const osExistente = await pool.query(
        `
            SELECT CODIGOMOVIMENTOOS
            FROM CADMOVIMENTOOS
            WHERE CODIGOMOVIMENTOOS = $1
        `,
        [dados.codigoMovimentoOS]
    );

    if (osExistente.rows.length === 0) {
        throw new Error('OS não encontrada');
    }

    const formaPagamentoExistente = await pool.query(
        `
            SELECT CODIGOFORMAPAGAMENTO
            FROM CADFORMAPAGAMENTO
            WHERE CODIGOFORMAPAGAMENTO = $1
            AND STATUS = 'ATIVO'
        `,
        [dados.codigoFormaPagamento]
    );

    if (formaPagamentoExistente.rows.length === 0) {
        throw new Error('Forma de pagamento não encontrada ou inativa');
    }

    const parcelaExistente = await pool.query(
        `
            SELECT CODIGOPARCELAOS
            FROM CADMOVIMENTOPARCELAOS
            WHERE CODIGOMOVIMENTOOS = $1
            AND NUMEROPARCELA = $2
        `,
        [ dados.codigoMovimentoOS, dados.numeroParcela ]
    );

    if (parcelaExistente.rows.length > 0) {
        throw new Error('Número da parcela já cadastrado para esta OS');
    }

    const resultado = await pool.query(
        `
            INSERT INTO CADMOVIMENTOPARCELAOS (
                CODIGOMOVIMENTOOS,
                CODIGOFORMAPAGAMENTO,
                NUMEROPARCELA,
                VALOR,
                DATAVENCIMENTO,
                DATAPAGAMENTO,
                STATUS,
                OBSERVACAO
            )
            VALUES ( $1, $2, $3, $4, $5, $6, $7, $8 )
        
        `,
        [ dados.codigoMovimentoOS, dados.codigoFormaPagamento, dados.numeroParcela, dados.valor, dados.dataVencimento, dados.dataPagamento ?? null, dados.status, dados.observacao ?? null ]
    );

    return resultado.rows[0];
};

export const obterMovimentosParcelasOS = async ( codigoMovimentoOS: number ): Promise<MovimentoParcelaOS[]> => {

    const resultado = await pool.query(
        `
            SELECT
                CODIGOPARCELAOS AS "codigoParcelaOS",
                CODIGOMOVIMENTOOS AS "codigoMovimentoOS",
                CODIGOFORMAPAGAMENTO AS "codigoFormaPagamento",
                NUMEROPARCELA AS "numeroParcela",
                VALOR AS "valor",
                DATAVENCIMENTO AS "dataVencimento",
                DATAPAGAMENTO AS "dataPagamento",
                STATUS AS "status",
                OBSERVACAO AS "observacao"
            FROM CADMOVIMENTOPARCELAOS
            WHERE CODIGOMOVIMENTOOS = $1
            ORDER BY NUMEROPARCELA
        `,
        [codigoMovimentoOS]
    );

    return resultado.rows;
};

export const obterMovimentoParcelaOSPorCodigo = async ( codigoParcelaOS: number ) => {

    const resultado = await pool.query(
        `
            SELECT
                CODIGOPARCELAOS AS "codigoParcelaOS",
                CODIGOMOVIMENTOOS AS "codigoMovimentoOS",
                CODIGOFORMAPAGAMENTO AS "codigoFormaPagamento",
                NUMEROPARCELA AS "numeroParcela",
                VALOR AS "valor",
                DATAVENCIMENTO AS "dataVencimento",
                DATAPAGAMENTO AS "dataPagamento",
                STATUS AS "status",
                OBSERVACAO AS "observacao"
            FROM CADMOVIMENTOPARCELAOS
            WHERE CODIGOPARCELAOS = $1
        `,
        [codigoParcelaOS]
    );

    if (resultado.rows.length === 0) {
        throw new Error('Parcela da OS não encontrada');
    }

    return resultado.rows[0];
};

export const atualizarMovimentoParcelaOS = async ( codigoParcelaOS: number, dados: MovimentoParcelaOS ) => {

    const parcelaExistente = await pool.query(
        `
            SELECT CODIGOPARCELAOS
            FROM CADMOVIMENTOPARCELAOS
            WHERE CODIGOPARCELAOS = $1
        `,
        [codigoParcelaOS]
    );

    if (parcelaExistente.rows.length === 0) {
        throw new Error('Parcela da OS não encontrada');
    }

    const formaPagamentoExistente = await pool.query(
        `
            SELECT CODIGOFORMAPAGAMENTO
            FROM CADFORMAPAGAMENTO
            WHERE CODIGOFORMAPAGAMENTO = $1
            AND STATUS = 'ATIVO'
        `,
        [dados.codigoFormaPagamento]
    );

    if (formaPagamentoExistente.rows.length === 0) {
        throw new Error('Forma de pagamento não encontrada ou inativa');
    }

    const resultado = await pool.query(
        `
            UPDATE CADMOVIMENTOPARCELAOS
            SET
                CODIGOMOVIMENTOOS = $1,
                CODIGOFORMAPAGAMENTO = $2,
                NUMEROPARCELA = $3,
                VALOR = $4,
                DATAVENCIMENTO = $5,
                DATAPAGAMENTO = $6,
                STATUS = $7,
                OBSERVACAO = $8
            WHERE CODIGOPARCELAOS = $9
        `,
        [ dados.codigoMovimentoOS, dados.codigoFormaPagamento, dados.numeroParcela, dados.valor, dados.dataVencimento, dados.dataPagamento ?? null, dados.status, dados.observacao ?? null, codigoParcelaOS ]
    );

    return resultado.rows[0];
};

export const excluirMovimentoParcelaOS = async ( codigoParcelaOS: number ) => {

    const parcelaExistente = await pool.query(
        `
            SELECT CODIGOPARCELAOS
            FROM CADMOVIMENTOPARCELAOS
            WHERE CODIGOPARCELAOS = $1
        `,
        [codigoParcelaOS]
    );

    if (parcelaExistente.rows.length === 0) {
        throw new Error('Parcela da OS não encontrada');
    }

    await pool.query(
        `
            DELETE FROM CADMOVIMENTOPARCELAOS
            WHERE CODIGOPARCELAOS = $1
        `,
        [codigoParcelaOS]
    );
};

