   import { getRepository, Repository, Not } from 'typeorm';
import User from '../entities/User';
import  IUsersRepository from '@modules/users/repositories/IUserRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO'

class UsersRepository  implements IUsersRepository {

  private ormRepository:Repository<User>

  constructor(){
    this.ormRepository= getRepository(User)
  }

  public async findAllProviders( { except_user_id }: IFindAllProvidersDTO): Promise<User[]>{
    let users: User[]
    if( except_user_id){
      //Se existir um usuario Provider sera listado todos menos ele
       users = await this.ormRepository.find( { where: { id: Not( except_user_id ) } } )
    }else{
      //Se o usuario nao for provider, sera listado todos os usuários
       users = await this.ormRepository.find()
    }
    return users
  }
  public async findById( id: string): Promise<User | undefined>{
    const user = await this.ormRepository.findOne(id);
    return user
  }

  public async findByEmail( email: string  ): Promise<User | undefined>{
    const user = await this.ormRepository.findOne({where: {email}});
    return user
  }

  public async create(userData : ICreateUserDTO): Promise<User>{
    const user = this.ormRepository.create(userData)
    await this.ormRepository.save(user)
    return user;
  }

  public async save(user: User):Promise<User>{

    return this.ormRepository.save(user)
  }
}

export default UsersRepository;
