import { atom } from 'recoil'

export const validateRegisterState = atom({
  key: 'validateRegisterState',
  default: {
    isLoading: false,
    isFormInvalid: true,
    cpf: '',
    phone: '',
    cpfError: '',
    phoneError: '',
    mainError: ''
  }
})
