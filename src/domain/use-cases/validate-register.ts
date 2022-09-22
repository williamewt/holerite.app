import { HttpResponseError } from '@/domain/entities/errors'
import { HttpClient, HttpStatusCode } from '@/domain/protocols/http'

type Setup = (
  url: string,
  httpClient: HttpClient<Output>
) => ValidateRegister

type Input = {cpf: string, phone: string}
type Output = { nomfun: string, cpf: string, phone: string, companies: number[]}

export type ValidateRegister = (params: Input) => Promise<Output>

export const setupValidateRegister: Setup = (url, httpClient) => async params => {
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
