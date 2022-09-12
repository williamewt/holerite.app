import React from 'react'
import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { MakeLogin } from '@/main/factories/pages/login'

const Stack = createNativeStackNavigator()

const App: React.FC = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={MakeLogin} />
      </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}

export default App
