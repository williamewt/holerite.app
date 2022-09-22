import React, { useEffect, useState } from 'react'

import { useRecoilValue } from 'recoil'
import { currentAccountState } from '@/application/components'
import AuthRoutes from '@/main/routes/auth'
import PrivateRoutes from '@/main/routes/private'
import { ActivityIndicator, Dimensions, View } from 'react-native'

const Routes: React.FC = () => {
  const { getAuthorization } = useRecoilValue(currentAccountState)
  const [authenticate, setAuthenticate] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    void (async () => {
      const getAccessToken = await getAuthorization()
      if (getAccessToken) {
        setAuthenticate(true)
      }
      setIsLoading(false)
    })()
  })

  const deviceHeight = Dimensions.get('window').height

  if (isLoading) {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F15E2C'
      }}>
        <View style={{
          position: 'absolute',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          top: deviceHeight / 2.2
        }}>
          <ActivityIndicator size="large" color="#FFF" />
        </View>
      </View>
    )
  }

  if (authenticate) {
    return <PrivateRoutes />
  }
  return <AuthRoutes />
}

export default Routes
