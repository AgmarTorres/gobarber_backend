import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

// eslint-disable-next-line no-unused-vars
import Appointment from '../models/Appointments';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';

/**
 * Recebimento das informações
 * Tratativas de erros e exceções
 * Acesso a repositórios
 */

interface Request {
  // eslint-disable-next-line camelcase
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  // eslint-disable-next-line camelcase
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked', 400);
    }
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);
    return appointment;
  }
}

export default CreateAppointmentService;
