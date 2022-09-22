
import { VStack, Skeleton, HStack, Box } from 'native-base'
import React from 'react'

const Skeeleton: React.FC = () => {
  return (
    <Box pt="70" p="10" w="100%" flex={1} alignItems="center" justifyContent="center" backgroundColor="#F15E2C">
      <VStack w="100%" h="100%">
        <HStack justifyContent="space-between" alignItems='center' mb="20">
          <Skeleton.Text px="2" lines={1} width="60%" />
          <Skeleton size="8" rounded="full" />
        </HStack>
        <Skeleton size="90" rounded="md" width="100%" />
      </VStack>
    </Box>
  )
}

export default Skeeleton
