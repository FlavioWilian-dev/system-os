import express from 'express';
import cors from 'cors'
import { errorMiddleware } from './middlewares/error.middleware';
import clientsRouter from './routes/clients.router';

const app = express();

app.use(cors());
app.use(express.json());
app.use(clientsRouter);
app.use(errorMiddleware);

export default app;