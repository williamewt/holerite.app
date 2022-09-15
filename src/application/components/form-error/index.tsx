import { HStack, VStack, Alert, Text } from 'native-base'
import React from 'react'

type Props = {
  state: any
}

const FormError: React.FC<Props> = ({ state }: Props) => {
  const { mainError } = state

  if (mainError) {
    return (
      <Alert w="100%" variant="left-accent" status="error">
        <VStack space={2} flexShrink={1} w="100%">
          <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
            <HStack space={2} flexShrink={1} alignItems="center">
              <Alert.Icon mt="1" />
              <Text fontSize="md" color="coolGray.800">
                {mainError}
              </Text>
            </HStack>
          </HStack>
        </VStack>
      </Alert>
    )
  }
  return null
}

export default FormError
