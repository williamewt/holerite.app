import { makeAuthentication } from '@/main/factories/use-cases'
import { Login } from '@/application/pages'
import { makeLoginValidation } from '@/main/factories/validation'

import React from 'react'

export const MakeLogin: React.FC<any> = ({ props }: any) => {
  return (
    <Login
      {...props}
      validation={makeLoginValidation()}
      authentication={makeAuthentication()}
    />
  )
}
