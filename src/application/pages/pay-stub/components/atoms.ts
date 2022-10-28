import { PayStubModel } from '@/domain/entities/models'
import { atom } from 'recoil'

export const payStubState = atom({
  key: 'payStubState',
  default: {
    isLoading: false,
    isFormInvalid: true,
    payStubData: null as PayStubModel | null,
    mainError: ''
  }
})
