import { Authentication } from '@/domain/use-cases'
import { Box, Button, Center, FormControl, HStack, Input, Link, Text, VStack, Image, Pressable, Icon } from 'native-base'
import React, { useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Validation } from '@/application/validation/protocols'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Center w="100%" backgroundColor="#F15E2C" h="100%" flex={1}>
      <Box p="2" w="100%" flex={0.3} alignItems="center" justifyContent="center">
        <Center>
          <Image source={require('@/assets/logo-white.png')} alt="Logo Grupo Ultra" width={120} height={144} />
        </Center>
      </Box>
      <Box safeArea p="2" py="4" w="100%" flex={0.7} backgroundColor="white" borderTopRadius={20}>
        <VStack space={8} mt="2" alignSelf="center" w="90%" maxW="300">
          <FormControl>
            <Input variant="underlined" placeholder="CPF" />
          </FormControl>
          <FormControl>
            <Input variant="underlined" type={showPassword ? 'text' : 'password'} InputRightElement={<Pressable onPress={() => setShowPassword(!showPassword)}>
              <Icon as={<MaterialIcons name={showPassword ? 'visibility' : 'visibility-off'} />} size={5} mr="2" color="muted.400" />
            </Pressable>} placeholder="Senha" />
            <Link _text={{
              fontSize: 'xs',
              fontWeight: '500',
              color: 'indigo.500'
            }} alignSelf="flex-end" mt="1">
              Esqueceu a senha?
            </Link>
          </FormControl>
          <Button mt="2" backgroundColor="#F15E2C">
            Entrar
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600" _dark={{
              color: 'warmGray.200'
            }}>
              Não tem cadastro?{' '}
            </Text>
            <Link _text={{
              color: 'indigo.500',
              fontWeight: 'medium',
              fontSize: 'sm'
            }} href="#">
              Cadastrar
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  )
}

export default Login
