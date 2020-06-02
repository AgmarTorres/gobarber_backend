import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointementsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '../../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsRepository= new AppointementsRepository();
appointmentsRouter.use(ensureAuthenticated);
// Rota: Receber, chamar outro arquivo, devolver uma resposta

/*
appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointementsRepository);
  const appointments = await appointmentsRepository.findByDate();
  return response.json(appointments);
});
*/
appointmentsRouter.post('/', async (request, response) => {

  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);
  const createAppointment = new CreateAppointmentService(appointmentsRepository);
  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });
  return response.json(appointment);
});
export default appointmentsRouter;
