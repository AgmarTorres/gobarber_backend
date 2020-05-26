import Appointment from '../infra/typeorm/entities/Appointments'

export default interface IAppointmentsRepository {
  //create(): Promise<Appointment>
  findByDate(date: Date): Promise<Appointment| undefined>;
}

