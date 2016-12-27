const valid = {
  amount: 4202,
  card_number: '4111111111111111',
  card_expiration_date: '1018',
  card_holder_name: 'Richard Fernandes',
  card_cvv: '123',
  customer: {
    name: 'Richard Fernandes',
    email: 'richard.fernandes@pagar.me',
    document_number: '06323831198',
    address: {
      street: 'Avenida Brigadeiro Faria Lima',
      street_number: '1811',
      neighborhood: 'Jardim Paulistano',
      zipcode: '01451001'
    },
    phone: {
      ddi: '55',
      ddd: '11',
      number: '99999999'
    }
  },
  metadata: {
    product_id: 40028922,
    product_name: 'PlayStation'
  }
}

const invalid = {
  card_holder_name: 'Richard Fernandes',
  card_cvv: '123',
  card_expiration_date: '1018',
  customer: {
    neighborhood: 'Jardim Paulistano',
    zipcode: '01451001'
  }
}

export {
  valid,
  invalid
}
