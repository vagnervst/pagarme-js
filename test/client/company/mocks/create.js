const randomString = Date.now().toString(16)
const valid = {
  name: `George ${randomString}`,
  company_name: `Baz Inc ${randomString}`,
  email: `foo_${randomString}@pagar.me`,
  password: '42',
}

const invalid = {
  email: 'bar_123@foo.com',
}

export {
  valid,
  invalid,
}
