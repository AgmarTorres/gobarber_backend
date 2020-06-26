import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository'
import ListProviderMonthAvailability from './ListProviderMonthAvailability';

let listProviderMonthAvailability: ListProviderMonthAvailability
let fakeAppointmentRepository: FakeAppointmentRepository

describe("List Provider Month Availability", () =>{
  beforeEach(()=>{
    fakeAppointmentRepository = new FakeAppointmentRepository()
    listProviderMonthAvailability = new ListProviderMonthAvailability(fakeAppointmentRepository)
  })

  it('should able to list the month availability from provider', async () =>{

    await fakeAppointmentRepository.create({
      provider_id : 'user',
      user_id: 'user',
      date: new Date(2020, 5, 20, 8, 0, 0 )
    })

    await fakeAppointmentRepository.create({
      provider_id : 'user',
      user_id: 'user',
      date: new Date(2020, 6, 20, 9, 0, 0 )
    })

    await fakeAppointmentRepository.create({
      provider_id : 'user',
      user_id: 'user',
      date: new Date(2020, 6, 20, 10, 0, 0 )
    })

    await fakeAppointmentRepository.create({
      provider_id : 'user',
      user_id: 'user',
      date: new Date(2020, 6, 20, 11, 0, 0 )
    })

    await fakeAppointmentRepository.create({
      provider_id : 'user',
      user_id: 'user',
      date: new Date(2020, 6, 20, 12, 0, 0 )
    })

    await fakeAppointmentRepository.create({
      provider_id : 'user',
      user_id: 'user',
      date: new Date(2020, 6, 20, 13, 0, 0 )
    })

    await fakeAppointmentRepository.create({
      provider_id : 'user',
      user_id: 'user',
      date: new Date(2020, 6, 20, 14, 0, 0 )
    })

    await fakeAppointmentRepository.create({
      provider_id : 'user',
      user_id: 'user',
      date: new Date(2020, 6, 20, 15, 0, 0 )
    })

    await fakeAppointmentRepository.create({
      provider_id : 'user',
      user_id: 'user',
      date: new Date(2020, 6, 20, 16, 0, 0 )
    })

    await fakeAppointmentRepository.create({
      provider_id : 'user',
      user_id: 'user',
      date: new Date(2020, 6, 20, 17, 0, 0 )
    })
    await fakeAppointmentRepository.create({
      provider_id : 'user',
      user_id: 'user',
      date: new Date(2020, 6, 20, 1, 0, 0 )
    })

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 7
    })

    expect(availability).toEqual(expect.arrayContaining([
      {day: 19, available: true},
      {day: 20, available: false},
      {day: 21, available: true},
    ]))

  })
})
