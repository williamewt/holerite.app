import { Box, Center, FormControl, HStack, Input, Link, Text, VStack } from 'native-base'
import React, { useEffect } from 'react'
import { DevSettings } from 'react-native'

import { Validation } from '@/application/validation/protocols'
import { RegisterUserAccount, SyncData } from '@/domain/use-cases'
import { FormError, SubmitButton } from './components'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { registerState } from './components/atoms'
import { currentAccountState, CenterLogoWhite } from '@/application/components'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RouteProp } from '@react-navigation/native'

import { AuthStackParams } from '@/main/routes/auth'

 type Props = {
   navigation: NativeStackNavigationProp<AuthStackParams>
   route: RouteProp<AuthStackParams, 'Register'>
   validation: Validation
   registerUserAccount: RegisterUserAccount
   syncData: SyncData
 }

const Register: React.FC<Props> = ({ navigation, route, validation, registerUserAccount, syncData }: Props) => {
  const resetRegisterState = useResetRecoilState(registerState)
  const { setAuthorization } = useRecoilValue(currentAccountState)
  const [state, setState] = useRecoilState(registerState)
  const { name, cpf, phone } = route.params

  useEffect(() => resetRegisterState(), [])
  useEffect(() => validate('password'), [state.password])
  useEffect(() => validate('password'), [state.passwordConfirmation])

  const validate = (field: string): void => {
    const { password, passwordConfirmation } = state
    const formData = { password, passwordConfirmation }
    console.log('--->', field, password, formData)
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.passwordError }))
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
      const { userId, accessToken, refreshToken } = await registerUserAccount({
        name,
        phone,
        cpf,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
      await syncData({ userId, cpf })
      await setAuthorization({ accessToken, refreshToken })
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
            <Input name="password" variant="underlined" type="password" onChangeText={password => { setState({ ...state, password }) }} placeholder="Senha" />
          </FormControl>
          <FormControl>
            <Input name="password" variant="underlined" type="password" onChangeText={passwordConfirmation => { setState({ ...state, passwordConfirmation }) }} placeholder="Confirme a Senha" />
          </FormControl>
          <SubmitButton text='Cadastrar' isLoadingText='Cadastrando...' onClick={handleSubmit} />
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600" _dark={{
              color: 'warmGray.200'
            }}>
              Já tem cadastro?{' '}
            </Text>
            <Link _text={{
              color: 'indigo.500',
              fontWeight: 'medium',
              fontSize: 'sm'
            }} onPress={() => navigation.navigate('ValidateRegister')}>
              Entrar
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  )
}

export default Register
