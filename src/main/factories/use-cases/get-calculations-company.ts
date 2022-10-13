import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { setupGetCalculationsCompany, GetCalculationsCompany } from '@/domain/use-cases'
import { makeApiUrl } from '@/main/factories/http'

export const makeGetCalculationsCompany = (): GetCalculationsCompany => setupGetCalculationsCompany(makeApiUrl('/lists/calculations-company'), makeAuthorizeHttpClientDecorator())
