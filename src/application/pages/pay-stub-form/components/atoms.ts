import { CalculationModel, CompanyModel } from '@/domain/entities/models'
import { atom } from 'recoil'

export const payStubFormState = atom({
  key: 'payStubFormState',
  default: {
    isLoading: false,
    isFormInvalid: true,
    years: [] as number[],
    companies: [] as CompanyModel[],
    calculations: [] as CalculationModel[],
    companyId: '',
    year: '',
    codCal: '',
    companyIdError: '',
    yearError: '',
    codCalError: '',
    mainError: ''
  }
})
