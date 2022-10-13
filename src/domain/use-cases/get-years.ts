type Setup = () => GetYears

type Output = number[]

export type GetYears = () => Output

export const setupGetYears: Setup = () => () => {
  const response: Output = []
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const day = now.getDate()
  for (let i = 0; i < 5; i++) {
    const otherYear = new Date(year - i, month, day)
    response.push(otherYear.getFullYear())
  }
  return response
}
