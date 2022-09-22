import { HttpResponseError } from '@/domain/entities/errors'
import { HttpClient, HttpStatusCode } from '@/domain/protocols/http'

type Setup = (
  urlHeader: string,
  urlSalary: string,
  urlEvent: string,
  httpClient: HttpClient<Output>
) => SavePayStubData

type Input = { userId: number, cpf: string }
type Output = { updates: number[], creates: number[] }

export type SavePayStubData = (params: Input) => Promise<Output>

export const setupSavePayStubData: Setup = (urlHeader, urlSalary, urlEvent, httpClient) => async params => {
  const headerResponse = await httpClient.request({
    url: urlHeader,
    method: 'post',
    body: { cpfs: [params.cpf] }
  })
  if (headerResponse.statusCode === HttpStatusCode.ok) {
    const headerResponse = await httpClient.request({
      url: urlSalary,
      method: 'post',
      body: { cpfs: [params.cpf] }
    })
    return headerResponse.data
  }
  throw new HttpResponseError()
}
