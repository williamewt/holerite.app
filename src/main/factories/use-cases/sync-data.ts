import { makeAxiosHttpClient, makeApiUrl } from '@/main/factories/http'
import { setupSyncData, SyncData } from '@/domain/use-cases'

export const makeSyncData = (): SyncData => setupSyncData(makeApiUrl(':3000/sync-data'), makeAxiosHttpClient())
