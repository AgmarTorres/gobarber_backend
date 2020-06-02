import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UserController from '../controllers/UsersController'
import UserAvatarController from '../controllers/UsersAvatarController'

const userRouter = Router();
const upload = multer(uploadConfig);
const userController = new UserController()
const userAvatarController = new UserAvatarController()

// Rota: Receber, chamar outro arquivo, devolver uma resposta

userRouter.post('/', userController.create);

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update
);

export default userRouter;
