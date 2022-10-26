import { Box, Text, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'

import { GetPayStub } from '@/domain/use-cases'
import { Skeeleton } from './components'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { payStubState } from './components/atoms'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { PrivateStackParams } from '@/main/routes/private'
import { RouteProp } from '@react-navigation/native'
import { VictoryPie, VictoryTheme } from 'victory-native'
import Svg, { Circle, Text as TextSvg } from 'react-native-svg'

type Props = {
  navigation: NativeStackNavigationProp<PrivateStackParams>
  route: RouteProp<PrivateStackParams, 'PayStub'>
  getPayStub: GetPayStub
}

const PayStub: React.FC<Props> = ({ navigation, route, getPayStub }: Props) => {
  const { codCal } = route.params
  const resetPayStub = useResetRecoilState(payStubState)
  const [state, setState] = useRecoilState(payStubState)
  const [isStartingLoading, setIsStartingLoading] = useState(true)

  useEffect(() => {
    resetPayStub()

    // void (async () => {
    //   const payStubData = await getPayStub({ codCal })
    //   setIsStartingLoading(false)
    //   console.log('payStubData', payStubData)
    // })()
  }, [])

  const handleSubmit = async (): Promise<void> => {
    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState(old => ({
        ...old,
        mainError: '',
        isLoading: true
      }))
      // enviar para a tela do holerite
    } catch (error: any) {
      setState(old => ({
        ...old,
        isLoading: false,
        mainError: error.message
      }))
    }
  }

  // if (isStartingLoading) {
  //   return <Skeeleton />
  // }

  return (
    <Box safeArea p="2" py="4" w="100%" flex={1} h="100%" backgroundColor="white" borderTopRadius={20}>
      <VStack space={8} mt="2" alignSelf="center" w="90%" maxW="300">
      <Svg width={300} height={300}>
        <TextSvg x={104} y={154} fontSize="16" fill="#066f99">R$ 5.000,00</TextSvg>
          <VictoryPie
          theme={VictoryTheme.material}
          colorScale={['#c43162', '#05c796']}
            standalone={false}
            width={300} height={300}
            innerRadius={75}
            labels={(dat) => ''}
            data={[
              { y: 80 },
              { y: 40 }
            ]}
          />
      </Svg>
        {/* <VictoryPie
        style={{ labels: { fill: 'white', fontSize: 14 } }}
        labelRadius={({ innerRadius }) => (innerRadius as number) + 25 }
          width={300}
          colorScale={['red', 'green']}
          data={[
            { x: 'Descontos', y: 80 },
            { x: 'Receitas', y: 40 }
          ]}
        /> */}
      </VStack>
    </Box>
  )
}

export default PayStub
