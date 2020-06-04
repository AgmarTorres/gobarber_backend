import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError'
import { uuid } from 'uuidv4';

describe("CreateAppointment", () =>{

  it('should to be able to create a new User', async () =>{
    const fakeUserRepository = new FakeUserRepository();
    const createUser = new CreateUserService(fakeUserRepository)

    const user = await createUser.execute({
      name: 'Jhon Doe',
      email: 'agmartorres@gmail.com',
      password: '123456'
    })

    expect( user ).toHaveProperty('id')
  })

  it('should not be able to create two users with the same email', async () =>{
    const fakeUserRepository = new FakeUserRepository();
    const createUser = new CreateUserService(fakeUserRepository)

    const user = await createUser.execute({
      name: 'Jhon Doe',
      email: 'agmartorres@gmail.com',
      password: '123456'
    })

    expect( user ).toHaveProperty('id')
    expect( createUser.execute({
      name: 'Jhon Doe',
      email: 'agmartorres@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError)
  })

})
