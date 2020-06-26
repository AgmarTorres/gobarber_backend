import AppError from '@shared/errors/AppError'
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUserRepository: FakeUserRepository
let fakeStorageProvider: FakeStorageProvider
let updateUserAvatar: UpdateUserAvatarService

describe("Update User Avatar", () =>{
  beforeEach(()=>{
    fakeUserRepository = new FakeUserRepository();
    fakeStorageProvider = new FakeStorageProvider()
    updateUserAvatar = new UpdateUserAvatarService(fakeUserRepository,fakeStorageProvider)
  })

  it('should to be able update avatar User', async () =>{
    const updateUserAvatar = new UpdateUserAvatarService(fakeUserRepository,fakeStorageProvider)

    const user = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'agmartorres@gmail.com',
      password: '123456'
    })
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
    })

    expect( user.avatar ).toBe('avatar.jpg')
  })

  it('should not to be able to update avatar from non existing user ', async () =>{
    await expect(
      updateUserAvatar.execute({
        user_id: 'none-exiting-user',
        avatarFilename: 'avatar.jpg'
      })
     ).rejects.toBeInstanceOf(AppError)
  })


  it('should be delete old avatar when updating new one', async () =>{

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')
    const updateUserAvatar = new UpdateUserAvatarService(fakeUserRepository,fakeStorageProvider)

    const user = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'agmartorres@gmail.com',
      password: '123456'
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg'
    })

    expect( deleteFile ).toHaveBeenCalledWith('avatar.jpg')
    expect(user.avatar).toBe('avatar2.jpg')
  })
})
