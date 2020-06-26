import AppError from '@shared/errors/AppError'

import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository'
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUserRepository: FakeUserRepository
let fakeMailProvider: FakeMailProvider
let fakeUserTokenRepository : FakeUserTokenRepository
let sendForgotPasswordEmailService: SendForgotPasswordEmailService

describe("SendForgotPassworEmail", () =>{
  beforeEach(()=>{

    fakeUserRepository= new FakeUserRepository()
    fakeMailProvider = new FakeMailProvider
    fakeUserTokenRepository = new FakeUserTokenRepository
    sendForgotPasswordEmailService= new SendForgotPasswordEmailService(fakeUserRepository, fakeMailProvider, fakeUserTokenRepository)

  })

  it('should to recover the password using the email', async () =>{
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

    await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '1234'
    })

    await sendForgotPasswordEmailService.execute({
      email: 'jhondoe@example.com',
    })

    expect( sendMail ).toHaveBeenCalled()

  })

  it('should not be able to recover a non-existing user', async () =>{
    await expect(
        sendForgotPasswordEmailService.execute({
          email: 'jhondoe@example.com',
        })
      ).rejects.toBeInstanceOf(AppError)
  })

  it('should generate a forgot password token', async () =>{
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')
    const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate')

    const user = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '1234'
    })

    await sendForgotPasswordEmailService.execute({
      email: "jhondoe@example.com"
    })

    expect( generateToken ).toHaveBeenCalledWith(user.id)

  })
})
