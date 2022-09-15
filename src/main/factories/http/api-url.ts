import { env } from '@/main/config/env'
export const makeApiUrl = (path: string): string => `${env.apiUrl as string}${path}`
