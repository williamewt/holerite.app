import { HttpResponseError } from '@/domain/entities/errors'
import { HttpClient, HttpStatusCode } from '@/domain/protocols/http'
import { AccountModel } from '@/domain/entities/models'

type Setup = (
  url: string,
  httpClient: HttpClient<Output>
) => GetUser

type Output = AccountModel

export type GetUser = () => Promise<Output>

export const setupGetUser: Setup = (url, httpClient) => async () => {
  const httpResponse = await httpClient.request({
    url,
    method: 'post'
  })
  if (httpResponse.statusCode === HttpStatusCode.ok) {
    return httpResponse.data
  }
  throw new HttpResponseError(httpResponse.data)
}
