import { ValidationComposite } from '@/application/validation/composites'
import { ValidationBuilder as Builder } from '@/application/validation/builders'

export const makePayStubFormValidation = (): ValidationComposite => ValidationComposite.build([
  ...Builder.field('codCal').required().build()
])
