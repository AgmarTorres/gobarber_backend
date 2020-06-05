import fs from 'fs'
import path from 'path'
import uploadConfig from '@config/upload'
import IStorageProvider from '../models/IStorageProvider'

class DiskStorageProvider implements IStorageProvider{
  public async saveFile(file: string): Promise<string>{
      await fs.promises.rename(
        path.resolve(uploadConfig.tmpfolder, file),
        path.resolve(uploadConfig.uploadFolder, file )
      )
      return file
  }

  public async deleteFile(file:string): Promise<void>{
    const filePath = path.resolve(uploadConfig.uploadFolder, file)
    //Saber se o arquivo existe
    try{
      await fs.promises.stat(filePath) // se encontrar o arquivo
    }catch(err){
      return;
    }
    await fs.promises.unlink(filePath)
  }
}

export default DiskStorageProvider
