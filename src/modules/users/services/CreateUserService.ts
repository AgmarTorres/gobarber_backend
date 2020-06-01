import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
 import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository'

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUser {

  constructor( private userRepository: IUserRepository){
  }

  public async execute({ name, email, password }: IRequest): Promise<User> {

    // Verificar se existe usuário com o mesmo email
    const checkEmail = await this.userRepository.findByEmail(email);

    if (checkEmail) {
      throw new AppError('Email address already used', 400);
    }

    const hash_password = await hash(password, 8);

    const user = await this.userRepository.create({
      name,
      email,
      password: hash_password,
    });

    return user;
  }
}

export default CreateUser;
