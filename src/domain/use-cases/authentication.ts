import { HttpResponseError } from '@/domain/entities/errors'
import { HttpClient, HttpStatusCode } from '@/domain/protocols/http'

type Setup = (
  url: string,
  httpClient: HttpClient<Output>
) => Authentication

type Input = { cpf: string, password: string }
type Output = { accessToken: string, refreshToken: string }

export type Authentication = (params: Input) => Promise<Output>

export const setupAuthentication: Setup = (url, httpClient) => async params => {
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
