import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController'

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);
const appointmentsController = new AppointmentsController();

// Rota: Receber, chamar outro arquivo, devolver uma resposta

/*
appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointementsRepository);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});
*/

appointmentsRouter.post('/', appointmentsController.create);
export default appointmentsRouter;
