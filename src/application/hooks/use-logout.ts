import { currentAccountState } from '@/application/components'

import { DevSettings } from 'react-native'
import { useRecoilValue } from 'recoil'

type ResultType = () => void

export const useLogout = (): ResultType => {
  const { setCurrentAccount, setAuthorization } = useRecoilValue(currentAccountState)
  return async (): Promise<void> => {
    await setCurrentAccount(undefined)
    await setAuthorization(undefined)
    DevSettings.reload()
  }
}
