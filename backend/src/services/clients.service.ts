import pool from "../config/database";
import { Cliente } from "../types/clients.types";

export const criarCliente = async (dados: Cliente) => {

  const clienteExistente = await pool.query(
    `
    SELECT CODIGOCLIENTE
    FROM CADCLIENTE
    WHERE CPFCNPJ = $1::varchar
    `,
    [dados.cpfCnpj]
  );

  if (clienteExistente.rows.length > 0) {
    throw new Error('CPF/CNPJ já cadastrado');
  }

  const resultado = await pool.query(
    `
      INSERT INTO CADCLIENTE ( NOMECLIENTE, CPFCNPJ, FONE, EMAIL, ENDERECO, BAIRRO, NUMERO, CEP, CIDADE, ESTADO )
      VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10 )
      RETURNING *
    `,
    [ dados.nomeCliente, dados.cpfCnpj, dados.fone ?? null, dados.email ?? null, dados.endereco ?? null, dados.bairro ?? null, dados.numero ?? null, dados.cep ?? null, dados.cidade ?? null, dados.estado ?? null,
    ]
  );

  return resultado.rows[0];
};

export const obterClientes = async (nomeCliente: string) => {
  const resultado = await pool.query(
    `
      SELECT * FROM CADCLIENTE
      WHERE nomeCliente ILIKE $1
    `, [
      `%${nomeCliente}%`
    ]
  );
  return resultado.rows;
};

