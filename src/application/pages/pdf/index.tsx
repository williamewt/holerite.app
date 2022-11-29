import { Box } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Alert, Dimensions } from 'react-native'
import PdfReader from 'rn-pdf-reader-js'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { PrivateStackParams } from '@/main/routes/private'
import { RouteProp } from '@react-navigation/native'
import { Skeeleton } from './components'
import axios from 'axios'

type Props = {
  navigation: NativeStackNavigationProp<PrivateStackParams>
  route: RouteProp<PrivateStackParams, 'PdfScreen'>
  apiUrl: string
}

const PdfScreen: React.FC<Props> = ({ navigation, route, apiUrl }: Props) => {
  const { pdfData } = route.params
  const [source, setSource] = useState('')
  const [isStartingLoading, setIsStartingLoading] = useState(true)

  useEffect(() => {
    console.log(pdfData)
    axios.post(apiUrl, pdfData)
      .then((response): void => {
        if (response.data.success) {
          setSource(response.data.result)
          setIsStartingLoading(false)
        }
      }).catch(e => {
        console.log('===>', JSON.stringify(e))
        Alert.alert('Ouve um erro ao tentar gerar o pdf, por favor tente mais tarde')
        setIsStartingLoading(false)
      })
  }, [])

  // const source = { uri: `${apiUrl}pdf`, cache: false }

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
        <PdfReader
          source={{ base64: source }}
          customStyle={{
            readerContainerZoomContainer: {
              borderRadius: 30
            },
            readerContainerZoomContainerButton: {
              borderRadius: 30
            }
          }}
        />
    </Box>

  )
}

export default PdfScreen
