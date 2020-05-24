import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../../../modules/users/services/CreateUserService';
import ensureAuthenticated from '../infra/http/middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '../../../modules/users/services/UploadUserAvatarService';

import uploadConfig from '../../../config/upload';

const userRouter = Router();

const upload = multer(uploadConfig);

// Rota: Receber, chamar outro arquivo, devolver uma resposta

userRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });
  delete user.password;
  return response.json(user);
});

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default userRouter;
