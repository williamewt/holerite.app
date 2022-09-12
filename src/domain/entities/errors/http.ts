export class HttpResponseError extends Error {
  constructor (error?: string) {
    super(error ?? 'Algo de errado aconteceu. Tente novamente em breve.')
    this.name = 'HttpResponseError'
  }
}
