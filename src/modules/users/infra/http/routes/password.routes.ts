import { Router } from 'express';
import ForgotPassordController from '../controllers/ForgotPasswordController'
import ResetPassordController from '../controllers/ResetPasswordController'

const passwordRouter = Router();

const forgotPassordController = new ForgotPassordController()
const resetPassordController = new ResetPassordController()

passwordRouter.post('/forgot', forgotPassordController.create );
passwordRouter.post('/reset', resetPassordController.create );

export default passwordRouter;
