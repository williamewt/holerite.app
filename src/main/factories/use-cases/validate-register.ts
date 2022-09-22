import { makeAxiosHttpClient, makeApiUrl } from '@/main/factories/http'
import { setupValidateRegister, ValidateRegister } from '@/domain/use-cases'

export const makeValidateRegister = (): ValidateRegister => setupValidateRegister(makeApiUrl('/validate-register'), makeAxiosHttpClient())
