//Padrões das metodos das tecnologias,
// index, show, create, update, delete

import { Request, Response} from 'express'
import { container } from 'tsyringe'
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

export default class ForgotPasswordController{
  public  async create( request: Request , response: Response): Promise<Response>  {
    const { email, password } = request.body;
    const sendForgotPassowordUser = container.resolve( SendForgotPasswordEmailService );
    await sendForgotPassowordUser.execute({ email });
    return response.status(204).json();
  }
}
