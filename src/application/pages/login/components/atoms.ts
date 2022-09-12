import { atom } from 'recoil'

export const loginState = atom({
  key: 'loginState',
  default: {
    isLoading: false,
    isFormInvalid: true,
    cpf: '',
    password: '',
    cpfError: '',
    passwordError: '',
    mainError: ''
  }
})
