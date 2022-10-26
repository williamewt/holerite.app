import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { setupGetPayStub, GetPayStub } from '@/domain/use-cases'
import { makeApiUrl } from '@/main/factories/http'

export const makeGetPayStub = (): GetPayStub => setupGetPayStub(makeApiUrl('/pay-stub'), makeAuthorizeHttpClientDecorator())
