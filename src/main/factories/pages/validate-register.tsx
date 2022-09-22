import { makeValidateRegister } from '@/main/factories/use-cases'
import { ValidateRegister } from '@/application/pages'
import { makeValidateRegisterValidation } from '@/main/factories/validation'

import React from 'react'

export const MakeValidateRegister: React.FC<any> = ({ props }: any) => {
  return (
    <ValidateRegister
      {...props}
      validation={makeValidateRegisterValidation()}
      validateRegister={makeValidateRegister()}
    />
  )
}
