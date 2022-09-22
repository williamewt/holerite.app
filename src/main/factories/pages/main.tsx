import { makeGetUser } from '@/main/factories/use-cases'
import { Main } from '@/application/pages'

import React from 'react'

export const MakeMain: React.FC<any> = ({ props }: any) => {
  return (
    <Main
      {...props}
      getUser={makeGetUser()}
    />
  )
}
