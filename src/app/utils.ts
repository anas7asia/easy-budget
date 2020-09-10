export const calcPercentage = (num: number, total: number): number => {
  const result = total !== 0 ? 
    num * 100 / total : // can't divide by zero
    0
  return roundNum(result)
}

/** 
 * @desc let an integer be as it is or round a float number to maximum two decimal places of precision: 
 * 3.33333333 ==> 3.33
 * 2.25 ==> 2.25 
 * */
export const roundNum = (num: number, decimalPlaces: number = 2): number => {
  const countDecimalPlaces = (floatNum: number) => `${floatNum}`.split('.')[1].length

  return Number.isInteger(num) ?
    num :
    countDecimalPlaces(num) > decimalPlaces ?
      parseFloat(num.toFixed(decimalPlaces)) :
      num
}