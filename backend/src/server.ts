import 'dotenv/config';
import { testarConexao } from './config/database';
import app from './app';


const PORT = Number(process.env.PORT) || 3001;

const iniciarServidor = async (): Promise<void> => {
  try {
    console.log('Conectando ao banco de dados...');

    await testarConexao();

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados');
    console.error(error);

    process.exit(1);
  }
};

iniciarServidor();