import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { setupGetUser, GetUser } from '@/domain/use-cases'
import { makeApiUrl } from '@/main/factories/http'

export const makeGetUser = (): GetUser => setupGetUser(makeApiUrl('/user'), makeAuthorizeHttpClientDecorator())
