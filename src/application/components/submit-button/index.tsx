import { Button } from 'native-base'
import React from 'react'

type Props = {
  state: any
  text: string
  isLoadingText: string
  onClick: Function
}

const SubmitButton: React.FC<Props> = ({ state, text, isLoadingText, onClick }: Props) => {
  const { isLoading, isFormInvalid } = state
  return (
    <Button mt="2" backgroundColor="#F15E2C" isLoading={isLoading} isLoadingText={isLoadingText} isDisabled={isFormInvalid} onPress={() => onClick()}>
      {text}
    </Button>
  )
}

export default SubmitButton
