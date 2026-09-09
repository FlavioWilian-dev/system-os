import pool from "../config/database";
import { Pagamento } from "../types/payments.types";

export const criarPagamento = async (dados: Pagamento): Promise<Pagamento> => {
    
    const pagamentoExistente = await pool.query(
        `
        SELECT CODIGOFORMAPAGAMENTO
        FROM CADFORMAPAGAMENTO
        WHERE DESCRIAO = $1::varchar
        `,
        [dados.descricao]
    );

    if (pagamentoExistente.rows.length > 0) {
        throw new Error('Forma de pagamento já cadastrada');
    }

    
    const resultado = await pool.query(
        `
        INSERT INTO CADFORMAPAGAMENTO ( CODIGOFORMAPAGAMENTO, DESCRICAO, STATUS )
        VALUES ( $1, $2, $3 )
        `,
        [dados.codigoFormaPagamento, dados.descricao, dados.status]
    );

    return resultado.rows[0];

};