import AppError from '@shared/errors/AppError'

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import ListProviderService from './ListProviderService';

let fakeUserRepository: FakeUserRepository
let listProviderService: ListProviderService

describe("Show Profile Service", () =>{
  beforeEach(()=>{
    fakeUserRepository = new FakeUserRepository();
    listProviderService = new ListProviderService(fakeUserRepository)
  })

  it('should able to list the providers', async () =>{
   const user1 = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'agmartorres@gmail.com',
      password: '123456'
    })

    const user2 = await fakeUserRepository.create({
      name: 'Jhon Tre',
      email: 'jhontre@gmail.com',
      password: '123456'
    })


    const loggedUser =  await fakeUserRepository.create({
      name: 'Jhon Qua',
      email: 'jhonqua@gmail.com',
      password: '123456'
    })

    const providers = await listProviderService.execute({
      user_id: loggedUser.id
    })

    expect( providers ).toEqual([ user1, user2])
  })
})
