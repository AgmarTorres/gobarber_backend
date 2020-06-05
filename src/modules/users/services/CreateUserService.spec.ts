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

    const createUser = new CreateUserService(fakeUserRepository,fakeHashProvider)
    const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider)
    const user = await createUser.execute({
      name: 'Jhon Doe',
      email: 'agmartorres@gmail.com',
      password: '123456'
    })

    expect( user ).toHaveProperty('id')
    //expect( response).toHaveProperty('token')
    //expect(response.user).toEqual(user)
  })

  it('should to be able to authenticate with wrong password', async () =>{
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(fakeUserRepository,fakeHashProvider)
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
    expect( authenticateUser.execute({
      email: 'agmartorres@gmail.com',
      password: 'wrong'
    })).rejects.toBeInstanceOf(AppError)

  })



  it('should not to be authenticate with non existing user', async () =>{
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider()
    const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider)

    expect( authenticateUser.execute({
      email: 'agmartorres@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not to be able to create two users with the same email', async () =>{
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(fakeUserRepository,fakeHashProvider)

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
    expect( createUser.execute({
      name: 'Jhon Doe',
      email: 'agmartorres@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError)
  })

})
