import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

interface IRequest {
  user_id: string
  name: string
  email: string
  password?: string
  old_password?: string
}

@injectable()
class UpdateProfile {

  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider){  }

  public async execute({ user_id, name, email, password, old_password }: IRequest): Promise<User> {

    const user = await this.userRepository.findById(user_id)

    if( !user){
      throw new AppError('User does not exist')
    }

    const userWithUpdatedEmail = await this.userRepository.findByEmail(email)

    if( userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id ){
      throw new AppError(' This e-mail already user')
    }

    if(password && !old_password){
      throw new AppError('To update user password you need inform the old_password')
    }

    if(password && old_password){
      const checkOldPassword = await this.hashProvider.compareHash(old_password, user.password)

      if( !checkOldPassword ){
        throw new AppError('Old password does not match. ')
      }

      user.password = await this.hashProvider.generateHash(password)
    }

    user.name = name
    user.email = email

    return this.userRepository.save(user)
  }
}

export default UpdateProfile;
