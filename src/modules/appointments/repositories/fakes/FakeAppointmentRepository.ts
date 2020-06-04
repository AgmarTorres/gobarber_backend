import { uuid } from 'uuidv4'
import Appointment from '../../infra/typeorm/entities/Appointments';
import  IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointments'
import {isEqual} from 'date-fns'
class AppointmentsRepository  implements IAppointmentsRepository {
  private appointments: Appointment[] = [];
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointmentByDate = this.appointments.find( appointment => isEqual(appointment.date , date))
    return findAppointmentByDate
  }

  public async create({provider_id, date}: ICreateAppointmentsDTO): Promise<Appointment>{
    const appointment = new Appointment();

    Object.assign( appointment, { id: uuid(), date, provider_id});

    appointment.id = uuid()
    appointment.date = date;
    appointment.provider_id = provider_id;
    this.appointments.push( appointment)

    return appointment
  }
}

export default AppointmentsRepository;
