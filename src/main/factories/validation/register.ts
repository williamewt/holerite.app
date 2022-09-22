import { ValidationComposite } from '@/application/validation/composites'
import { ValidationBuilder as Builder } from '@/application/validation/builders'

export const makeRegisterValidation = (): ValidationComposite => ValidationComposite.build([
  ...Builder.field('password').required().sameAs('passwordConfirmation').build()
])
