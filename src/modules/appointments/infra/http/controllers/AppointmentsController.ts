import { Request, Response } from 'express'
import { parseISO } from 'date-fns';
import { container } from 'tsyringe'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';


export default class
AppointmentController{
  public async create(request: Request, response: Response):Promise<Response>{
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
    }
}
