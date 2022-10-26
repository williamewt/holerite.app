export type PayStubHeaderModel = {
  id: number
  base: string
  companyId: number
  userId: number
  numEmp: number
  nomEmp: string
  numCgc: string
  nomLoc: string
  numCad: number
  nomFun: string
  numCpf: string
  datAdm: Date
  datAlt: Date
  codCar: string
  titRed: string
  codCb2: string
  hash: string
  createdAt: Date | null
  updatedAt: Date | null
}
