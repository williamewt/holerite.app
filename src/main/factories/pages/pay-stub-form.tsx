import { makeGetCalculationsCompany, makeGetCompaniesUser, makeGetYears } from '@/main/factories/use-cases'
import { PayStubForm } from '@/application/pages'
import { makePayStubFormValidation } from '@/main/factories/validation'

import React from 'react'

export const MakePayStubForm: React.FC<any> = ({ props }: any) => {
  return (
    <PayStubForm
      {...props}
      validation={makePayStubFormValidation()}
      getYears={makeGetYears()}
      getCompaniesUser={makeGetCompaniesUser()}
      getCalculationsCompany={makeGetCalculationsCompany()}
    />
  )
}
