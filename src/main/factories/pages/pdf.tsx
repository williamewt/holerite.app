import { makeApiUrl } from '@/main/factories/http'
import { PdfScreen } from '@/application/pages'

import React from 'react'

export const MakePdfScreen: React.FC<any> = ({ props }: any) => {
  return (
    <PdfScreen
      { ...props }
      apiUrl = { makeApiUrl(':3333/pdf') }
    />
  )
}
