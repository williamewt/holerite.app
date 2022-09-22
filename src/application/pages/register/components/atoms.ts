import { atom } from 'recoil'

export const registerState = atom({
  key: 'registerState',
  default: {
    isLoading: false,
    isFormInvalid: true,
    name: '',
    cpf: '',
    phone: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    cpfError: '',
    phoneError: '',
    passwordError: '',
    mainError: ''
  }
})
