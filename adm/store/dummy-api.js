const delay = (ms) => new Promise(res => setTimeout(res, ms));

export async function authenticate(form) {
  await delay(1000)
  if (form.username === 'admin') {
    return {
      user: {
        name: "Ali"
      },
      jwt: "hello.jwt",
      permissions: [
        { key: 'p1', value: true }
      ]
    }
  }
  throw new Error('not authenticated')
}
