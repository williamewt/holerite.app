import { FieldValidation } from '@/application/validation/protocols'
import { RequiredFieldValidation, CompareFieldsValidation, CpfValidation } from '@/application/validation/validators'

export class ValidationBuilder {
  private constructor (
    private readonly fieldName: string,
    private readonly validations: FieldValidation[]
  ) {}

  static field (fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  required (): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName))
    return this
  }

  cpf (): ValidationBuilder {
    this.validations.push(new CpfValidation(this.fieldName))
    return this
  }

  sameAs (fieldToCompare: string): ValidationBuilder {
    this.validations.push(new CompareFieldsValidation(this.fieldName, fieldToCompare))
    return this
  }

  build (): FieldValidation[] {
    return this.validations
  }
}
