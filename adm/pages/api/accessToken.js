import withSession from '../../lib/session'
export default withSession(async (req, res) => {
  console.log(req.method, '????????????????????', req.body)
  switch (req.method) {
    case 'POST':
      return setToken();
    case 'DELETE':
      return clearToken();
    default:
      return getToken();
  }

  async function setToken() {
    req.session.set('accessToken', { accessToken : req.body.accessToken })
    await req.session.save()
    res.status(200).json({ accessToken : req.body.accessToken })
  }

  async function clearToken() {
    await req.session.destroy()
    return res.status(200).json({ accessToken : null});
  }

  async function getToken() {

    const auth = req.session.get('accessToken')
    if (auth)
      return res.status(200).json(auth);
    return res.status(200).json({ accessToken : null});
  }
})
