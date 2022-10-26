export type PayStubEventModel = {
  id: number
  base: string
  numCad: number
  refEve: number
  valEve: number
  codEve: number
  tipEve: number
  desEve: string
  codCal: number
  numEmp: number
  hash: string
  createdAt: Date | null
  updatedAt: Date | null
}
