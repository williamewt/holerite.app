import { makeAxiosHttpClient, makeApiUrl } from '@/main/factories/http'
import { setupRegisterUserAccount, RegisterUserAccount } from '@/domain/use-cases'

export const makeRegisterUserAccount = (): RegisterUserAccount => setupRegisterUserAccount(makeApiUrl('/register'), makeAxiosHttpClient())
