import { HttpResponseError } from '@/domain/entities/errors'
import { HttpClient, HttpStatusCode } from '@/domain/protocols/http'

type Setup = (
  url: string,
  httpClient: HttpClient<Output>
) => SyncData

type Input = {cpf: string, userId: number}
type Output = { statusCode: number }

export type SyncData = (params: Input) => Promise<Output>

export const setupSyncData: Setup = (url, httpClient) => async params => {
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
