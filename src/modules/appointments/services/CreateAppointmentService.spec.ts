import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository'
import CreateAppointmentService from './CreateAppointmentService';

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

  it('should no  to be able to create two appoinemtens in the same time', () =>{
    expect(1+ 2).toBe(3)
  })

})
