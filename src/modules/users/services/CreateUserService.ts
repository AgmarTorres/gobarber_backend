import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository'
import { inject, injectable } from 'tsyringe'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUser {

  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider

    ){  }

  public async execute({ name, email, password }: IRequest): Promise<User> {

    // Verificar se existe usuário com o mesmo email
    const checkEmail = await this.userRepository.findByEmail(email);

    if (checkEmail) {
      throw new AppError('Email address already used', 400);
    }

    //const hash_password = await hash(password, 8);
    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = await  this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUser;
