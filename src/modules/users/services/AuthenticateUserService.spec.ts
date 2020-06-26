import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError'
import { uuid } from 'uuidv4';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import AuthenticateUserService from './AuthenticateUserService';

let fakeUserRepository: FakeUserRepository
let fakeHashProvider: FakeHashProvider
let createUser: CreateUserService

describe("CreateAppointment", () =>{
  beforeEach(()=>{
     fakeUserRepository = new FakeUserRepository();
     fakeHashProvider = new FakeHashProvider()
     createUser = new CreateUserService(fakeUserRepository, fakeHashProvider)
  })

  it('should to be able to create a new User', async () =>{

    const authenticateUser = new AuthenticateUserService( fakeUserRepository, fakeHashProvider )
    const user = await createUser.execute({
      name: 'Jhon Doe',
      email: 'agmartorres@gmail.com',
      password: '123456'
    })

    expect( user ).toHaveProperty('id')
  })

})
