import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import Users from '@modules/users/infra/typeorm/repositories/UserRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  const userRepository = new UsersRepository()
  const { email, password } = request.body;
  const authenticateUser = new AuthenticateUserService(userRepository);
  const { user, token } = await authenticateUser.execute({ email, password });

  delete user.password;

  return response.json({ user, token });
});

export default sessionRouter;
