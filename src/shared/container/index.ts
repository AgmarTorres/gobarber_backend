import { container  } from 'tsyringe'

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'


container.registerSingleton<IAppointmentRepository>('AppointmentRepository', AppointmentRepository)// Nome que eu vou dar para um criar o repositorio de appointments


