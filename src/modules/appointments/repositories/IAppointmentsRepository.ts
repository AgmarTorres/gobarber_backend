import Appointment from '../infra/typeorm/entities/Appointments'
import ICreateAppointmentDTO from '../dtos/ICreateAppointments'
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO'
import IFindAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProviderDTO'

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>
  findByDate( date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(date: IFindAllInMonthFromProviderDTO): Promise<Appointment[]>
  findAllInDayFromProvider(date: IFindAllInDayFromProviderDTO):Promise<Appointment[]>
}

