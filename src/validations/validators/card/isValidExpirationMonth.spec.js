import isValidExpirationMonth from './isValidExpirationMonth'

describe('isValidExpirationMonth validator', () => {
  it('should return true when a valid month is given', () => {
    expect(isValidExpirationMonth(10)).toBe(true)
    expect(isValidExpirationMonth('11')).toBe(true)
  })

  it('should return false when an invalid month is given', () => {
    expect(isValidExpirationMonth(0)).toBe(false)
    expect(isValidExpirationMonth('13')).toBe(false)
  })
})
