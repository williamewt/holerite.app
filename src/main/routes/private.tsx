import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { MakeMain, MakePayStubForm } from '@/main/factories/pages'

export type PrivateStackParams = {
  Main: undefined
  PayStubForm: undefined
}

const PrivateStack = createNativeStackNavigator<PrivateStackParams>()

const PrivateRoutes: React.FC = () => {
  return (
    <NavigationContainer>
      <PrivateStack.Navigator>
        <PrivateStack.Screen name="Main" options={{ headerShown: false, title: 'Ínicio' }}>
          {(props) => <MakeMain props={props} />}
        </PrivateStack.Screen>
        <PrivateStack.Screen name="PayStubForm" options={{ title: 'Meu holerite' }}>
          {(props) => <MakePayStubForm props={props} />}
        </PrivateStack.Screen>
      </PrivateStack.Navigator>
    </NavigationContainer>
  )
}

export default PrivateRoutes
