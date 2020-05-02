import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

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
      throw new Error('Email address already used');
    }

    const hash_password = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hash_password,
    });

    userRepository.save(user);
    return user;
  }
}

export default CreateUser;
