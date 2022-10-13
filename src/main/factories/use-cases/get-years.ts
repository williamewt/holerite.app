import { setupGetYears, GetYears } from '@/domain/use-cases'

export const makeGetYears = (): GetYears => setupGetYears()
