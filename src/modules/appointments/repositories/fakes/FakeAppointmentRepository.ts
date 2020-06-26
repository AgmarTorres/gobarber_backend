import { uuid } from 'uuidv4'
import {isEqual, getMonth, getDate, getYear} from 'date-fns'
import Appointment from '../../infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointments'
import IFindAllInMonthFromProviderDTO from '../../dtos/IFindAllInMonthFromProviderDTO'
import IFindAllInDayFromProviderDTO from '../../dtos/IFindAllInDayFromProviderDTO'

class AppointmentsRepository  implements IAppointmentsRepository {
  private appointments: Appointment[] = [];
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointmentByDate = this.appointments.find( appointment => isEqual(appointment.date , date))
    return findAppointmentByDate
  }


  public async create({provider_id, user_id,  date}: ICreateAppointmentsDTO): Promise<Appointment>{
    const appointment = new Appointment();

    Object.assign( appointment, { id: uuid(), date, provider_id, user_id});

    appointment.id = uuid()
    appointment.date = date;
    appointment.provider_id = provider_id;
    this.appointments.push( appointment)

    return appointment
  }

  public async findAllInMonthFromProvider({provider_id, month, year}: IFindAllInMonthFromProviderDTO):Promise<Appointment[]>{
    const appointments = this.appointments.filter(appointment => {
      return (
        appointment.provider_id == provider_id
        && getMonth( appointment.date ) + 1 === month
        && getYear( appointment.date ) === year
      )
    })
    return appointments
  }

  public async findAllInDayFromProvider({provider_id, day, month, year}: IFindAllInDayFromProviderDTO):Promise<Appointment[]>{
    const appointments = this.appointments.filter(appointment => {
      return (
        appointment.provider_id == provider_id
        && getMonth( appointment.date ) + 1 === month
        && getYear( appointment.date ) === year
        && getDate( appointment.date ) === day
      )
    })
    return appointments
  }
}

export default AppointmentsRepository;
