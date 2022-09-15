export interface SetStorage {
  set: (key: string, value?: object) => Promise<void>
}
