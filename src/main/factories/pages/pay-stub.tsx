import { makeGetPayStub } from '@/main/factories/use-cases'
import { PayStub } from '@/application/pages'

import React from 'react'

export const MakePayStub: React.FC<any> = ({ props }: any) => {
  return (
    <PayStub
      {...props}
      getPayStub={makeGetPayStub()}
    />
  )
}
