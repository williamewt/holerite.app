import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { MakeMain } from '@/main/factories/pages/main'

const PrivateStack = createNativeStackNavigator()

const PrivateRoutes: React.FC = () => {
  return (
    <NavigationContainer>
      <PrivateStack.Navigator>
        <PrivateStack.Screen name="Main" component={MakeMain} />
      </PrivateStack.Navigator>
    </NavigationContainer>
  )
}

export default PrivateRoutes
