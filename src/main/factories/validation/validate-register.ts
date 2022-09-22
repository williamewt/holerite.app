import { ValidationComposite } from '@/application/validation/composites'
import { ValidationBuilder as Builder } from '@/application/validation/builders'

export const makeValidateRegisterValidation = (): ValidationComposite => ValidationComposite.build([
  ...Builder.field('cpf').required().cpf().build(),
  ...Builder.field('phone').required().build()
])
