import { inject, injectable } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository'

interface IRequest {
  user_id: string
}

@injectable()
class ListProviderService {

  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,
  ){  }

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const users = await this.userRepository.findAllProviders(
      { except_user_id:user_id }
    )
    return users
  }
}

export default ListProviderService;
