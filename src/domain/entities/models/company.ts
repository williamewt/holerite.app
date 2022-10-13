export type CompanyModel = {
  userId: number
  companyId: number
  numCad: number
  base: string
  company: {
    id: number
    base: string
    numEmp: number
    nomEmp: string
    hash: string
    createdAt: Date
    updatedAt: Date
  }
}
