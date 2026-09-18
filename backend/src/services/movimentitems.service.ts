import pool from '../config/database';

import { MovimentoItemOS } from '../types/movimentitems';

export const criarMovimentoItemOS = async ( dados: MovimentoItemOS ) => {

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

    const produtoExistente = await pool.query(
        `
            SELECT CODIGOPRODUTO, NOMEPRODUTO, PRECO
            FROM CADPRODUTO
            WHERE CODIGOPRODUTO = $1
        `,
        [dados.codigoProduto]
    );

    if (produtoExistente.rows.length === 0) {
        throw new Error('Produto não encontrado');
    }

    const valorTotal = dados.quantidade * dados.valorUnitario;

    const resultado = await pool.query(
        `
            INSERT INTO CADMOVIMENTOITEMSOS (
                CODIGOMOVIMENTOOS,
                CODIGOPRODUTO,
                DESCRICAO,
                QUANTIDADE,
                VALORUNITARIO,
                VALORTOTAL
            )
            VALUES ( $1, $2, $3, $4, $5, $6 )
        `,
        [ dados.codigoMovimentoOS, dados.codigoProduto, dados.descricao, dados.quantidade, dados.valorUnitario, valorTotal ]
    );

    return resultado.rows[0];
};

export const obterMovimentosItensOS = async ( codigoMovimentoOS: number ): Promise<MovimentoItemOS[]> => {

    const resultado = await pool.query(
        `
            SELECT
                CODIGOITEMOS AS "codigoItemOS",
                CODIGOMOVIMENTOOS AS "codigoMovimentoOS",
                CODIGOPRODUTO AS "codigoProduto",
                DESCRICAO AS "descricao",
                QUANTIDADE AS "quantidade",
                VALORUNITARIO AS "valorUnitario",
                VALORTOTAL AS "valorTotal"
            FROM CADMOVIMENTOITEMSOS
            WHERE CODIGOMOVIMENTOOS = $1
            ORDER BY CODIGOITEMOS
        `,
        [codigoMovimentoOS]
    );

    return resultado.rows;
};

export const obterMovimentoItemOSPorCodigo = async ( codigoItemOS: number ) => {

    const resultado = await pool.query(
        `
            SELECT
                CODIGOITEMOS AS "codigoItemOS",
                CODIGOMOVIMENTOOS AS "codigoMovimentoOS",
                CODIGOPRODUTO AS "codigoProduto",
                DESCRICAO AS "descricao",
                QUANTIDADE AS "quantidade",
                VALORUNITARIO AS "valorUnitario",
                VALORTOTAL AS "valorTotal"
            FROM CADMOVIMENTOITEMSOS
            WHERE CODIGOITEMOS = $1
        `,
        [codigoItemOS]
    );

    if (resultado.rows.length === 0) {
        throw new Error('Item da OS não encontrado');
    }

    return resultado.rows[0];
};

export const atualizarMovimentoItemOS = async ( codigoItemOS: number, dados: MovimentoItemOS ) => {

    const itemExistente = await pool.query(
        `
            SELECT CODIGOITEMOS
            FROM CADMOVIMENTOITEMSOS
            WHERE CODIGOITEMOS = $1
        `,
        [codigoItemOS]
    );

    if (itemExistente.rows.length === 0) {
        throw new Error('Item da OS não encontrado');
    }

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

    const produtoExistente = await pool.query(
        `
            SELECT CODIGOPRODUTO
            FROM CADPRODUTO
            WHERE CODIGOPRODUTO = $1
        `,
        [dados.codigoProduto]
    );

    if (produtoExistente.rows.length === 0) {
        throw new Error('Produto não encontrado');
    }

    const valorTotal = dados.quantidade * dados.valorUnitario;

    const resultado = await pool.query(
        `
            UPDATE CADMOVIMENTOITEMSOS
            SET
                CODIGOMOVIMENTOOS = $1,
                CODIGOPRODUTO = $2,
                DESCRICAO = $3,
                QUANTIDADE = $4,
                VALORUNITARIO = $5,
                VALORTOTAL = $6
            WHERE CODIGOITEMOS = $7 
        `,
        [ dados.codigoMovimentoOS, dados.codigoProduto, dados.descricao, dados.quantidade, dados.valorUnitario, valorTotal, codigoItemOS ]
    );

    return resultado.rows[0];
};

export const excluirMovimentoItemOS = async ( codigoItemOS: number ) => {

    const itemExistente = await pool.query(
        `
            SELECT CODIGOITEMOS
            FROM CADMOVIMENTOITEMSOS
            WHERE CODIGOITEMOS = $1
        `,
        [codigoItemOS]
    );

    if (itemExistente.rows.length === 0) {
        throw new Error('Item da OS não encontrado');
    }

    await pool.query(
        `
            DELETE FROM CADMOVIMENTOITEMSOS
            WHERE CODIGOITEMOS = $1
        `,
        [codigoItemOS]
    );
};

