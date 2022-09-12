import { SetStorage, GetStorage } from '@/domain/protocols/cache'

import AsyncStorage from '@react-native-async-storage/async-storage'

export class LocalStorageAdapter implements SetStorage, GetStorage {
  async set (key: string, value?: object): Promise<void> {
    if (value !== undefined) {
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } else {
      await AsyncStorage.removeItem(key)
    }
  }

  async get (key: string): Promise<any> {
    const data: any = await AsyncStorage.getItem(key)
    return JSON.parse(data)
  }
}
