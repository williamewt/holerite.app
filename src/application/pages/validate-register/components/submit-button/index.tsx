import { validateRegisterState } from '../atoms'
import { SubmitButtonBase } from '@/application/components'

import { useRecoilValue } from 'recoil'
import React from 'react'

type Props = {
  text: string
  isLoadingText: string
  onClick: Function
}

const SubmitButton: React.FC<Props> = ({ text, isLoadingText, onClick }: Props) => {
  const state = useRecoilValue(validateRegisterState)
  return (
    <SubmitButtonBase text={text} isLoadingText={isLoadingText} state={state} onClick={onClick} />
  )
}

export default SubmitButton
