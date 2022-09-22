import { Image, Center } from 'native-base'
import React from 'react'

type Props = {
  width?: number
  height?: number
}

const CenterLogoWhite: React.FC<Props> = ({ width, height }: Props) => {
  return (
    <Center>
      <Image source={require('@/assets/logo-white.png')} alt="Logo Grupo Ultra" width={width ?? 120} height={height ?? 144} />
    </Center>
  )
}

export default CenterLogoWhite
