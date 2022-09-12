import { HttpResponseError } from '@/domain/entities/errors'
import { HttpClient, HttpStatusCode } from '@/domain/protocols/http'
import { Authentication, setupAuthentication } from '@/domain/use-cases'

import { mock, MockProxy } from 'jest-mock-extended'

describe('setupAuthentication', () => {
  let sut: Authentication
  let httpClient: MockProxy<HttpClient<{ accessToken?: string, refreshToken?: string, error?: string }>>

  beforeAll(() => {
    httpClient = mock()
    httpClient.request.mockResolvedValue({
      statusCode: HttpStatusCode.ok,
      data: {
        accessToken: 'any_access_token',
        refreshToken: 'any_refresh_token'
      }
    })
  })

  beforeEach(() => {
    sut = setupAuthentication(httpClient)
  })

  it('should calls httpCLient with correct params', async () => {
    await sut({ cpf: 'any_cpf', password: 'any_password' })
    expect(httpClient.request).toHaveBeenCalledWith({
      url: '/login',
      method: 'post',
      body: { cpf: 'any_cpf', password: 'any_password' }
    })
    expect(httpClient.request).toHaveBeenCalledTimes(1)
  })

  it('should return correct data if return statusCode 200', async () => {
    const response = await sut({ cpf: 'any_cpf', password: 'any_password' })

    expect(response).toEqual({
      accessToken: 'any_access_token',
      refreshToken: 'any_refresh_token'
    })
  })

  it('should return HttpResponseError if statusCode different 200', async () => {
    httpClient.request.mockResolvedValueOnce({
      statusCode: HttpStatusCode.unauthorized,
      data: {
        error: 'any_error'
      }
    })

    const promise = sut({ cpf: 'any_cpf', password: 'any_password' })

    await expect(promise).rejects.toThrow(new HttpResponseError('any_error'))
  })
})
