import { HttpResponseError } from '@/domain/entities/errors'
import { HttpClient, HttpStatusCode } from '@/domain/protocols/http'
import { CalculationModel, PayStubEventModel, PayStubHeaderModel, SalaryModel } from '@/domain/entities/models'

type Setup = (
  url: string,
  httpClient: HttpClient<Output>
) => GetPayStub

type Input = { codCal: string }
type Output = { calculation: CalculationModel, header: PayStubHeaderModel, events: PayStubEventModel[], salary: SalaryModel }

export type GetPayStub = (params: Input) => Promise<Output>

export const setupGetPayStub: Setup = (url, httpClient) => async params => {
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
