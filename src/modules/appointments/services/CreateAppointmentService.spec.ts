import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository'
import CreateAppointmentService from './CreateAppointmentService';
import AppError from '@shared/errors/AppError'

let fakeAppointmentRepository: FakeAppointmentRepository
let createAppointment: CreateAppointmentService

describe("CreateAppointment", () =>{
  beforeEach(()=>{
     fakeAppointmentRepository = new FakeAppointmentRepository();
     createAppointment = new CreateAppointmentService(fakeAppointmentRepository)
  })

  it('should to be able to create a new appoinment', async () =>{
    jest.spyOn( Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 10, 12).getTime()
    })

    const appointment = await createAppointment.execute({
        date: new Date(2020, 7, 10, 13),
        user_id: '123',
        provider_id: '123123'
    })

    expect( appointment ).toHaveProperty('id')
    expect(appointment.provider_id).toBe('123123')
  })

  it('should no  to be able to create two appoinemtens in the same time', async () =>{

    const appointmentDate  =  new Date(2020, 6, 12, 11)
    const appointment = await createAppointment.execute({
        date: appointmentDate,
        user_id: '123',
        provider_id: '123123'
    })

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: '123',
        provider_id: '123123'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn( Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date( 2020, 4, 10 , 11),
        user_id: 'user',
        provider_id: 'user'
      })
    )
  })

  it('should not be able to create an appointment with the same user as provider ', async () => {
    jest.spyOn( Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date( 2020, 4, 10 , 13),
        user_id: 'user',
        provider_id: 'user'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment before  8am or after 18pm', async () => {
    jest.spyOn( Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date( 2020, 4, 11 , 7),
        user_id: 'user',
        provider_id: 'provider-id'
      })
    ).rejects.toBeInstanceOf(AppError)

    await expect(
      createAppointment.execute({
        date: new Date( 2020, 4, 11 , 18),
        user_id: 'user',
        provider_id: 'provider-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
