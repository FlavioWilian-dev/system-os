import express from 'express';
import cors from 'cors';

import { errorMiddleware } from './middlewares/error.middleware';
import clientsRouter from './routes/clients.router';
import productsRouter from './routes/products.router';
import paymentsRouter from './routes/payments.router';
import moviment from './routes/moviment.router';
import movimentitems from './routes/movimentitems.router';
import movimentInstallments from './routes/movimentInstallmen.router';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/clientes', clientsRouter);
app.use('/api/produtos', productsRouter);
app.use('/api/pagamentos', paymentsRouter);
app.use('/api/ordens-servico', moviment);
app.use('/api/itens-os', movimentitems);
app.use('/api/parcelas-os', movimentInstallments);
app.use(errorMiddleware);

export default app;
