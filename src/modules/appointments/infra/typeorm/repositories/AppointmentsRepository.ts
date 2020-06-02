import { getRepository, Repository } from 'typeorm';
import Appointment from '../entities/Appointments';
import  IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointments'

class AppointmentsRepository  implements IAppointmentsRepository {
  private ormRepository:Repository<Appointment>

  constructor(){
    this.ormRepository= getRepository(Appointment)
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });
    return findAppointment ;
  }

  public async create({provider_id, date}: ICreateAppointmentsDTO): Promise<Appointment>{
    const appointement = this.ormRepository.create({provider_id,date})
    await this.ormRepository.save(appointement)
    return appointement;
  }
}

export default AppointmentsRepository;
