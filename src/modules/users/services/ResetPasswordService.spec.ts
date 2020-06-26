import AppError from '@shared/errors/AppError'

import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository'
import ResetPasswordService from './ResetPasswordService';
import FakeHashProvider  from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository
let fakeUserTokenRepository : FakeUserTokenRepository
let fakeHashProvider : FakeHashProvider
let resetPasswordService: ResetPasswordService


describe("ResetPasswordService", () =>{
  beforeEach(()=>{
    fakeUserRepository= new FakeUserRepository()
    fakeUserTokenRepository = new FakeUserTokenRepository
    fakeHashProvider = new FakeHashProvider()
    resetPasswordService= new ResetPasswordService(fakeUserRepository, fakeUserTokenRepository, fakeHashProvider)
  })

  it('should be able to reset password', async () =>{

    let user = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '1234'
    })

    const {token} = await fakeUserTokenRepository.generate(user.id)

    const generateHash = jest.spyOn(fakeHashProvider,'generateHash')

    await resetPasswordService.execute({
      password: '123123',
      token
    })

    const updatedUser = await fakeUserRepository.findById( user.id)

    await expect(generateHash).toHaveBeenCalledWith('123123')
    await expect(updatedUser?.password).toBe('123123')

  })

  it( 'should not be able to reset the password with non-existing token', async ()=>{
    await expect(
      resetPasswordService.execute({
        token: 'non-existing-token',
        password: '123'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it( 'should not be able to reset the password with non-existing user', async ()=>{
    const {token} = await fakeUserTokenRepository.generate('non-existing-user')
    await expect(
      resetPasswordService.execute({
        token,
        password: '123'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to reset password if passed more than 2 hours', async()=>{
    //Mock
    let user = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '1234'
    })

    const { token } = await  fakeUserTokenRepository.generate(user.id)
    //Mockimplementation: Executa uma funcao que a gente cria
    //MockimplementationOnce: Executa uma funcao de um terceiro ou java script

    jest.spyOn(Date, 'now').mockImplementationOnce( ()=>{
      const customDate = new Date()
      return customDate.setHours(customDate.getHours() + 3)
    })

    await expect(
      resetPasswordService.execute({
        password: '1234',
        token
      })
    ).rejects.toBeInstanceOf(AppError)
  })

})
