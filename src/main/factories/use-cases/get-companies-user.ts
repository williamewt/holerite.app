import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { setupGetCompaniesUser, GetCompaniesUser } from '@/domain/use-cases'
import { makeApiUrl } from '@/main/factories/http'

export const makeGetCompaniesUser = (): GetCompaniesUser => setupGetCompaniesUser(makeApiUrl('/lists/companies-user'), makeAuthorizeHttpClientDecorator())
