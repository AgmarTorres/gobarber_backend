import { startOfHour, isBefore, getHours } from 'date-fns';

import {injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IRequest {
  // eslint-disable-next-line camelcase
  provider_id: string;
  user_id: string
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentsRepository: IAppointmentsRepository
    ){}

  public async execute({ date, provider_id, user_id }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if(isBefore( appointmentDate, Date.now() )){
      throw new AppError("You can't create an appointment  on a past date")
    }

    if( user_id === provider_id){
      throw new AppError('You cant create an appointment with yourself')
    }

    if( getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17 ){
      throw new AppError('You can only create appointments between 8am and 5 pm')
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked', 400);
    }
    const appointment = await this.appointmentsRepository.create({
      user_id,
      provider_id,
      date: appointmentDate,
    });


    return appointment;
  }
}

export default CreateAppointmentService;

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
