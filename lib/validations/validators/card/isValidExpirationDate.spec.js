import isValidExpirationDate from './isValidExpirationDate'

describe('isValidExpirationDate validator', () => {
  it('should return true when a valid date is given', () => {
    expect(isValidExpirationDate('01/21')).toBe(true)
    expect(isValidExpirationDate('11/23')).toBe(true)
    expect(isValidExpirationDate('12/18')).toBe(true)
    expect(isValidExpirationDate('01/30')).toBe(true)
    expect(isValidExpirationDate('0121')).toBe(true)
    expect(isValidExpirationDate(1121)).toBe(true)
  })

  it('should return false when an invalid date is given', () => {
    expect(isValidExpirationDate('02/2015')).toBe(false)
    expect(isValidExpirationDate('02/2017')).toBe(false)
    expect(isValidExpirationDate('13/18')).toBe(false)
    expect(isValidExpirationDate('01/ab')).toBe(false)
  })
})
