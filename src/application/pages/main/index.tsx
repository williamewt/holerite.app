import { useLogout } from '@/application/hooks'
import { GetUser } from '@/domain/use-cases'
import { Text, Center, Button } from 'native-base'
import React, { useEffect, useState } from 'react'

type Props = {
  getUser: GetUser
}

const Main: React.FC<Props> = ({ getUser }: Props) => {
  const logout = useLogout()

  const [user, setUser] = useState({})

  useEffect(() => {
    void (async () => {
      try {
        const userResponse = await getUser()
        setUser(userResponse)
      } catch (error: any) {
        console.log(error)
      }
    })()
  })

  return (
    <Center w="100%" h="100%" flex={1}>
     <Text>Hello World</Text>
     <Button onPress={() => logout()}>Sair</Button>
     <Text>{JSON.stringify(user)}</Text>
    </Center>
  )
}

export default Main
