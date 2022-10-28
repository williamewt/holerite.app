import { CalculationModel } from './calculation'
import { PayStubEventModel } from './pay-stub-event'
import { PayStubHeaderModel } from './pay-stub-header'
import { SalaryModel } from './salary'

export type PayStubModel = { calculation: CalculationModel, header: PayStubHeaderModel, events: PayStubEventModel[], salary: SalaryModel }
