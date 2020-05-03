import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/User';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

interface Request {
  // eslint-disable-next-line camelcase
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatartService {
  // eslint-disable-next-line camelcase
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const userRepository = getRepository(User);
    // Verificar se o usuário é valido
    const user = await userRepository.findOne(user_id);

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
    await userRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatartService;
