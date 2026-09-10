import pool from '../config/database';
import { Usuario } from '../types/users.type';


export const criarUsuario = async (dados: Usuario) => {
  const usuarioExistente = await pool.query(
    `   
SELECT nomeUsuario
FROM CADUSUARIO
WHERE nomeUsuario = $1::varchar
    `,
    [dados.nomeUsuario]
  );

    if (usuarioExistente.rows.length > 0) {
    throw new Error('Nome de usuário já cadastrado');
    }

    const resultado = await pool.query(
    `
      INSERT INTO CADUSUARIO ( nomeUsuario, senha, codigoGrupoPermissao )
        VALUES ( $1, $2, $3 )
    `,
 
  );

    return resultado.rows[0];
};

export const obterUsuarios = async (dados: Usuario) => {
    const resultado = await pool.query(
    `
        SELECT * FROM CADUSUARIO
        WHERE nomeUsuario ILIKE $1
    `, [
        `%${dados.nomeUsuario}%`  
    ]
  );
  console.log('nomeUsuario', dados.nomeUsuario);
  return resultado.rows;
};
