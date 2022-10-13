import { useLogout } from '@/application/hooks'
import { GetUser } from '@/domain/use-cases'
import { Text, VStack, Box, HStack, Actionsheet, Icon, IconButton, useDisclose } from 'native-base'
import React, { useEffect, useRef, useState } from 'react'
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import { Platform, TouchableOpacity } from 'react-native'
import { Subscription } from 'expo-modules-core'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { FontAwesome5 } from '@expo/vector-icons'

import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { AccountModel } from '@/domain/entities/models'
import { Skeeleton } from './components'

import { PrivateStackParams } from '@/main/routes/private'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type Props = {
  navigation: NativeStackNavigationProp<PrivateStackParams>
  getUser: GetUser
}
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
})

const Main: React.FC<Props> = ({ navigation, getUser }: Props) => {
  const logout = useLogout()

  const [user, setUser] = useState<AccountModel>()
  const [isLoading, setIsLoading] = useState(true)
  const { isOpen, onOpen, onClose } = useDisclose()

  const notificationListener = useRef<Subscription>()
  const responseListener = useRef<Subscription>()

  useEffect(() => {
    void (async () => {
      try {
        const userResponse = await getUser()
        setUser(userResponse)
        setIsLoading(false)
        const notificationToken = await registerForPushNotificationsAsync()
        if (notificationToken !== undefined) {
          const responseNt = await makeAuthorizeHttpClientDecorator().request({
            url: makeApiUrl('/notification/save-token'),
            method: 'post',
            body: { token: notificationToken }
          })
          console.log('TOKEN', notificationToken, responseNt)
        }
      } catch (error: any) {
        console.log(error)
      }
    })()
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('notification', notification)
    })

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('response', response)
    })

    return () => {
      if (notificationListener.current !== undefined) {
        Notifications.removeNotificationSubscription(notificationListener.current)
      }
      if (responseListener.current !== undefined) {
        Notifications.removeNotificationSubscription(responseListener.current)
      }
    }
  }, [])

  async function registerForPushNotificationsAsync (): Promise<string | undefined> {
    let token: string = ''
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus === 'granted') {
        token = (await Notifications.getExpoPushTokenAsync()).data

        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C'
          })
        }
        return token
      }
    }
  }

  if (isLoading) {
    return <Skeeleton/>
  }

  return (
    <Box pt="70" p="10" w="100%" flex={1} alignItems="center" justifyContent="center" backgroundColor="#F15E2C">
      <VStack w="100%" h="100%">
        <HStack justifyContent="space-between" alignItems='center' mb="20">
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>Olá, {user?.name.split(' ')[0]}</Text>
          <IconButton size='lg' onPress={onOpen} variant="solid" colorScheme="orange" borderRadius="full" _icon={{
            as: MaterialIcons,
            name: 'settings'
          }} />
        </HStack>
        <TouchableOpacity style={{
          backgroundColor: 'white',
          paddingVertical: 30,
          paddingHorizontal: 20,
          borderRadius: 10
        }} onPress={() => navigation.navigate('PayStubForm')}>
          <HStack justifyContent="space-between" alignItems='center'>
            <HStack justifyContent="flex-start" alignItems='center' space={5}>
              <Icon as={FontAwesome5} name="file-invoice-dollar" color="#F15E2C" size={35} />
              <Text style={{ fontSize: 18 }}>Meu Holerite</Text>
            </HStack>
            <Icon as={FontAwesome5} name="chevron-right" size={4}/>
          </HStack>
        </TouchableOpacity>
      </VStack>
      <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
        <Actionsheet.Content>
          <Actionsheet.Item startIcon={<Icon as={MaterialIcons} size="6" name="logout"/>} onPress={() => logout()}>
            Sair
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  )
}

export default Main
