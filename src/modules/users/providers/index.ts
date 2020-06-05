import { container } from 'tsyringe'
import IHashProvider from './HashProvider/models/IHashProvider'
import BCryptHashProvder from './HashProvider/implementations/BCryptHashProvider'

container.registerSingleton<IHashProvider>(
  'HashProvider', BCryptHashProvder
);
