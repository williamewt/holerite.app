import { FieldValidation } from '@/application/validation/protocols'
import { RequiredFieldError } from '@/application/validation/errors'

export class RequiredFieldValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (input: object): Error | undefined {
    return (input as any)[this.field] ? undefined : new RequiredFieldError()
  }
}
