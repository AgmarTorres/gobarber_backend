import { getRepository, Repository, Raw } from 'typeorm';
import Appointment from '../entities/Appointments';
import  IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointments'
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO'
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO'

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


  public async findAllInMonthFromProvider( {provider_id, year, month} : IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0')
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldName =>
        `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      }
    })
    return appointments
  }

  public async create({provider_id, user_id, date}: ICreateAppointmentsDTO): Promise<Appointment>{

    const appointement = this.ormRepository.create({provider_id, user_id ,date})
    await this.ormRepository.save(appointement)
    return appointement;
  }
  public async findAllInDayFromProvider( {provider_id, month, year, day} : IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0')
    const parsedDay = String(day).padStart(2, '0')
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldName =>
        `to_char(${dateFieldName}, 'DD-MM-YYYY')= '${parsedDay}-${parsedMonth}-${year}'`
        )
      }
    })
    return appointments
  }
}

export default AppointmentsRepository;
