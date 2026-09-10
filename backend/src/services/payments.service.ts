import pool from "../config/database";
import { Pagamento } from "../types/payments.types";

export const criarPagamento = async (dados: Pagamento): Promise<Pagamento> => {
    
    const pagamentoExistente = await pool.query(
        `
        SELECT CODIGOFORMAPAGAMENTO
        FROM CADFORMAPAGAMENTO
        WHERE DESCRICAO = $1::varchar
        `,
        [dados.descricao]
    );

    if (pagamentoExistente.rows.length > 0) {
        throw new Error('Forma de pagamento já cadastrada');
    }
   
    const resultado = await pool.query(
        `
        INSERT INTO CADFORMAPAGAMENTO ( DESCRICAO, STATUS )
        VALUES ( $1, $2 )
        `,
        [ dados.descricao, dados.status]
    );

    return resultado.rows[0];

};

export const obterPagamentos = async (dados: { status: string; descricao: string }): Promise<Pagamento[]> => {
    const resultado = await pool.query(
        `
        SELECT * FROM CADFORMAPAGAMENTO
        WHERE STATUS = $1 AND DESCRICAO ILIKE $2
        `,
        ['A', `%${dados.descricao}%`]
    );
    return resultado.rows;
};