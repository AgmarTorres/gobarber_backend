import  IUsersRepository from '@modules/users/repositories/IUserRepository'
import User from '../../infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import { uuid } from 'uuidv4';

class UsersRepository  implements IUsersRepository {
  private users: User[]=[]
  constructor(){
  }

  public async findById( id: string): Promise<User | undefined>{
    const user = this.users.find( findUser => findUser.id == id)
    return user;
  }

  public async findByEmail( email: string  ): Promise<User | undefined>{
    const user = this.users.find( findUser => findUser.email == email)
    return user;
  }

  public async create(userData : ICreateUserDTO): Promise<User>{
    const user = new User();
    Object.assign(user, {id: uuid()}, userData)
    this.users.push(user)

    return user;
  }

  public async save(user: User):Promise<User>{
    const  findIndex = this.users.findIndex( findUser => findUser.id === user.id)
    this.users[findIndex] = user;
    return user;
  }
}

export default UsersRepository;
