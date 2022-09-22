import { Box, Center, FormControl, HStack, Input, Link, Text, VStack, Pressable, Icon } from 'native-base'
import React, { useEffect, useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { DevSettings } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { Validation } from '@/application/validation/protocols'
import { Authentication } from '@/domain/use-cases'
import { FormError, SubmitButton } from './components'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { loginState } from './components/atoms'
import { currentAccountState, CenterLogoWhite } from '@/application/components'
import { AuthStackParams } from '@/main/routes/auth'

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParams>
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ navigation, validation, authentication }: Props) => {
  const [showPassword, setShowPassword] = useState(false)
  const resetLoginState = useResetRecoilState(loginState)
  const { setAuthorization } = useRecoilValue(currentAccountState)
  const [state, setState] = useRecoilState(loginState)

  useEffect(() => resetLoginState(), [])
  useEffect(() => validate('cpf'), [state.cpf])
  useEffect(() => validate('password'), [state.password])

  const validate = (field: string): void => {
    const { cpf, password } = state
    const formData = { cpf, password }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.cpfError || !!old.passwordError }))
  }

  const handleSubmit = async (): Promise<void> => {
    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState(old => ({
        ...old,
        mainError: '',
        isLoading: true
      }))
      const authorization = await authentication({
        cpf: state.cpf,
        password: state.password
      })
      await setAuthorization(authorization)
      DevSettings.reload()
    } catch (error: any) {
      setState(old => ({
        ...old,
        isLoading: false,
        mainError: error.message
      }))
    }
  }

  return (
    <Center w="100%" backgroundColor="#F15E2C" h="100%" flex={1}>
      <Box p="2" w="100%" flex={0.3} alignItems="center" justifyContent="center">
        <CenterLogoWhite />
      </Box>
      <Box safeArea p="2" py="4" w="100%" flex={0.7} backgroundColor="white" borderTopRadius={20}>
        <VStack space={8} mt="2" alignSelf="center" w="90%" maxW="300">
          <FormError />
          <FormControl>
            <Input name="cpf" keyboardType="numeric" variant="underlined" placeholder="CPF" onChangeText={cpf => { setState({ ...state, cpf }) }} />
          </FormControl>
          <FormControl>
            <Input name="password" variant="underlined" type={showPassword ? 'text' : 'password'} onChangeText={password => { setState({ ...state, password }) }} InputRightElement={<Pressable onPress={() => setShowPassword(!showPassword)}>
              <Icon as={<MaterialIcons name={showPassword ? 'visibility' : 'visibility-off'} />} size={5} mr="2" color="muted.400" />
            </Pressable>} placeholder="Senha" />
            <Link _text={{
              fontSize: 'xs',
              fontWeight: '500',
              color: 'indigo.500'
            }} alignSelf="flex-end" mt="1" onPress={() => navigation.navigate('ValidateRegister')}>
              Esqueceu a senha?
            </Link>
          </FormControl>
          <SubmitButton text='Entrar' isLoadingText='Entrando...' onClick={handleSubmit} />
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
            }} onPress={() => navigation.navigate('ValidateRegister')}>
              Cadastrar
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  )
}

export default Login
