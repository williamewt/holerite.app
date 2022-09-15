import { AuthorizeHttpClientDecorator } from '@/main/decorators'
import { makeLocalStorageAdapter } from '@/main/factories/cache'
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'
import { HttpClient } from '@/domain/protocols/http'

export const makeAuthorizeHttpClientDecorator = (): HttpClient =>
  new AuthorizeHttpClientDecorator(makeApiUrl('/refresh-token'), makeLocalStorageAdapter(), makeAxiosHttpClient())
