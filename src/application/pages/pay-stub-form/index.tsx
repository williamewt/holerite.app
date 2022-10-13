import { Box, CheckIcon, FormControl, Select, VStack } from 'native-base'
import React, { useEffect } from 'react'

import { Validation } from '@/application/validation/protocols'
import { GetCalculationsCompany, GetCompaniesUser, GetYears } from '@/domain/use-cases'
import { FormError, SubmitButton } from './components'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { payStubFormState } from './components/atoms'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { PrivateStackParams } from '@/main/routes/private'

type Props = {
  navigation: NativeStackNavigationProp<PrivateStackParams>
  validation: Validation
  getYears: GetYears
  getCompaniesUser: GetCompaniesUser
  getCalculationsCompany: GetCalculationsCompany
}

const PayStubForm: React.FC<Props> = ({ navigation, validation, getYears, getCompaniesUser, getCalculationsCompany }: Props) => {
  const resetPayStubForm = useResetRecoilState(payStubFormState)
  const [state, setState] = useRecoilState(payStubFormState)

  useEffect(() => {
    resetPayStubForm()
    const reponseYears = getYears()
    // console.log('annnnnuss', reponseYears)
    setState(old => ({ ...old, years: reponseYears }))
    // console.log('stateee', state)
    void (async () => {
      try {
        const reponseCompanies = await getCompaniesUser()
        setState(old => ({ ...old, companies: reponseCompanies.companies }))
      } catch (error) {
        console.log('error', error)
      }
    })()
  }, [])
  useEffect(() => validate('codCal'), [state.codCal])

  const validate = (field: string): void => {
    const { codCal } = state
    const formData = { codCal }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.codCalError }))
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
      // enviar para a tela do holerite
    } catch (error: any) {
      setState(old => ({
        ...old,
        isLoading: false,
        mainError: error.message
      }))
    }
  }

  return (
    <Box safeArea p="2" py="4" w="100%" flex={1} h="100%" backgroundColor="white">
      <VStack space={8} mt="2" alignSelf="center" w="90%" maxW="300">
        <FormError />
        <FormControl>
          <Select selectedValue={state.companyId} minWidth="200" accessibilityLabel="Selecione a empresa" placeholder="Selecione a empresa" size="xl" _selectedItem={{
            bg: '#F15E2C',
            endIcon: <CheckIcon size="5" />
          }} mt={1} onValueChange={companyId => setState({ ...state, companyId })}>
            {state.companies.map((company) =>
              <Select.Item label={`[${company.base}] ${company.company.nomEmp}`} value={String(company.companyId)} key={company.companyId} />
            )}
          </Select>
        </FormControl>
        <FormControl>
          <Select selectedValue={state.year} minWidth="200" accessibilityLabel="Selecione o ano" placeholder="Selecione o ano" size="xl" _selectedItem={{
            bg: '#F15E2C',
            endIcon: <CheckIcon size="5" color="white" />
          }} mt={1} onValueChange={year => setState({ ...state, year })}>
            {state.years.map((year) =>
              <Select.Item label={String(year)} value={String(year)} key={year} />
            )}
          </Select>
        </FormControl>
        <FormControl>
          <Select selectedValue={state.codCal} minWidth="200" accessibilityLabel="Selecione a referência" placeholder="Selecione a referência" size="xl" _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size="5" />
          }} mt={1} onValueChange={codCal => setState({ ...state, codCal })}>
            <Select.Item label="UX Research" value="ux" />
            <Select.Item label="Web Development" value="web" />
            <Select.Item label="Cross Platform Development" value="cross" />
            <Select.Item label="UI Designing" value="ui" />
            <Select.Item label="Backend Development" value="backend" />
          </Select>
        </FormControl>
        <SubmitButton text='Buscar' isLoadingText='Buscando...' onClick={handleSubmit} />
      </VStack>
    </Box>
  )
}

export default PayStubForm
