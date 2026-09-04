import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const testarConexao = async (): Promise<void> => {
  const client = await pool.connect();

  try {
    await client.query('SELECT 1');
    console.log('Conexão com o banco de dados estabelecida');
  } finally {
    client.release();
  }
};

export default pool;