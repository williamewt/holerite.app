import { makeLocalStorageAdapter } from '@/main/factories/cache'
import { AccountModel, AuthorizationModel } from '@/domain/entities/models'

export const setCurrentAccountAdapter = async (account?: AccountModel): Promise<void> => {
  await makeLocalStorageAdapter().set('account', account)
}

export const getCurrentAccountAdapter = async (): Promise<AccountModel> => {
  return await makeLocalStorageAdapter().get('account')
}

export const setAuthorizationAdapter = async (authorization?: AuthorizationModel): Promise<void> => {
  await makeLocalStorageAdapter().set('authorization', authorization)
}

export const getAuthorizationAdapter = async (): Promise<AuthorizationModel> => {
  return await makeLocalStorageAdapter().get('authorization')
}
