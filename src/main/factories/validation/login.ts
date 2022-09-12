import { ValidationComposite } from '@/application/validation/composites'
import { ValidationBuilder as Builder } from '@/application/validation/builders'

export const makeLoginValidation = (): ValidationComposite => ValidationComposite.build([
  ...Builder.field('cpf').required().cpf().build(),
  ...Builder.field('password').required().build()
])
