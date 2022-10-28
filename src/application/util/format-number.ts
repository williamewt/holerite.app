export const formatNumber = (amount: number, moeda: string = 'R$ ', decimalCount: number = 2, decimal: string = ',', thousands: string = '.'): string | undefined => {
  try {
    if (amount === 0) {
      return ''
    }

    // console.log(amount)

    decimalCount = Math.abs(decimalCount)
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount

    const negativeSign = amount < 0 ? '-' : ''

    amount = Math.abs(Number(amount))

    const i = amount.toFixed(decimalCount).toString()
    const j = (i.length > 3) ? i.length % 3 : 0

    return moeda + negativeSign + (j ? i.substring(0, j) + thousands : '') + i.substring(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) + (decimalCount ? decimal + Math.abs(amount - parseInt(i)).toFixed(decimalCount).slice(2) : '')
  } catch (e) {
    console.log(e)
  }
}
