import React, { useEffect, useState } from 'react'

import { useRecoilValue } from 'recoil'
import { currentAccountState } from '@/application/components'
import AuthRoutes from '@/main/routes/auth'
import PrivateRoutes from '@/main/routes/private'

const Routes: React.FC = () => {
  const { getAuthorization } = useRecoilValue(currentAccountState)
  const [authenticate, setAuthenticate] = useState(false)
  useEffect(() => {
    void (async () => {
      const getAccessToken = await getAuthorization()
      if (getAccessToken) {
        setAuthenticate(true)
      }
    })()
  })

  if (authenticate) {
    return <PrivateRoutes />
  }
  return <AuthRoutes />
}

export default Routes
