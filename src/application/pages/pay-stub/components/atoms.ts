import { CalculationModel, CompanyModel } from '@/domain/entities/models'
import { atom } from 'recoil'

export const payStubState = atom({
  key: 'payStubState',
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
