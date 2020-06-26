import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError'
import { uuid } from 'uuidv4';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import AuthenticateUserService from './AuthenticateUserService';

let fakeUserRepository: FakeUserRepository
let fakeHashProvider: FakeHashProvider
let createUser:CreateUserService

describe("CreateAppointment", () =>{
  beforeEach(()=>{
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider =   new FakeHashProvider()
    createUser = new CreateUserService(fakeUserRepository,fakeHashProvider)
  })
  it('should to be able to create a new User', async () =>{

    const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider)
    const user = await createUser.execute({
      name: 'Jhon Doe',
      email: 'agmartorres@gmail.com',
      password: '123456'
    })

    expect( user ).toHaveProperty('id')
  })

  it('should to be able to authenticate with wrong password', async () =>{
    const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider)
    const user = await createUser.execute({
      name: 'Jhon Doe',
      email: 'agmartorres@gmail.com',
      password: '123456'
    })
    const response = await authenticateUser.execute({
      email: 'agmartorres@gmail.com',
      password: '123456'
    })

    expect( response ).toHaveProperty('token')
    expect( response.user ).toEqual(user)

    await expect( authenticateUser.execute({
      email: 'agmartorres@gmail.com',
      password: 'wrong'
    })).rejects.toBeInstanceOf(AppError)

  })



  it('should not to be authenticate with non existing user', async () =>{
    const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider)

    await expect( authenticateUser.execute({
      email: 'agmartorres@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not to be able to create two users with the same email', async () =>{

    const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider)
    const user = await createUser.execute({
      name: 'Jhon Doe',
      email: 'agmartorres@gmail.com',
      password: '123456'
    })

    const response = await authenticateUser.execute({
      email: 'agmartorres@gmail.com',
      password: '123456'
    })

    expect( response ).toHaveProperty('token')
    expect( response.user ).toEqual(user)
    await expect( createUser.execute({
      name: 'Jhon Doe',
      email: 'agmartorres@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError)
  })
})
