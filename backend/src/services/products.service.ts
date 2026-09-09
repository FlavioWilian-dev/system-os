import pool from "../config/database";
import { Produto } from "../types/products.types";


export const criarProduto = async (dados: Produto) => {

  const produtoExistente = await pool.query(
    `
    SELECT NOMEPRODUTO
    FROM CADPRODUTO
    WHERE NOMEPRODUTO = $1::varchar
    `,
    [dados.nomeProduto]
  );

  if (produtoExistente.rows.length > 0) {
    throw new Error('Código do produto já cadastrado');
  }

  const resultado = await pool.query(
    `
      INSERT INTO CADPRODUTO ( NOMEPRODUTO, PRECO, ESTOQUE, UNIDADE )
      VALUES ( $1, $2, $3, $4 )
    `,
    [  dados.nomeProduto,  dados.preco ?? null, dados.estoque, dados.unidade ]
  );

  return resultado.rows[0];
};

export const obterProdutos = async (dados: Produto) => {
  const resultado = await pool.query(
    `
      SELECT * FROM CADPRODUTO
      WHERE nomeProduto ILIKE $1
    `, [
      `%${dados.nomeProduto}%`  
    ]
  );
  console.log('nomeProduto', dados.nomeProduto);

  return resultado.rows;
};
