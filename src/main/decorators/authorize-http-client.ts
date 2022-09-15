import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from '@/domain/protocols/http'
import { GetStorage, SetStorage } from '@/domain/protocols/cache'
import { DevSettings } from 'react-native'

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor (
    private readonly urlRefreshToken: string,
    private readonly storage: GetStorage & SetStorage,
    private readonly httpClient: HttpClient
  ) {}

  async request (data: HttpRequest): Promise<HttpResponse> {
    const authorization = await this.storage.get('authorization')
    if (authorization?.refreshToken) {
      const refreshTokenResponse = await this.httpClient.request({
        url: this.urlRefreshToken,
        method: 'post',
        body: { refreshToken: authorization.refreshToken }
      })
      if (refreshTokenResponse.statusCode === HttpStatusCode.ok) {
        await this.storage.set('authorization', { ...authorization, ...refreshTokenResponse.data })
      }
      if (refreshTokenResponse.statusCode === HttpStatusCode.badRequest) {
        await this.storage.set('authorization')
        DevSettings.reload()
      }
    }
    if (authorization?.accessToken) {
      Object.assign(data, {
        headers: Object.assign(data.headers || {}, {
          authorization: authorization.accessToken
        })
      })
    }
    const httpResponse = await this.httpClient.request(data)
    return httpResponse
  }
}
