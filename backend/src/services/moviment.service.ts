import pool from '../config/database';
import { MovimentoOS } from '../types/moviment';

export const criarMovimentoOS = async ( dados: MovimentoOS ) => {

    const ordemExistente = await pool.query(
        `
            SELECT CODIGOMOVIMENTOOS
            FROM CADMOVIMENTOOS
            WHERE ORDEMMOVIMENTOOS = $1
        `,
        [dados.ordemMovimentoOS]
    );

    if (ordemExistente.rows.length > 0) {
        throw new Error('Número da OS já cadastrado');
    }

    const clienteExistente = await pool.query(
        `
            SELECT CODIGOCLIENTE
            FROM CADCLIENTE
            WHERE CODIGOCLIENTE = $1
        `,
        [dados.codigoCliente]
    );

    if (clienteExistente.rows.length === 0) {
        throw new Error('Cliente não encontrado');
    }

    const resultado = await pool.query(
        `
            INSERT INTO CADMOVIMENTOOS (
                ORDEMMOVIMENTOOS,
                CODIGOCLIENTE,
                DATAABERTURA,
                STATUS,
                OBSERVACAO,
                TOTAL
            )
            VALUES ( $1, $2, COALESCE($3, CURRENT_TIMESTAMP), $4, $5,COALESCE($6, 0)
            )
        `,
        [ dados.ordemMovimentoOS, dados.codigoCliente, dados.dataAbertura ?? null, dados.status, dados.observacao ?? null, dados.total ?? 0 ]
    );

    return resultado.rows[0];
};


export const obterMovimentosOS = async () : Promise<MovimentoOS[]> => {

    const resultado = await pool.query(
        `
            SELECT
                CODIGOMOVIMENTOOS AS "codigoMovimentoOS",
                ORDEMMOVIMENTOOS AS "ordemMovimentoOS",
                CODIGOCLIENTE AS "codigoCliente",
                DATAABERTURA AS "dataAbertura",
                DATAFECHAMENTO AS "dataFechamento",
                STATUS AS "status",
                OBSERVACAO AS "observacao",
                TOTAL AS "total"
            FROM CADMOVIMENTOOS
            ORDER BY CODIGOMOVIMENTOOS DESC
        `
    );

    return resultado.rows;
};


export const obterMovimentoOSPorCodigo = async ( codigoMovimentoOS: number ) => {

    const resultado = await pool.query(
        `
            SELECT
                CODIGOMOVIMENTOOS AS "codigoMovimentoOS",
                ORDEMMOVIMENTOOS AS "ordemMovimentoOS",
                CODIGOCLIENTE AS "codigoCliente",
                DATAABERTURA AS "dataAbertura",
                DATAFECHAMENTO AS "dataFechamento",
                STATUS AS "status",
                OBSERVACAO AS "observacao",
                TOTAL AS "total"
            FROM CADMOVIMENTOOS
            WHERE CODIGOMOVIMENTOOS = $1
        `,
        [codigoMovimentoOS]
    );

    if (resultado.rows.length === 0) {
        throw new Error('OS não encontrada');
    }

    return resultado.rows[0];
};


export const atualizarMovimentoOS = async ( codigoMovimentoOS: number, dados: MovimentoOS ) => {

    const osExistente = await pool.query(
        `
            SELECT CODIGOMOVIMENTOOS
            FROM CADMOVIMENTOOS
            WHERE CODIGOMOVIMENTOOS = $1
        `,
        [codigoMovimentoOS]
    );

    if (osExistente.rows.length === 0) {
        throw new Error('OS não encontrada');
    }

    const resultado = await pool.query(
        `
            UPDATE CADMOVIMENTOOS
            SET
                ORDEMMOVIMENTOOS = $1,
                CODIGOCLIENTE = $2,
                DATAABERTURA = COALESCE($3, DATAABERTURA),
                DATAFECHAMENTO = COALESCE($4, DATAFECHAMENTO),
                STATUS = $5,
                OBSERVACAO = $6,
                TOTAL = $7
            WHERE CODIGOMOVIMENTOOS = $8
        `,
        [ dados.ordemMovimentoOS, dados.codigoCliente, dados.dataAbertura ?? null,  dados.dataFechamento ?? null,  dados.status,  dados.observacao ?? null, dados.total ?? 0, codigoMovimentoOS ]
    );

    return resultado.rows[0];
};


export const excluirMovimentoOS = async ( codigoMovimentoOS: number ) => {

    const osExistente = await pool.query(
        `
            SELECT CODIGOMOVIMENTOOS
            FROM CADMOVIMENTOOS
            WHERE CODIGOMOVIMENTOOS = $1
        `,
        [codigoMovimentoOS]
    );

    if (osExistente.rows.length === 0) {
        throw new Error('OS não encontrada');
    }

    await pool.query(
        `
            DELETE FROM CADMOVIMENTOOS
            WHERE CODIGOMOVIMENTOOS = $1
        `,
        [codigoMovimentoOS]
    );
};