import { loginState } from '@/application/pages/login/components/atoms'
import { FormErrorBase } from '@/application/components'

import { useRecoilValue } from 'recoil'
import React from 'react'

const FormError: React.FC = () => {
  const state = useRecoilValue(loginState)
  return (
    <FormErrorBase state={state} />
  )
}

export default FormError
