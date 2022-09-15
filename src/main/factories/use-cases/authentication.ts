import { makeAxiosHttpClient, makeApiUrl } from '@/main/factories/http'
import { setupAuthentication, Authentication } from '@/domain/use-cases'

export const makeAuthentication = (): Authentication => setupAuthentication(makeApiUrl('/login'), makeAxiosHttpClient())
