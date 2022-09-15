import { makeGetUser } from '@/main/factories/use-cases'
import { Main } from '@/application/pages'

import React from 'react'

export const MakeMain: React.FC = () => {
  return (
    <Main
      getUser={makeGetUser()}
    />
  )
}
