import { Box, HStack, Text, VStack, Button, ScrollView, Modal } from 'native-base'
import React, { useEffect, useState } from 'react'

import { GetPayStub } from '@/domain/use-cases'
import { Skeeleton } from './components'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { payStubState } from './components/atoms'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { PrivateStackParams } from '@/main/routes/private'
import { RouteProp } from '@react-navigation/native'
import { VictoryPie, VictoryTheme } from 'victory-native'
import Svg from 'react-native-svg'
import { TouchableOpacity } from 'react-native'
import moment from 'moment'
import { PayStubEventModel } from '@/domain/entities/models'

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
  const [earnings, setEarnings] = useState(0)
  const [discounts, setDiscounts] = useState(0)
  const [netValue, setNetValue] = useState(0)
  const [eveEarnings, setEveEarnings] = useState<PayStubEventModel[]>([])
  const [eveDiscounts, setEveDiscounts] = useState<PayStubEventModel[]>([])
  const [showModalEarnings, setShowModalEarnings] = useState(false)
  const [showModalDiscounts, setShowModalDiscounts] = useState(false)

  useEffect(() => {
    resetPayStub()
    void (async () => {
      try {
        const payStubData = await getPayStub({ codCal })
        setState(old => ({ ...old, payStubData }))
        console.log('payStubData', payStubData)
      } catch { }
      calculateValues()
      setIsStartingLoading(false)
    })()
  }, [])

  const calculateValues = (): void => {
    if (state.payStubData !== null) {
      let earningsV = 0
      let discountsV = 0
      let netV = 0
      const eveEarningsV = []
      const eveDiscountsV = []
      for (let i = 0; i < state.payStubData.events.length; i++) {
        if (state.payStubData.events[i].tipEve === 1 || state.payStubData.events[i].tipEve === 2 || state.payStubData.events[i].tipEve === 5) {
          earningsV += state.payStubData.events[i].valEve * 1
          eveEarningsV.push(state.payStubData.events[i])
        } else if (state.payStubData.events[i].tipEve === 4) {
          eveEarningsV.push(state.payStubData.events[i])
        } else {
          discountsV += state.payStubData.events[i].valEve * 1
          eveDiscountsV.push(state.payStubData.events[i])
        }
      }
      netV = earningsV - discountsV
      setEarnings(earningsV)
      setDiscounts(discountsV)
      setNetValue(netV)
      setEveEarnings(eveEarningsV)
      setEveDiscounts(eveDiscountsV)
    }
  }

  // const handleSubmit = async (): Promise<void> => {
  //   try {
  //     if (state.isLoading || state.isFormInvalid) {
  //       return
  //     }
  //     setState(old => ({
  //       ...old,
  //       mainError: '',
  //       isLoading: true
  //     }))
  //     // enviar para a tela do holerite
  //   } catch (error: any) {
  //     setState(old => ({
  //       ...old,
  //       isLoading: false,
  //       mainError: error.message
  //     }))
  //   }
  // }

  if (isStartingLoading) {
    return <Skeeleton />
  }

  return (
    <Box w="100%" h="100%" backgroundColor="#F15E2C">
      <Box safeArea p="2" w="100%" flex={1} h="600" backgroundColor="white" borderTopRadius={20}>
        <ScrollView>
          <VStack space={6} alignSelf="center" w="90%" maxW="300">
            <Text style={{ fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>Meu Holerite {state.payStubData ? moment(state.payStubData.calculation.perRef).add(3, 'hours').format('MM/YYYY') : ''}</Text>
            <Svg width={300} height={250} style={{ marginTop: -40 }}>

              <VictoryPie
                theme={VictoryTheme.material}
                colorScale={['#05c796', '#c43162']}
                standalone={false}
                width={300} height={300}
                labels={(dat) => ''}
                data={[
                  { y: earnings },
                  { y: discounts }
                ]}
              />
            </Svg>
            <TouchableOpacity onPress={() => setShowModalEarnings(true)} style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, paddingHorizontal: 15, paddingVertical: 8, borderColor: '#F5F5F5' }}>
              <HStack space={5}>
                <Box alignSelf="center" bg="#05c796" borderRadius={5} padding={2} />
                <Text>Proventos</Text>
              </HStack>
              <Text>{earnings.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowModalDiscounts(true)} style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, paddingHorizontal: 15, paddingVertical: 8, borderColor: '#F5F5F5' }}>
              <HStack space={5}>
                <Box alignSelf="center" bg="#c43162" borderRadius={5} padding={2} />
                <Text>Descontos</Text>
              </HStack>
              <Text>{discounts.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
            </TouchableOpacity>
            <HStack justifyContent='space-between' style={{ borderBottomWidth: 1, paddingHorizontal: 15, paddingVertical: 8, borderColor: '#F5F5F5' }}>
              <HStack space={5}>
                <Box alignSelf="center" bg="#066f99" borderRadius={5} padding={2} />
                <Text>Líquido</Text>
              </HStack>
              <Text>{netValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
            </HStack>
            <Button mt="2" backgroundColor="#F15E2C">
              Ver PDF
            </Button>
          </VStack>
        </ScrollView>
      </Box>
      <Modal isOpen={showModalEarnings} onClose={() => setShowModalEarnings(false)} size="full">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Proventos</Modal.Header>
          <Modal.Body>
            <VStack space={3}>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium" style={{ flex: 0.4 }}>Descrição</Text>
                <Text fontWeight="medium" style={{ flex: 0.3, textAlign: 'right' }}>Referência</Text>
                <Text fontWeight="medium" style={{ flex: 0.3, textAlign: 'right' }}>Vencimentos</Text>
              </HStack>
              {eveEarnings.map(ee =>
                <HStack alignItems="flex-end" justifyContent="space-between">
                  <Text color="blueGray.400" style={{ flex: 0.4 }}>{ee.desEve.length > 15 ? ee.desEve.substring(0, 15) + '...' : ee.desEve}</Text>
                  <Text color="blueGray.400" style={{ flex: 0.3, textAlign: 'right' }}>{ee.refEve > 0 ? ee.refEve : ''}</Text>
                  <Text color="blueGray.400" style={{ flex: 0.3, textAlign: 'right' }}>{ee.valEve.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
                </HStack>
              )}
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Total</Text>
                <Text fontWeight="medium">{earnings.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
              </HStack>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Modal isOpen={showModalDiscounts} onClose={() => setShowModalDiscounts(false)} size="full">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Descontos</Modal.Header>
          <Modal.Body>
            <VStack space={3}>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium" style={{ flex: 0.4 }}>Descrição</Text>
                <Text fontWeight="medium" style={{ flex: 0.3, textAlign: 'right' }}>Referência</Text>
                <Text fontWeight="medium" style={{ flex: 0.3, textAlign: 'right' }}>Vencimentos</Text>
              </HStack>
              {eveDiscounts.map(ed =>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text color="blueGray.400" style={{ flex: 0.4 }}>{ed.desEve.length > 15 ? ed.desEve.substring(0, 15) + '...' : ed.desEve}</Text>
                  <Text color="blueGray.400" style={{ flex: 0.3, textAlign: 'right' }}>{ed.refEve > 0 ? ed.refEve : ''}</Text>
                  <Text color="blueGray.400" style={{ flex: 0.3, textAlign: 'right' }}>{ed.valEve.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
                </HStack>
              )}
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Total</Text>
                <Text fontWeight="medium">{discounts.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
              </HStack>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Box>

  )
}

export default PayStub
