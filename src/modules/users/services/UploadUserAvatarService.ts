import path from 'path';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository'

interface IRequest {
  // eslint-disable-next-line camelcase
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatartService {

  constructor( private userRepository: IUserRepository){  }

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    // Verificar se o usuário é valido
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError(' Only authenticated users cans change avatar', 401);
    }
    // Se o usuário tiver um avatar

    if (user.avatar) {
      // Deletar o avatar anterior
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath); // Apresenta o status do objeto se ele existir

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
      // userRepository.update;
    }
    user.avatar = avatarFilename;
    await this.userRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatartService;
