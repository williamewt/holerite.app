export class HttpResponseError extends Error {
  constructor (responseData?: any) {
    super(responseData.error ?? 'Algo de errado aconteceu. Tente novamente em breve.')
    this.name = 'HttpResponseError'
  }
}
