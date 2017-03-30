import isValidCardNumber from './isValidCardNumber'

describe('Card number validator', () => {
  it('should return true when a valid card number is given', () => {
    expect(isValidCardNumber('4111111111111111')).toBe(true)
    expect(isValidCardNumber('343467796144134')).toBe(true)

    expect(isValidCardNumber(4111111111111111)).toBe(true)
    expect(isValidCardNumber(343467796144134)).toBe(true)
  })

  it('should return false when an invalid card number is given', () => {
    expect(isValidCardNumber('411111111111')).toBe(false)
    expect(isValidCardNumber('3434676144134')).toBe(false)

    expect(isValidCardNumber(123456789523)).toBe(false)
    expect(isValidCardNumber(2563452514251251)).toBe(false)
  })
})
