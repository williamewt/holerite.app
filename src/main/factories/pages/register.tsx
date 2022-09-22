import { makeRegisterUserAccount, makeSyncData } from '@/main/factories/use-cases'
import { Register } from '@/application/pages'
import { makeRegisterValidation } from '@/main/factories/validation'

import React from 'react'

export const MakeRegister: React.FC<any> = ({ props }: any) => {
  return (
    <Register
      { ...props }
      validation = { makeRegisterValidation() }
      registerUserAccount = { makeRegisterUserAccount() }
      syncData = { makeSyncData() }
    />
  )
}
