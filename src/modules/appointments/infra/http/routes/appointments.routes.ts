import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointementsRepository from '@modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);
// Rota: Receber, chamar outro arquivo, devolver uma resposta

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointementsRepository);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  // eslint-disable-next-line camelcase
  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);
  const createAppointment = new CreateAppointmentService();
  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });
  return response.json(appointment);
});
export default appointmentsRouter;
