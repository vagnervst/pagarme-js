import isValidExpirationYear from './isValidExpirationYear'

describe('isValidExpirationYear validator', () => {
  it('should return true when a valid year is given', () => {
    expect(isValidExpirationYear(20)).toBe(true)
    expect(isValidExpirationYear('20')).toBe(true)
    expect(isValidExpirationYear(2020)).toBe(true)
    expect(isValidExpirationYear('2020')).toBe(true)
  })

  it('should return false when an invalid year is given', () => {
    expect(isValidExpirationYear('')).toBe(false)
    expect(isValidExpirationYear(2)).toBe(false)
    expect(isValidExpirationYear(201)).toBe(false)
    expect(isValidExpirationYear('23592')).toBe(false)
  })
})
