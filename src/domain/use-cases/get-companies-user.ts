import { HttpResponseError } from '@/domain/entities/errors'
import { HttpClient, HttpStatusCode } from '@/domain/protocols/http'
import { AccountModel, CompanyModel } from '@/domain/entities/models'

type Setup = (
  url: string,
  httpClient: HttpClient<Output>
) => GetCompaniesUser

type Output = AccountModel & { companies: CompanyModel[] }

export type GetCompaniesUser = () => Promise<Output>

export const setupGetCompaniesUser: Setup = (url, httpClient) => async () => {
  const httpResponse = await httpClient.request({
    url,
    method: 'post'
  })
  if (httpResponse.statusCode === HttpStatusCode.ok) {
    return httpResponse.data
  }
  throw new HttpResponseError(httpResponse.data)
}
