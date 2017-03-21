import getBrand from './getBrand'

describe('getCardBrand validator', () => {
  it('should identify visa card numbers', () => {
    expect(getBrand('4111 1111 1111 1111')).toBe('visa')
  })

  it('should identify elo card numbers', () => {
    expect(getBrand('6363680000457013')).toBe('elo')
    expect(getBrand('4389350000457013')).toBe('elo')
    expect(getBrand('5041750000457013')).toBe('elo')
    expect(getBrand('4514160000457013')).toBe('elo')
    expect(getBrand('6362970000457013')).toBe('elo')
    expect(getBrand('506734882114864')).toBe('elo')
    expect(getBrand('509005334509218')).toBe('elo')
  })

  it('should identify discover card numbers', () => {
    expect(getBrand('6011020000245045')).toBe('discover')
    expect(getBrand('6221020000245045')).toBe('discover')
    expect(getBrand('6411020000245045')).toBe('discover')
    expect(getBrand('6511020000245045')).toBe('discover')
  })

  it('should identify diners card numbers', () => {
    expect(getBrand('30190102462661')).toBe('diners')
    expect(getBrand('30590102462661')).toBe('diners')
    expect(getBrand('36490102462661')).toBe('diners')
    expect(getBrand('38490102462661')).toBe('diners')
  })

  it('should identify amex card numbers', () => {
    expect(getBrand('348149451448134')).toBe('amex')
    expect(getBrand('372566898118716')).toBe('amex')
  })

  it('should identify aura card numbers', () => {
    expect(getBrand('508149451448134')).toBe('aura')
    expect(getBrand('5067970000457013')).toBe('aura')
  })

  it('should identify jcb card numbers', () => {
    expect(getBrand('3528256349013271')).toBe('jcb')
  })

  it('should identify hipercard card numbers', () => {
    expect(getBrand('6028256349013271')).toBe('hipercard')
  })

  it('should identify mastercard card numbers', () => {
    expect(getBrand('5488930079839278')).toBe('mastercard')
    expect(getBrand('5578006428616906')).toBe('mastercard')
    expect(getBrand('5111268739494928')).toBe('mastercard')
  })
})
