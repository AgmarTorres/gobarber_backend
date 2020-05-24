import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUser {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    // Verificar se existe usuário com o mesmo email
    const checkEmail = await userRepository.findOne({
      where: { email },
    });

    if (checkEmail) {
      throw new AppError('Email address already used', 400);
    }

    // eslint-disable-next-line camelcase
    const hash_password = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hash_password,
    });

    await userRepository.save(user);
    return user;
  }
}

export default CreateUser;
