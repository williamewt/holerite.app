import { FieldValidation } from '@/application/validation/protocols'
import { InvalidFieldError } from '@/application/validation/errors'

export class CompareFieldsValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly fieldToCompare: string
  ) {}

  validate (input: object): Error | undefined {
    return (input as any)[this.field] !== (input as any)[this.fieldToCompare] ? new InvalidFieldError() : undefined
  }
}
