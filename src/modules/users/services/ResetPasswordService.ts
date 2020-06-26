import { inject, injectable } from 'tsyringe'
import { isAfter, addHours } from 'date-fns'

import AppError from '@shared/errors/AppError'
import IUserRepository from '../repositories/IUserRepository'
import IUserTokensRepository from '../repositories/IUserTokenRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

interface IRequest {
  password: string;
  token: string
}

@injectable()
class ResetPasswordService {

  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    ){  }

  public async execute( { password, token} : IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token)
    if(!userToken){
      throw new AppError('User token does not exists')
    }

    const user = await  this.userRepository.findById(userToken.user_id)

    if(!user){
      throw new AppError('User does not exists')
    }
    const tokenCreatedAt = userToken.created_at;

    const compareDate = addHours(tokenCreatedAt,2) // adiciona 2 horas

    if( isAfter( Date.now(), compareDate) ){
      throw new AppError( 'Token expired')
    }

    user.password = await this.hashProvider.generateHash(password);
    await this.userRepository.save(user);
    }

}

export default ResetPasswordService;
