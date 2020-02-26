import runTest from '../../test/runTest'

test('client.onboardingAnswers.create', () =>
  runTest({
    connect: {
      api_key: 'abc123',
    },
    subject: client => client.onboardingAnswers.create({ answer: 'answer' }),
    method: 'POST',
    url: '/onboarding_answers',
    body: {
      api_key: 'abc123',
      answer: 'answer',
    },
  })
)
