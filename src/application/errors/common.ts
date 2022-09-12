export class ServerError extends Error {
  constructor (error?: Error) {
    super('Falha no servidor. tente de novo mais tarde')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}

export class RequiredFieldError extends Error {
  constructor (fieldName: string) {
    super(`O campo ${fieldName} é obrigatório`)
    this.name = 'RequiredFieldError'
  }
}

export class InvalidFieldError extends Error {
  constructor (fieldName: string) {
    super(`O ${fieldName} é inválido`)
    this.name = 'InvalidFieldError'
  }
}

export class FieldsNotMatchError extends Error {
  constructor (fieldName: string) {
    super(`Os Campos de ${fieldName} são diferentes`)
    this.name = 'FieldsNotMatchError'
  }
}

export class InvalidCredentialsError extends Error {
  constructor () {
    super('Credenciais inválidas')
    this.name = 'InvalidCredentialsError'
  }
}

export class AuthenticationError extends Error {
  constructor () {
    super('Não autenticado')
    this.name = 'AuthenticationError'
  }
}

export class UserNotFindError extends Error {
  constructor () {
    super('Colaborador não encontrado')
    this.name = 'UserNotFindError'
  }
}
export class NoResultsFoundError extends Error {
  constructor () {
    super('Nenhum resultado encontrado')
    this.name = 'NoResultsFoundError'
  }
}

export class BlockedUserError extends Error {
  constructor () {
    super('Usuário sem acesso')
    this.name = 'BlockedUserError'
  }
}
