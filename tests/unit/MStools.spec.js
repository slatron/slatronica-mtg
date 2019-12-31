import { tools } from '@/utils/MStools'

describe('MStools', () => {
  test('max(arr): Returns Max value of Array', () => {
    const testArr = [1, 5, 2]
    const maxVal = tools().max(testArr)
    expect(maxVal).toBe(5)
  })
})


// max: (array) => {
//   return array.reduce(function (a, b) {
//     return Math.max(a, b)
//   })
// },
