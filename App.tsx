import React from 'react'
import { NativeBaseProvider } from 'native-base'
import { RecoilRoot } from 'recoil'

import { setCurrentAccountAdapter, getCurrentAccountAdapter, setAuthorizationAdapter, getAuthorizationAdapter } from '@/main/adapters'
import { currentAccountState } from '@/application/components'
import { Routes } from '@/main/routes'

const App: React.FC = () => {
  const state = {
    setCurrentAccount: setCurrentAccountAdapter,
    getCurrentAccount: getCurrentAccountAdapter,
    setAuthorization: setAuthorizationAdapter,
    getAuthorization: getAuthorizationAdapter
  }
  return (
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, state)}>
      <NativeBaseProvider>
        <Routes />
      </NativeBaseProvider>
    </RecoilRoot>
  )
}

export default App
