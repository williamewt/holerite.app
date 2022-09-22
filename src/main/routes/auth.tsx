import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { MakeLogin, MakeValidateRegister, MakeRegister } from '@/main/factories/pages'

export type AuthStackParams = {
  Login: undefined
  ValidateRegister: undefined
  Register: { name: string, cpf: string, phone: string }
}

const AuthStack = createNativeStackNavigator<AuthStackParams>()

const AuthRoutes: React.FC = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen options={{ headerShown: false }} name="Login">
          {(props) => <MakeLogin props={props} />}
        </AuthStack.Screen>
        <AuthStack.Screen options={{ headerShown: false }} name="ValidateRegister">
          {(props) => <MakeValidateRegister props={props} />}
        </AuthStack.Screen>
        <AuthStack.Screen options={{ headerShown: false }} name="Register">
          {(props) => <MakeRegister props={props} />}
        </AuthStack.Screen>
      </AuthStack.Navigator>
    </NavigationContainer>
  )
}

export default AuthRoutes
