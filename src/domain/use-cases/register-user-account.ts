import { HttpResponseError } from '@/domain/entities/errors'
import { HttpClient, HttpStatusCode } from '@/domain/protocols/http'

type Setup = (
  url: string,
  httpClient: HttpClient<Output>
) => RegisterUserAccount

type Input = { name: string, cpf: string, phone: string, password: string, passwordConfirmation: string }
type Output = { userId: number, accessToken: string, refreshToken: string }

export type RegisterUserAccount = (params: Input) => Promise<Output>

export const setupRegisterUserAccount: Setup = (url, httpClient) => async params => {
  const httpResponse = await httpClient.request({
    url,
    method: 'post',
    body: params
  })
  if (httpResponse.statusCode === HttpStatusCode.ok) {
    return httpResponse.data
  }
  throw new HttpResponseError(httpResponse.data)
}
