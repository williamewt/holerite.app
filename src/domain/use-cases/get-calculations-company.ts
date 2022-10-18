import { HttpResponseError } from '@/domain/entities/errors'
import { HttpClient, HttpStatusCode } from '@/domain/protocols/http'
import { CalculationModel, CompanyModel } from '@/domain/entities/models'

type Setup = (
  url: string,
  httpClient: HttpClient<Output>
) => GetCalculationsCompany

type Input = { companyId: string, year: number }
type Output = CompanyModel & { calculations: CalculationModel[] }

export type GetCalculationsCompany = (params: Input) => Promise<Output>

export const setupGetCalculationsCompany: Setup = (url, httpClient) => async params => {
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
