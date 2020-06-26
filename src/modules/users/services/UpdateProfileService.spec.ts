import AppError from '@shared/errors/AppError'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import UpdateProfileService from './UpdateProfileService';
import userRouter from '../infra/http/routes/user.routes';

let fakeUserRepository: FakeUserRepository
let fakeHashProvider: FakeHashProvider
let updateProfileService: UpdateProfileService

describe("Update Profile Service", () =>{
  beforeEach(()=>{
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider()
    updateProfileService = new UpdateProfileService(fakeUserRepository, fakeHashProvider)
  })

  it('should able to update the profile', async () =>{
    const user = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'agmartorres@gmail.com',
      password: '123456'
    })

    const updateUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Jhon Trê',
      email: 'jhontre@example.com'
    })

    expect( updateUser.name ).toBe('Jhon Trê')
    expect( updateUser.email ).toBe('jhontre@example.com')
  })

  it('should not be able to change the email that is alredy in use', async () =>{
    await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'agmartorres@gmail.com',
      password: '123456'
    })

    const updateUser = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'update@gmail.com',
      password: '123456'
    })

    await expect(
      updateProfileService.execute({
        user_id: updateUser.id,
        name: 'Jhon Trê',
        email: 'agmartorres@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError)

  })

  it('should be able to the email of the password', async () =>{
    const user = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'agmartorres@gmail.com',
      password: '123456'
    })

    const updateUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Jhon Doe',
      email: 'update@gmail.com',
      password: '123123',
      old_password: '123456'
    })

    await expect(updateUser.password).toBe('123123')

  })

  it('should not be able to update password without old_password', async () =>{
    const user = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'agmartorres@gmail.com',
      password: '123456'
    })

    await expect(
      updateProfileService.execute({
      user_id: user.id,
      name: 'Jhon Doe',
      email: 'update@gmail.com',
      password: '123123',
    })).rejects.toBeInstanceOf(AppError)

  })

  it('should not be able to update password with wrong old_password', async () =>{
    const user = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'agmartorres@gmail.com',
      password: '123456'
    })

    await expect(
      updateProfileService.execute({
      user_id: user.id,
      name: 'Jhon Doe',
      email: 'update@gmail.com',
      password: '123123',
      old_password: '12345'
    })).rejects.toBeInstanceOf(AppError)

  })

  it('should not be able show the profile from non-existing user', async () =>{
    expect(updateProfileService.execute({
      user_id: 'non-existing user id',
      name: 'Test',
      email: 'test@gmail.com'
    })).rejects.toBeInstanceOf(AppError)
  })
})
