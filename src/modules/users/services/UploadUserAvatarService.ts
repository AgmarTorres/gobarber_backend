//Amazon S3/ Google Cloud Storage

import path from 'path';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository'
import { inject, injectable } from 'tsyringe'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'

interface IRequest {
  // eslint-disable-next-line camelcase
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatartService {

  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider){  }

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    // Verificar se o usuário é valido
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError(' Only authenticated users cans change avatar', 401);
    }
    if(user.avatar){
      await this.storageProvider.deleteFile(user.avatar)
    }

    const filename = await this.storageProvider.saveFile(avatarFilename)
    // Se o usuário tiver um avatar

    user.avatar = filename;
    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatartService;
