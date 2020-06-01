import Appointment from '../infra/typeorm/entities/Appointments'
import ICreateAppointmentDTO from '@modules/appointments/dtos/CreateAppointments'

export default interface IAppointmentsRepository {
  create(): Promise<Appointment>
  findByDate(date: ICreateAppointmentDTO): Promise<Appointment | undefined>;
}

