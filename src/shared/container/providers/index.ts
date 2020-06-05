import { container } from 'tsyringe' // apara fazer o injection
import IStorageProvider from './StorageProvider/models/IStorageProvider'
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider'


container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
)
