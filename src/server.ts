import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import uploadConfig from './config/upload';
import './database/index';

const app = express();

app.use('files', express.static(uploadConfig.directory));
app.use(express.json());
app.use(routes);

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
