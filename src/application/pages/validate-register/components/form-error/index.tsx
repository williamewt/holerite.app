import { validateRegisterState } from '../atoms'
import { FormErrorBase } from '@/application/components'

import { useRecoilValue } from 'recoil'
import React from 'react'

const FormError: React.FC = () => {
  const state = useRecoilValue(validateRegisterState)
  return (
    <FormErrorBase state={state} />
  )
}

export default FormError
