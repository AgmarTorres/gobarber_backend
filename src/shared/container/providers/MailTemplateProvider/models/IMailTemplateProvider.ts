import IParseTemplateMailDTO from '../dtos/IParseTemplateMailDTO'

export default interface IMailTemplateProvider{
  parse(data: IParseTemplateMailDTO):Promise<string>
}
