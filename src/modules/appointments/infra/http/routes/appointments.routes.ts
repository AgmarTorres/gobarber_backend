import { Router } from 'express';
import { parseISO } from 'date-fns';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);
import { container } from 'tsyringe'


// Rota: Receber, chamar outro arquivo, devolver uma resposta

/*
appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointementsRepository);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});
*/
appointmentsRouter.post('/', async (request, response) => {

  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);
  const createAppointment = container.resolve(CreateAppointmentService);
  //Vai carregar o service, vai ver quais dependencias ele precisa para iniciar,
  // vai la no container e ve se tem alguma dependencia cadastrada com isso ?
  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });
  return response.json(appointment);
});
export default appointmentsRouter;
