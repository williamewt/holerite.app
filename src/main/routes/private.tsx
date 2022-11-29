import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { MakeMain, MakePayStubForm, MakePayStub, MakePdfScreen } from '@/main/factories/pages'

export type PrivateStackParams = {
  Main: undefined
  PayStubForm: undefined
  PayStub: { codCal: string }
  PdfScreen: { pdfData: object }
}

const PrivateStack = createNativeStackNavigator<PrivateStackParams>()

const PrivateRoutes: React.FC = () => {
  return (
    <NavigationContainer>
      <PrivateStack.Navigator>
        <PrivateStack.Screen name="Main" options={{ headerShown: false, title: 'Ínicio' }}>
          {(props) => <MakeMain props={props} />}
        </PrivateStack.Screen>
        <PrivateStack.Screen name="PayStubForm" options={{ title: 'Meu holerite', headerStyle: { backgroundColor: '#F15E2C' }, headerTintColor: 'white' }}>
          {(props) => <MakePayStubForm props={props} />}
        </PrivateStack.Screen>
        <PrivateStack.Screen name="PayStub" options={{ title: 'Holerite', headerBackTitle: 'Voltar', headerStyle: { backgroundColor: '#F15E2C' }, headerTintColor: 'white' }}>
          {(props) => <MakePayStub props={props} />}
        </PrivateStack.Screen>
        <PrivateStack.Screen name="PdfScreen" options={{ title: '', headerBackTitle: 'Voltar', headerStyle: { backgroundColor: '#F15E2C' }, headerTintColor: 'white' }}>
          {(props) => <MakePdfScreen props={props} />}
        </PrivateStack.Screen>
      </PrivateStack.Navigator>
    </NavigationContainer>
  )
}

export default PrivateRoutes
