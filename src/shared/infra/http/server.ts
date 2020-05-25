import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import uploadConfig from '@config/upload';
import '@shared/infra/typeorm/database/index';
import AppError from '@shared/errors/AppError';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err);
  return response.status(500).json({
    status: 'error',
    message: 'Internatl server error',
  });
});

app.get('/', (request, response) => {
  return response.json({ message: 'Hello World' });
});

app.post('/users', (request, response) => {
  const { name, email } = request.body;

  const user = {
    name,
    email,
  };
  return response.json(user);
});

app.listen(3333, () => {
  console.log('Servidor executando!!!');
});