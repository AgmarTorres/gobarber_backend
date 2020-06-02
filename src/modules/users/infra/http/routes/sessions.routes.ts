import { Router } from 'express';
import SessionController from '../controllers/SessionsControllers'
const sessionRouter = Router();

const sessionController = new SessionController()

sessionRouter.post('/', sessionController.create );

export default sessionRouter;
