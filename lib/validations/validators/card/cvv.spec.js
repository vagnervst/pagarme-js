import isValidCvv from './cvv'

describe('isValidCvv validator', () => {
  it("should validate amex's cvv", () => {
    expect(isValidCvv('5535', 'amex')).toBe(true)
    expect(isValidCvv('526', 'amex')).toBe(false)

    expect(isValidCvv(5535, 'amex')).toBe(true)
    expect(isValidCvv(526, 'amex')).toBe(false)
  })

  it('should validate other cards', () => {
    expect(isValidCvv('852', 'visa')).toBe(true)
    expect(isValidCvv('8528', 'visa')).toBe(false)

    expect(isValidCvv(852, 'visa')).toBe(true)
    expect(isValidCvv(8528, 'visa')).toBe(false)
  })
})
