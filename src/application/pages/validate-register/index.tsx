import { Box, Center, FormControl, HStack, Input, Link, Text, VStack } from 'native-base'
import React, { useEffect } from 'react'

import { Validation } from '@/application/validation/protocols'
import { ValidateRegister } from '@/domain/use-cases'
import { FormError, SubmitButton } from './components'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { validateRegisterState } from './components/atoms'
import { CenterLogoWhite } from '@/application/components'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { AuthStackParams } from '@/main/routes/auth'

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParams>
  validation: Validation
  validateRegister: ValidateRegister
}

const Login: React.FC<Props> = ({ navigation, validation, validateRegister }: Props) => {
  const resetValidateRegisterState = useResetRecoilState(validateRegisterState)
  const [state, setState] = useRecoilState(validateRegisterState)

  useEffect(() => resetValidateRegisterState(), [])
  useEffect(() => validate('cpf'), [state.cpf])
  useEffect(() => validate('phone'), [state.phone])

  const validate = (field: string): void => {
    const { cpf, phone } = state
    const formData = { cpf, phone }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.cpfError || !!old.phoneError }))
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
      const { nomfun } = await validateRegister({
        cpf: state.cpf,
        phone: state.phone
      })
      console.log('nomfun', nomfun)
      navigation.navigate('Register', { name: nomfun, cpf: state.cpf, phone: state.phone })
    } catch (error: any) {
      console.log('error', error)
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
            <Input name="phone" keyboardType="numeric" variant="underlined" placeholder="Telefone com DDD" onChangeText={phone => { setState({ ...state, phone }) }} />
          </FormControl>
          <SubmitButton text='Buscar' isLoadingText='Buscando...' onClick={handleSubmit} />
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
            }} onPress={() => navigation.navigate('Login')}>
              Entrar
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  )
}

export default Login
