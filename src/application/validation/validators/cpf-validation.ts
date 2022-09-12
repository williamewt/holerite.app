
import { cpf } from 'cpf-cnpj-validator'
import { FieldValidation } from '@/application/validation/protocols'
import { InvalidFieldError } from '@/application/errors'

export class CpfValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (input: object): Error | undefined {
    const isValid = cpf.isValid((input as any)[this.field])
    return isValid ? undefined : new InvalidFieldError('cpf')
  }
}
