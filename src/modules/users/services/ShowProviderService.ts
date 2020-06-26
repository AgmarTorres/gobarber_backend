import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository'

interface IRequest {
  user_id: string
}

@injectable()
class showProfileService {

  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,
  ){  }

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id)

    if( !user){
      throw new AppError('User does not exist')
    }
    return user
  }
}

export default showProfileService;
