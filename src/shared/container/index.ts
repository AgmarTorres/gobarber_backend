import { container  } from 'tsyringe'

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'
import IUsersRepository from '@modules/users/repositories/IUserRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository'
import '@modules/users/providers'
import  './providers' // para cadastrar os providers criados
container.registerSingleton<IAppointmentRepository>('AppointmentRepository', AppointmentRepository)// Nome que eu vou dar para um criar o repositorio de appointments
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)// Nome que eu vou dar para um criar o repositorio de appointments


