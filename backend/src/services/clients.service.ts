import pool from "../config/database";
import { CriarCliente } from "../types/clients.typs";

export const criarCliente = async (dados: CriarCliente) => {
  const clienteExistente = await pool.query(
    `
      SELECT CODIGOCLIENTE
      FROM CADCLIENTE
      WHERE CPFCNPJ = ?
    `,
    [dados.cpfCnpj]
  );

  if (clienteExistente.rows.length > 0) {
    throw new Error('CPF/CNPJ já cadastrado');
  }

  const resultado = await pool.query(
    `
      INSERT INTO CADCLIENTE ( NOMECLIENTE, CPFCNPJ, FONE, EMAIL, ENDERECO, BAIRRO, NUMERO, CEP, CIDADE, ESTADO )
      VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )
    `,
    [ dados.nomeCliente, dados.cpfCnpj, dados.fone ?? null, dados.email ?? null, dados.endereco ?? null, dados.bairro ?? null, dados.numero ?? null, dados.cep ?? null, dados.cidade ?? null, dados.estado ?? null,
    ]
  );

  return resultado.rows[0];
};