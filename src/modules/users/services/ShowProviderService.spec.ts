import AppError from '@shared/errors/AppError'

import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import ShowProfileService from './ShowProviderService';

let fakeUserRepository: FakeUserRepository
let showProfileService: ShowProfileService

describe("Show Profile Service", () =>{
  beforeEach(()=>{
    fakeUserRepository = new FakeUserRepository();
    showProfileService = new ShowProfileService(fakeUserRepository)
  })

  it('should able to show the profile', async () =>{
   const user = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'agmartorres@gmail.com',
      password: '123456'
    })

    const profile = await showProfileService.execute({
      user_id: user.id
    })

    expect( profile.name ).toBe('Jhon Doe')
    expect( profile.email ).toBe('agmartorres@gmail.com')
  })

  it('should not be able show the profile from non-existing user', async () =>{
    expect(showProfileService.execute({
      user_id: 'non-existing user id'
    })).rejects.toBeInstanceOf(AppError)
  })
})
