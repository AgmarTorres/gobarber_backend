import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError'
import { uuid } from 'uuidv4';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import AuthenticateUserService from './AuthenticateUserService';

describe("CreateAppointment", () =>{

  it('should to be able to create a new User', async () =>{
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider()
    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider)

    const authenticateUser = new AuthenticateUserService( fakeUserRepository, fakeHashProvider )


    const user = await createUser.execute({
      name: 'Jhon Doe',
      email: 'agmartorres@gmail.com',
      password: '123456'
    })

    expect( user ).toHaveProperty('id')
  })


})
