
import { VStack, Skeleton, Box } from 'native-base'
import React from 'react'

const Skeeleton: React.FC = () => {
  return (
    <Box w="100%" h="100%" backgroundColor="#F15E2C">
    <Box pt="40px" p="10" w="100%" flex={1} alignItems="center" justifyContent="center" backgroundColor="white" roundedTop={20}>
      <VStack w="100%" h="100%" space={6} alignItems="center">
        <Skeleton size="20px" rounded="md" width="100%" />
        <Skeleton.Text px="2" lines={1} width="100%" />
        <Skeleton.Text px="2" lines={1} width="100%" />
        <Skeleton.Text px="2" lines={1} width="100%" />
        <Skeleton.Text px="2" lines={1} width="100%" />
        <Skeleton.Text px="2" lines={1} width="100%" />
        <Skeleton.Text px="2" lines={1} width="100%" />
        <Skeleton.Text px="2" lines={1} width="100%" />
        <Skeleton.Text px="2" lines={1} width="100%" />
        <Skeleton.Text px="2" lines={1} width="100%" />
        <Skeleton.Text px="2" lines={1} width="100%" />
        <Skeleton.Text px="2" lines={1} width="100%" />
        <Skeleton.Text px="2" lines={1} width="100%" />
      </VStack>
    </Box>
    </Box>
  )
}

export default Skeeleton
