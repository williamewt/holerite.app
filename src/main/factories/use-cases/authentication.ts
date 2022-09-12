import { makeAxiosHttpClient } from '@/main/factories/http'
import { setupAuthentication, Authentication } from '@/domain/use-cases'

export const makeAuthentication = (): Authentication => setupAuthentication(makeAxiosHttpClient())
