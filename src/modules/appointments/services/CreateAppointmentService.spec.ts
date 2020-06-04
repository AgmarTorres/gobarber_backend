import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository'
import CreateAppointmentService from './CreateAppointmentService';
import AppError from '@shared/errors/AppError'

describe("CreateAppointment", () =>{

  it('should to be able to create a new appoinment', async () =>{
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentRepository)

    const appointment = await createAppointment.execute({
        date: new Date,
        provider_id: '1231231'
    })

    expect( appointment ).toHaveProperty('id')
    expect(appointment.provider_id).toBe('1231231')
  })

  it('should no  to be able to create two appoinemtens in the same time', async () =>{
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentRepository)

    const appointmentDate  =  new Date(2020,4,12,11)

    const appointment = await createAppointment.execute({
        date: appointmentDate,
        provider_id: '1231231'
    })
    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '1231231'
    })).rejects.toBeInstanceOf(AppError)
  })

})
