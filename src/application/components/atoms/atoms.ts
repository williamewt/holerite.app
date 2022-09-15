import { AccountModel, AuthorizationModel } from '@/domain/entities/models'

import { atom } from 'recoil'

export const currentAccountState = atom({
  key: 'currentAccountState',
  default: {
    getCurrentAccount: null as unknown as () => Promise<AccountModel>,
    setCurrentAccount: null as unknown as (account?: AccountModel) => Promise<void>,
    getAuthorization: null as unknown as () => Promise<AuthorizationModel>,
    setAuthorization: null as unknown as (auth?: AuthorizationModel) => Promise<void>
  }
})
