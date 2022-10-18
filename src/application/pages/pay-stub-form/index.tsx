import { Box, CheckIcon, FormControl, Select, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'

import { Validation } from '@/application/validation/protocols'
import { GetCalculationsCompany, GetCompaniesUser, GetYears } from '@/domain/use-cases'
import { FormError, SubmitButton, Skeeleton } from './components'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { payStubFormState } from './components/atoms'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { PrivateStackParams } from '@/main/routes/private'
import moment from 'moment'
import { CalculationModel } from '@/domain/entities/models'

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
  const [isStartingLoading, setIsStartingLoading] = useState(true)

  useEffect(() => {
    resetPayStubForm()
    const reponseYears = getYears()
    setState(old => ({ ...old, years: reponseYears }))
    void (async () => {
      try {
        const reponseCompanies = await getCompaniesUser()
        setState(old => ({ ...old, companies: reponseCompanies.companies }))
      } catch {}
      setIsStartingLoading(false)
    })()
  }, [])
  useEffect(() => {
    if (state.companyId && state.year) {
      void (async () => {
        try {
          const reponseCalculations = await getCalculationsCompany({ companyId: state.companyId, year: parseInt(state.year) })
          setState(old => ({ ...old, calculations: reponseCalculations.calculations }))
        } catch {}
      })()
    }
  }, [state.companyId, state.year])
  useEffect(() => validate('codCal'), [state.codCal])

  const validate = (field: string): void => {
    const { codCal } = state
    const formData = { codCal }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.codCalError }))
  }

  const labelCalculation = (c: CalculationModel): string => {
    let calculation = ''
    if (c.tipCal === 11) {
      calculation = 'Cálculo Mensal'
    }

    if (c.tipCal === 91) {
      calculation = 'Adiantamento Salarial'
    }

    if (c.tipCal === 32) {
      calculation = '13ª Salário Integral'
    }

    if (c.tipCal === 31) {
      calculation = 'Adiantamento 13ª Salário'
    }

    if (c.tipCal === 15) {
      calculation = 'Complementar Rescisão'
    }

    const perRef = moment(c.perRef).add(3, 'hours').format('MM/YYYY')

    return calculation + ' - ' + perRef
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

  if (isStartingLoading) {
    return <Skeeleton />
  }

  return (
    <Box safeArea p="2" py="4" w="100%" flex={1} h="100%" backgroundColor="white" borderTopRadius={20}>
      <VStack space={8} mt="2" alignSelf="center" w="90%" maxW="300">
        <FormError />
        <FormControl>
          <Select selectedValue={state.companyId} minWidth="200" accessibilityLabel="Selecione a empresa" placeholder="Selecione a empresa" size="xl" _selectedItem={{
            bg: '#F15E2C',
            endIcon: <CheckIcon size="5" />
          }} mt={1} onValueChange={companyId => setState({ ...state, companyId })} isDisabled={state.companies.length === 0}>
            {state.companies.map((company) =>
              <Select.Item label={`[${company.base}] ${company.company.nomEmp}`} value={String(company.companyId)} key={company.companyId} />
            )}
          </Select>
        </FormControl>
        <FormControl>
          <Select selectedValue={state.year} minWidth="200" accessibilityLabel="Selecione o ano" placeholder="Selecione o ano" size="xl" _selectedItem={{
            bg: '#F15E2C',
            endIcon: <CheckIcon size="5" color="white" />
          }} mt={1} onValueChange={year => setState({ ...state, year })} isDisabled={state.years.length === 0}>
            {state.years.map((year) =>
              <Select.Item label={String(year)} value={String(year)} key={year} />
            )}
          </Select>
        </FormControl>
        <FormControl>
          <Select selectedValue={state.codCal} minWidth="200" accessibilityLabel="Selecione a referência" placeholder="Selecione a referência" size="xl" _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size="5" />
          }} mt={1} onValueChange={codCal => setState({ ...state, codCal })} isDisabled={state.calculations.length === 0}>
            {state.calculations.map((calculation) =>
              <Select.Item label={labelCalculation(calculation)} value={String(calculation.id)} key={String(calculation.id)} />
            )}
          </Select>
        </FormControl>
        <SubmitButton text='Buscar' isLoadingText='Buscando...' onClick={handleSubmit} />
      </VStack>
    </Box>
  )
}

export default PayStubForm
