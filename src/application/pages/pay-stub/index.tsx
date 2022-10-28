import { Box, HStack, Text, VStack, Button, ScrollView } from 'native-base'
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
import { TouchableOpacity } from 'react-native'

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
    <Box w="100%" h="100%" backgroundColor="#F15E2C">
      <Box safeArea p="2" w="100%" flex={1} h="600" backgroundColor="white" borderTopRadius={20}>
        <ScrollView>
          <VStack space={6} alignSelf="center" w="90%" maxW="300">
            <Text style={{ fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>Meu Holerite 10/2022</Text>
            <Svg width={300} height={250} style={{ marginTop: -40 }}>
              <TextSvg x={104} y={144} fontSize="16" fill="#066f99">R$ 5.000,00</TextSvg>
              <TextSvg x={124} y={170} fontSize="16" fill="#066f99">Líquido</TextSvg>
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
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, paddingHorizontal: 15, paddingVertical: 8, borderColor: '#F5F5F5' }}>
              <HStack space={5}>
                <Box alignSelf="center" bg="#05c796" borderRadius={5} padding={2} />
                <Text>Proventos</Text>
              </HStack>
              <Text>R$ 5.000,00</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, paddingHorizontal: 15, paddingVertical: 8, borderColor: '#F5F5F5' }}>
              <HStack space={5}>
                <Box alignSelf="center" bg="#c43162" borderRadius={5} padding={2} />
                <Text>Descontos</Text>
              </HStack>
              <Text>R$ 1.200,00</Text>
            </TouchableOpacity>
            <HStack justifyContent='space-between' style={{ borderBottomWidth: 1, paddingHorizontal: 15, paddingVertical: 8, borderColor: '#F5F5F5' }}>
              <HStack space={5}>
                <Box alignSelf="center" bg="#066f99" borderRadius={5} padding={2} />
                <Text>Líquido</Text>
              </HStack>
              <Text>R$ 1.200,00</Text>
            </HStack>
            <Button mt="2" backgroundColor="#F15E2C">
              Ver PDF
            </Button>
          </VStack>
        </ScrollView>
      </Box>
    </Box>
  )
}

export default PayStub
