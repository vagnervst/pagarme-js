import id from './cnpj-and-cpf'

describe('CNPJ and CPF validator', () => {
  it('should return true when a valid cnpj is given', () => {
    expect(id('18.727.053/0001-74')).toBe(true)
    expect(id('18727.053/0001-74')).toBe(true)
    expect(id('18727.0530001-74')).toBe(true)
    expect(id('18727053/0001-74')).toBe(true)
    expect(id('18727053/000174')).toBe(true)
    expect(id('187270530001-74')).toBe(true)
    expect(id(18727053000174)).toBe(true)
  })

  it('should return false when an invalid cnpj is given', () => {
    expect(id('17.727.053/0001-74')).toBe(false)
    expect(id('17727.053/0001-74')).toBe(false)
    expect(id('17727.0530001-74')).toBe(false)
    expect(id('17727053/0001-74')).toBe(false)
    expect(id('17727053/000174')).toBe(false)
    expect(id('177270530001-74')).toBe(false)
    expect(id(17727053000174)).toBe(false)
  })

  it('should return true when a valid cpf is given', () => {
    expect(id('408.855.998-37')).toBe(true)
  })

  it('should return false when an invalid cpf is given', () => {
    expect(id('407.855.998-37')).toBe(false)
  })
})
