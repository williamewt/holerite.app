import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { MakeLogin } from '@/main/factories/pages/login'

const AuthStack = createNativeStackNavigator()

const AuthRoutes: React.FC = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen options={{ headerShown: false }} name="Login" component={MakeLogin} />
      </AuthStack.Navigator>
    </NavigationContainer>
  )
}

export default AuthRoutes
