import isValidHolderName from './isValidHolderName'

describe('isValidHolderName validator', () => {
  it('should return true when a valid name is given', () => {
    expect(isValidHolderName('Leonardo')).toBe(true)
    expect(isValidHolderName('Marco Worms')).toBe(true)
  })

  it('should return false when an invalid name is given', () => {
    expect(isValidHolderName('623292')).toBe(false)
    expect(isValidHolderName('W0rms')).toBe(false)
    expect(isValidHolderName('Marco W0rms')).toBe(false)
  })
})
