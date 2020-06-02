import { startOfHour } from 'date-fns';

// eslint-disable-next-line no-unused-vars
import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'
/**
 * Recebimento das informações
 * Tratativas de erros e exceções
 * Acesso a repositórios
 */

 //SOLID

//# Single Responsability Principle
// Open Closed Principle
//# Liskov Substituion Principle
// Interface Segregation Principle
//# Dependency Invertion Principle

interface IRequest {
  // eslint-disable-next-line camelcase
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  constructor( private appointmentsRepository: IAppointmentsRepository){}

  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked', 400);
    }
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });


    return appointment;
  }
}

export default CreateAppointmentService;
