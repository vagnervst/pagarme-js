import validate from './index'

describe('validator', () => {
  it('should validate fields', () => {
    const result = validate({
      cnpj: '18.727.053/0001-74',
      cpf: '408.855.998-37',
      ddd: 15,
      zipcode: '05679010',
      phone: '996220394',
      card: {
        card_holder_name: 'Marco Worms',
        card_number: '5545497548400992',
        card_cvv: 856,
        card_expiration_date: '11/21',
      },
    })
    expect(result).toMatchObject({
      cnpj: true,
      cpf: true,
      ddd: true,
      zipcode: true,
      phone: true,
      card: {
        card_holder_name: true,
        brand: 'mastercard',
        card_number: true,
        card_cvv: true,
        card_expiration_date: true,
        card_expiration_month: true,
        card_expiration_year: true,
      },
    })
  })

  it('should validate batches of fields', () => {
    const result = validate({
      cnpj: ['18.727.053/0001-74', '17.727.053/0001-74'],
      cpf: ['408.855.998-37', '407.855.998-37'],
      ddd: ['67', 'a9'],
      zipcode: ['05679010', '123456789'],
      phone: ['996220394', 1234],
      card: [
        {
          card_holder_name: 'Leonardo Nerone',
          card_number: '509005334509218',
          card_cvv: 758,
          card_expiration_date: '10/23',
        },
        {
          card_holder_name: 'Marco W0rms',
          card_number: '348149451448134',
          card_cvv: 123,
          card_expiration_date: '11/11',
        },
      ],
    })
    expect(result).toMatchObject({
      cnpj: [true, false],
      cpf: [true, false],
      ddd: [true, false],
      zipcode: [true, false],
      phone: [true, false],
      card: [
        {
          card_holder_name: true,
          brand: 'elo',
          card_number: true,
          card_cvv: true,
          card_expiration_date: true,
          card_expiration_month: true,
          card_expiration_year: true,
        },
        {
          card_holder_name: false,
          brand: 'amex',
          card_number: true,
          card_cvv: false,
          card_expiration_date: false,
          card_expiration_month: true,
          card_expiration_year: true,
        },
      ],
    })
  })

  it('should ignore keys that has no validators', () => {
    const result = validate({
      boop: 1234,
    })
    expect(result).not.toHaveProperty('boop')
  })
})
