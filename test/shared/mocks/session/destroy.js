const auth = {
  email: 'company_n1UhJwz58RgNkHo@pagar.me',
  password: 'E3JZuzxpNcIICun2ndTEUDh8xwWGY1',
}

const postDeletePayload = {
  amount: 100,
  payment_method: 'credit_card',
  card_id: 'card_ci6l9fx8f0042rt16rtb477gj',
  customer: {
    name: 'Aardvark Silva',
    email: 'aardvark.silva@pagar.me',
    document_number: '18152564000105',
    address: {
      street: 'Avenida Brigadeiro Faria Lima',
      street_number: '1811',
      neighborhood: 'Jardim Paulistano',
      zipcode: '01451001',
    },
    phone: {
      ddi: '55',
      ddd: '11',
      number: '99999999',
    },
  },
  metadata: {
    idProduto: '13933139',
  },
}

export {
  auth,
  postDeletePayload,
}
