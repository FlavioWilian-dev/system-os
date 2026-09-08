import pool from "../config/database";
import { Produto } from "../types/produtos.types";


export const criarProduto = async (dados: Produto) => {

  const produtoExistente = await pool.query(
    `
    SELECT CODIGOPRODUTO
    FROM CADPRODUTO
    WHERE CODIGOPRODUTO = $1::varchar
    `,
    [dados.codigoProduto]
  );

  if (produtoExistente.rows.length > 0) {
    throw new Error('Código do produto já cadastrado');
  }

  const resultado = await pool.query(
    `
      INSERT INTO CADPRODUTO ( CODIGOPRODUTO, NOMEPRODUTO, DESCRICAO, PRECO, ESTOQUE )
      VALUES ( $1, $2, $3, $4, $5 )
    `,
    [ dados.codigoProduto, dados.nomeProduto, dados.descricao ?? null, dados.preco ?? null, dados.estoque ]
  );

  return resultado.rows[0];
};
